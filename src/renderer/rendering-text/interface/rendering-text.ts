import {INodeSize} from './node-size';
/**
 * Render text interface
 */
export interface IRenderingText {
  renderText(node: any);
  calNeededHeight(node: any): INodeSize;
}
