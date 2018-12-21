import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCards } from './redux/Game/actions';
import Board from './components/Board/Board';
import Chronometer from './components/Chronometer/Chronometer';
import Score from './components/Score/Score';

import './App.css';

const pictoWin = require('./img/win.svg');

const mapDispatchToProps = dispatch => ({
  fetchCards: () => dispatch(fetchCards())
});

const mapStateToProps = state => ({
  isWin: state.game.isWin,
});

class App extends Component {
  componentDidMount() {
    this.props.fetchCards();
  }

  render() {
    const { isWin } = this.props;
    
    return (
      <div className="App">
      <h1 className="title">Memory</h1>
        {!isWin ? (
          <div className="wrapperGame">
            <div className="wrapperGameTop">
              <Chronometer />
              <Score />
            </div>
            <Board />
          </div>
        ) : (
          <div className="wrapperWin">
            <Score />
            <div className="wrapperTexte">
              <p>Félicitation tu as gagné</p>
              <img className="pictoWin" src={pictoWin} alt="Picto win" />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
