
import PxLoader from './lib/PxLoader';
import PxGamepad from './lib/PxGamepad';

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

export class GamepadDisplay extends React.Component {
    private gamepad = null;
    private gamepadCanvasElement: HTMLCanvasElement = null;
    private gamepadRenderingContext: CanvasRenderingContext2D = null;
    private canvasDidMountBound: (canvas: HTMLCanvasElement) => void;
    private updateAnimationBound: () => void;
    private mounted = false;
    spriteimage = null;

    constructor(props) {
        super(props);
        this.canvasDidMountBound = this.canvasDidMount.bind(this);
        this.updateAnimationBound = this.updateAnimation.bind(this);
    }

    canvasDidMount(canvas: HTMLCanvasElement) {
        if (!canvas) return;
        this.gamepadCanvasElement = canvas;
        this.gamepad = new PxGamepad();
        this.gamepad.start();

        this.gamepadCanvasElement.width = canvasSize.w;
        this.gamepadCanvasElement.height = canvasSize.h;
        this.gamepadRenderingContext = this.gamepadCanvasElement.getContext("2d");
        var pxloader = new PxLoader();
        this.spriteimage = pxloader.addImage("./gamepadSprite.png");
        pxloader.addCompletionListener(() => {
            window.requestAnimationFrame(this.updateAnimationBound)
        });
        pxloader.start();
    }

    componentDidMount() {
        this.mounted = true;
    }

    updateAnimation() {
        if (!this.mounted) return;

        this.gamepad.update();
        this.gamepadRenderingContext.clearRect(0, 0, canvasSize.w, canvasSize.h);
        this.gamepadRenderingContext.drawImage(this.spriteimage, 0, 0, canvasSize.w, canvasSize.h, 0, 0, canvasSize.w, canvasSize.h);

        Object.keys(buttonLayouts).forEach(key => {
            let buttonlayout = buttonLayouts[key];
            var button = !!this.gamepad.buttons[key],
                buttonlayoutinactive = buttonlayout.inactive;
            (!button || buttonlayout.opacity) && this.gamepadRenderingContext.drawImage(this.spriteimage, buttonlayoutinactive.x, buttonlayoutinactive.y, buttonlayout.w, buttonlayout.h, buttonlayout.x, buttonlayout.y, buttonlayout.w, buttonlayout.h);
            button && (buttonlayoutinactive = buttonlayout.active, this.gamepadRenderingContext.drawImage(this.spriteimage, buttonlayoutinactive.x, buttonlayoutinactive.y, buttonlayout.w, buttonlayout.h, buttonlayout.x, buttonlayout.y, buttonlayout.w, buttonlayout.h))
        });

        Object.keys(axisLayouts).forEach(key => {
            let axislayout = axisLayouts[key];

            var button = !!this.gamepad.buttons[key],
                e = button ? axislayout.active : axislayout.inactive,
                h = this.gamepad[key];
            this.gamepadRenderingContext.drawImage(this.spriteimage, e.x, e.y, axislayout.w, axislayout.h, axislayout.x + h.x * axislayout.travel, axislayout.y + h.y * axislayout.travel, axislayout.w, axislayout.h)
        })

        window.requestAnimationFrame(this.updateAnimationBound)
    }

    render() {
        return (
            <GamepadContainer>
                <GamepadCanvas innerRef={this.canvasDidMountBound} />
            </GamepadContainer>
        );
    }
}

const canvasSize = {
    w: 1040,
    h: 815
};

const buttonLayouts = {
    a: {
        x: 745,
        y: 242,
        w: 79,
        h: 79,
        inactive: {
            x: 1217,
            y: 643
        },
        active: {
            x: 1062,
            y: 643
        }
    },
    b: {
        x: 820,
        y: 175,
        w: 79,
        h: 79,
        inactive: {
            x: 1140,
            y: 800
        },
        active: {
            x: 1141,
            y: 725
        }
    },
    x: {
        x: 678,
        y: 176,
        w: 79,
        h: 79,
        inactive: {
            x: 1220,
            y: 725
        },
        active: {
            x: 1065,
            y: 801
        }
    },
    y: {
        x: 745,
        y: 105,
        w: 79,
        h: 79,
        inactive: {
            x: 1140,
            y: 645
        },
        active: {
            x: 1062,
            y: 721
        }
    },
    leftTop: {
        x: 144,
        y: 0,
        w: 245,
        h: 90,
        inactive: {
            x: 613,
            y: 818
        },
        active: {
            x: 1062,
            y: 94
        }
    },
    rightTop: {
        x: 645,
        y: 0,
        w: 245,
        h: 90,
        inactive: {
            x: 1056,
            y: 0
        },
        active: {
            x: 1056,
            y: 188
        }
    },
    select: {
        x: 414,
        y: 183,
        w: 54,
        h: 54,
        inactive: {
            x: 1241,
            y: 552
        },
        active: {
            x: 1244,
            y: 460
        }
    },
    start: {
        x: 569,
        y: 183,
        w: 54,
        h: 54,
        inactive: {
            x: 1245,
            y: 370
        },
        active: {
            x: 1247,
            y: 278
        }
    },
    dpadUp: {
        x: 352,
        y: 290,
        w: 70,
        h: 87,
        inactive: {
            x: 1074,
            y: 557
        },
        active: {
            x: 1166,
            y: 557
        },
        opacity: !0
    },
    dpadDown: {
        x: 351,
        y: 369,
        w: 70,
        h: 87,
        inactive: {
            x: 1074,
            y: 366
        },
        active: {
            x: 1165,
            y: 366
        },
        opacity: !0
    },
    dpadLeft: {
        x: 298,
        y: 342,
        w: 87,
        h: 70,
        inactive: {
            x: 1066,
            y: 475
        },
        active: {
            x: 1158,
            y: 475
        },
        opacity: !0
    },
    dpadRight: {
        x: 383,
        y: 342,
        w: 87,
        h: 70,
        inactive: {
            x: 1062,
            y: 292
        },
        active: {
            x: 1156,
            y: 292
        },
        opacity: !0
    }
}

const axisLayouts = {
    leftStick: {
        x: 185,
        y: 134,
        w: 150,
        h: 150,
        travel: 20,
        inactive: {
            x: 464,
            y: 816
        },
        active: {
            x: 310,
            y: 813
        }
    },
    rightStick: {
        x: 581,
        y: 290,
        w: 150,
        h: 150,
        travel: 20,
        inactive: {
            x: 464,
            y: 816
        },
        active: {
            x: 310,
            y: 813
        }
    }
};

export default GamepadDisplay;