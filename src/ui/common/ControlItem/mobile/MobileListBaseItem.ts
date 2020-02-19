/* tslint:disable triple-equals */
namespace we {
  export namespace ui {
    export class MobileListBaseItem extends ControlItem {
      protected _tweenInterval1: number = 250;

      protected _quickBetButton: BaseImageButton;
      protected _enterTableButton: BaseImageButton;
      protected _buttonGroup: eui.Group;
      protected _dimmer: eui.Component;

      protected _buttonGroupShowY: number;
      protected _buttonGroupHideY: number;

      protected _isButtonGroupShow: boolean = false;

      public constructor(skinName: string = null) {
        super(skinName);

        this.initCustomPos();
        this.initPos();
      }

      protected initCustomPos() {
        this._buttonGroupShowY = 150;
        this._buttonGroupHideY = 200;
      }

      protected initPos() {}

      protected initChildren() {
        super.initChildren();
        const shape = new egret.Shape();
        shape.graphics.beginFill(0xffffff, 1);
        shape.graphics.drawRoundRect(0, 0, this.width, this.height, 48, 48);
        shape.graphics.endFill();

        this._contentContainer.addChild(shape);
        this._contentContainer.mask = shape;
        this._buttonGroup.alpha = 0;
        this._buttonGroup.y = this._buttonGroupHideY;
        this._buttonGroup.visible = false;

        this._quickBetButton.useColorFilter = true;
        this._enterTableButton.useColorFilter = true;

        this._quickBetButton.label.renderText = () => {
          return i18n.t('mobile_quick_bet_button_label');
        };
        this._enterTableButton.label.renderText = () => {
          return i18n.t('mobile_enter_table_button_label');
        };
      }

      public getActionButton(): eui.Component {
        return this._quickBetButton;
      }

      protected onTouchTap(evt: egret.Event) {
        if (evt.target === this._dropdown.toggler || evt.target === this) {
          evt.stopPropagation();
          return;
        }

        if (this._isButtonGroupShow) {
          this.hideButtonGroup();
        } else {
          this.showButtonGroup();
        }
      }

      public onOutFocus() {
        super.onOutFocus();
        this.hideButtonGroup();
      }

      protected addEventListeners() {
        super.addEventListeners();
        this._quickBetButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickQuickBetButton, this);
        this._enterTableButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickEnterRoomButton, this);
      }

      protected removeEventListeners() {
        super.removeEventListeners();
        this._quickBetButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickQuickBetButton, this);
        this._enterTableButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickEnterRoomButton, this);
      }

      protected showButtonGroup() {
        this._isButtonGroupShow = true;
        this._dimmer.visible = true;
        this.holder.changeState(ui.TableListItemHolder.STATE_FOCUS);
        egret.Tween.removeTweens(this._buttonGroup);
        this._buttonGroup.alpha = 0;
        this._buttonGroup.y = this._buttonGroupHideY;
        this._buttonGroup.visible = true;
        egret.Tween.get(this._buttonGroup).to({ y: this._buttonGroupShowY, alpha: 1 }, this._tweenInterval1);
      }

      protected hideButtonGroup() {
        this._isButtonGroupShow = false;
        this._dimmer.visible = false;
        egret.Tween.removeTweens(this._buttonGroup);

        egret.Tween.get(this._buttonGroup)
          .to({ y: this._buttonGroupHideY, alpha: 0 }, this._tweenInterval1)
          .call(() => {
            this._buttonGroup.visible = false;
          });

        if (this.holder.isFocus) {
          this.holder.changeState(ui.TableListItemHolder.STATE_NORMAL);
        }
      }

      public onClickQuickBetButton(evt: egret.Event) {
        // show quick bet popover panel
      }

      public onClickEnterRoomButton(evt: egret.Event) {
        // enter game room
        this.gotoScene();
      }

      protected gotoScene() {
        const gameType = env.tableInfos[this._tableId].gametype;
        switch (gameType) {
          case core.GameType.BAC:
          case core.GameType.BAS:
          case core.GameType.BAI:
            dir.sceneCtr.goto('ba', { tableid: this._tableId });
            break;
          case core.GameType.DT:
            dir.sceneCtr.goto('dt', { tableid: this._tableId });
            break;
          case core.GameType.RO:
            dir.sceneCtr.goto('ro', { tableid: this._tableId });
            break;
          default:
            console.error('error in TableListItemHolder');
            break;
        }
      }

      protected setBetRelatedComponentsEnabled(enable) {
        super.setBetRelatedComponentsEnabled(enable);
        this._quickBetButton.enabled = enable;
        this._quickBetButton.buttonEnabled = enable;
      }

      public onRollover(evt: egret.Event) {}

      public onRollout(evt: egret.Event) {}
    }
  }
}
