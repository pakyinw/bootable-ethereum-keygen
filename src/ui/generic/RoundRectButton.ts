namespace we {
  export namespace ui {
    export class RoundRectButton extends core.BaseEUI implements IButton {
      private _roundRectShape: RoundRectShape;
      public _label: RunTimeLabel;
      private _enabled: boolean = false;
      private _hover: boolean = false;
      private _active: boolean = false;
      private _click: boolean = false;

      public useColorFilter: boolean = false;
      public downColorOffset: number = -30;
      public hoverColorOffset: number = 30;

      public cornerTL_TR_BL_BR: string = ''; // eg. "8,8,0,0" for TL:8, TR:8, BL:0, BR:0
      public cornerTL: number = 8;
      public cornerTR: number = 8;
      public cornerBL: number = 8;
      public cornerBR: number = 8;

      // state - default
      public fillColor: string = '0x000000';
      public fillAlpha: number = 0;
      public stroke: number = 1;
      public strokeColor: number = 0x00ff00;
      public strokeAlpha: number = 1;
      public labelColor: number = 0xffffff;
      public strokeIn: number = 0;
      public strokeInColor: number = 0x0000ff;
      public strokeInAlpha: number = 1;

      // state - idle (all values = -2 will refer to the values in state - default)
      public fillColor_idle: string = '-2';
      public fillAlpha_idle: number = -2;
      public stroke_idle: number = -2;
      public strokeColor_idle: number = -2;
      public strokeAlpha_idle: number = -2;
      public labelColor_idle: number = -2;
      public strokeIn_idle: number = -2;
      public strokeInColor_idle: number = -2;
      public strokeInAlpha_idle: number = -2;

      // state - active (all values = -2 will refer to the values in state - default)
      public fillColor_active: string = '-2';
      public fillAlpha_active: number = -2;
      public stroke_active: number = -2;
      public strokeColor_active: number = -2;
      public strokeAlpha_active: number = -2;
      public labelColor_active: number = -2;
      public strokeIn_active: number = -2;
      public strokeInColor_active: number = -2;
      public strokeInAlpha_active: number = -2;

      // state - disabled (all values = -2 will refer to the values in state - default)
      public fillColor_disabled: string = '-2';
      public fillAlpha_disabled: number = -2;
      public stroke_disabled: number = -2;
      public strokeColor_disabled: number = -2;
      public strokeAlpha_disabled: number = -2;
      public labelColor_disabled: number = -2;
      public strokeIn_disabled: number = -2;
      public strokeInColor_disabled: number = -2;
      public strokeInAlpha_disabled: number = -2;

      // state - click (all values = -2 will refer to the values in state - default)
      public fillColor_click: string = '-2';
      public fillAlpha_click: number = -2;
      public stroke_click: number = -2;
      public strokeColor_click: number = -2;
      public strokeAlpha_click: number = -2;
      public labelColor_click: number = -2;
      public strokeIn_click: number = -2;
      public strokeInColor_click: number = -2;
      public strokeInAlpha_click: number = -2;

      // state - hover (all values = -2 will refer to the values in state - default)
      public fillColor_hover: string = '-2';
      public fillAlpha_hover: number = -2;
      public stroke_hover: number = -2;
      public strokeColor_hover: number = -2;
      public strokeAlpha_hover: number = -2;
      public labelColor_hover: number = -2;
      public strokeIn_hover: number = -2;
      public strokeInColor_hover: number = -2;
      public strokeInAlpha_hover: number = -2;
      public labelSize: number = 24;

      public value: number = 0;

      protected mount() {
        this._roundRectShape = new RoundRectShape();
        this.addChildAt(this._roundRectShape, 0);
        if (this.cornerTL_TR_BL_BR !== '') {
          const corners = this.cornerTL_TR_BL_BR.split(' ').join('').split(',');
          this.cornerTL = parseInt(corners[0], 10);
          this.cornerTR = parseInt(corners[1], 10);
          this.cornerBL = parseInt(corners[2], 10);
          this.cornerBR = parseInt(corners[3], 10);
        }

        this._roundRectShape.setRoundRectStyle(
          this.width,
          this.height,
          { tl: this.cornerTL, tr: this.cornerTR, bl: this.cornerBL, br: this.cornerBR },
          this.fillColor,
          this.fillAlpha,
          this.stroke,
          this.strokeColor,
          this.strokeAlpha
        );

        if (!this._label) {
          this._label = new RunTimeLabel();
          this._label.horizontalCenter = 0;
          this._label.verticalCenter = 0;
          // this._label.top = 10;
          // this._label.bottom = 10;
          // this._label.left = 20;
          // this._label.right = 20;
          // this._label.width = this.width - 40;
          this._label.targetWidth = this.width - 80;
          this._label.verticalAlign = 'middle';
          this._label.textAlign = 'center';
          this._label.size = this.labelSize;
          this.addChild(this._label);
          // this._label.text = 'Hello';
          // left="20" right="20" top="10" bottom="10" verticalAlign="middle" textAlign="center" size="24" alpha="0.7" alpha.active="1" alpha.click="1" alpha.hover="1" bold.hover="true"
        }
        this.touchChildren = false;
        this.buttonEnabled = true;
        mouse.setButtonMode(this, true);
      }

      public $setWidth(val: number) {
        super.$setWidth(val);
        if (this._label) {
          // this._label.width = this.width - 40;
          this._label.targetWidth = this.width - 80;
        }
      }

      public set buttonEnabled(b: boolean) {
        if (b === this._enabled) {
          return;
        }

        if (b) {
          this.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
          this.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
          this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchDown, this);
          this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchUp, this);
          this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
          mouse.setButtonMode(this, true);
        } else {
          this.removeEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
          this.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
          this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchDown, this);
          this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchUp, this);
          this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
          mouse.setButtonMode(this, false);
        }
        this._enabled = b;
        this.update();
      }

      public get label(): RunTimeLabel {
        return this._label;
      }

      public set label(l: ui.RunTimeLabel) {
        this._label = l;
      }

      public set active(b) {
        this._active = b;
        this.update();
      }

      public get active(): boolean {
        return this._active;
      }

      private onRollover() {
        this._hover = true;
        this.update();
      }

      private onRollout() {
        this._hover = false;
        this._click = false;
        this.update();
      }

      private onTouchDown() {
        this._click = true;
        this.update();
      }

      private onTouchUp() {
        this._click = false;
        this.update();
      }

      private onClick() {
        this.dispatchEvent(new egret.Event('CLICKED'));
      }

      private update() {
        if (!this._enabled) {
          this.currentState = 'disabled';
        } else if (this._click) {
          this.currentState = 'click';
        } else if (this._active) {
          this.currentState = 'active';
        } else if (this._hover) {
          this.currentState = 'hover';
        } else {
          this.currentState = 'idle';
        }

        const fillColor = this['fillColor_' + this.currentState] === '-2' ? this.fillColor : this['fillColor_' + this.currentState];
        const fillAlpha = this['fillAlpha_' + this.currentState] === -2 ? this.fillAlpha : this['fillAlpha_' + this.currentState];
        const stroke = this['stroke_' + this.currentState] === -2 ? this.stroke : this['stroke_' + this.currentState];
        const strokeColor = this['strokeColor_' + this.currentState] === -2 ? this.strokeColor : this['strokeColor_' + this.currentState];
        const strokeAlpha = this['strokeAlpha_' + this.currentState] === -2 ? this.strokeAlpha : this['strokeAlpha_' + this.currentState];
        const labelColor = this['labelColor_' + this.currentState] === -2 ? this.labelColor : this['labelColor_' + this.currentState];
        const strokeIn = this['strokeIn_' + this.currentState] === -2 ? this.strokeIn : this['strokeIn_' + this.currentState];
        const strokeInColor = this['strokeInColor_' + this.currentState] === -2 ? this.strokeInColor : this['strokeInColor_' + this.currentState];
        const strokeInAlpha = this['strokeInAlpha_' + this.currentState] === -2 ? this.strokeInAlpha : this['strokeInAlpha_' + this.currentState];

        this._roundRectShape.setRoundRectStyle(
          this.width,
          this.height,
          { tl: this.cornerTL, tr: this.cornerTR, bl: this.cornerBL, br: this.cornerBR },
          fillColor,
          fillAlpha,
          stroke,
          strokeColor,
          strokeAlpha,
          strokeIn,
          strokeInColor,
          strokeInAlpha
        );
        this._label.textColor = labelColor;

        if (this.useColorFilter) {
          this.updateColorFilter(this.currentState);
        }
      }

      protected updateColorFilter(buttonState) {
        let colorMatrix;
        let offset = 0;
        switch (buttonState) {
          case 'hover':
            offset = this.hoverColorOffset;
            break;
          case 'down':
            offset = this.downColorOffset;
            break;
        }
        if (buttonState === 'disabled') {
          colorMatrix = [0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0, 0, 0, 1, 0];
        } else {
          colorMatrix = [1, 0, 0, 0, offset, 0, 1, 0, 0, offset, 0, 0, 1, 0, offset, 0, 0, 0, 1, 0];
        }
        const colorFilter = new egret.ColorMatrixFilter(colorMatrix);
        this.filters = [colorFilter];
      }
    }
  }
}
