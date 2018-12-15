export const COUNT_CARD = 8;

export const urlNewDeck = 'https://deckofcardsapi.com/api/deck/new/';

export const urlCardsDraw = deckId => `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${COUNT_CARD}`;

export const STATE = {
  HIDE: -1,
  SELECTION: 0,
  DISCOVER: 1,
};