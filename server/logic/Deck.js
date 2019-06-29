import { emptyArray } from './utils'

const rank = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
const suit = ['hearts','diams','clubs','spades'];

class Deck{
    constructor() {
      this.deck = [];
      this.createDeck();
    }

    createDeck(){
      const { deck } = this;
      rank.forEach((rank, weight) => 
        suit.forEach(suit => deck.push({ 
          rank, 
          suit, 
          weight: weight+2 
        }))
      );
    }

    deal() {
      return emptyArray(5).map(card => {
        card = this.getRandomCard()
        return {
          rank: card.rank,
          suit: card.suit,
          weight: card.weight
        }
      })
    }

    getRandomCard(){
      return this.deck.splice(Math.floor(Math.random()*this.deck.length),1)[0];
    }
}

export { Deck };
