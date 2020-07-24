namespace we {
  export namespace test {
    export class TestControlBarHolderPage extends core.BasePage {
      private progressbar: eui.ProgressBar;

      public onEnter() {
        this.addEventListener(eui.UIEvent.COMPLETE, this.mount, this);
      }

      public async onFadeEnter() {}

      public onExit() {
        this.removeChildren();
      }

      public async onFadeExit() {}

      protected mount() {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.mount, this);

        const temp = new we.lo.SSCBettingControlBar();
        temp.x = 100;
        temp.y = 300;
        this.addChild(temp);

        const temp2 = new we.lo.SSCNoteControlPanel();
        temp2.x = 100;
        temp2.y = 700;
        this.addChild(temp2);

        const temp3 = new we.lo.SSCTraditionalBettingPanel();
        temp3.x = 100;
        temp3.y = 1100;
        this.addChild(temp3);
      }

      protected socketConnect() {
        dir.evtHandler.addEventListener(core.MQTT.CONNECT_SUCCESS, this.socketConnectSuccess, this);
        dir.evtHandler.addEventListener(core.MQTT.CONNECT_FAIL, this.socketConnectFail, this);
        // dir.socket.connect();
      }

      protected socketConnectSuccess() {
        dir.evtHandler.removeEventListener(core.MQTT.CONNECT_SUCCESS, this.socketConnectSuccess, this);
        dir.evtHandler.removeEventListener(core.MQTT.CONNECT_FAIL, this.socketConnectFail, this);

        // step 4: auth and get user profiles

        // step 5: get and display tips, promote banner

        // step 6: load general resource (lobby, baccarat)

        // step 7: init complete, transfer to lobby scene
        // dir.sceneCtr.goto('LobbyScene');
      }

      protected socketConnectFail() {}
    }
  }
}
