import React from 'react';
import './card.css';
import { STATE } from '../../constants';
import { selectCard, checkSameCard } from '../../redux/Game/actions';
import { connect } from 'react-redux';

const cache_card = require('../../img/yugioh_verso.png');

const { HIDE, SELECTION } = STATE;

const mapStateToProps = state => ({
  cardSelected: state.game.cardSelected,
  preventClick: state.game.preventClick,
  cards: state.game.cards
});

const mapDispatchToProps = dispatch => ({
  selectCard: (value, index) => dispatch(selectCard(value, index)),
  checkSameCard: () => dispatch(checkSameCard())
});

class Card extends React.Component {
  
  constructor(props){
    super(props);

    this.onToggleCard = this.onToggleCard.bind(this);
  };

  getIndex(el) {
    var children = el.parentNode.childNodes,
        i = 0;
    for (; i < children.length; i++) {
        if (children[i] === el) {
            return i;
        }
    }
    return -1;
}

  onToggleCard(e){
    const { cards, cardSelected, value, checkSameCard, selectCard } = this.props;

    let indexCardSelected = this.getIndex(e.target);

    if(indexCardSelected === 0){
      // get index div (card) selected
      indexCardSelected = Array.from(e.target.parentNode.parentNode.children).indexOf(
        e.target.parentNode
      );
    }

    // prevent clicked on card already selected
    if (cards[indexCardSelected].state === SELECTION) return;

    // update state card
    selectCard(value, indexCardSelected);

    if (cardSelected.length === 1) {
      setTimeout(() => {
        checkSameCard();
      }, 1000);
    }
  }

  render() {
    const { state, src, preventClick } = this.props;

    return (
      <div 
        onClick={e => !preventClick && this.onToggleCard(e)}
        className={`card ${state === HIDE ? 'hide animated flipInY' : 'show'} `} >
      <img src={state === HIDE ? cache_card : src.png} alt="card" className={`card ${state === HIDE ? '' : 'animated tada'}`}/>
    </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card);
