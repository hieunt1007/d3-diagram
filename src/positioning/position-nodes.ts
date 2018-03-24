import {INodeData} from '../model/node-data';
import {IEdgeData} from '../model/edge-data';
import {ID3Option} from '../model/id3-option';
import * as dagre from 'dagre';
import {IRenderingText} from '../renderer/rendering-text/interface/rendering-text';
import {NodeShapeEnum} from '../enum/node-shape-enum';
import {CircleRenderingText} from '../renderer/rendering-text/circle-rendering-text';
import {EllipseRenderingText} from '../renderer/rendering-text/ellipse-renderring-text';
import {RectangleRenderingText} from '../renderer/rendering-text/rectangle-rendering-text';
import {INodeSize} from '../renderer/rendering-text/interface/node-size';
import Graph = Dagre.Graph;

/**
 * Implementation of IPositionNodesInterface
 */
export class PositionNodes {
  private graph: Graph;

  constructor(context: CanvasRenderingContext2D, nodes: INodeData[], edges: IEdgeData[], opt: ID3Option) {
    let g: Graph = this.initGraph(opt);
    this.graph = this.calNodePos(context, nodes, edges, g, opt);
  }

  /**
   * Get {Graph}
   * @returns {Graph}
   */
  public getGraph(): Graph {
    return this.graph;
  }

  /**
   * Setup graph
   * @returns {Graph}
   */
  private initGraph(opt: ID3Option): Graph {
    // Create a new directed graph
    let g: Graph = new dagre.graphlib.Graph({
        multigraph: true,
        compound: true
      }), layoutOpt = opt.layout,
      mX = layoutOpt.marginX,
      mY = layoutOpt.marginY + opt.style.node.margin;

    if (opt.style.node.shape === NodeShapeEnum.Rectangle) {
      mX = 0;
      mY = 0;
    }

    // Set an object for the graph label
    g.setGraph({
      rankdir: layoutOpt.rankDir,
      marginx: mX,
      marginy: mY,
      nodesep: layoutOpt.nodeSep,
      edgesep: layoutOpt.edgeSep
    });

    // Default to assigning a new object as a label for each new edge.
    // return object without property
    g.setDefaultEdgeLabel(() => ({}));
    g.setDefaultNodeLabel(() => ({}));

    return g;
  }

  /**
   * Calculate node position
   *
   * @param nodes
   * @param edges
   * @param g
   * @param opt
   * @return {Graph}
   */
  private calNodePos(context: CanvasRenderingContext2D, nodes: INodeData[], edges: IEdgeData[],
                     g: Graph, opt: ID3Option): Graph {
    // set value for graphlib
    let nodeStyle = opt.style.node;

    // handle wrap text
    if (nodeStyle.autoWrapText) {
      // pre-process: re-set width/height according to text content
      let text: IRenderingText;
      switch (nodeStyle.shape) {
        case NodeShapeEnum.Circle:
          text = new CircleRenderingText(context, opt);
          break;
        case NodeShapeEnum.Ellipse:
          text = new EllipseRenderingText(context, opt);
          break;
        default:
          text = new RectangleRenderingText(context, opt);
      }

      for (let node of nodes) {
        let h: INodeSize = text.calNeededHeight(node);
        node.width = h.width;
        node.height = h.height;
        node.textWrapped = h.textWrapped;

        g.setNode(<string> node.id, node);
      }
    } else {
      let w = nodeStyle.radiusX,
        h = nodeStyle.radiusY;

      // try to get width/height for each node at first
      // otherwise we will get default value from config
      for (let node of nodes) {
        node.width = node.width || w;
        node.height = node.height || h;
        node.textWrapped = [node.name];

        g.setNode(<string> node.id, node);
      }
    }

    // set edge for graphlib
    for (let edge of edges) {
      g.setEdge(<string> edge.source,
        <string> edge.target,
        {
          minlen: opt.layout.edge.minLen,
          weight: 1
        });
    }

    dagre.layout(g);

    return g;
  }
}
