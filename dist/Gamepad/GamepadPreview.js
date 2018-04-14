"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var PxLoader_1 = require("./lib/PxLoader");
var layouts_1 = require("./layouts");
var React = require("react");
var styled_components_1 = require("styled-components");
var GamepadContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n    position: relative;\n    width: 100%;\n    padding-bottom: 78.37%;\n"], ["\n    position: relative;\n    width: 100%;\n    padding-bottom: 78.37%;\n"])));
var GamepadCanvas = styled_components_1.default.canvas(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n"], ["\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n"])));
var GamepadPreview = (function (_super) {
    tslib_1.__extends(GamepadPreview, _super);
    function GamepadPreview(props) {
        var _this = _super.call(this, props) || this;
        _this.gamepadCanvasElement = null;
        _this.gamepadRenderingContext = null;
        _this.mounted = false;
        _this.spriteimage = null;
        _this.canvasDidMountBound = _this.canvasDidMount.bind(_this);
        _this.updateAnimationBound = _this.updateAnimation.bind(_this);
        _this.layout = _this.props.layout || layouts_1.xboxOne;
        return _this;
    }
    GamepadPreview.prototype.canvasDidMount = function (canvas) {
        var _this = this;
        if (!canvas)
            return;
        this.gamepadCanvasElement = canvas;
        this.gamepadCanvasElement.width = this.layout.size.w;
        this.gamepadCanvasElement.height = this.layout.size.h;
        this.gamepadRenderingContext = this.gamepadCanvasElement.getContext("2d");
        var pxloader = new PxLoader_1.default();
        this.spriteimage = pxloader.addImage(this.props.src || this.layout.src);
        pxloader.addCompletionListener(function () {
            window.requestAnimationFrame(_this.updateAnimationBound);
        });
        pxloader.start();
    };
    GamepadPreview.prototype.componentDidMount = function () {
        this.mounted = true;
        window.requestAnimationFrame(this.updateAnimationBound);
    };
    GamepadPreview.prototype.componentDidUpdate = function (prevProps, prevState) {
        window.requestAnimationFrame(this.updateAnimationBound);
    };
    GamepadPreview.prototype.updateAnimation = function () {
        var _this = this;
        if (!this.mounted || !this.props.padState.connected)
            return;
        var padState = this.props.padState;
        var canvasSize = this.layout.size;
        this.gamepadRenderingContext.clearRect(0, 0, canvasSize.w, canvasSize.h);
        this.gamepadRenderingContext.drawImage(this.spriteimage, 0, 0, canvasSize.w, canvasSize.h, 0, 0, canvasSize.w, canvasSize.h);
        Object.keys(this.layout.button).forEach(function (key) {
            var buttonlayout = _this.layout.button[key];
            var button = !!padState.buttons[key], buttonlayoutinactive = buttonlayout.inactive;
            (!button || buttonlayout.opacity) && _this.gamepadRenderingContext.drawImage(_this.spriteimage, buttonlayoutinactive.x, buttonlayoutinactive.y, buttonlayout.w, buttonlayout.h, buttonlayout.x, buttonlayout.y, buttonlayout.w, buttonlayout.h);
            button && (buttonlayoutinactive = buttonlayout.active, _this.gamepadRenderingContext.drawImage(_this.spriteimage, buttonlayoutinactive.x, buttonlayoutinactive.y, buttonlayout.w, buttonlayout.h, buttonlayout.x, buttonlayout.y, buttonlayout.w, buttonlayout.h));
        });
        Object.keys(this.layout.axis).forEach(function (key) {
            var axislayout = _this.layout.axis[key];
            var button = !!padState.buttons[key], spriteSourcePosition = button ? axislayout.active : axislayout.inactive, axisValue = padState.axes[key];
            _this.gamepadRenderingContext.drawImage(_this.spriteimage, spriteSourcePosition.x, spriteSourcePosition.y, axislayout.w, axislayout.h, axislayout.x + axisValue.x * axislayout.travel, axislayout.y + axisValue.y * axislayout.travel, axislayout.w, axislayout.h);
        });
    };
    GamepadPreview.prototype.render = function () {
        return (React.createElement(GamepadContainer, null, this.props.padState.connected ? React.createElement(GamepadCanvas, { innerRef: this.canvasDidMountBound }) : React.createElement("h2", null, "Press any button on a connected controller to begin")));
    };
    GamepadPreview.defaultProps = {
        layout: layouts_1.xboxOne,
        padState: {
            connected: false,
            buttons: {},
            axes: {}
        }
    };
    return GamepadPreview;
}(React.Component));
exports.GamepadPreview = GamepadPreview;
var templateObject_1, templateObject_2;
