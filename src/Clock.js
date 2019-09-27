import React from "react";

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: {}, seconds: 1 };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.startTimer.bind(this);
  }

  componentDidMount() {
    console.log("Mounted", this.state, this.props);
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });

    if (this.state.seconds === this.props.seconds) {
      this.startTimer();
    }
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));
    console.log("Hours", hours);
    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);
    console.log("Minutes", minutes);
    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);
    console.log("Seconds", seconds);
    return {
      h: hours,
      m: minutes,
      s: seconds
    };
  }

  startTimer() {
    console.log("startTimer Begin");
    this.setState({ seconds: this.props.seconds });
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(() => {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
          time: this.secondsToTime(seconds),
          seconds: seconds
        });

        // Check if we're at zero.
        if (seconds === 0) {
          clearInterval(this.timer);
        }
      }, 1000);
    }
    console.log("startTimer End");
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  render() {
    const format1 = (
      <h1>
        {this.state.time.h} : {this.state.time.m} : {this.state.time.s}
      </h1>
    );
    const format2 = (
      <h1>
        {this.state.time.h} - {this.state.time.m} : {this.state.time.s}
      </h1>
    );
    const format3 = (
      <h1>
        {this.state.time.h} : {this.state.time.m} - {this.state.time.s}
      </h1>
    );
    if (this.props.format === "HH:MM:SS") {
      return format1;
    }
    if (this.props.format === "HH-MM:SS") {
      return format2;
    }
    if (this.props.format === "HH:MM-SS") {
      return format3;
    }
    return format1;
  }
}
