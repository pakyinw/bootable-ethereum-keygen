namespace we {
  export namespace bamb {
    export class MobileCardHolder extends bamb.CardHolder {
      protected _wholeMoveGroup : eui.Group;
      protected _resultGroup: eui.Group;
      protected _playerSumGroup: eui.Group;
      protected _bankerSumGroup: eui.Group;

      protected _roundLoopA = 'round_loop';
      protected _roundLoopB = 'round_loop';

      protected initVariables(){
        super.initVariables();
        this._pinInterval = 81.5;
        this._pinStartAngle = -81.5;
        this._roundLoopA = 'round_loop';
        this._roundLoopB = 'round_loop';
        this._verticalFlip = 'vertical_filp';
        this.cardAnimNames = ['_playerCard1', '_bankerCard1', '_playerCard2', '_bankerCard2']
      }

      protected mount(){
        super.mount();
        this._ringAnim.animation.gotoAndStopByFrame('icon_loop',0);
        this.expandBottom();
      }

      public expandBottom(){
        if(env.orientation === 'portrait'){
          this._wholeMoveGroup.y = -410
          if(this._gameData && this._gameData.state === core.GameState.BET){
            this._resultGroup.y = -150
          }else{
            this._resultGroup.y = -109
          }
        }else{
          this._wholeMoveGroup.y = -260
          this._resultGroup.y = -260
        }
      }

      public collapseBottom(){
        this._wholeMoveGroup.y = -290
          if(this._gameData && this._gameData.state === core.GameState.BET){
            this._resultGroup.y = 59
          }else{
            this._resultGroup.y = 0
          }
      }

      public showSumGroup(){
        if(this._playerSumGroup.visible === false){
          this._playerSumGroup.visible = true;
          this._bankerSumGroup.visible = true;
          if(env.orientation === 'portrait'){
            this._playerCardMoveGroup.x = 238;
            this._bankerCardMoveGroup.right = 238;
            this._playerCard3Group.x = 48;
            this._bankerCard3Group.right = 48;
            this._playerCardMoveGroup.y = 679;
            this._bankerCardMoveGroup.y = 679;
            this._playerCard3Group.y = 679;
            this._bankerCard3Group.y = 679;
          }else{
            this._playerCardMoveGroup.x = 776;
            this._bankerCardMoveGroup.x = 776;
            this._playerCard3Group.x = 778;
            this._bankerCard3Group.x = 778;
            this._playerCardMoveGroup.y = 238;
            this._bankerCardMoveGroup.y = 238;
            this._playerCard3Group.y = 48;
            this._bankerCard3Group.y = 48;
          }
        }
      }

      public hideSumGroup(){
        if(this._playerSumGroup.visible === true){
          this._playerSumGroup.visible = false;
          this._bankerSumGroup.visible = false;
          if(env.orientation === 'portrait'){
            this._playerCardMoveGroup.x = 334;
            this._bankerCardMoveGroup.right = 334;
            this._playerCard3Group.x = 144;
            this._bankerCard3Group.right = 144;          
            this._playerCardMoveGroup.y = 536;
            this._bankerCardMoveGroup.y = 536;
            this._playerCard3Group.y = 536;
            this._bankerCard3Group.y = 536;     
          }else{
            this._playerCardMoveGroup.x = 625;
            this._bankerCardMoveGroup.x = 625;
            this._playerCard3Group.x = 627;
            this._bankerCard3Group.x = 627;     
            this._playerCardMoveGroup.x = 334;
            this._bankerCardMoveGroup.right = 334;
            this._playerCard3Group.x = 144;
            this._bankerCard3Group.right = 144;                
          }
        }
      }

      protected async setStateBet(isInit: boolean) {
        await super.setStateBet(isInit);
        if(isInit){
          await utils.playAnimation(this._ringAnim,'icon_loop',1)
        }
        return new Promise(resolve=>resolve())
      }


      protected async moveAndHideA3(interval: number){
        this._bankerCard3Group.visible = false;
        return new Promise(resolve => resolve())
      }

      protected async moveAndHideB3(interval: number){
        this._playerCard3Group.visible = false;
        return new Promise(resolve => resolve())
      }

      protected async moveAndShowA3(interval: number){
        this._bankerCard3Group.visible = true;
        return new Promise(resolve => resolve())
      }

      protected async moveAndShowB3(interval: number){
        this._playerCard3Group.visible = true;
        return new Promise(resolve => resolve())
      }

      protected draw(loop: number){

      }

      protected pokerRoundLoop(){
      }

      protected async lastCard(){
        return new Promise(resolve=>resolve())
      }

      protected async roundOut(){
        return new Promise(resolve=>resolve())
      }

      protected async roundIn(){
        return new Promise(resolve=>resolve())
      }

      protected createFactory() {
        const skeletonData = RES.getRes(`blockchain_sqba_ske_dbbin`);
        const textureData = RES.getRes(`blockchain_sqba_tex_json`);
        const texture = RES.getRes(`blockchain_sqba_tex_png`);
        this._factory = new dragonBones.EgretFactory();
        this._factory.parseDragonBonesData(skeletonData);
        this._factory.parseTextureAtlasData(textureData, texture);
      }

      protected setCenterFlipCard(data: string, orientation: string) {
        let card = (orientation === 'vertical') ? this._centerVCard : this._centerHCard;
        card.setCardImage(
          'm_sq_ba_large_poker_backside_png',
          `m_sq_bac_large_poker_${utils.formatCardForFlip(this._gameData[data])}_png`,
          `m_sq_bac_large_poker_${utils.formatCardForFlip(this._gameData[data])}_png`
        )
      }
    }
  }
}
