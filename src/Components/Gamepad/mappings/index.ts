// Mappings adapted from html5-gamepad
// Portions Copyright (c) 2016 Eric Lathrop under MIT License

import xbox360_chrome_windows_osx from "./xbox360_chrome_windows_osx";
import xbone_chrome_windows_osx from "./xbone_chrome_windows_osx";
import logitechf310_directinput_chrome_windows_osx from "./logitechf310_directinput_chrome_windows_osx";
import ps4_chrome_windows_osx from "./ps4_chrome_windows_osx";

export type MappingProps = {
  axes: { name: string, dimension: string }[],
  buttons: string[],
  buttonAxes: object,
  name: string,
  supported: { browser: string, os: string, id: string }[]
}

const mappings: MappingProps[] = [
  xbox360_chrome_windows_osx,
  xbone_chrome_windows_osx
];

export default function detectMapping(gamepad: Gamepad): MappingProps {
  var id = gamepad.id;
  var browser = navigator.userAgent;
  for (var i = 0; i < mappings.length; i++) {
    if (isCompatible(mappings[i], id, browser)) {
      return clone(mappings[i]);
    }
  }
  console.warn("no mapping found, using default for", id, "on", browser);
  return clone(mappings[0]);
};

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
  var layout = Object["assign"]({ /*indexToButton: {}, indexToAxis: {},  axisToButtonDirection: {} */ }, JSON.parse(JSON.stringify(obj)));

  /* Object.keys(layout.buttons).filter(k => "index" in layout.buttons[k]).forEach(k => { layout.indexToButton[layout.buttons[k].index] = k });

  Object.keys(layout.axes).filter(k => "index" in layout.axes[k]).forEach(k => { layout.indexToAxis[layout.axes[k].index] = k });

  Object.keys(layout.buttons).filter(k => "axis" in layout.buttons[k]).forEach(k => { 
    layout.axisToButtonDirection[layout.buttons[k].axis] = layout.axisToButtonDirection[layout.buttons[k].axis] || {};
    layout.axisToButtonDirection[layout.buttons[k].axis][layout.buttons[k].direction] = k;
  }); */

  return layout;
}