/* tslint:disable triple-equals */
/**
 * BaccaratScene
 *
 * BaccaratScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 */
namespace we {
  export namespace bam {
    export class MobileScene extends ba.MobileScene {
      protected _resultCard: MobileFlipCardHolder;
      protected _resultDisplay: MobileCardHolder;
      public tutorial: we.bam.SqueezeTutorial;

      protected _cardHolderData: any;
      protected tutorial_page_index: number;

      protected initChildren() {
        super.initChildren();
        this._resultDisplay.passFlipCard(this._resultCard);
        if (!env.isFirstTimeBam) {
          this.tutorial = new SqueezeTutorial('SqueezeTutorial', this.tutorial_page_index || 0);
          this.tutorial.isDraggable = false;
          this.tutorial.isEdgeDismissable = false;

          if (env.orientation === 'portrait') {
            dir.layerCtr.nav.visible = false;
            this.tutorial.x = 0;
            this.tutorial.y = 0;
            this.tutorial.width = 1242;
            this.tutorial.height = 2155;
          } else if (env.orientation === 'landscape') {
            this.tutorial.bottom = 44;
            this.tutorial.horizontalCenter = 0;
          }
          this.addChild(this.tutorial);
          env.isFirstTimeBam = true;
        }
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('SqueezeBaccaratScene');
        this._skinKey = 'SqueezeBaccaratScene';
      }

      protected onOrientationChange() {
        this._cardHolderData = this._resultDisplay.exportData();
        if (this.tutorial) {
          env.isFirstTimeBam = false;
          this.tutorial_page_index = this.tutorial._pageIndex;
        }
        super.onOrientationChange();
      }

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
        this._resultDisplay.importData(this._cardHolderData);
      }

      protected setStateDeal(isInit: boolean = false) {
        if (this._previousState === we.core.GameState.BET) {
          this.checkRoundCountWithoutBet();
        }
      }

      protected setStatePeek(isInit: boolean = false) {
        // console.log('PEEK ' + new Date(Date.now()).toString());
        super.setStatePeek(isInit);
        this._resultDisplay.updateResult(this._gameData, this._chipLayer);
        // if (this._previousState !== we.core.GameState.PEEK || isInit) {
        //   this.setBetRelatedComponentsEnabled(false);
        //   this.setResultRelatedComponentsEnabled(true);
        // }
      }

      protected setStatePeekPlayer(isInit: boolean = false) {
        // console.log('PEEK_PLAYER ' + new Date(Date.now()).toString());
        super.setStatePeekPlayer(isInit);
        this._resultDisplay.updateResult(this._gameData, this._chipLayer);

        // if (this._previousState !== we.core.GameState.PEEK_PLAYER || isInit) {
        //   this.setBetRelatedComponentsEnabled(false);
        //   this.setResultRelatedComponentsEnabled(true);
        // }
      }

      protected setStatePeekBanker(isInit: boolean = false) {
        super.setStatePeekBanker(isInit);
        // console.log('PEEK_BANKER ' + new Date(Date.now()).toString());
        this._resultDisplay.updateResult(this._gameData, this._chipLayer);
        // if (this._previousState !== we.core.GameState.PEEK_BANKER || isInit) {
        //   this.setBetRelatedComponentsEnabled(false);
        //   this.setResultRelatedComponentsEnabled(true);
        // }
      }

      protected setStateFinish(isInit: boolean = false) {
        // console.log('FINISH ' + new Date(Date.now()).toString());
        super.setStateFinish(isInit);
        this._resultDisplay.updateResult(this._gameData, this._chipLayer);
        this.setResultRelatedComponentsEnabled(true);
      }

      protected destroy() {
        super.destroy();
      }
    }
  }
}
