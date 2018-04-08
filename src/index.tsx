import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './ExampleApp';

import {injectGlobal} from 'styled-components';

injectGlobal`
body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
  `;

ReactDOM.render(<App />, document.getElementById('root'));
