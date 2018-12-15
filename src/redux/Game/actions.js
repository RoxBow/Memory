import axios from 'axios';
import { urlNewDeck, urlCardsDraw } from '../../constants';

export const SET_CARDS = 'SET_CARDS';
export const SELECT_CARD = 'SELECT_CARD';
export const SET_ERROR = 'SET_ERROR';
export const CHECK_SAME_CARD = 'CHECK_SAME_CARD';

/* CARD */
const setCards = cards => ({
  type: SET_CARDS,
  cards
});

export const selectCard = (cardClicked, indexCardSelected) => ({
  type: SELECT_CARD,
  cardClicked,
  indexCardSelected,
});

export const checkSameCard = () => ({
  type: CHECK_SAME_CARD,
});

const setError = error => ({
  type: SET_ERROR,
  error
});

export const fetchCards = () => {
  return dispatch => {
    axios
      .get(urlNewDeck)
      .then(({ data }) => {
        axios
          .get(urlCardsDraw(data.deck_id))
          .then(({ data }) => {
            dispatch(setCards(data.cards));
          })
          .catch(error => {
            dispatch(setError(error));
          });
      })
      .catch(error => {
        dispatch(setError(error));
      });
  };
};
