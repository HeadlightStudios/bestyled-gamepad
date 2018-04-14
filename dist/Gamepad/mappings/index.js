"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xbox360_chrome_windows_osx_1 = require("./xbox360_chrome_windows_osx");
var xbone_chrome_windows_osx_1 = require("./xbone_chrome_windows_osx");
var mappings = [
    xbox360_chrome_windows_osx_1.default,
    xbone_chrome_windows_osx_1.default
];
function detectMapping(gamepad) {
    var id = gamepad.id;
    var browser = navigator.userAgent;
    for (var i = 0; i < mappings.length; i++) {
        if (isCompatible(mappings[i], id, browser)) {
            return clone(mappings[i]);
        }
    }
    console.warn("no mapping found, using default for", id, "on", browser);
    return clone(mappings[0]);
}
exports.default = detectMapping;
;
function isCompatible(mapping, id, browser) {
    for (var i = 0; i < mapping.supported.length; i++) {
        var supported = mapping.supported[i];
        if (id.indexOf(supported.id) !== -1
            && browser.indexOf(supported.os) !== -1
            && browser.indexOf(browser) !== -1) {
            return true;
        }
    }
    return false;
}
function clone(obj) {
    var layout = Object["assign"]({}, JSON.parse(JSON.stringify(obj)));
    return layout;
}
