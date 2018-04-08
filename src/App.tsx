

import * as React from 'react';
import styled from 'styled-components';

import { GamepadDisplay } from './Components/Gamepad/GamepadDisplay';
import { Gauge } from './Components/Gauge';

var Center = styled.div`
text-align: center;
`

var Panel = styled.div`
background-color: white;
min-height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
font-size: calc(10px + 2vmin);
color: black;
margin: auto;
max-width: 100vh;
`

var PanelRow = styled.div`
display: flex;
flex-direction: row;
max-width: 100vh;
`

class App extends React.Component {
  render() {
    return (
      <Center>
        <Panel>
             <GamepadDisplay />
             <PanelRow><Gauge value={0} /><Gauge value={0}/></PanelRow>
        </Panel>
      </Center>
    );
  }
}

export default App;
