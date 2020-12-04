namespace we {
  export namespace dt {
    export class StatisticChartPanel extends ui.Panel {
      protected tableInfo: data.TableInfo;

      protected _leftHolder: we.dt.StatisticChartHolder;
      protected _rightHolder: we.dt.StatisticChartHolder;
      public constructor() {
        super();
      }

      public mount() {
        super.mount();
        this._leftHolder.setupChart1(() => i18n.t('dragontiger.DragonTigerTieRatioshoe'), false);
        this._rightHolder.setupChart1(() => i18n.t('dragontiger.DragonTigerTieRatio100'), false);
      }

      public setValue(tableInfo: data.TableInfo) {
        this.tableInfo = tableInfo;

        if (!this.tableInfo.gamestatistic) {
          return;
        } else {
          this.initData();
        }
      }

      protected initData() {
        const shoeInfo = we.utils.stat.dt.getStatInfo(true, this.tableInfo.gamestatistic);
        const normalInfo = we.utils.stat.dt.getStatInfo(false, this.tableInfo.gamestatistic);

        let info = {
          firstCount: shoeInfo.bankerCount,
          secondCount: shoeInfo.playerCount,
          thirdCount: shoeInfo.tieCount,
          firstPercentage: shoeInfo.bankerPercentage,
          secondPercentage: shoeInfo.playerPercentage,
          thirdPercentage: shoeInfo.tiePercentage,
          totalCount: shoeInfo.totalCount,
        };
        this._leftHolder.updateChart1(info);
        info = {
          firstCount: normalInfo.bankerCount,
          secondCount: normalInfo.playerCount,
          thirdCount: normalInfo.tieCount,
          firstPercentage: normalInfo.bankerPercentage,
          secondPercentage: normalInfo.playerPercentage,
          thirdPercentage: normalInfo.tiePercentage,
          totalCount: normalInfo.totalCount,
        };
	      this._rightHolder.updateChart1(info);
      }

      public update() {
        if (this.tableInfo && this.tableInfo.gamestatistic) {
          this.setValue(this.tableInfo);
        }
      }
    }
  }
}
