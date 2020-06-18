// TypeScript file
namespace we {
  export namespace ssc {
    export class SSCBallButton extends eui.Group {
      private _value: string = '';
      private _betValue: string = '';
      private _image: eui.Image;
      private _lblValue: ui.RunTimeLabel;
      private _isActive: boolean;

      private _rowIndex: number;

      constructor(value: string, betValue: string, rowIndex: number = -1) {
        super();
        this._value = value;
        this._betValue = betValue;
        this._rowIndex = rowIndex;
        this.initComponents();
        this.touchChildren = false;
      }

      public initComponents() {
        const shape = new egret.Shape();
        shape.graphics.beginFill(0x214a72, 1);
        shape.graphics.drawCircle(25, 25, 25);
        shape.graphics.endFill();
        this.addChild(shape);
        shape.x = shape.y = 0;
        shape.width = shape.height = 50;

        this._lblValue = new ui.RunTimeLabel();
        this._lblValue.width = this._lblValue.height = 50;
        this._lblValue.size = 34;
        this._lblValue.alpha = 0.7;
        this._lblValue.text = this._value;
        this._lblValue.textAlign = 'center';
        this._lblValue.verticalAlign = 'middle';
        this.addChild(this._lblValue);
        // this._image = new eui.Image();
        //   this._image.source =
      }

      public get value() {
        return this._value;
      }

      public get betValue() {
        return this._betValue;
      }

      public get rowIndex() {
        return this._rowIndex;
      }

      public get isActive() {
        return this._isActive;
      }

      public toggleActive() {
        // image update
        if (this._isActive) {
          this._isActive = false;
        } else {
          this._isActive = true;
        }
      }

      public onHover() {}
    }
  }
}
