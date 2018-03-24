import {ID3Option} from '../../model/id3-option';

/**
 * Base rendering text
 */
export abstract class BaseRenderingText {
  /* tslint:disable:variable-name */
  private _context: CanvasRenderingContext2D;
  private _option: ID3Option;
  /* tslint:enable:variable-name */

  constructor(context: CanvasRenderingContext2D, option: ID3Option) {
    this._context = context;
    this._option = option;
  }

  public get option(): ID3Option {
    return this._option;
  }

  public set option(value: ID3Option) {
    this._option = value;
  }

  public get context(): CanvasRenderingContext2D {
    return this._context;
  }

  public set context(value: CanvasRenderingContext2D) {
    this._context = value;
  }
}
