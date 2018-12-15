import React from 'react';
import Card from '../Card/Card';
import { connect } from 'react-redux';
import './board.css';

const mapStateToProps = state => ({
  isFetched: state.game.isFetched,
  cards: state.game.cards
});

const Board = ({ cards, isFetched }) =>
  isFetched && (
    <div className="board">
      {cards.map(({ code, images, state }, i) => (
        <Card key={i} value={code} src={images} state={state} />
      ))}
    </div>
  );

export default connect(mapStateToProps)(Board); 
