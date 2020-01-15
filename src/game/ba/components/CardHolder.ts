namespace we {
  export namespace ba {
    export class CardHolder extends eui.Component implements ui.IResultDisplay {
      private gameData: GameData;

      protected card1Player: ui.Card;
      protected card2Player: ui.Card;
      protected card3Player: ui.Card;

      protected card1Banker: ui.Card;
      protected card2Banker: ui.Card;
      protected card3Banker: ui.Card;

      protected playerSum: eui.Label;
      protected bankerSum: eui.Label;

      constructor() {
        super();
      }

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkinByClassname('ba.CardHolderSkin');
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.reset();
      }

      public updateResult(gameData: data.GameData) {
        // TODO: update card using the gameData

        this.gameData = <ba.GameData>gameData;
        const cardArr = [this.gameData.a1, this.gameData.a2, this.gameData.a3, this.gameData.b1, this.gameData.b2, this.gameData.b3];
        const cardHolderArr = [this.card1Banker, this.card2Banker, this.card3Banker, this.card1Player, this.card2Player, this.card3Player];

        this.playerSum.text = this.gameData.playerpoint >= 0 ? this.gameData.playerpoint.toString() : '';
        this.bankerSum.text = this.gameData.bankerpoint >= 0 ? this.gameData.bankerpoint.toString() : '';

        cardArr.forEach(function(value, index) {
          if (value) {
            cardHolderArr[index].setCard(utils.formatCard(value), (index + 1) % 3 !== 0);
          } else {
            if ((index + 1) % 3 !== 0) {
              cardHolderArr[index].setCard('BACK', true);
            }
          }
        });
      }

      public reset() {
        this.card1Player.setCard('BACK', true);
        this.card2Player.setCard('BACK', true);

        this.card1Banker.setCard('BACK', true);
        this.card2Banker.setCard('BACK', true);

        this.card3Banker.clear();
        this.card3Player.clear();
      }
    }
  }
}
