
import PxLoader from './lib/PxLoader';
import { xboxOne as defaultLayout, LayoutProps } from './layouts'

import * as React from 'react';

import styled from 'styled-components';

const GamepadContainer = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 78.37%;
`

const GamepadCanvas = styled.canvas`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
`

export type GamepadPreviewProps = {
    layout?: LayoutProps,
    padState?: {
      connected: boolean,
      buttons: object,
      axes: object
    }
}

export class GamepadPreview extends React.Component<GamepadPreviewProps> {
    private gamepadCanvasElement: HTMLCanvasElement = null;
    private gamepadRenderingContext: CanvasRenderingContext2D = null;
    private canvasDidMountBound: (canvas: HTMLCanvasElement) => void;
    private updateAnimationBound: () => void;
    private mounted = false;
    private layout: LayoutProps ;
    spriteimage = null;

    static defaultProps = {
        layout: defaultLayout,
        padState: {
            connected: false,
            buttons: {},
            axes: {}
          }
      }
    

    constructor(props) {
        super(props);
        this.canvasDidMountBound = this.canvasDidMount.bind(this);
        this.updateAnimationBound = this.updateAnimation.bind(this);
        this.layout = this.props.layout || defaultLayout;
    }

    canvasDidMount(canvas: HTMLCanvasElement) {
        if (!canvas) return;
    
        this.gamepadCanvasElement = canvas;
        this.gamepadCanvasElement.width = this.layout.size.w;
        this.gamepadCanvasElement.height = this.layout.size.h;
        this.gamepadRenderingContext = this.gamepadCanvasElement.getContext("2d");
        var pxloader = new PxLoader();
        this.spriteimage = pxloader.addImage(this.layout.src);
        pxloader.addCompletionListener(() => {
            window.requestAnimationFrame(this.updateAnimationBound)
        });
        pxloader.start();
    }

    componentDidMount() {
        this.mounted = true;
        window.requestAnimationFrame(this.updateAnimationBound);
    }

    componentDidUpdate(prevProps, prevState) {
        window.requestAnimationFrame(this.updateAnimationBound);
    }

    updateAnimation() {
        if (!this.mounted || !this.props.padState.connected) return;

        let padState = this.props.padState;
        let canvasSize = this.layout.size;
       
        this.gamepadRenderingContext.clearRect(0, 0, canvasSize.w, canvasSize.h);
        this.gamepadRenderingContext.drawImage(this.spriteimage, 0, 0, canvasSize.w, canvasSize.h, 0, 0, canvasSize.w, canvasSize.h);

        Object.keys(this.layout.button).forEach(key => {
            let buttonlayout = this.layout.button[key];
            var button = !!padState.buttons[key],
                buttonlayoutinactive = buttonlayout.inactive;
            (!button || buttonlayout.opacity) && this.gamepadRenderingContext.drawImage(this.spriteimage, buttonlayoutinactive.x, buttonlayoutinactive.y, buttonlayout.w, buttonlayout.h, buttonlayout.x, buttonlayout.y, buttonlayout.w, buttonlayout.h);
            button && (buttonlayoutinactive = buttonlayout.active, this.gamepadRenderingContext.drawImage(this.spriteimage, buttonlayoutinactive.x, buttonlayoutinactive.y, buttonlayout.w, buttonlayout.h, buttonlayout.x, buttonlayout.y, buttonlayout.w, buttonlayout.h))
        });

        Object.keys(this.layout.axis).forEach(key => {
            let axislayout = this.layout.axis[key];

            let button = !!padState.buttons[key],
                spriteSourcePosition = button ? axislayout.active : axislayout.inactive,
                axisValue = padState.axes[key];
            this.gamepadRenderingContext.drawImage(this.spriteimage, spriteSourcePosition.x, spriteSourcePosition.y, axislayout.w, axislayout.h, axislayout.x + axisValue.x * axislayout.travel, axislayout.y + axisValue.y * axislayout.travel, axislayout.w, axislayout.h)
        })
    }

    render() {
        return (
            <GamepadContainer>
                {this.props.padState.connected ? <GamepadCanvas innerRef={this.canvasDidMountBound} /> : <h2>Press any button on a connected controller to begin</h2>}
            </GamepadContainer>
        );
    }
}