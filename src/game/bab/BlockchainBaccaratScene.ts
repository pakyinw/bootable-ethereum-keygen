/* tslint:disable triple-equals */
/**
 * Blockchain BaccaratScene
 *
 * BlockchainBaccaratScene inherits from the BaccaratScene and acts differently on different animations.
 */
namespace we {
  export namespace bab {
    export class Scene extends ba.Scene {
      protected _gameData: data.GameData & data.BlockchainGameData
      protected _alwaysShowResult = true;
      protected _helpButton: eui.Group;
      protected _deckButton: eui.Group;
      protected _shufflePanel: blockchain.ShufflePanel;
      protected _helpPanel: blockchain.HelpPanel;
      protected _deckPanel: blockchain.DeckPanel;
      protected _cardInfoPanel: blockchain.CardInfoPanel;
      protected _historyCardHolder: we.ui.HistoryCardHolder;
      protected _resultDisplay : ui.IResultDisplay & we.blockchain.CardHolder;

      public static resGroups = [core.res.Blockchain, core.res.BlockchainBaccarat];

      protected initChildren() {
        super.initChildren();
        this._helpPanel.setToggler(this._helpButton);
        this._deckPanel.setToggler(this._deckButton);
        this._deckPanel.setValue(<bab.GameData>this._gameData);
        this._deckPanel.addEventListener('OPEN_CARDINFO_PANEL', this.showCardInfoPanel, this);
        this._shufflePanel.addEventListener('ENABLE_DECK_BTN', this.enableDeckBtn, this);
        this._message.addEventListener('DRAW_RED_CARD',this.newShoeMessage,this)
        this._cardInfoPanel.addEventListener('OPEN_DECK_PANEL', this.showDeckPanel, this);
        this._cardInfoPanel.addEventListener('OPEN_HELP_PANEL', this.showHelpPanel, this);
        (<any>this._resultDisplay).addEventListener('OPEN_CARDINFO_PANEL', this.showCardInfoPanel, this);
        (<any>this._resultDisplay).addEventListener('OPEN_SHUFFLE_PANEL', this.showShufflePanel, this);
        this.getShoeInfo();
      }
      
      protected instantiateVideo() {
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('BlockchainBaccaratScene');
      }

      public updateGame(isInit: boolean = false) {
          super.updateGame(isInit);
          if(isInit){
            switch(this._gameData.state){
              case core.GameState.BET:
              case core.GameState.DEAL:
              case core.GameState.FINISH:
              case core.GameState.SHUFFLE:
                break;
              default:
                console.log('default state', this._gameData.state);
                this._resultDisplay.setDefaultStates()
                break;
            }
          } 
      }

      protected newShoeMessage() {
        this._message.showMessage(ui.InGameMessage.NEWSHOE, i18n.t('baccarat.redCardDesc'),null, true)
      }


      protected setStateBet(isInit: boolean = false) {
        super.setStateBet(isInit);

        this._historyCardHolder.setCards(this._tableId);
        this._historyCardHolder.setNumber(this._gameData.currentcardindex);
        this._shufflePanel.hide();
        this._deckPanel.setValue(this._gameData);
        console.log('Blockchain scene bet state', this._gameData);
        if (isInit || this.previousState !== core.GameState.BET) {
          this._resultDisplay.updateResult(this._gameData, this._chipLayer, isInit);
        }
      }

      protected setStateDeal(isInit: boolean = false) {
        this._shufflePanel.hide();
        this._deckPanel.setValue(<bab.GameData>this._gameData);
        super.setStateDeal(isInit);
        console.log('Blockchain scene deal state', this._gameData);
      }

      protected setStateFinish(isInit: boolean) {
        this._shufflePanel.hide();
        this._deckPanel.setValue(<bab.GameData>this._gameData);
        super.setStateFinish(isInit);
        console.log('Blockchain scene finish state', this._gameData);
      }

      protected setStateShuffle(isInit: boolean) {
        this.getShoeInfo();
        this.enableDeckButton(false)
        super.setStateShuffle(isInit);
        this._resultDisplay.updateResult(this._gameData, this._chipLayer, isInit)
      }

      protected showCardInfoPanel(evt: egret.Event) {
        this._cardInfoPanel.setValue(this._gameData, evt.data);
        this._cardInfoPanel.show();
      }

      protected enableDeckBtn(){
        this.enableDeckButton(true)
      }
      protected showDeckPanel(evt: egret.Event) {
        this._deckPanel.show();
      }

      protected showHelpPanel(evt: egret.Event) {
        this._helpPanel.show();
      }

      protected showShufflePanel(evt: egret.Event) {
        if (evt.data === 'init') {
          this._shufflePanel.show();
          this._shufflePanel.showStatic(this._gameData);
        } else {
          this._shufflePanel.show();
          this._shufflePanel.showAnim(this._gameData);
        }
      }

      protected enableDeckButton(enable:boolean) {
        this._deckButton.touchEnabled = enable;
        this._deckButton.touchChildren = enable;
        this._deckButton.alpha = enable? 1 : 0.5;
      }
      protected async getShoeInfo() {
        let obj;
        let text;
        try {
          text = await utils.getText(`${env.blockchain.cosmolink}${this._gameData.cosmosshoeid}`);
          obj = JSON.parse(text);
          if(obj.result.cards){
            this._gameData.hashedcardsList = obj.result.cards
            console.log('get cosmo succeeded')
          }
          return new Promise(resolve=>resolve())
        } catch (error) {
          console.log('GetShoeFromCosmo error. ' + error + '. Fallback to use backend\'s data.');
          return new Promise(resolve=>resolve())
        }
     }
    }
  }
}
