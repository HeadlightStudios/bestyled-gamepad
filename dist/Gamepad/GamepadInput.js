"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var index_1 = require("./mappings/index");
var GamepadInput = (function (_super) {
    tslib_1.__extends(GamepadInput, _super);
    function GamepadInput(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.padState = {
            connected: false,
            buttons: {},
            axes: {}
        };
        _this.updateGamepadBound = _this.updateGamepad.bind(_this);
        return _this;
    }
    GamepadInput.prototype.connected = function (gamepad) {
        var _this = this;
        var mapping = index_1.default(gamepad);
        this.padState.connected = true;
        this.padState.buttons = {};
        this.padState.axes = {};
        mapping.buttons.forEach(function (k) { _this.padState.buttons[k] = false; });
        mapping.axes.forEach(function (k) { !_this.padState.axes[k.name] && (_this.padState.axes[k.name] = { x: 0, y: 0 }); });
        Object.keys(mapping.buttonAxes).forEach(function (k) { !_this.padState.axes[mapping.buttonAxes[k].name] && (_this.padState.axes[mapping.buttonAxes[k].name] = { x: 0, y: 0 }); });
        this.mapping = mapping;
        this.props.onConnect({ index: this.props.index, id: gamepad.id });
        window.requestAnimationFrame(this.updateGamepadBound);
    };
    GamepadInput.prototype.disconnected = function (gamepad) {
        console.log("Disconnected " + this.mapping.name);
        this.padState.connected = false;
        this.padState.buttons = {};
        this.padState.axes = {};
        this.props.onDisconnect({ index: this.props.index, id: gamepad.id });
    };
    GamepadInput.prototype.componentDidMount = function () {
        var _this = this;
        this.mounted = true;
        var gamePadIndex = this.props.index;
        var gamepads = navigator.getGamepads();
        if (gamepads.length && gamepads.length > gamePadIndex && gamepads[gamePadIndex]) {
            this.connected(gamepads[gamePadIndex]);
        }
        window.addEventListener("gamepadconnected", function (e) {
            var gp = e.gamepad;
            if (gp.index == gamePadIndex) {
                _this.connected(gp);
            }
        });
        window.addEventListener("gamepaddisconnected", function (e) {
            var gp = e.gamepad;
            if (gp.index == gamePadIndex) {
                _this.disconnected(gp);
            }
        });
    };
    GamepadInput.prototype.componentWillUnmount = function () {
        this.mounted = false;
    };
    GamepadInput.prototype.updateGamepad = function () {
        if (!this.mounted || !this.padState.connected)
            return;
        var gamePadIndex = this.props.index;
        var gamepads = navigator.getGamepads();
        if (gamepads.length && gamepads.length > gamePadIndex && gamepads[gamePadIndex]) {
            var gamepad = gamepads[gamePadIndex];
            this.updateAllButtons(gamepad);
            this.updateAllAxis(gamepad);
            this.setState(this.padState);
        }
        window.requestAnimationFrame(this.updateGamepadBound);
    };
    GamepadInput.prototype.updateAllButtons = function (gamepad) {
        for (var i = 0; i < gamepad.buttons.length; ++i) {
            var pressed = gamepad.buttons[i].pressed;
            var value = gamepad.buttons[i].value;
            var buttonName = this.mapping.buttons[i];
            if (this.mapping.buttonAxes[buttonName]) {
                this.updateAxis(this.mapping.buttonAxes[buttonName].name, this.mapping.buttonAxes[buttonName].dimension, value, buttonName);
            }
            this.updateButton(buttonName, pressed);
        }
    };
    GamepadInput.prototype.updateButton = function (buttonName, pressed) {
        if (this.padState.buttons[buttonName] === undefined) {
            console.error("Unknown button " + buttonName);
        }
        else if (this.padState.buttons[buttonName] !== pressed) {
            this.padState.buttons[buttonName] = pressed;
            this.props.onButton(buttonName, pressed);
        }
    };
    GamepadInput.prototype.updateAllAxis = function (gamepad) {
        for (var i = 0; i < gamepad.axes.length; ++i) {
            var axis = this.mapping.axes[i];
            var value = gamepad.axes[i];
            this.updateAxis(axis.name, axis.dimension, value, null);
        }
    };
    GamepadInput.prototype.updateAxis = function (axisName, dimension, rawValue, srcButton) {
        if (axisName && rawValue !== undefined && rawValue !== null && rawValue !== NaN) {
            var invert = axisName[0] === '-';
            var value = rawValue * (invert ? -1 : 1);
            if (invert)
                axisName = axisName.substr(1);
            if (Math.abs(value) < this.props.deadZone) {
                value = 0;
            }
            if (srcButton && (this.padState.axes[axisName][dimension] !== value && ((value !== 0) || this.padState.buttons[srcButton])) ||
                (!srcButton && (this.padState.axes[axisName][dimension] !== value))) {
                var previousValue = this.padState.axes[axisName][dimension];
                this.padState.axes[axisName][dimension] = value;
                this.props.onAxis(axisName, dimension, value, previousValue);
            }
        }
    };
    GamepadInput.prototype.render = function () {
        return React.cloneElement(React.Children.only(this.props.children), { padState: this.padState });
    };
    GamepadInput.defaultProps = {
        stickThreshold: 0.5,
        deadZone: 0.08,
        preview: true,
        gamepadIndex: 0,
        onConnect: function () { },
        onDisconnect: function () { },
        onButton: function () { },
        onAxis: function () { },
    };
    return GamepadInput;
}(React.Component));
exports.GamepadInput = GamepadInput;
