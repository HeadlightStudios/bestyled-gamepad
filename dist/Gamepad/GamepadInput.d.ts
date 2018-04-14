/// <reference types="react" />
import * as React from 'react';
export declare type GamepadProps = {
    index?: number;
    stickThreshold?: number;
    deadZone?: number;
    onConnect?: (gamepad: {
        index: number;
        id: string;
    }) => void;
    onDisconnect?: (gamepad: {
        index: number;
        id: string;
    }) => void;
    onButton?: (name: string, pressed: boolean) => void;
    onAxis?: (axisName: string, dimension: string, value: number, previousValue: number) => void;
};
export declare class GamepadInput extends React.Component<GamepadProps, any> {
    private padState;
    private mounted;
    private mapping;
    private updateGamepadBound;
    static defaultProps: {
        stickThreshold: number;
        deadZone: number;
        preview: boolean;
        gamepadIndex: number;
        onConnect: () => void;
        onDisconnect: () => void;
        onButton: () => void;
        onAxis: () => void;
    };
    constructor(props: any, context: any);
    connected(gamepad: Gamepad): void;
    disconnected(gamepad: any): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    updateGamepad(): void;
    updateAllButtons(gamepad: any): void;
    updateButton(buttonName: any, pressed: any): void;
    updateAllAxis(gamepad: any): void;
    updateAxis(axisName: any, dimension: any, rawValue: any, srcButton: any): void;
    render(): React.ReactElement<any>;
}
