namespace we {
  export namespace dt {
    export class TableLayer extends ui.TableLayer {
      protected _dragonImage: eui.Image;
      protected _tigerImage: eui.Image;
      protected _tieImage: eui.Image;

      protected _dragonLabel: ui.RunTimeLabel;
      protected _tigerLabel: ui.RunTimeLabel;
      protected _tieLabel: ui.RunTimeLabel;

      protected _dragonTotalAmount: eui.Label;
      protected _tigerTotalAmount: eui.Label;

      protected _dragonTotalPerson: eui.Label;
      protected _tigerTotalPerson: eui.Label;

      protected _totalPersonMapping: any; // Total Person for each grid
      protected _totalAmountMapping: any; // Total amount for each grid

      protected _imageSourceMapping: {};

      constructor() {
        super();
        this._betField = dt.BetField;
      }

      protected createMapping() {
        super.createMapping();
        this._imageMapping = {};
        this._imageMapping[dt.BetField.DRAGON] = this._dragonImage;
        this._imageMapping[dt.BetField.TIE] = this._tieImage;
        this._imageMapping[dt.BetField.TIGER] = this._tigerImage;

        this._imageSourceMapping = {};
        this._imageSourceMapping[dt.BetField.DRAGON] = [this._imageMapping[dt.BetField.DRAGON].source, this._imageMapping[dt.BetField.DRAGON].name];
        this._imageSourceMapping[dt.BetField.TIE] = [this._imageMapping[dt.BetField.TIE].source, this._imageMapping[dt.BetField.TIE].name];
        this._imageSourceMapping[dt.BetField.TIGER] = [this._imageMapping[dt.BetField.TIGER].source, this._imageMapping[dt.BetField.TIGER].name];

        this._totalPersonMapping = {};
        this._totalPersonMapping[dt.BetField.DRAGON] = this._dragonTotalPerson;
        this._totalPersonMapping[dt.BetField.TIGER] = this._tigerTotalPerson;

        this._totalAmountMapping = {};
        this._totalAmountMapping[dt.BetField.DRAGON] = this._dragonTotalAmount;
        this._totalAmountMapping[dt.BetField.TIGER] = this._tigerTotalAmount;

        this._tigerLabel.renderText = () => i18n.t('dragontiger.tigerShort');
        this._dragonLabel.renderText = () => i18n.t('dragontiger.dragonShort');
        this._tieLabel.renderText = () => i18n.t('dragontiger.tieShort');
      }

      set totalPerson(persons: any) {
        if (this._totalPersonMapping) {
          Object.keys(persons).map(value => {
            if (this._totalPersonMapping[value]) {
              this._totalPersonMapping[value].text = persons[value];
            }
          });
        }
      }

      get totalPerson() {
        return this._totalPersonMapping;
      }

      set totalAmount(amounts: any) {
        if (this._totalAmountMapping) {
          Object.keys(amounts).map(value => {
            if (this._totalAmountMapping[value]) {
              this._totalAmountMapping[value].text = amounts[value];
            }
          });
        }
      }

      get totalAmount() {
        return this._totalAmountMapping;
      }

      public onRollover(fieldName: string) {
        if (this._imageSourceMapping) {
          this._imageMapping[fieldName].source = this._imageSourceMapping[fieldName][1];
        }
      }

      public onRollout(fieldName: string) {
        this._imageMapping[fieldName].source = this._imageSourceMapping[fieldName][0];
      }

      public clearAllHighlights() {
        Object.keys(dt.BetField).map(value => {
          this.onRollout(value);
        });
      }
    }
  }
}
