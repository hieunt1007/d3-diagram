import {INodeStyle, IStyle, ILayout, ILayoutEdge, IEdgeStyle, ILineStyle} from './id3-option';
import {NodeShapeEnum} from '../enum/node-shape-enum';
import {LineEnum} from '../enum/line-enum';
/**
 * D3 option default value class
 */
export class D3OptionDefault {
  constructor() {
    let nodeStyle: INodeStyle = {
      autoWrapText: true,
      shape: NodeShapeEnum.Circle,
      lineHeight: 20,
      arrowWidth: 10,
      backgroundColor: '#bdbdbd',
      fontStyle: '18px serif',
      fontFillStyle: 'black',
      radiusX: 32,
      radiusY: 32,
      margin: 20
    }, edgeStyle: IEdgeStyle = {
        backgroundColor: '#bdbdbd'
    }, lineStyle: ILineStyle = {
        lineStyle: LineEnum.Straight
    }, style: IStyle = {
        node: nodeStyle,
        edge: edgeStyle,
        line: lineStyle
    }, layoutEdge: ILayoutEdge = {
        minLen: 2
    }, layout: ILayout = {
        rankDir: 'TB',
        marginX: 50,
        marginY: 50,
        nodeSep: 100,
        edgeSep: 50,
        edge: layoutEdge
    };

    return {
      style: style,
      layout: layout
    };
  }
}
