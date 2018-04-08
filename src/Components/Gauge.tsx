import * as React from 'react'
import { Gauge as GaugeJS } from 'gaugeJS'

export class Gauge extends React.Component<{value: number}> {
  componentDidMount() {
    this.updateCanvas()
  }
  componentDidUpdate() {
    this.updateCanvas()
  }
  updateCanvas() {
    const opts = {
      angle: 0.15, /// The span of the gauge arc
      lineWidth: 0.44, // The line thickness
      renderTicks: {
        divisions: 5,
        divWidth: 1.1,
        divLength: 0.7,
        divColor: "#333333",
        subDivisions: 5,
        subLength: 0.5,
        subWidth: 0.6,
        subColor: "#666666"
      },
      pointer: {
        length: 0.9, // Relative to gauge radius
        strokeWidth: 0.035 // The thickness
      },
      colorStart: '#6FADCF',   // Colors
      colorStop: '#8FC0DA',    // just experiment with them
      strokeColor: '#E0E0E0'   // to see which ones work best for you
    }
    const gauge = new GaugeJS(this.refs.canvas).setOptions(opts);
    gauge.set(20);
    setTimeout(() => gauge.set(this.props.value), 100)
  }
  render() {
    return (
      <canvas ref='canvas'></canvas>
    )
  }
}

export default Gauge;