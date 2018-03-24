import Intersection = kldIntersections.Intersection;
import Point2D = kldIntersections.Point2D;
import {INodeData} from '../../../model/node-data';
/**
 * Intersection interface
 */
export interface IIntersection {
  getIntersection(node1: INodeData, node2: INodeData): Point2D[];
}
