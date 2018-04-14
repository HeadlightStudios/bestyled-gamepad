"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    axes: [
        { name: "leftStick", dimension: "x" },
        { name: "leftStick", dimension: "y" },
        { name: "rightStick", dimension: "x" },
        { name: "rightStick", dimension: "y" }
    ],
    buttons: [
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
        'dpadRight',
        'home'
    ],
    buttonAxes: {
        "leftTrigger": { name: "leftTrigger", dimension: "y" },
        "rightTrigger": { name: "rightTrigger", dimension: "y" },
        "dpadUp": { name: "dpad", dimension: "y" },
        "dpadDown": { name: "-dpad", dimension: "y" },
        "dpadLeft": { name: "-dpad", dimension: "x" },
        "dpadRight": { name: "dpad", dimension: "x" }
    },
    "name": "Xbox One Chrome OSX Windows",
    "supported": [
        {
            "browser": "Chrome",
            "id": "Wireless Controller (STANDARD GAMEPAD Vendor: 045e Product: 02d1)",
            "os": "Windows NT"
        },
        {
            "browser": "Chrome",
            "id": "Xbox One Controller (STANDARD GAMEPAD Vendor: 045e Product: 02d1)",
            "os": "Mac OS X"
        },
        {
            "browser": "Chrome",
            "id": "Xbox One Wired Controller (STANDARD GAMEPAD Vendor: 045e Product: 02d1)",
            "os": "Mac OS X"
        },
    ]
};
