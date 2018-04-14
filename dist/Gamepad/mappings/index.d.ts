export declare type MappingProps = {
    axes: {
        name: string;
        dimension: string;
    }[];
    buttons: string[];
    buttonAxes: object;
    name: string;
    supported: {
        browser: string;
        os: string;
        id: string;
    }[];
};
export default function detectMapping(gamepad: Gamepad): MappingProps;
