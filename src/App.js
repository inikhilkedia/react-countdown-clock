import React from "react";
import logo from "./logo.jpeg";
import "./App.css";
import Clock from "./Clock";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      currentFormat: "HH:MM:SS",
      countdown: false,
      seconds: 0
    };
  }

  handleChange = event => {
    this.setState({ seconds: event.target.value });
  };
  changeFormat = event => {
    if (event.target.className !== this.state.currentFormat) {
      this.setState({ currentFormat: event.target.className });
    }
  };

  handleStart = () => {
    if (!this.state.countdown) {
      console.log("Disabled - Timer Started");
      this.setState({ countdown: true });
      this.child.current.startTimer();
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>React Countdown Clock</h1>
        </header>
        <div className="App-body">
          <div className="seconds-container">
            <h1>Enter Second(s): </h1>
            <input
              type="number"
              className="seconds"
              disabled={this.state.countdown}
              value={this.state.seconds}
              onChange={this.handleChange}
            />
          </div>
          <div className="formats-container">
            <h1 className="formats">Formats: </h1>
            <label className="defaultFormat">
              <button
                type="button"
                className="HH:MM:SS"
                onClick={this.changeFormat}
              >
                HH:MM:SS*
              </button>
              *default
            </label>
            <button
              type="button"
              className="HH-MM:SS"
              onClick={this.changeFormat}
            >
              HH-MM:SS
            </button>
            <button
              type="button"
              className="HH:MM-SS"
              onClick={this.changeFormat}
            >
              HH:MM-SS
            </button>
          </div>
          <div className="controls">
            <button
              className="startButton"
              onClick={this.handleStart}
              disabled={this.state.countdown}
            >
              START
            </button>
          </div>
          <Clock
            ref={this.child}
            seconds={this.state.seconds}
            format={this.state.currentFormat}
            countdown={this.state.countdown}
          />
        </div>
      </div>
    );
  }
}
