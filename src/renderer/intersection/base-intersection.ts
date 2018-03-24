import {ID3Option} from '../../model/id3-option';
/**
 * Base intersection class
 */
export abstract class BaseIntersection {
  /* tslint:disable:variable-name */
  private _option: ID3Option;
  /* tslint:enable:variable-name */

  constructor(option: ID3Option) {
    this._option = option;
  }

  protected get option(): ID3Option {
    return this._option;
  }

  protected set option(value: ID3Option) {
    this._option = value;
  }
}
