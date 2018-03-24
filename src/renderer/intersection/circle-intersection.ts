import {BaseIntersection} from './base-intersection';
import {IIntersection} from './interface/intersection';
import {Point2D, Intersection} from 'kld-intersections';
import {INodeData} from '../../model/node-data';

/**
 * Intersection for circle
 */
export class CircleIntersection extends BaseIntersection implements IIntersection {
  public getIntersection(node1: INodeData, node2: INodeData): Array<{x: number; y: number}> {
    let pointN = new Point2D(node1.x, node1.y),
      pointN2 = new Point2D(node2.x, node2.y),
      sourcePoints = Intersection.intersectCircleLine(pointN, node1.width, pointN, pointN2),
      targetPoints = Intersection.intersectCircleLine(pointN2, node2.width, pointN, pointN2),
      tp: Point2D = sourcePoints.points[sourcePoints.points.length - 1],
      tp2: Point2D = targetPoints.points[targetPoints.points.length - 1];

    return [tp, tp2];
  }
}
