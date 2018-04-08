import * as React from 'react';
import styled, { StyledComponentClass } from 'styled-components';

export const Panel = styled.div`
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

export const PanelRow = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 100vh;
`
