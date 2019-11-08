namespace we {
  export namespace ui {
    export class BetInfoList extends eui.Component {
      private scroller: we.ui.Scroller;
      private collection: eui.ArrayCollection;
      private betInfos: number[] = [1, 2, 3];

      constructor() {
        super();
        this.height = 1000;
        this.scroller = new we.ui.Scroller();
        this.scroller.percentWidth = 100;
        this.scroller.percentHeight = 100;
        this.addChild(this.scroller);
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected createChildren() {
        super.createChildren();
      }
      protected childrenCreated() {
        super.childrenCreated();

        // init viewport
        const list = new eui.List();
        const vlayout = new eui.VerticalLayout();
        vlayout.gap = 3;
        list.layout = vlayout;

        this.collection = new eui.ArrayCollection(this.betInfos);
        list.dataProvider = this.collection;
        list.itemRenderer = we.ui.BetInfo;
        this.scroller.viewport = list;

        dir.evtHandler.addEventListener(we.core.Event.BALANCE_UPDATE, this.handleTableList, this);

        this.bottom = 100;
      }

      // called while
      public updateTables() {}

      private arrayDiff(array1, array2) {
        const result = [];
        let i = 0;
        array2 = [...array2];
        while (i < array1.length) {
          const t1 = array1[i++];
          const t2 = array2.indexOf(t1);
          if (t2 !== -1) {
            array2.splice(t2, 1);
          } else {
            result.push(t1);
          }
        }
        return result;
      }

      private handleTableList(event: egret.Event) {
        const roomIds = event.data as number[];
        // this.collection.refresh();
        /*
      const added = this.arrayDiff(roomIds, this.roomIds);
      const removed = this.arrayDiff(this.roomIds, roomIds);
      added.forEach(item => {
        this.collection.addItem(item);
      });
      removed.forEach(item => {
        this.collection.removeItemAt(this.collection.getItemIndex(item));
      });
      // console.log('added', added);
      // console.log('removed', removed);
      this.roomIds = roomIds;
      this.roomIds.forEach((x, inx) => {
        this.collection.replaceItemAt(x, inx);
      });
      */
        // console.log('handleTableList', roomIds);
        //   this.collection.refresh();
      }
    }
  }
}
