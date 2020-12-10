namespace we {
  export namespace dil {
    export class LeftPanel extends core.BaseGamePanel {
      protected _chipLayer: we.ui.ChipLayer;
      protected _coinGroup: eui.Group;

      protected gameIdLabel: ui.RunTimeLabel;
      protected totalBetLabel: ui.RunTimeLabel;
      protected gameId: string;
      protected totalBet: number;
      protected btnHotCold: ui.BaseImageButton;
      protected btnHistory: ui.BaseImageButton;
      protected btnRoads: ui.BaseImageButton;

      protected pageRadioBtn1: eui.RadioButton;
      protected pageRadioBtn2: eui.RadioButton;

      protected activeLine: egret.Shape;

      protected pageStack: eui.ViewStack;
      protected roadStack: eui.ViewStack;

      protected _page2Bg: eui.Rect;

      public beadRoad: DilBeadRoad;

      // new for di
      // protected beadRadioBtn1: eui.RadioButton;
      // protected beadRadioBtn2: eui.RadioButton;
      protected isExpanded: boolean;
      protected toggleUpDownButton: eui.ToggleSwitch;

      protected bg: ui.RoundRectShape;
      protected border: ui.RoundRectShape;

      protected _factory: dragonBones.EgretFactory;
      protected _displays: dragonBones.EgretArmatureDisplay[];

      public constructor(skin?: string) {
        super(skin ? skin : env.isMobile ? '' : 'DilLeftPanel');
      }

      public set chipLayer(value: we.ui.ChipLayer) {
        this._chipLayer = value;
      }

      public changeLang() {
        this.gameIdLabel.text = i18n.t('baccarat.gameroundid') + ' ' + this.gameId;
        this.totalBetLabel.text = i18n.t('baccarat.totalbet') + ' ' + utils.numberToFaceValue(this.totalBet);

        this.pageRadioBtn1['labelDisplayDown']['text'] = this.pageRadioBtn1['labelDisplayUp']['text'] = i18n.t('dice.luckyNumber');
        this.pageRadioBtn2['labelDisplayDown']['text'] = this.pageRadioBtn2['labelDisplayUp']['text'] = i18n.t('dice.history');

        this.updateActiveLine(false);
      }

      protected init() {
        this.gameId = '';
        this.totalBet = 0;

        this.activeLine = new egret.Shape();
        const gr = this.activeLine.graphics;
        const matrix = new egret.Matrix();
        matrix.createGradientBox(100, 3);

        gr.beginGradientFill(egret.GradientType.LINEAR, [0x52d7ff, 0x5273ef], [1, 1], [0, 255], matrix);
        gr.drawRect(0, 0, 100, 3);
        gr.endFill();
        this.addChild(this.activeLine);
        this.activeLine.y = 332;

        const page1Group = this.pageStack.getChildAt(0) as eui.Group;

        this.beadRoad = new DilBeadRoad(7, 8, 56, 1, 16, 18, 0x262a2b, 1, true); // in game
        this.beadRoad.x = 10;
        this.beadRoad.y = 20;
        this.beadRoad.scaleX = 689 / 689;
        this.beadRoad.scaleY = 689 / 689;
        this.beadRoad.expandRoad(false);

        // add bead road to page stack 1
        const page2Group = this.pageStack.getChildAt(1) as eui.Group;
        page2Group.addChild(this.beadRoad);

        // dir.evtHandler.addEventListener(core.Event.TABLE_BET_INFO_UPDATE, this.onTableBetInfoUpdate, this);
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        this.pageRadioBtn1.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);
        this.pageRadioBtn2.addEventListener(eui.UIEvent.CHANGE, this.onViewChange, this);

        this.toggleUpDownButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToggleUpDown, this, true);
        this.toggleUpDownButton.visible = false;
        this.changeLang();
      }
      public onToggleUpDown(evt: egret.TouchEvent) {
        this.expandPanel(!this.isExpanded);
      }

      public expandPanel(expand: boolean) {
        const diffHeight = 297;
        if (!this.isExpanded && expand) {
          this.bg.height = 340 + diffHeight;
          this.bg.setRoundRectStyle(580, 340 + diffHeight, { tl: 14, tr: 14, br: 14, bl: 14 }, '0x1f242b', 1, 0);
          this.bg.y -= diffHeight;
          this.border.height = 340 + diffHeight;
          this.border.setRoundRectStyle(580, 340 + diffHeight, { tl: 14, tr: 14, br: 14, bl: 14 }, '0x1f242b', -1, 2, 0x3a3f48);
          this.border.y -= diffHeight;
          this._page2Bg.height = 250 + diffHeight;
          this._page2Bg.y -= diffHeight;

          (this.pageStack.getChildAt(0) as eui.Group).height += diffHeight;
          (this.pageStack.getChildAt(0) as eui.Group).y -= diffHeight;

          this.gameIdLabel.y -= diffHeight;
          this.totalBetLabel.y -= diffHeight;

          // this.beadRadioBtn1.y += diffHeight;
          // this.beadRadioBtn2.y += diffHeight;
          this.beadRoad.expandRoad(true);
          this.beadRoad.y -= diffHeight;
          this.isExpanded = true;

          this.toggleUpDownButton.currentState = 'b_down';
        } else if (this.isExpanded && !expand) {
          this.bg.height = 340;
          this.bg.setRoundRectStyle(580, 340, { tl: 14, tr: 14, br: 14, bl: 14 }, '0x1f242b', 1, 0);
          this.bg.y += diffHeight;
          this.border.height = 340;
          this.border.setRoundRectStyle(580, 340, { tl: 14, tr: 14, br: 14, bl: 14 }, '0x1f242b', -1, 2, 0x3a3f48);
          this.border.y += diffHeight;
          this._page2Bg.height = 250;
          this._page2Bg.y += diffHeight;

          (this.pageStack.getChildAt(0) as eui.Group).height -= diffHeight;
          (this.pageStack.getChildAt(0) as eui.Group).y += diffHeight;

          this.gameIdLabel.y += diffHeight;
          this.totalBetLabel.y += diffHeight;

          // this.beadRadioBtn1.y -= diffHeight;
          // this.beadRadioBtn2.y -= diffHeight;
          this.beadRoad.expandRoad(false);
          this.beadRoad.y += diffHeight;
          this.isExpanded = false;

          this.toggleUpDownButton.currentState = 'b_up';
        }
      }

      protected onRoadChange(e: eui.UIEvent) {
        const radio: eui.RadioButton = e.target;
        this.roadStack.selectedIndex = radio.value;
      }

      protected onViewChange(e: eui.UIEvent) {
        const radio: eui.RadioButton = e.target;
        this.pageStack.selectedIndex = radio.value;
        if (this.pageStack.selectedIndex === 0) {
          this.expandPanel(false);
          this.toggleUpDownButton.visible = false;
        } else {
          this.toggleUpDownButton.visible = true;
        }
        this.updateActiveLine(true);
      }

      protected updateActiveLine(useEasing: boolean) {
        const radioButtons = [this.pageRadioBtn1, this.pageRadioBtn2];
        const btn = radioButtons[this.pageStack.selectedIndex];

        radioButtons.forEach(element => {
          if (element === btn) {
            element.currentState = 'upAndSelected';
          } else {
            element.currentState = 'up';
          }
        });
        btn.validateNow();
        const w = btn['labelDisplayDown']['textWidth'];
        const x = btn.x + (btn.width - w) * 0.5;

        egret.Tween.removeTweens(this.activeLine);
        if (useEasing) {
          egret.Tween.get(this.activeLine).to({ x, scaleX: w / 100 }, 300, egret.Ease.quartOut);
        } else {
          this.activeLine.x = x;
          this.activeLine.scaleX = w / 100;
        }
      }

      public update() {
        super.update();
        if (this.tableInfo) {
          this.gameId = this.tableInfo.data.gameroundid;
          this.gameIdLabel.text = i18n.t('baccarat.gameroundid') + ' ' + this.gameId;
        }
      }

      public updateTableBetInfo() {
        if (this.tableInfo.betInfo) {
          this.totalBet = this.tableInfo.betInfo.gameroundid === this.tableInfo.data.gameroundid ? this.tableInfo.totalBet : 0;
          this.totalBetLabel.text = i18n.t('baccarat.totalbet') + ' ' + utils.numberToFaceValue(this.totalBet);
        }
      }

      // protected onTableBetInfoUpdate(evt: egret.Event) {
      //   if (evt.data) {
      //     const betInfo = evt.data;
      //     if (betInfo.tableid === this.tableInfo.tableid) {
      //       this.totalBet = evt.data.total;
      //       this.totalBetLabel.text = i18n.t('baccarat.totalbet') + ' ' + utils.numberToFaceValue(this.totalBet);
      //     }
      //   }
      // }

      protected createLuckyCoinAnim() {
        if (!this._factory) {
          const skeletonData = RES.getRes(`dice_w_game_result_ske_json`);
          const textureData = RES.getRes(`dice_w_game_result_tex_json`);
          const texture = RES.getRes(`dice_w_game_result_tex_png`);
          const factory = new dragonBones.EgretFactory();
          factory.parseDragonBonesData(skeletonData);
          factory.parseTextureAtlasData(textureData, texture);
          this._factory = factory;
        }
        return this._factory.buildArmatureDisplay('draw_number');
      }

      public updateLuckyNumbers() {
        this.clearLuckyNumbers();

        if (!(this.tableInfo && this.tableInfo.data && this.tableInfo.data.luckynumber)) {
          return;
        }

        const luckyNumbers = this.tableInfo.data.luckynumber;
        const noOfLuckNum = Object.keys(luckyNumbers).length > 3 ? 3 : Object.keys(luckyNumbers).length;

        // 18 = 668 - 5 * 112
        let x = (580 - (noOfLuckNum - 1) * 13 - noOfLuckNum * 175) / 2;
        let firstCoin = true;

        this._displays = [];

        for (const key of Object.keys(luckyNumbers)) {
          const animName = this.getAnimName(+key);

          const coinGroup = new eui.Group();
          coinGroup.x = x;
          coinGroup.y = 10;
          coinGroup.width = 175;
          coinGroup.height = 213;

          const coinAnim = this.createLuckyCoinAnim();
          utils.dblistenToSoundEffect(coinAnim);
          coinAnim.width = 175;
          coinAnim.height = 213;
          // 112 + 18

          const oddSlot = coinAnim.armature.getSlot(`${animName}_odds`);
          oddSlot.display = this.getOddSlotGroup(luckyNumbers[key]);

          const numberSlot = coinAnim.armature.getSlot(`${animName}_number`);
          numberSlot.display = this.getNumberSlotGroup(+key);

          x += 188;

          coinGroup.addChild(coinAnim);
          coinGroup.visible = false;

          this._coinGroup.addChild(coinGroup);
          this._displays.push(coinAnim);

          if (!this._chipLayer) {
            return;
          }

          const betDetails = this._chipLayer.getConfirmedBetDetails();

          if (betDetails) {
            betDetails.map((detail, index) => {
              if (!detail || !detail.field || !detail.amount) {
                return;
              }

              const f = this.fieldToValue(detail.field);

              if (key === f) {
                // const chipSlot = coinAnim.armature.getSlot('chips');
                // chipSlot.display = this.getChipSlotGroup(detail.amount / 100);
                // noBet = '';
              }
            });
          }

          (async () => {
            if (!firstCoin) {
              await we.utils.sleep(400);
            }

            if (coinAnim.animation) {
              const p = we.utils.waitDragonBone(coinAnim);
              coinAnim.animation.play(`${animName}_in`, 1);
              coinAnim.visible = true;
              await p;
            }
            if (coinAnim.animation) {
              const p = we.utils.waitDragonBone(coinAnim);
              coinAnim.animation.play(`${animName}_loop`, 4);
              await p;
            }
            if (coinAnim.animation) {
              const p = we.utils.waitDragonBone(coinAnim);
              coinAnim.animation.play(`${animName}_out`, 1);
              await p;
            }

            coinAnim.animation.stop();

            this._coinGroup.removeChildren();
          })();
          firstCoin = false;
        }
      }

      protected getOddSlotGroup(odd: number) {
        const label = new eui.Label();
        label.fontFamily = 'Barlow';
        label.text = odd.toString() + 'x';
        label.size = 50;
        label.textColor = 0x2ab9c6;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;
        label.width = 112;
        label.anchorOffsetX = 56;
        label.anchorOffsetY = 15;

        const group = new eui.Group();
        group.addChild(label);

        return group;
      }

      protected getNumberSlotGroup(num: number) {
        const label = new eui.Label();
        label.fontFamily = 'Barlow';
        label.text = num.toString();
        label.size = 120;
        label.textColor = 0x2ab9c6;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalAlign = egret.VerticalAlign.MIDDLE;
        label.width = 300;
        label.anchorOffsetX = 150;
        label.anchorOffsetY = 40;
        label.bold = true;
        const color: number = 0x33ccff;
        const alpha: number = 0.8;
        const blurX: number = 35;
        const blurY: number = 35;
        const strength: number = 2;
        const quality: number = egret.BitmapFilterQuality.HIGH;
        const inner: boolean = false;
        const knockout: boolean = false;
        const glowFilter: egret.GlowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
        label.filters = [glowFilter];

        const group = new eui.Group();
        group.addChild(label);

        return group;
      }

      protected getChipSlotGroup(amount) {
        const coin = new LuckyCoin();

        coin.anchorOffsetX = 90;
        coin.anchorOffsetY = 90;
        coin.amount = amount;
        coin.height = 180;
        coin.width = 180;

        const group = new eui.Group();
        group.addChild(coin);

        return group;
      }

      public destroy() {
        this.clearLuckyNumbers();
        if (this._factory) {
          this._factory.clear(true);
        }
        super.destroy();

        egret.Tween.removeTweens(this.activeLine);
        if (dir.evtHandler.hasEventListener(core.Event.SWITCH_LANGUAGE)) {
          dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        }
        // dir.evtHandler.removeEventListener(core.Event.TABLE_BET_INFO_UPDATE, this.onTableBetInfoUpdate, this);
      }

      public clearLuckyNumbers() {
        if (this._displays) {
          for (const display of this._displays) {
            if (display) {
              if (display.animation) {
                display.animation.stop();
              }
              // dragonBones.WorldClock.clock.remove(display.armature);
              display.armature.dispose();
              display.dispose();
              if (display.parent) {
                display.parent.removeChild(display);
              }
            }
          }
          this._displays = null;
        }
      }

      protected fieldToValue(fieldName: string) {
        if (!fieldName) {
          return null;
        }
        if (fieldName.indexOf('SUM_') === -1) {
          return null;
        }
        const result = fieldName.split('SUM_');
        if (result && result[1]) {
          return result[1];
        }
        return null;
      }

      public getAnimName(sum: number) {
        let animName;
        if (sum <= 10) {
          const firstPart = sum;
          const secondPart = 21 - sum;
          animName = `${firstPart}_${secondPart}`;
        } else {
          const firstPart = 21 - sum;
          const secondPart = sum;
          animName = `${firstPart}_${secondPart}`;
        }
        return animName;
      }
    }
  }
}
