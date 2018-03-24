import {D3OptionDefault} from './d3-option-default';
import {NodeShapeEnum} from '../enum/node-shape-enum';
import {LineEnum} from '../enum/line-enum';
/**
 * Object interface
 */
export interface ID3Option extends D3OptionDefault {
  target: string;
  style: IStyle;
  layout: ILayout;
}

export interface IStyle {
  node: INodeStyle;
  edge: IEdgeStyle;
  line: ILineStyle;
}

export interface INodeStyle {
  autoWrapText: boolean;
  shape: NodeShapeEnum;
  lineHeight: number;
  arrowWidth: number;
  backgroundColor: string;
  fontStyle: string;
  fontFillStyle: string;
  // in case shape config is circle
  radiusX: number;
  radiusY: number;
  margin: number;
}

export interface IEdgeStyle {
  backgroundColor: string;
}

export interface ILayout {
  rankDir: string;
  marginX: number;
  marginY: number;
  nodeSep: number;
  edgeSep: number;
  edge: ILayoutEdge;
}

export interface ILayoutEdge {
  minLen: number;
}

export interface ILineStyle {
  lineStyle: LineEnum;
}
