import { SET_CARDS, SET_ERROR, SELECT_CARD, CHECK_SAME_CARD } from './actions';
import { STATE, COUNT_CARD } from '../../constants';
import { shuffleArray } from '../../helper/shuffleArray';

const { HIDE, SELECTION, DISCOVER } = STATE;

const mapCard = cards => cards.map(card => ({ ...card, state: HIDE }))

const createDeck = cards => {
  // create deck with copy of card each of one
  cards = [...mapCard(cards), ...mapCard(cards)];

  // shuffle cards
  cards = shuffleArray(cards);

  return cards;
}

const getPoint = timer => {
  const result = new Date(+new Date() - timer);
  const minute = result.getMinutes();
  let point = 1;

  const points = [10, 8, 6, 4, 2, 1];

  // point = 10 si minute === 0
  // point = 8 si minute === 1
  if( minute <= (points.length - 1) ){
    point = points[minute];
  } 

  return point;
}

const initialState = {
  isFetched: false,
  error: '',
  cardSelected: [],
  preventClick: false,
  score: 0,
  countCardFound: 0,
  isWin: false,
  timeStart: +new Date()
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_CARDS:
      return {
        ...state,
        cards: createDeck(action.cards),
        isFetched: true
      };

    case SELECT_CARD: {
      console.log('indexCardSelected', action.indexCardSelected)
      return {
        ...state,
        cardSelected: [...state.cardSelected, action.cardClicked],
        cards: state.cards.map((card, index) => {
          if (card.code === action.cardClicked && index === action.indexCardSelected) {
            return { ...card, state: SELECTION };
          }

          return card;
        }),
        preventClick: state.cardSelected.length === 1,
      };
    }

    case CHECK_SAME_CARD: {
      let isSameCard = false;
      let numberCardFound = 0;
      let isWin = null;

      // if card selected match
      if(state.cardSelected[1] === state.cardSelected[0]) isSameCard = true;
      
      const updateStateCard = state.cards.map(card => {
        if (state.cardSelected[0] === card.code && isSameCard) {
          numberCardFound++;
          return { ...card, state: DISCOVER };
        } else if(card.state === SELECTION && !isSameCard){
          return { ...card, state: HIDE };
        }

        return card;
      });

      if( (state.countCardFound + numberCardFound) / 2 === COUNT_CARD){
        isWin = true;
      }

      return {
        ...state,
        cards: updateStateCard,
        cardSelected: [],
        countCardFound: state.countCardFound + numberCardFound, 
        preventClick: false,
        isWin,
        score: !isSameCard ? state.score : (state.score + getPoint(state.timeStart))
      };
    }

    case SET_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default gameReducer;
