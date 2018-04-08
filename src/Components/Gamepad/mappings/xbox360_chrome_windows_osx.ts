export default {
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
  name: "Xbox 360 Chrome Windows/OSX",
  supported: [
    {
      "browser": "Chrome",
      "id": "Xbox 360 Controller (STANDARD GAMEPAD Vendor: 028e Product: 045e)",
      "os": "Mac OS X"
    },
    {
      "browser": "Chrome",
      "id": "Xbox 360 Controller (XInput STANDARD GAMEPAD)",
      "os": "Windows NT"
    }
  ]
}
