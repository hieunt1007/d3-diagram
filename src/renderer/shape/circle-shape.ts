import {IShape} from './interface/shape';
import {BaseShape} from './base-shape';

/**
 * CircleShape shape
 */
export class CircleShape extends BaseShape implements IShape {
  public render(node: any): void {
    let con = this.context;

    con.save(); // save state

    con.beginPath();
    con.moveTo(node.x, node.y);
    con.arc(node.x, node.y, node.width, 0, 2 * Math.PI);
    // priority retrieve background color in each node at first
    con.fillStyle = node.backgroundColor ? node.backgroundColor : this.option.style.node.backgroundColor;
    con.fill();
    con.closePath();

    con.restore(); // restore to original state
  }
}
