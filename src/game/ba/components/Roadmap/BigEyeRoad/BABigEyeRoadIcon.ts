namespace we {
  export namespace ba {
    export class BABigEyeRoadIcon extends BARoadIconBase {
      private iconFaceArr: egret.DisplayObjectContainer[];
      private iconFace: egret.DisplayObjectContainer;

      public constructor(size: number = 30) {
        super(size);

        // this.initGraphics();
        this.setByObject({});
      }

      // protected initGraphics() {
      //   this.iconFaceArr = new Array<egret.DisplayObjectContainer>();
      //   this.iconFace = new egret.DisplayObjectContainer();
      //   this.addChild(this.iconFace);

      //   const colors = [0xee2e2e, 0x3531ec, 0xaa0000, 0x0000aa];
      //   const iconSize = this.size;
      //   const circleRadius = (this.size / 2) * 0.8;
      //   const lineWidth = 1.5;

      //   // draw the dark modes
      //   for (let d = 0; d < 2; d++) {
      //     // draw the icon faces
      //     for (let i = 0; i < 2; i++) {
      //       const face = new egret.DisplayObjectContainer();
      //       const circle = new egret.Shape();
      //       circle.graphics.lineStyle(lineWidth, colors[i + d * 2], 1, true);
      //       circle.graphics.drawCircle(iconSize / 2, iconSize / 2, circleRadius - lineWidth);
      //       circle.graphics.endFill();
      //       face.addChild(circle);
      //       face.visible = false;
      //       this.iconFaceArr.push(face);
      //       this.iconFace.addChild(face);
      //     }
      //   }
      // }

      // public setByObject(value: any) {
      //   this.reset();

      //   const useDarkMode = this.darkModeNumber === 0 ? 0 : 2;

      //   if (value.v) {
      //     if (value.v === 'b') {
      //       this.iconFaceArr[0 + useDarkMode].visible = true;
      //     } else if (value.v === 'p') {
      //       this.iconFaceArr[1 + useDarkMode].visible = true;
      //     }
      //   }
      // }

      public updateDisplay() {
        super.updateDisplay();
        const value = this.value;

        const colors = [0xdb0011, 0x167cc, 0xc2263e, 0x0c5ec3];
        const iconSize = this.size;
        const circleRadius = (this.size / 2) * 0.8;
        const lineWidth = 1.5;

        const useDarkMode = this.darkModeNumber === 0 ? 0 : 2;
        let colorIdx = 0;

        if (value.v === 'b' || value.v === 'p') {
          switch (value.v) {
            case 'b':
              colorIdx = 0 + useDarkMode;
              break;
            case 'p':
              colorIdx = 1 + useDarkMode;
              break;
          }
          this._iconShape.graphics.lineStyle(lineWidth, colors[colorIdx], 1, true);
          this._iconShape.graphics.drawCircle(iconSize / 2, iconSize / 2, circleRadius - lineWidth);
          this._iconShape.graphics.endFill();
        }
      }

      public reset() {
        // for (const face of this.iconFaceArr) {
        //   face.visible = false;
        // }
      }
    }
  }
}
