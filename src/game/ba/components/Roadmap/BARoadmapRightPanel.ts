namespace we {
  export namespace ba {
    export class BARoadmapRightPanel extends ui.Panel {
      public bigRoad: BABigRoad;
      public bigEyeRoad: BABigEyeRoad;
      public smallRoad: BASmallRoad;
      public cockroachRoad: BACockroachRoad;

      private iconBankerBead: BABeadRoadIcon;
      private iconPlayerBead: BABeadRoadIcon;
      private iconBankerBigEye: BABigEyeRoadIcon;
      private iconPlayerBigEye: BABigEyeRoadIcon;
      private iconBankerSmall: BASmallRoadIcon;
      private iconPlayerSmall: BASmallRoadIcon;
      private iconBankerCockroach: BACockroachRoadIcon;
      private iconPlayerCockroach: BACockroachRoadIcon;

      private iconBankerCount;
      private iconPlayerCount;
      private iconTieCount;
      private iconBankerPairCount;
      private iconPlayerPairCount;

      private bankerCountLabel: ui.RunTimeLabel;
      private playerCountLabel: ui.RunTimeLabel;
      private tieCountLabel: ui.RunTimeLabel;
      private bankerPairCountLabel: ui.RunTimeLabel;
      private playerPairCountLabel: ui.RunTimeLabel;
      private totalCountLabel: ui.RunTimeLabel;

      private roadsContainer: egret.DisplayObjectContainer;

      private gameIdLabel: ui.RunTimeLabel;
      private totalBetLabel: ui.RunTimeLabel;

      public constructor() {
        super('BARoadmapRightPanel');
      }
      protected mount() {
        this.init();
      }

      protected init() {
        const gridSize = 21;

        this.iconBankerBead = new BABeadRoadIcon(30);
        this.iconBankerBead.x = 22;
        this.iconBankerBead.y = 10;
        this.iconBankerBead.setByObject({ V: 'b' });
        this.addChild(this.iconBankerBead);

        this.iconBankerBigEye = new BABigEyeRoadIcon(15);
        this.iconBankerBigEye.x = 58;
        this.iconBankerBigEye.y = 16;
        this.iconBankerBigEye.setByObject({ V: 'b' });
        this.addChild(this.iconBankerBigEye);

        this.iconBankerSmall = new BASmallRoadIcon(15);
        this.iconBankerSmall.x = 76;
        this.iconBankerSmall.y = 16;
        this.iconBankerSmall.setByObject({ V: 'b' });
        this.addChild(this.iconBankerSmall);

        this.iconBankerCockroach = new BACockroachRoadIcon(15);
        this.iconBankerCockroach.x = 94;
        this.iconBankerCockroach.y = 16;
        this.iconBankerCockroach.setByObject({ V: 'b' });
        this.addChild(this.iconBankerCockroach);

        this.iconPlayerBead = new BABeadRoadIcon(30);
        this.iconPlayerBead.x = 124;
        this.iconPlayerBead.y = 10;
        this.iconPlayerBead.setByObject({ V: 'p' });
        this.addChild(this.iconPlayerBead);

        this.iconPlayerBigEye = new BABigEyeRoadIcon(15);
        this.iconPlayerBigEye.x = 160;
        this.iconPlayerBigEye.y = 16;
        this.iconPlayerBigEye.setByObject({ V: 'p' });
        this.addChild(this.iconPlayerBigEye);

        this.iconPlayerSmall = new BASmallRoadIcon(15);
        this.iconPlayerSmall.x = 178;
        this.iconPlayerSmall.y = 16;
        this.iconPlayerSmall.setByObject({ V: 'p' });
        this.addChild(this.iconPlayerSmall);

        this.iconPlayerCockroach = new BACockroachRoadIcon(15);
        this.iconPlayerCockroach.x = 196;
        this.iconPlayerCockroach.y = 16;
        this.iconPlayerCockroach.setByObject({ V: 'p' });
        this.addChild(this.iconPlayerCockroach);

        this.roadsContainer = new egret.DisplayObjectContainer();
        this.roadsContainer.x = 4;
        this.roadsContainer.y = 47;
        this.roadsContainer.scaleX = 690 / 693;
        this.roadsContainer.scaleY = 260 / 257;
        // this.roadsContainer.alpha = 0.5;
        this.addChild(this.roadsContainer);

        this.bigRoad = new BABigRoad(33, gridSize);
        this.bigRoad.x = 0;
        this.bigRoad.y = 0;
        this.roadsContainer.addChild(this.bigRoad);

        this.bigEyeRoad = new BABigEyeRoad(33 * 2, gridSize);
        this.bigEyeRoad.x = 0;
        this.bigEyeRoad.y = 6 * gridSize;
        this.roadsContainer.addChild(this.bigEyeRoad);

        this.smallRoad = new BASmallRoad(17 * 2, gridSize);
        this.smallRoad.x = 0;
        this.smallRoad.y = 6 * gridSize + 6 * (gridSize / 2);
        this.roadsContainer.addChild(this.smallRoad);

        this.cockroachRoad = new BACockroachRoad(16 * 2, gridSize);
        this.cockroachRoad.x = gridSize * 17;
        this.cockroachRoad.y = 6 * gridSize + 6 * (gridSize / 2);
        this.roadsContainer.addChild(this.cockroachRoad);
      }

      public setStats(b: number, p: number, t: number, bp: number, pp: number, total: number, b1: any, b2: any, b3: any, p1: any, p2: any, p3: any) {
        this.bankerCountLabel.text = b + '';
        this.playerCountLabel.text = p + '';
        this.tieCountLabel.text = t + '';
        this.bankerPairCountLabel.text = bp + '';
        this.playerPairCountLabel.text = pp + '';
        this.totalCountLabel.text = total + '';

        this.iconBankerBigEye.setByObject(b1);
        this.iconBankerSmall.setByObject(b2);
        this.iconBankerCockroach.setByObject(b3);

        this.iconPlayerBigEye.setByObject(p1);
        this.iconPlayerSmall.setByObject(p2);
        this.iconPlayerCockroach.setByObject(p3);
      }
    }
  }
}
