
import React from 'react';
import { connect } from 'react-redux';

import './Chronometer.css';

const mapStateToProps = state => ({
  timeStart: state.game.timeStart
});
class Chronometer extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      startTS: null,
      diff: null,
      suspended: 0,
      interval: null
    }

    
    this.tick = this.tick.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount(){
    this.start();
  }

  componentWillUnmount(){
    this.stop();
  }

  getInitialState(){
    return {
      startTS: null,
      diff: null,
      suspended: 0,
      interval: null
    }
  }

  start(){
    const { timeStart } = this.props;

    if (this.state.startTS) {
      // prevent multi clicks on start
      return;
    }

    this.setState({
      startTS:  timeStart - this.state.suspended,
      interval: requestAnimationFrame(this.tick),
      suspended: 0
    });
  }

  stop(){
    cancelAnimationFrame(this.state.interval);

    this.setState({
      startTS: null,
      suspended: +this.state.diff
    });
  }

  reset(){
    cancelAnimationFrame(this.state.interval);
    this.setState(this.getInitialState());
  }

  tick(){
    this.setState({
      diff: new Date(+new Date() - this.state.startTS),
      interval: requestAnimationFrame(this.tick)
    });
  }

  addZero(n){
    return n < 10 ? '0' + n : n;
  }

  render(){
    const { diff } = this.state;
    
    let seconds = diff ? diff.getSeconds() : 0;
    let minutes = diff ? diff.getMinutes() : 0;

    minutes = this.addZero(minutes);
    seconds = this.addZero(seconds);

    return (
      <div className="wrapperChrono">
        <p className="chrono">
          {`${minutes}:${seconds}`}
        </p>
      </div>
      
    )
  }

};

export default connect(mapStateToProps)(Chronometer);