import Graph = Dagre.Graph;
import {ID3Option} from '../model/id3-option';
import {Point2D} from 'kld-intersections';
import {NodeShapeEnum} from '../enum/node-shape-enum';
import {IShape} from './shape/interface/shape';
import {CircleShape} from './shape/circle-shape';
import {EllipseShape} from './shape/ellipse-shape';
import {RectangleShape} from './shape/rectangle-shape';
import {CircleIntersection} from './intersection/circle-intersection';
import {IIntersection} from './intersection/interface/intersection';
import {EllipseIntersection} from './intersection/ellipse-intersection';
import {RectangleIntersection} from './intersection/rectangle-intersection';
import {CircleRenderingText} from './rendering-text/circle-rendering-text';
import {IRenderingText} from './rendering-text/interface/rendering-text';
import {EllipseRenderingText} from './rendering-text/ellipse-renderring-text';
import {RectangleRenderingText} from './rendering-text/rectangle-rendering-text';
import {ILine} from './line/interface/line';
import {LineEnum} from '../enum/line-enum';
import {LineStraight} from './line/line-straight';
import {LineBezier} from './line/line-bezier';
import Selection = d3.Selection;

/**
 * Render element on GUI
 * include: node and edge
 */
export class RenderElement {
  /* tslint:disable:variable-name */
  private _context: CanvasRenderingContext2D;
  /* tslint:enable:variable-name */
  private w: number;
  private h: number;
  private option: ID3Option;
  private graph: Graph;

  constructor(opt: ID3Option) {
    // setup environment before go further
    this.option = opt;
    this.init();
  }

  public get context(): CanvasRenderingContext2D {
    return this._context;
  }

  /**
   * Perform render node and edge
   */
  public render(graph: Graph): void {
    this.graph = graph;

    this.internalRender();
  }

  /**
   * Internal render node & edge
   */
  private internalRender() {
    this._context.clearRect(0, 0, this.w, this.h);

    this.renderNodes();
    // render edge at first to make sure that it always behind node shape
    this.renderEdges();
  }

  /**
   * Initial environment before go further
   */
  private init(): void {
    let target = d3.select(this.option.target);

    this.w = parseInt(target.style('width'), 10);
    this.h = parseInt(target.style('height'), 10);

    let canvas: Selection<any> = target.append('canvas')
      .property('width', this.w)
      .property('height', this.h);

    // init drag & drop event
    target.call(d3.drag()
      .subject(this.dragSubject.bind(this))
      .on('start', this.dragStarted.bind(this))
      .on('drag', this.dragged.bind(this))
      .on('end', this.dragEnded.bind(this))
      .on('start.render drag.render end.render', this.internalRender.bind(this)));

    this._context = <CanvasRenderingContext2D> (<HTMLCanvasElement> (canvas.node())).getContext('2d');
    this._context.font = this.option.style.node.fontStyle;
  }

  /**
   * Render nodes
   */
  private renderNodes(): void {
    let con = this._context,
      shape: IShape,
      text: IRenderingText;

    switch (this.option.style.node.shape) {
      case NodeShapeEnum.Circle:
        shape = new CircleShape(con, this.option);
        text = new CircleRenderingText(con, this.option);
        break;
      case NodeShapeEnum.Ellipse:
        shape = new EllipseShape(con, this.option);
        text = new EllipseRenderingText(con, this.option);
        break;
      default:
        shape = new RectangleShape(con, this.option);
        text = new RectangleRenderingText(con, this.option);
    }

    this.graph.nodes().forEach((v) => {
      let n = this.graph.node(v);
      shape.render(n);

      text.renderText(n);
    });
  }

  /**
   * Render edges
   */
  private renderEdges(): void {
    let con = this._context,
      backgroundColor = this.option.style.edge.backgroundColor,
      line: ILine, minusAngle = 0,
      nodeOpt = this.option.style.node,
      intersection: IIntersection;

    switch (this.option.style.line.lineStyle) {
      case LineEnum.Straight:
        line = new LineStraight(con);
        break;
      default:
        // bezier line
        line = new LineBezier(con);
        minusAngle = Math.PI / 7;
    }

    switch (nodeOpt.shape) {
      case NodeShapeEnum.Circle:
        intersection = new CircleIntersection(this.option);
        break;
      case NodeShapeEnum.Ellipse:
        intersection = new EllipseIntersection(this.option);
        break;
      default:
        intersection = new RectangleIntersection(this.option);
    }

    this.graph.edges().forEach((v) => {
      con.beginPath();

      let n = this.graph.node(v.v),
        n2 = this.graph.node(v.w),
        tp: Point2D, tp2: Point2D;

      [tp, tp2] = intersection.getIntersection(n, n2);

      if (!tp || !tp2) {
        con.closePath();
        return;
      }

      // draw line
      con.strokeStyle = v.backgroundColor ? v.backgroundColor : backgroundColor;
      line.drawLine(tp, tp2);
      con.stroke();
      con.closePath();

      // draw arrow
      con.beginPath();
      let arrowAngle = Math.atan2(tp.x - tp2.x, tp.y - tp2.y) + Math.PI - minusAngle;

      con.fillStyle = n.backgroundColor ? n.backgroundColor : backgroundColor;
      this.drawArrow(tp2, arrowAngle, this.option);
      con.fill();
      con.stroke();
      con.closePath();
    });

  }

  /**
   * Draw arrow
   * @param endPoint
   * @param arrowAngle
   * @param opt
   */
  private drawArrow(endPoint: Point2D, arrowAngle: number, opt: ID3Option): void {
    let aw = opt.style.node.arrowWidth,
      minusAngle = arrowAngle - Math.PI / 6,
      plusAngle = arrowAngle + Math.PI / 6,
      con = this._context;

    con.moveTo(endPoint.x - (aw * Math.sin(minusAngle)), endPoint.y - (aw * Math.cos(minusAngle)));
    con.lineTo(endPoint.x, endPoint.y);
    con.lineTo(endPoint.x - (aw * Math.sin(plusAngle)), endPoint.y - (aw * Math.cos(plusAngle)));
  }

  /**
   * Check whether user select node or not
   * @returns {any}
   */
  private dragSubject() {
    let nodes = this.graph.nodes(),
      nodeOpt = this.option.style.node;

    for (let i = nodes.length - 1; i >= 0; --i) {
      let node = this.graph.node(nodes[i]),
        evt = (<DragEvent> d3.event),
        x = node.x - evt.x,
        y = node.y - evt.y;

      switch (nodeOpt.shape) {
        case NodeShapeEnum.Circle:
          if (x * x + y * y < node.width * node.width) {
            return node;
          }
          break;
        case NodeShapeEnum.Ellipse:
          if ((Math.pow(x, 2) / Math.pow(node.width, 2)) + (Math.pow(y, 2) / Math.pow(node.height, 2)) <= 1) {
            return node;
          }
          break;
        default:
          x = evt.x;
          y = evt.y;

          let p21 = [node.width, 0],
            p41 = [0, node.height],
            p21magnitudeSquared = Math.pow(p21[0], 2) + Math.pow(p21[1], 2),
            p41magnitudeSquared = Math.pow(p41[0], 2) + Math.pow(p41[1], 2),
            p = [x - node.x, y - node.y],
            tmp = p[0] * p21[0] + p[1] * p21[1], tmp1 = p[0] * p41[0] + p[1] * p41[1];

          if (0 <= tmp && tmp <= p21magnitudeSquared && 0 <= tmp1 && tmp1 <= p41magnitudeSquared) {
            return node;
          }
      }
    }
  }

  /**
   * Drag started
   */
  private dragStarted() {
    let nodes = this.graph.nodes(),
      subject = (<any> d3.event).subject;

    nodes.splice(nodes.indexOf(subject), 1);
    nodes.push(subject);
    subject.active = true;
  }

  /**
   * Dragged
   */
  private dragged() {
    let evt = (<any> d3.event),
      subject = evt.subject;

    subject.x = evt.x;
    subject.y = evt.y;
  }

  /**
   * Drag ended
   */
  private dragEnded() {
    (<any> d3.event).subject.active = false;
  }
}
