namespace baccarat {
  export class BARoadmap extends egret.DisplayObjectContainer {
    private beadRoad: baccarat.BABeadRoad;
    private bigRoad: baccarat.BABigRoad;
    private bigEyeRoad: baccarat.BABigEyeRoad;
    private smallRoad: baccarat.BASmallRoad;
    private cockroachRoad: baccarat.BACockroachRoad;
    private tableid: string;

    private parser: baccarat.BARoadParser;

    public constructor(tableid: string) {
      super();
      this.parser = new baccarat.BARoadParser(12);
      // this.parser.addEventListener('onUpdate', this.onParserUpdate, this);

      this.beadRoad = new baccarat.BABeadRoad();
      this.beadRoad.x = 10;
      this.beadRoad.y = 10;
      this.addChild(this.beadRoad);

      this.bigRoad = new baccarat.BABigRoad();
      this.bigRoad.x = 10;
      this.bigRoad.y = 200;
      this.addChild(this.bigRoad);

      this.bigEyeRoad = new baccarat.BABigEyeRoad();
      this.bigEyeRoad.x = 10;
      this.bigEyeRoad.y = 400;
      this.addChild(this.bigEyeRoad);

      this.smallRoad = new baccarat.BASmallRoad();
      this.smallRoad.x = 10;
      this.smallRoad.y = 500;
      this.addChild(this.smallRoad);

      this.cockroachRoad = new baccarat.BACockroachRoad();
      this.cockroachRoad.x = 10;
      this.cockroachRoad.y = 600;
      this.addChild(this.cockroachRoad);

      this.tableid = tableid;
      this.onParserUpdate(null);
      /*
      this.parser.parseData([
        { v: 'b', b: 1, p: 0, w: 10 },
        { v: 'b', b: 0, p: 0, w: 6 },
        { v: 't', b: 0, p: 0, w: 10 },
        { v: 'p', b: 0, p: 0, w: 10 },
        { v: 'p', b: 0, p: 1, w: 10 },
        { v: 'p', b: 0, p: 0, w: 10 },
        { v: 'b', b: 0, p: 0, w: 10 },
        { v: 'p', b: 0, p: 0, w: 5 },
        { v: 't', b: 0, p: 0, w: 10 },
        { v: 't', b: 0, p: 0, w: 10 },
        { v: 'b', b: 1, p: 0, w: 5 },
        { v: 'b', b: 1, p: 1, w: 10 },
        { v: 'b', b: 1, p: 0, w: 10 },
        { v: 't', b: 0, p: 0, w: 10 },
        { v: 't', b: 0, p: 0, w: 10 },
        { v: 't', b: 0, p: 0, w: 4 },
        { v: 'b', b: 1, p: 0, w: 10 },
        { v: 'b', b: 1, p: 1, w: 10 },
        { v: 'p', b: 1, p: 0, w: 10 },
        { v: 'p', b: 1, p: 1, w: 10 },
        { v: 'p', b: 1, p: 0, w: 8 },
        { v: 'b', b: 1, p: 0, w: 9 },
      ]);
*/
      this.touchEnabled = true;
      this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }

    private onClick(e: egret.TouchEvent) {
      this.parser.predictWin(0);
    }

    private onParserUpdate(e: egret.Event) {
      if (env.tableInfos[this.tableid]) {
        if (env.tableInfos[this.tableid].roadmap) {
          this.parser.parseData(env.tableInfos[this.tableid].roadmap);
        }
      }

      console.dir('beadRoad: -');
      console.dir(this.parser.beadRoadResult);
      console.dir('bigRoad: -');
      console.dir(this.parser.bigRoadResult);

      if (this.parser.beadRoadResult) {
        this.beadRoad.parseRoadData(this.parser.beadRoadResult);
      }

      if (this.parser.bigRoadResult) {
        this.bigRoad.parseRoadData(this.parser.bigRoadResult);
      }

      if (this.parser.bigEyeRoadResult) {
        this.bigEyeRoad.parseRoadData(this.parser.bigEyeRoadResult);
      }

      if (this.parser.smallRoadResult) {
        this.smallRoad.parseRoadData(this.parser.smallRoadResult);
      }

      if (this.parser.cockroachRoadResult) {
        this.cockroachRoad.parseRoadData(this.parser.cockroachRoadResult);
      }
    }
    /*
    private onRoadDataUpdate(e: egret.Event) {
      this.parser.parseData(env.tableHistory);
    }*/

    public updateRoadData(roadmapData: any) {
      this.parser.parseData(roadmapData);
    }

    private onRoadDisplayUpdate(e: egret.Event) {
      this.beadRoad.parseRoadData(env.tableHistory.Bead);
      this.bigRoad.parseRoadData(env.tableHistory.BigRoad);
      this.bigEyeRoad.parseRoadData(env.tableHistory.BigEye);
      this.smallRoad.parseRoadData(env.tableHistory.Small);
      this.cockroachRoad.parseRoadData(env.tableHistory.Roach);
    }

    public dispose() {
      if (this.parser.hasEventListener('onUpdate')) {
        this.parser.removeEventListener('onUpdate', this.onParserUpdate, this);
      }
    }
  }
}
