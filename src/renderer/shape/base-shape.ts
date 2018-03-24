import {ID3Option} from '../../model/id3-option';

/**
 * Abstract class for shape
 */
export abstract class BaseShape {
  /* tslint:disable:variable-name */
  private _context: CanvasRenderingContext2D;
  private _option: ID3Option;
  /* tslint:enable:variable-name */

  constructor(context: CanvasRenderingContext2D, option: ID3Option) {
    this._context = context;
    this._option = option;
  }

  protected get context(): CanvasRenderingContext2D {
    return this._context;
  }

  protected set context(value: CanvasRenderingContext2D) {
    this._context = value;
  }

  protected get option(): ID3Option {
    return this._option;
  }

  protected set option(value: ID3Option) {
    this._option = value;
  }
}
