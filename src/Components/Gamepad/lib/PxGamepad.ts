/* 

PxGamepad
HTML5 gamepad helper for standard mapped controllers

Details: http://flightarcade.com/learn/gamepad

The MIT License (MIT)

Copyright (c) 2015 Pixel Lab
Removed JQuery, Portions Copyright (c) 2018 PxGamepad Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. 

*/

function PxGamepad() {

    // map button indices to names
    this.buttonNames = [
        'a',
        'b',
        'x',
        'y',
        'leftTop',
        'rightTop',
        'leftTrigger',
        'rightTrigger',
        'select',
        'start',
        'leftStick',
        'rightStick',
        'dpadUp',
        'dpadDown',
        'dpadLeft',
        'dpadRight'
    ];

    // callbacks for buton up listeners
    this.callbacks = {};

    // some browsers use an event to provide the gamepad when connected
    this.connectedGamepad = null;

    this.reset();
}

// reset button and stick state
PxGamepad.prototype.reset = function () {
    this.leftStick = { x: 0, y: 0 };
    this.rightStick = { x: 0, y: 0 };
    this.dpad = { x: 0, y: 0 };
    this.buttons = {};
};

// start listening for gamepad connection events
PxGamepad.prototype.start = function () {

    this.reset();

    window.addEventListener('gamepadconnected', (e: GamepadEvent) => {
        var gamepad = e.gamepad;
        if (gamepad.mapping === 'standard') {
            this.connectedGamepad = gamepad;
        };
    });

    window.addEventListener('gamepaddisconnected', (e: GamepadEvent) => {
        var gamepad = e.gamepad;
        if (this.connectedGamepad === gamepad) {
            this.connectedGamepad = null;
        }
    });
};

// stop listening to gamepad connection events
PxGamepad.prototype.stop = function () {

    // window.removeEventListeners()
    this.connectedGamepad = null;
};

// listen to button up events
PxGamepad.prototype.on = function (buttonName, callback) {
    var buttonCallbacks = this.callbacks[buttonName];
    if (!buttonCallbacks) {
        this.callbacks[buttonName] = [callback];
    } else {
        buttonCallbacks.push(callback);
    }
};

// remove button up event listeners
PxGamepad.prototype.off = function (buttonName, callback) {
    var buttonCallbacks = this.callbacks[buttonName];
    if (buttonCallbacks) {
        if (!callback) {
            // remove all callbacks
            this.callbacks = [];
        } else {
            // search for specified callback
            var callbackIndex = buttonCallbacks.indexOf(callback);
            if (callbackIndex >= 0) {
                buttonCallbacks.splice(callbackIndex, 1);
            }
        }
    }
};

function buttonPressed(gamepad, index) {

    if (!gamepad || !gamepad.buttons || index >= gamepad.buttons.length) {
        return false;
    }

    var b = gamepad.buttons[index];
    if (!b) {
        return false;
    }

    if (typeof (b) === "object") {
        return b.pressed;
    }

    return (b === 1.0);
}

// helper to retrieve the currently connected gamepad
PxGamepad.prototype.getGamepad = function () {

    // default to connected gamepad
    var gp = this.connectedGamepad;
    if (gp) {
        return gp;
    }

    // fetch all available gamepads
    var gamepads;
    if (navigator.getGamepads) {
        gamepads = navigator.getGamepads();
    } else if (navigator["webkitGetGamepads"]) {
        gamepads = navigator["webkitGetGamepads"]();
    }

    // look for a standard mapped gamepad
    if (gamepads) {
        for (var i = 0, len = gamepads.length; i < len; i++) {
            gp = gamepads[i];
            if (gp && gp.mapping === 'standard') {
                return gp;
            }
        }
    }

    return null;
};

// should be called during each frame update
PxGamepad.prototype.update = function () {

    // make sure we have a gamepad
    var gp = this.getGamepad();
    if (!gp) {
        return;
    }

    // check state of each of the buttons
    var i, len, name, wasDown, isDown;
    for (i = 0, len = this.buttonNames.length; i < len; i++) {

        name = this.buttonNames[i];
        wasDown = !!this.buttons[name];
        isDown = this.buttons[name] = buttonPressed(gp, i);

        if (wasDown && !isDown) {
            (this.callbacks[name] || []).forEach(callback =>  {
                if (callback) { callback(); }
            });
        }
    }

    // update the sticks
    this.leftStick.x = gp.axes[0];
    this.leftStick.y = gp.axes[1];
    this.rightStick.x = gp.axes[2];
    this.rightStick.y = gp.axes[3];

    // dpad isn't a true stick, infer from buttons
    this.dpad.x = (this.buttons.dpadLeft ? -1 : 0) + (this.buttons.dpadRight ? 1 : 0);
    this.dpad.y = (this.buttons.dpadUp ? -1 : 0) + (this.buttons.dpadDown ? 1 : 0);

};

export default PxGamepad;
