namespace we {
  export namespace live {
    export class LiveBaccaratListHolder extends ui.ItemRenderer {
      public selected: boolean;
      public itemIndex: number;

      private _item: we.live.LiveBaccaratListItem;
      protected destinationX: number = Infinity;
      protected destinationY: number = Infinity;
      protected isDirty = true;

      public constructor() {
        super();
        this.touchEnabled = true;
        this.mount();
      }

      private async mount() {
        this.height = 388;
        this.width = 578;
        console.log('we.live.LiveBaccaratListHolder::mount()');
        console.log(this.itemData);
        this._item = new we.live.LiveBaccaratListItem(this.itemData);

        this.addChild(this._item);
      }

      public itemDataChanged() {
        super.itemDataChanged();
        console.log('::itemDataChanged');
        console.log(this.itemData);
        const table = env.tableInfos[this.itemData];
        this._item.bigRoad.updateRoadData(table.roadmap);
        egret.Tween.removeTweens(this);
      }
    }
  }
}
