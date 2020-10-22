namespace we {
  export namespace lo {
    export class LotteryMobileSceneFun extends LotterySceneFunBasic {

      protected _denominationList;

      protected _betTogger: ui.RoundRectButton;
      protected _betContainer: ui.Panel;

      protected _betSet: eui.Group;
      protected _betChipSetGridSelected: ui.BetChipSetGridSelected;
      protected _betChipSet: BetChipSetWithCustom;

      protected _confirmButton: eui.Button;
      protected _cancelButton: ui.BaseImageButton;

      // protected _custombet: FunBetCustomBet;

      protected _video: egret.FlvVideo;
      protected _counter: eui.Label;
      protected _targetTime;
      protected _counterInterval;

      protected mount() {
        super.mount();

        this._betContainer.isPoppable = true;
        this._betContainer.setToggler(this._betTogger);
        this._betChipSet.setToggler(this._betChipSetGridSelected);

        this.initBet();
        this.funbet.reset();
      }

      protected destroy() {
        super.destroy();
        this._betContainer.removeToggler();
        this._betChipSet.removeToggler();
      }

      protected initBet() {
        this._denominationList = env.betLimits[env.currentSelectedBetLimitIndex].chips;
        this._betChipSet.init(this._denominationList);
        this.onBetChipChanged();
      }

      protected initText() {
        this._betTogger.label.renderText = () => `${i18n.t('lo_fun_mobile_bettrigger')}`;
        this._cancelButton.label.renderText = () => `${i18n.t('mobile_ba_clear')}`;
      }

      protected addListeners() {
        super.addListeners();
        // this._custombet.addEventListener('CUSTOMBET_SELECTED', this.onCustomBetSelected, this);
        dir.evtHandler.addEventListener(core.Event.BET_DENOMINATION_CHANGE, this.onBetChipChanged, this);
        dir.evtHandler.addEventListener(core.Event.BET_LIMIT_CHANGE, this.onBetLimitUpdate, this);
        utils.addButtonListener(this._confirmButton, this.onConfirmPressed, this);
        utils.addButtonListener(this._cancelButton, this.onCancelPressed, this);
        this.funbet.evtHandler.addEventListener('LOTTERY_FUNBET_UPDATE', this.onFunBetUpdate, this);
        this.funbet.evtHandler.addEventListener('LOTTERY_FUNBET_OVERBETLIMIT', this.onOverBetLimit, this);
        this.funbet.evtHandler.addEventListener('LOTTERY_FUNBET_LOWERBETLIMIT', this.onLowBetLimit, this);
        this.funbet.evtHandler.addEventListener('LOTTERY_FUNBET_OVERBALANCE', this.onOverBalance, this);

        this._betContainer.addEventListener('POPPER_SHOW',this.onBetContainerShow, this);
        this._betContainer.addEventListener('POPPER_HIDE',this.onBetContainerHide, this);
      }

      protected removeListeners() {
        super.removeListeners();
        // this._custombet.removeEventListener('CUSTOMBET_SELECTED', this.onCustomBetSelected, this);
        dir.evtHandler.removeEventListener(core.Event.BET_DENOMINATION_CHANGE, this.onBetChipChanged, this);
        dir.evtHandler.removeEventListener(core.Event.BET_LIMIT_CHANGE, this.onBetLimitUpdate, this);
        utils.removeButtonListener(this._confirmButton, this.onConfirmPressed, this);
        utils.removeButtonListener(this._cancelButton, this.onCancelPressed, this);
        this.funbet.evtHandler.removeEventListener('LOTTERY_FUNBET_UPDATE', this.onFunBetUpdate, this);
        this.funbet.evtHandler.removeEventListener('LOTTERY_FUNBET_OVERBETLIMIT', this.onOverBetLimit, this);
        this.funbet.evtHandler.removeEventListener('LOTTERY_FUNBET_LOWERBETLIMIT', this.onLowBetLimit, this);
        this.funbet.evtHandler.removeEventListener('LOTTERY_FUNBET_OVERBALANCE', this.onOverBalance, this);

        this._betContainer.removeEventListener('POPPER_SHOW',this.onBetContainerShow, this);
        this._betContainer.removeEventListener('POPPER_HIDE',this.onBetContainerHide, this);
      }

      protected onBetContainerShow() {
        this._betSet.visible = true;
      }

      protected onBetContainerHide() {
        this._betSet.visible = false;
        this._betChipSet.hide();
      }

      // protected onCustomBetSelected() {
      //   this._custombet.selected = true;
      //   this.funbet.bet = this._custombet.currentBet;
      //   this._betChipSet.unSelect();
      // }

      protected onBetChipChanged() {
        // this._custombet.selected = false;
        this.funbet.bet = this._denominationList[env.currentChipSelectedIndex];
      }

      protected onBetLimitUpdate(evt: egret.Event) {
        // this._custombet.selected = false;
        this._denominationList = env.betLimits[env.currentSelectedBetLimitIndex].chips;
        this._betChipSet.init(this._denominationList);
        this.onBetChipChanged();
      }

      protected onFunBetUpdate() {
        this._confirmButton.enabled = Object.keys(this.funbet.betDetails).length > 0;
      }

      protected onOverBetLimit() {
        this._message.showMessage(ui.InGameMessage.ERROR, i18n.t('game.exceedBetUpperLimit'));
      }

      protected onLowBetLimit() {
        this._message.showMessage(ui.InGameMessage.ERROR, i18n.t('game.exceedBetLowerLimit'));
      }

      protected onOverBalance() {
        this._message.showMessage(ui.InGameMessage.ERROR, i18n.t('game.insufficientBalance'));
      }

      protected onConfirmPressed() {
        if (Object.keys(this.funbet.betDetails).length > 0 && this.funbet.checkAllAvailable()) {
          dir.evtHandler.createOverlay({
            class: 'FunBetOverlay',
            args: [this._tableInfo, this.customKey],
          });
        }
      }

      protected onCancelPressed() {
        this.funbet.reset();
      }

      protected onBetResultReceived(evt: egret.Event) {
        super.onBetResultReceived(evt);
        this.funbet.evtHandler.dispatchEvent(new egret.Event('LOTTERY_FUNBET_CLEANSCREEN'));
      }

      protected onBetConfirmed() {
        super.onBetConfirmed();
        this.funbet.reset();
      }

      protected setBetRelatedComponentsEnabled(enable: boolean) {
        this.betClipEnabled = enable;
        this.betLayerEnabled = enable;

        if (!enable) {
          this.funbet.evtHandler.dispatchEvent(new egret.Event('LOTTERY_FUNBET_CLEANSCREEN'));
          this.funbet.reset();
        }
      }

      protected setResultRelatedComponentsEnabled(enable: boolean) {}

      protected set betLayerEnabled(enabled: boolean) {
        if (enabled) {
          this._betTogger.touchEnabled = true;
        } else {
          this._betTogger.touchEnabled = false;
          this._betSet.visible = false;
          this._betContainer.hide();
          this._betChipSet.hide();
        }
      }

      protected set betClipEnabled(enabled: boolean) {
        // this._betRelatedGroup.visible = enabled;
        // this._custombet.enabled = enabled;
      }
    }
  }
}
