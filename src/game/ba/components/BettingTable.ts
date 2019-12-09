namespace we {
  export namespace ba {
    export class BettingTable extends ui.Panel {
      private _gridPlayerPair: BettingTableGrid;
      private _gridBankerPair: BettingTableGrid;
      private _gridPlayer: BettingTableGrid;
      private _gridTie: BettingTableGrid;
      private _gridSuperSix: BettingTableGrid;
      private _gridSuperSixBanker: BettingTableGrid;
      private _gridBanker: BettingTableGrid;
      private _tableId: string;
      private _type: we.core.BettingTableType;
      private _denomList: number[];
      private _getSelectedChipIndex: () => number;
      private _getSelectedBetLimitIndex: () => number;
      private mapping: { [s: string]: BettingTableGrid };

      private uncfmBetDetails: data.BetDetail[];
      private totalUncfmBetAmount: number;
      private betDetails: data.BetDetail[];

      constructor() {
        super();
      }

      set denomList(value: number[]) {
        this._denomList = value;
      }

      get denomList() {
        return this._denomList;
      }

      set tableId(value: string) {
        this._tableId = value;
      }

      get tableId() {
        return this._tableId;
      }

      set type(value: we.core.BettingTableType) {
        this._type = value;
      }

      get type() {
        return this._type;
      }

      private createMapping() {
        this.mapping = {};
        this.mapping[BetField.BANKER] = this._gridBanker;
        this.mapping[BetField.PLAYER] = this._gridPlayer;
        this.mapping[BetField.TIE] = this._gridTie;
        this.mapping[BetField.BANKER_PAIR] = this._gridBankerPair;
        this.mapping[BetField.PLAYER_PAIR] = this._gridPlayerPair;
        this.mapping[BetField.SUPER_SIX] = this._gridSuperSix;
        this.mapping[BetField.SUPER_SIX_BANKER] = this._gridSuperSixBanker;
      }

      private setFieldNames() {
        this._gridBanker.setFieldName(BetField.BANKER);
        this._gridPlayer.setFieldName(BetField.PLAYER);
        this._gridTie.setFieldName(BetField.TIE);
        this._gridBankerPair.setFieldName(BetField.BANKER_PAIR);
        this._gridPlayerPair.setFieldName(BetField.PLAYER_PAIR);
        this._gridSuperSix.setFieldName(BetField.SUPER_SIX);
        this._gridSuperSixBanker.setFieldName(BetField.SUPER_SIX_BANKER);
      }

      private setDenomLists() {
        this._gridBanker.denomList = this._denomList;
        this._gridPlayer.denomList = this._denomList;
        this._gridTie.denomList = this._denomList;
        this._gridBankerPair.denomList = this._denomList;
        this._gridPlayerPair.denomList = this._denomList;
        this._gridSuperSix.denomList = this._denomList;
        this._gridSuperSixBanker.denomList = this._denomList;
      }

      // Must be called if you change skin
      public init() {
        this.createMapping();
        this.setFieldNames();
        this.setFieldLevel();
        this.setDenomLists();
        this.changeMethod('normal');
        this.changeLang();
        this.resetUnconfirmedBet();
        this.setListeners();
      }

      private setFieldLevel() {
        this._gridBanker.betChipZIndex = 10000;
        this._gridPlayer.betChipZIndex = 10000;
        this._gridBankerPair.betChipZIndex = 20000;
        this._gridPlayerPair.betChipZIndex = 20000;
        this._gridSuperSix.betChipZIndex = 20000;
        this._gridSuperSixBanker.betChipZIndex = 10000;
        this._gridTie.betChipZIndex = 20000;
      }

      private setListeners() {
        this._gridPlayerPair.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBetFieldUpdate(this._gridPlayerPair), this);
        this._gridBankerPair.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBetFieldUpdate(this._gridBankerPair), this);
        this._gridPlayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBetFieldUpdate(this._gridPlayer), this);
        this._gridTie.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBetFieldUpdate(this._gridTie), this);
        this._gridBanker.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBetFieldUpdate(this._gridBanker), this);
        this._gridSuperSix.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBetFieldUpdate(this._gridSuperSix), this);
        this._gridSuperSixBanker.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBetFieldUpdate(this._gridSuperSixBanker), this);

        dir.evtHandler.addEventListener(core.Event.TABLE_LIST_UPDATE, function () {}, this);
      }

      /*
      protected getCurrentState() {
        if (this.switchSuperSix.selected) {
          return 'SuperSix';
        } else {
          this.gridSuperSix.setUncfmBet(0);
          return 'Normal';
        }
      }
        */
      public setGameMode(isNoCommission: boolean) {
        this.currentState = isNoCommission ? 'SuperSix' : 'Normal';
        const textColor = 0xffffff;

        this._gridPlayerPair.setStyle(textColor);
        this._gridBankerPair.setStyle(textColor);
        this._gridPlayer.setStyle(textColor);
        this._gridBanker.setStyle(textColor);
        this._gridSuperSix.setStyle(textColor);
        this._gridSuperSixBanker.setStyle(textColor);
        this._gridTie.setStyle(textColor);
      }

      public changeMethod(method: string) {
        switch (method) {
          default:
            const textColor = 0xffffff;
            const bgColor = 0x000000;

            this._gridPlayerPair.setStyle(textColor);
            this._gridBankerPair.setStyle(textColor);
            this._gridPlayer.setStyle(textColor);
            this._gridBanker.setStyle(textColor);
            this._gridSuperSix.setStyle(textColor);
            this._gridSuperSixBanker.setStyle(textColor);
            this._gridTie.setStyle(textColor);
        }
      }

      protected changeLang() {
        this._gridPlayerPair.text = i18n.t('baccarat.playerPair');
        this._gridBankerPair.text = i18n.t('baccarat.bankerPair');
        this._gridPlayer.text = i18n.t('baccarat.player');
        this._gridBanker.text = i18n.t('baccarat.banker');
        this._gridTie.text = i18n.t('baccarat.tie');
        this._gridSuperSix.text = i18n.t('baccarat.superSix');
        this._gridSuperSixBanker.text = i18n.t('baccarat.banker');
      }

      public setTouchEnabled(enable: boolean) {
        this.touchEnabled = enable;
        this.touchChildren = enable;
        if (!enable) {
          this.cancelBet();
        }
      }

      public getUnconfirmedBetDetails() {
        return this.uncfmBetDetails;
      }

      public getTotalUncfmBetAmount() {
        return this.totalUncfmBetAmount;
      }

      public updateBetFields(betDetails: data.BetDetail[]) {
        // logger.l('BettingTable::updateBetFields' + betDetails);
        this.betDetails = betDetails;

        // TODO: update the already bet amount of each bet field
        console.log('BettingTable::betDetails xxxxxxxxxxxxxxxxxxxxxxxxxxxxx111');
        console.log(betDetails);
        betDetails.map((value, index) => {
          console.log('BettingTable::betDetails xxxxxxxxxxxxxxxxxxxxxxxxxxxxx : ' + value);
          console.log('xxx value.field' + value.field);
          // logger.l('BettingTable::updateBetFields:loop ' + value);
          if (this.mapping[value.field]) {
            this.mapping[value.field].setCfmBet(value.amount);
          }
        });
      }

      public showWinFields(betDetails: data.BetDetail[]) {
        // TODO: show the win effect of each win field
        this.betDetails = betDetails;
      }

      public showWinEffect(betDetails: data.BetDetail[]) {
        // TODO: show the win effect of each winning bet
        this.betDetails = betDetails;
      }

      protected onBetFieldUpdate(grid: BettingTableGrid) {
        return (event: egret.Event) => {
          console.log('BettingTable::onBetFieldUpdate()');
          const betDetail = { field: grid.getFieldName(), amount: grid.getAmount() };
          // validate bet action
          if (this.validateBetAction(betDetail)) {
            // update the uncfmBetDetails
            for (const detail of this.uncfmBetDetails) {
              if (detail.field === betDetail.field) {
                detail.amount += betDetail.amount;
                break;
              }
            }
            // update the corresponding table grid
            this.mapping[betDetail.field].addUncfmBet(betDetail.amount);
            this.totalUncfmBetAmount += betDetail.amount;
          }
        };
      }

      set getSelectedChipIndex(value: () => number) {
        this._getSelectedChipIndex = value;
        this._gridBanker.getSelectedChipIndex = this._getSelectedChipIndex;
        this._gridPlayer.getSelectedChipIndex = this._getSelectedChipIndex;
        this._gridPlayerPair.getSelectedChipIndex = this._getSelectedChipIndex;
        this._gridTie.getSelectedChipIndex = this._getSelectedChipIndex;
        this._gridBankerPair.getSelectedChipIndex = this._getSelectedChipIndex;
        this._gridSuperSix.getSelectedChipIndex = this._getSelectedChipIndex;
        this._gridSuperSixBanker.getSelectedChipIndex = this._getSelectedChipIndex;
      }

      get getSelectedChipIndex() {
        return this._getSelectedChipIndex;
      }

      set getSelectedBetLimitIndex(value: () => number) {
        this._getSelectedBetLimitIndex = value;
        this._gridBanker.getSelectedBetLimit = this._getSelectedBetLimitIndex;
        this._gridPlayer.getSelectedBetLimit = this._getSelectedBetLimitIndex;
        this._gridPlayerPair.getSelectedBetLimit = this._getSelectedBetLimitIndex;
        this._gridTie.getSelectedBetLimit = this._getSelectedBetLimitIndex;
        this._gridBankerPair.getSelectedBetLimit = this._getSelectedBetLimitIndex;
        this._gridSuperSix.getSelectedBetLimit = this._getSelectedBetLimitIndex;
        this._gridSuperSixBanker.getSelectedBetLimit = this._getSelectedBetLimitIndex;
      }

      get getSelectedBetLimitIndex() {
        return this._getSelectedBetLimitIndex;
      }

      protected validateBet(): boolean {
        const fieldAmounts = utils.arrayToKeyValue(this.uncfmBetDetails, 'field', 'amount');
        return this.validateFieldAmounts(fieldAmounts, this.totalUncfmBetAmount);
      }

      // check if the current unconfirmed betDetails are valid
      protected validateFieldAmounts(fieldAmounts: {}, totalBetAmount: number): boolean {
        const betLimit: data.BetLimit = env.betLimits[this._getSelectedBetLimitIndex()];
        // TODO: check balance
        const balance = env.balance;
        if (balance < totalBetAmount) {
          egret.log(core.Event.INSUFFICIENT_BALANCE);
          dir.evtHandler.dispatch(core.Event.INSUFFICIENT_BALANCE);
          return false;
        }
        // check betlimit
        const exceedBetLimit =
          Math.abs(fieldAmounts[BetField.BANKER] - fieldAmounts[BetField.PLAYER]) > betLimit.maxLimit ||
          Math.abs(fieldAmounts[BetField.SUPER_SIX_BANKER] - fieldAmounts[BetField.PLAYER]) > betLimit.maxLimit ||
          fieldAmounts[BetField.TIE] > betLimit.maxLimit ||
          fieldAmounts[BetField.BANKER_PAIR] > betLimit.maxLimit ||
          fieldAmounts[BetField.PLAYER_PAIR] > betLimit.maxLimit ||
          fieldAmounts[BetField.SUPER_SIX] > betLimit.maxLimit;
        if (exceedBetLimit) {
          egret.log(core.Event.EXCEED_BET_LIMIT);
          dir.evtHandler.dispatch(core.Event.EXCEED_BET_LIMIT);
          return false;
        }
        return true;
      }

      // check if the current bet action is valid
      protected validateBetAction(betDetail: data.BetDetail): boolean {
        const fieldAmounts = utils.arrayToKeyValue(this.uncfmBetDetails, 'field', 'amount');
        fieldAmounts[betDetail.field] += betDetail.amount;
        return this.validateFieldAmounts(fieldAmounts, this.totalUncfmBetAmount + betDetail.amount);
      }

      public resetUnconfirmedBet() {
        this.uncfmBetDetails = [
          { field: BetField.BANKER, amount: 0 },
          { field: BetField.PLAYER, amount: 0 },
          { field: BetField.TIE, amount: 0 },
          { field: BetField.BANKER_PAIR, amount: 0 },
          { field: BetField.PLAYER_PAIR, amount: 0 },
          { field: BetField.SUPER_SIX, amount: 0 },
          { field: BetField.SUPER_SIX_BANKER, amount: 0 },
        ];
        if (this.mapping) {
          Object.keys(this.mapping).forEach(value => {
            // console.log(value);
            this.mapping[value].setUncfmBet(0);
          });
        }
        this.totalUncfmBetAmount = 0;
      }

      public resetConfirmedBet() {
        this.betDetails = [
          { field: BetField.BANKER, amount: 0 },
          { field: BetField.PLAYER, amount: 0 },
          { field: BetField.TIE, amount: 0 },
          { field: BetField.BANKER_PAIR, amount: 0 },
          { field: BetField.PLAYER_PAIR, amount: 0 },
          { field: BetField.SUPER_SIX, amount: 0 },
          { field: BetField.SUPER_SIX_BANKER, amount: 0 },
        ];
        if (this.mapping) {
          Object.keys(this.mapping).forEach(value => {
            // console.log(value);
            this.mapping[value].setCfmBet(0);
          });
        }
      }

      public cancelBet() {
        this.resetUnconfirmedBet();
        this._gridTie.cancelBet();
        this._gridBanker.cancelBet();
        this._gridPlayer.cancelBet();
        this._gridPlayerPair.cancelBet();
        this._gridBankerPair.cancelBet();
        this._gridSuperSix.cancelBet();
        this._gridSuperSixBanker.cancelBet();
      }
      public onChangeLang() {
        this.changeLang();
      }
    }
  }
}
