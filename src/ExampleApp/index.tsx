import * as React from 'react';

import { GamepadInput as Gamepad, GamepadPreview } from '../Components';
import { Gauge } from './ComponentsForExample/Gauge';
import { Panel, PanelRow } from './ComponentsForExample/Layout';

class App extends React.Component<any, any> {

  constructor(props, context) {
    super(props, context);
    this.state = {
      connected: false,
      leftMotor: 0,
      rightMotor: 0
    };
  }

  /** Optional callback invoked when controller is connected;  may have to press any button to get the first connection registered */
  connectHandler(gamepad: { index: number, id: string }) {
    console.log(`Gamepad ${gamepad.id} connected!`)
    this.setState({
      connected: true
    })
  }

  /** Optional callback invoked when controller is disconnected */
  disconnectHandler(gamepad: { index: number, id: string }) {
    console.log(`Gamepad ${gamepad.id} disconnected !`)

    this.setState({
      connected: false
    })
  }

  /** Option callback invoked whenever a controller stick or variable trigger changes */
  onAxisValue(axisName: string, dimension: string, value: number, previousValue: number) {
    switch (axisName) {
      case "leftTrigger":
        this.setState({ leftMotor: value * 100 })
        break;
      case "rightTrigger":
        this.setState({ rightMotor: value * 100 })
        break;
      default:
      // no op
    }

  }

  /** Option callback invoked whenever a controller button is pressed or released */
  onButton(button: string, pressed: boolean) {
    if (pressed) console.log(button);
  }

  /** Main render method */
  render() {


    return (
      <Panel>
        <Gamepad index={0}
          onConnect={this.connectHandler.bind(this)}
          onDisconnect={this.disconnectHandler.bind(this)}
          onAxis={this.onAxisValue.bind(this)}
          onButton={this.onButton.bind(this)} >
          <GamepadPreview src="http://res.cloudinary.com/headlight/image/upload/v1523206548/gamepadSprite.png"/>
        </Gamepad>
        {this.state.connected &&
          <PanelRow>
            <Gauge value={this.state.leftMotor} />
            <Gauge value={this.state.rightMotor} />
          </PanelRow>}
      </Panel>
    );
  }
}

export default App;