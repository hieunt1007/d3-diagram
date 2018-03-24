import {IShape} from './interface/shape';
import {BaseShape} from './base-shape';
import {ID3Option} from '../../model/id3-option';

/**
 * EllipseShape shape
 */
export class EllipseShape extends BaseShape implements IShape {
  constructor(context: CanvasRenderingContext2D, option: ID3Option) {
    super(context, option);

    // IE doesn't support ellipse
    if (!context.ellipse) {
      context.ellipse = this.ellipse.bind(this);
    }
  }

  public render(node: any): void {
    let con = this.context;

    con.save(); // save state

    con.beginPath();
    con.moveTo(node.x, node.y);
    con.ellipse(node.x, node.y, node.width, node.height, 0, 0, 2 * Math.PI);
    // priority retrieve background color in each node at first
    con.fillStyle = node.backgroundColor ? node.backgroundColor : this.option.style.node.backgroundColor;
    con.fill();
    con.closePath();

    con.restore(); // restore to original state
  }

  /**
   * Draw ellipse shape manually, in case browser doesn't support
   * @param cx
   * @param cy
   * @param rx
   * @param ry
   */
  private ellipse(cx, cy, rx, ry) {
    let con = this.context;

    con.save(); // save state
    con.beginPath();

    con.translate(cx - rx, cy - ry);
    con.scale(rx, ry);
    con.arc(1, 1, 1, 0, 2 * Math.PI);

    con.restore(); // restore to original state
  }
}
