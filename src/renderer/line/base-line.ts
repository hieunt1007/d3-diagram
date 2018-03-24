/**
 * Base line
 */
export abstract class BaseLine {
  /* tslint:disable:variable-name */
  private _context: CanvasRenderingContext2D;
  /* tslint:enable:variable-name */

  constructor(context: CanvasRenderingContext2D) {
    this._context = context;
  }

  public get context(): CanvasRenderingContext2D {
    return this._context;
  }

  public set context(value: CanvasRenderingContext2D) {
    this._context = value;
  }
}
