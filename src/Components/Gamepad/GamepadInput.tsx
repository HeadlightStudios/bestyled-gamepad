import * as React from 'react'
import mappings from './mappings/index';

export type GamepadProps = {
  index?: number,
  stickThreshold?: number,
  deadZone?: number,
  onConnect?: (gamepad: {index: number, id: string}) => void,
  onDisconnect?: (gamepad: {index: number, id: string}) => void,
  onButton?: (name: string, pressed: boolean) => void,
  onAxis?: (axisName: string, dimension: string, value: number, previousValue: number) => void,
}

export class GamepadInput extends React.Component<GamepadProps, any> {

  private padState;
  private mounted;
  private mapping;
  private updateGamepadBound;

  static defaultProps = {
    stickThreshold: 0.5,
    deadZone: 0.08,
    preview: true,

    gamepadIndex: 0,

    onConnect: () => { },
    onDisconnect: () => { },

    onButton: () => { },
    onAxis: () => { },
  }

  constructor(props, context) {
    super(props, context)

    this.padState = {
      connected: false,
      buttons: {},
      axes: {}
    }

    this.updateGamepadBound = this.updateGamepad.bind(this);
  }

  connected(gamepad: Gamepad) {
    let mapping = mappings(gamepad);

    this.padState.connected = true;
    this.padState.buttons = {};
    this.padState.axes = {};

    mapping.buttons.forEach(k => { this.padState.buttons[k] = false });
    mapping.axes.forEach(k => { !this.padState.axes[k.name] && (this.padState.axes[k.name] = { x: 0, y: 0 }) });
    Object.keys(mapping.buttonAxes).forEach(k => { !this.padState.axes[mapping.buttonAxes[k].name] && (this.padState.axes[mapping.buttonAxes[k].name] = { x: 0, y: 0 }) });
    this.mapping = mapping;

    this.props.onConnect({index: this.props.index, id: gamepad.id});

    window.requestAnimationFrame(this.updateGamepadBound)
  }

  disconnected(gamepad) {
    console.log("Disconnected " + this.mapping.name);

    this.padState.connected = false;
    this.padState.buttons = {};
    this.padState.axes = {};

    this.props.onDisconnect({index: this.props.index, id: gamepad.id});
  }

  componentDidMount() {
    this.mounted = true
    let gamePadIndex = this.props.index;

    const gamepads = navigator.getGamepads();

    if (gamepads.length && gamepads.length > gamePadIndex && gamepads[gamePadIndex]) {
      this.connected(gamepads[gamePadIndex]);
    }

    window.addEventListener("gamepadconnected", (e: GamepadEvent) => {
      let gp = e.gamepad;
      if (gp.index == gamePadIndex) {
        this.connected(gp);
      }
    });

    window.addEventListener("gamepaddisconnected", (e: GamepadEvent) => {
      let gp = e.gamepad;
      if (gp.index == gamePadIndex) {
        this.disconnected(gp);
      }
    });

  }

  componentWillUnmount() {
    this.mounted = false
  }

  updateGamepad() {
    if (!this.mounted || !this.padState.connected) return;

    let gamePadIndex = this.props.index;
    const gamepads = navigator.getGamepads();

    if (gamepads.length && gamepads.length > gamePadIndex && gamepads[gamePadIndex]) {
      let gamepad = gamepads[gamePadIndex];
      this.updateAllButtons(gamepad)
      this.updateAllAxis(gamepad)
      this.setState(this.padState);
    }

    window.requestAnimationFrame(this.updateGamepadBound)
  }

  updateAllButtons(gamepad) {
    for (let i = 0; i < gamepad.buttons.length; ++i) {
      let pressed = gamepad.buttons[i].pressed
      let value = gamepad.buttons[i].value

      let buttonName = this.mapping.buttons[i];

      if (this.mapping.buttonAxes[buttonName]) {
        this.updateAxis(this.mapping.buttonAxes[buttonName].name, this.mapping.buttonAxes[buttonName].dimension, value, buttonName)
      }

      this.updateButton(buttonName, pressed)
    }
  }

  updateButton(buttonName, pressed) {
    if (this.padState.buttons[buttonName] === undefined) {
      console.error(`Unknown button ${buttonName}`)
    } else if (this.padState.buttons[buttonName] !== pressed) {
      this.padState.buttons[buttonName] = pressed
      this.props.onButton(buttonName, pressed)
    }
  }

  updateAllAxis(gamepad) {
    for (let i = 0; i < gamepad.axes.length; ++i) {

      let axis = this.mapping.axes[i];

      const value = gamepad.axes[i];

      this.updateAxis(axis.name, axis.dimension, value, null);

    }
  }

  updateAxis(axisName, dimension, rawValue, srcButton) {
    //if (axisName == "dpad" && rawValue !== 0) debugger;
    if (axisName && rawValue !== undefined && rawValue !== null && rawValue !== NaN) {

      const invert = axisName[0] === '-'

      let value = rawValue * (invert ? -1 : 1)

      if (invert) axisName = axisName.substr(1)

      if (Math.abs(value) < this.props.deadZone) {
        value = 0
      }


      if (srcButton && (this.padState.axes[axisName][dimension] !== value && ((value !== 0) || this.padState.buttons[srcButton])) ||
        (!srcButton && (this.padState.axes[axisName][dimension] !== value))) {
        const previousValue = this.padState.axes[axisName][dimension]
        this.padState.axes[axisName][dimension] = value
        

        this.props.onAxis(axisName, dimension, value, previousValue)
      }
    }
  }

  render() {
    return React.cloneElement(React.Children.only(this.props.children), { padState: this.padState });
    }
}
