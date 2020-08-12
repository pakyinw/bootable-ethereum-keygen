namespace we {
  export namespace di {
    export class DiSizeBigRoad extends di.DiBigRoad {
      public constructor(_numCol: number = 12, _gridSize: number = 30, _scale: number = 1, _showResult: boolean = false) {
        super(_numCol, _gridSize, _scale, _showResult);
      }

      protected createIcon(size: number): DiSizeBigRoadIcon {
        return new DiSizeBigRoadIcon(size);
      }
    }
  }
}
