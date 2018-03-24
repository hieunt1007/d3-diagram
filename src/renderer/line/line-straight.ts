import {ILine} from './interface/line';
import {BaseLine} from './base-line';

/**
 * Line straight class
 */
export class LineStraight extends BaseLine implements ILine {
  public drawLine(p1: kldIntersections.Point2D, p2: kldIntersections.Point2D) {
    let con = this.context;

    con.moveTo(p1.x, p1.y);
    con.lineTo(p1.x, p1.y);
    con.lineTo(p2.x, p2.y);
  }
}
