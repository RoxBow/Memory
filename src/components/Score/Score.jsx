import React from 'react';
import { connect } from 'react-redux';

import './Score.css';

const mapStateToProps = state => ({
  score: state.game.score
});

const Score = ({ score }) => <div className="wrapperScore"><p className="score">{score}</p></div>;

export default connect(mapStateToProps)(Score);
