import {BaseIntersection} from './base-intersection';
import {IIntersection} from './interface/intersection';
import {Point2D, Intersection} from 'kld-intersections';
import {INodeData} from '../../model/node-data';

/**
 * Intersection for circle
 */
export class RectangleIntersection extends BaseIntersection implements IIntersection {
  public getIntersection(node1: INodeData, node2: INodeData): Array<{x: number; y: number}> {
    let pointN = new Point2D(node1.x, node1.y),
      pointN2 = new Point2D(node2.x, node2.y),
      rx = node1.width,
      ry = node1.height,
      rx2 = node2.width,
      ry2 = node2.height,
      halfN = new Point2D(pointN.x + rx / 2, pointN.y + ry / 2),
      halfN2 = new Point2D(pointN2.x + rx2 / 2, pointN2.y + ry2 / 2),
      sourcePoints = Intersection.intersectLineRectangle(halfN, halfN2, pointN,
        new Point2D(pointN.x + rx, pointN.y + ry)),
      targetPoints = Intersection.intersectLineRectangle(halfN, halfN2, pointN2,
        new Point2D(pointN2.x + rx2, pointN2.y + ry2)),
      tp = sourcePoints.points[sourcePoints.points.length - 1],
      tp2 = targetPoints.points[targetPoints.points.length - 1];

    return [tp, tp2];
  }
}
