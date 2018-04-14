/// <reference types="react" />
import { LayoutProps } from './layouts';
import * as React from 'react';
export declare type GamepadPreviewProps = {
    layout?: LayoutProps;
    src?: string;
    padState?: {
        connected: boolean;
        buttons: object;
        axes: object;
    };
};
export declare class GamepadPreview extends React.Component<GamepadPreviewProps> {
    private gamepadCanvasElement;
    private gamepadRenderingContext;
    private canvasDidMountBound;
    private updateAnimationBound;
    private mounted;
    private layout;
    spriteimage: any;
    static defaultProps: {
        layout: {
            src: string;
            size: {
                w: number;
                h: number;
            };
            button: {
                a: {
                    x: number;
                    y: number;
                    w: number;
                    h: number;
                    inactive: {
                        x: number;
                        y: number;
                    };
                    active: {
                        x: number;
                        y: number;
                    };
                };
                b: {
                    x: number;
                    y: number;
                    w: number;
                    h: number;
                    inactive: {
                        x: number;
                        y: number;
                    };
                    active: {
                        x: number;
                        y: number;
                    };
                };
                x: {
                    x: number;
                    y: number;
                    w: number;
                    h: number;
                    inactive: {
                        x: number;
                        y: number;
                    };
                    active: {
                        x: number;
                        y: number;
                    };
                };
                y: {
                    x: number;
                    y: number;
                    w: number;
                    h: number;
                    inactive: {
                        x: number;
                        y: number;
                    };
                    active: {
                        x: number;
                        y: number;
                    };
                };
                leftTop: {
                    x: number;
                    y: number;
                    w: number;
                    h: number;
                    inactive: {
                        x: number;
                        y: number;
                    };
                    active: {
                        x: number;
                        y: number;
                    };
                };
                rightTop: {
                    x: number;
                    y: number;
                    w: number;
                    h: number;
                    inactive: {
                        x: number;
                        y: number;
                    };
                    active: {
                        x: number;
                        y: number;
                    };
                };
                select: {
                    x: number;
                    y: number;
                    w: number;
                    h: number;
                    inactive: {
                        x: number;
                        y: number;
                    };
                    active: {
                        x: number;
                        y: number;
                    };
                };
                start: {
                    x: number;
                    y: number;
                    w: number;
                    h: number;
                    inactive: {
                        x: number;
                        y: number;
                    };
                    active: {
                        x: number;
                        y: number;
                    };
                };
                dpadUp: {
                    x: number;
                    y: number;
                    w: number;
                    h: number;
                    inactive: {
                        x: number;
                        y: number;
                    };
                    active: {
                        x: number;
                        y: number;
                    };
                    opacity: boolean;
                };
                dpadDown: {
                    x: number;
                    y: number;
                    w: number;
                    h: number;
                    inactive: {
                        x: number;
                        y: number;
                    };
                    active: {
                        x: number;
                        y: number;
                    };
                    opacity: boolean;
                };
                dpadLeft: {
                    x: number;
                    y: number;
                    w: number;
                    h: number;
                    inactive: {
                        x: number;
                        y: number;
                    };
                    active: {
                        x: number;
                        y: number;
                    };
                    opacity: boolean;
                };
                dpadRight: {
                    x: number;
                    y: number;
                    w: number;
                    h: number;
                    inactive: {
                        x: number;
                        y: number;
                    };
                    active: {
                        x: number;
                        y: number;
                    };
                    opacity: boolean;
                };
            };
            axis: {
                leftStick: {
                    x: number;
                    y: number;
                    w: number;
                    h: number;
                    travel: number;
                    inactive: {
                        x: number;
                        y: number;
                    };
                    active: {
                        x: number;
                        y: number;
                    };
                };
                rightStick: {
                    x: number;
                    y: number;
                    w: number;
                    h: number;
                    travel: number;
                    inactive: {
                        x: number;
                        y: number;
                    };
                    active: {
                        x: number;
                        y: number;
                    };
                };
            };
        };
        padState: {
            connected: boolean;
            buttons: {};
            axes: {};
        };
    };
    constructor(props: any);
    canvasDidMount(canvas: HTMLCanvasElement): void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: any, prevState: any): void;
    updateAnimation(): void;
    render(): JSX.Element;
}
