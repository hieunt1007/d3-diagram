import {ILine} from './interface/line';
import {BaseLine} from './base-line';

/**
 * Line bezier class
 */
export class LineBezier extends BaseLine implements ILine {
  public drawLine(p1: kldIntersections.Point2D, p2: kldIntersections.Point2D) {
    let con = this.context,
      angle = Math.atan2(p2.x - p1.x, p2.y - p1.y),
      minusBegin = angle - (Math.PI / 7),
      plusEnd = angle + Math.PI - (Math.PI / 7),
      width = 100;

    con.moveTo(p1.x, p1.y);

    con.bezierCurveTo(p1.x + (width * Math.sin(minusBegin)), p1.y + (width * Math.cos(minusBegin)),
      p2.x + (width * Math.sin(plusEnd)), p2.y + (width * Math.cos(plusEnd)), p2.x, p2.y);
  }
}
