namespace we {
  export namespace ui {
    export class Nav extends core.BaseEUI {
      private _lantern: NavLantern;
      private _time: eui.Label;
      private _user: eui.Label;
      private _profile_toggle: eui.Group;
      private _profile: Panel;
      private _menu_toggle: eui.Image;
      private _menu: Panel;
      private _slider_toggle: eui.Image;
      private _balance: RunTimeLabel;

      private _timeInterval: number;

      public constructor() {
        super('nav/Nav');
      }

      protected mount() {
        if (this._profile) {
          this._profile.setToggler(this._profile_toggle);
          this._profile.dismissOnClickOutside = true;
        }
        if (this._menu) {
          this._menu.setToggler(this._menu_toggle);
          this._menu.dismissOnClickOutside = true;
        }

        this._balance.renderText = () => `${dir.meterCtr.getLocal('balance')}`;
        dir.meterCtr.register('balance', this._balance);
        if (!isNaN(env.balance)) {
          dir.meterCtr.rackTo('balance', env.balance, 0);
        }

        this.addListeners();
      }

      private addListeners() {
        if (env.isMobile) {
          utils.addButtonListener(this._slider_toggle, this.onClickSliderToggle, this);
        } else {
          dir.evtHandler.addEventListener(core.Event.ENTER_SCENE, this.onSceneChange, this);
          this._timeInterval = setInterval(this.onUpdateTimer.bind(this), 1000);
        }
      }

      private onSceneChange(e) {
        switch (dir.sceneCtr.currScene.sceneHeaderPlacement) {
          case 'right':
            this._lantern.alignToLeft();
            this._time.textAlign = 'left';
            this.currentState = 'left';
            break;

          case 'left':
            this._lantern.alignToRight();
            this._time.textAlign = 'right';
            this.currentState = 'right';
            break;
        }
      }

      private onClickSliderToggle() {
        dir.evtHandler.dispatch(core.Event.TOGGLE_SILDER_MENU);
      }

      private onUpdateTimer() {
        // console.log(env.currTime);
        // console.log(moment.unix(env.currTime).format('YYYY/MM/DD HH:mm:ss'));
        this._time.text = utils.formatTime(env.currTime / Math.pow(10, 3));
      }
    }
  }
}
