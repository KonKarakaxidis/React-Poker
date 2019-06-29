import _ from 'lodash';

class Player{

  constructor(name,cards){
    this.name = name;
    this.cards = cards;
    this.ranking = null;
    this.score = null;
    this.combination = null;
    this.sortHand();
    this.calculateRanking();
    this.calculateScore();
  }

  sortHand(){
    this.cards.sort((a,b) => {
      if (Number(a.weight) === Number(b.weight)) {
        return 0;
      }
      else {
        return (Number(a.weight) < Number(b.weight)) ? -1 : 1;
      }
    });
  }

  calculateScore(){
    const { ranking, cards } = this;
    let coefficient = 100000000;
    let sum = ranking * coefficient;

    cards
      .slice()
      .reverse()
      .forEach(card => {
        coefficient /= 100
        sum += coefficient*card.weight;
      });

    this.score = sum
  }

  calculateRanking(){
    const { cards } = this;
    const values = _.groupBy(cards,'weight');
    const valueGroup = _.groupBy(values,'length');
    const symbols = _.groupBy(cards,'suit');
    const symbolGroup = _.groupBy(symbols,'length');

    //We check for straight
    const straight = () => {
      let previousWeight = cards[0].weight;
      let counter = 0;

      cards.slice(1).forEach(card => {
        previousWeight+1 === card.weight && counter++;
        previousWeight = card.weight;
      });
 
      cards[0].weight === 2  && 
      cards[3].weight !== 13 && 
      previousWeight === 14  &&
      counter++;

      return counter >= 4;
    }

    const setCombination = (combination , ranking) => {
      this.combination = combination;
      this.ranking = ranking;
    }

    if(straight() && symbolGroup[5])
      setCombination("Straigt Flush" , 9);
    else if(valueGroup[4])
      setCombination("Four of a Kind" , 8);
    else if(valueGroup[2] && valueGroup[3])
      setCombination("Full House" , 7);
    else if(symbolGroup[5])
      setCombination("Flush" , 6);
    else if(straight())
      setCombination("Straight" , 5);
    else if(valueGroup[3])
      setCombination("Three of a Kind" , 4);
    else if(valueGroup[2] && valueGroup[2].length === 2)
      setCombination("Two Pair" , 3);
    else if(valueGroup[2] && valueGroup[2].length === 1)
      setCombination("Pair" , 2);
    else
      setCombination("High Card" , 1);
  }
}

export { Player };