# BeStyled Gamepad

A HTML5 gamepad component for React with responsive preview.

The buttons light up as they are pressed, and can be picked up in the Mobx/Redux store.

Supports any HTML connected gamepad with standard mappings.

For example, use a wired XBox One Controller on a Mac and Chrome with [360Controller](https://github.com/360Controller/360Controller/releases)

## Example

![Xbox One Controller](https://github.com/headlightstudios/bestyled-gamepad/raw/master/demo.png "Responsive Preview")]

## Usage

```js
render() {
    return (
        <Panel>
             <GamepadDisplay />
        </Panel>
    );
  }
 ```

## To Do

* Standard Events and Mappings
* Extract to dist folder and publish as npm package

## License

Apache 2.0