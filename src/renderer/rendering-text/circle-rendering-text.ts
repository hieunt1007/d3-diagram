import {BaseRenderingText} from './base-rendering-text';
import {IRenderingText} from './interface/rendering-text';
import {INodeSize} from './interface/node-size';

/**
 * Circle rendering text class
 */
export class CircleRenderingText extends BaseRenderingText implements IRenderingText {
  /**
   * Render text for circle
   *
   * The idea behind: render from the middle at first
   *
   * @param node
   */
  public renderText(node: any) {
    let con = this.context,
      opt = this.option.style.node;

    con.fillStyle = node.fontFillStyle ? node.fontFillStyle : opt.fontFillStyle;

    let textLength = node.textWrapped.length,
      lineHeight = opt.lineHeight, width, t,
      y = node.y;

    if (textLength % 2 === 0) {
      y += lineHeight / 2;
    }

    for (let cnt = 0, i = Math.floor(textLength / 2), j = i + 1; i >= 0 || j < textLength; i--, j++, cnt++) {
      t = node.textWrapped[i];
      width = con.measureText(t).width / 2;
      if (t) {
        con.fillText(t, node.x - width, y - lineHeight * cnt);
      }

      t = node.textWrapped[j];
      width = con.measureText(t).width / 2;
      if (t) {
        con.fillText(t, node.x - width, y + lineHeight * (cnt + 1));
      }
    }
  }

  /**
   * Calculate needed height for circle
   *
   * @param node
   * @returns {INodeSize}
   */
  public calNeededHeight(node: any): INodeSize {
    let opt = this.option.style.node,
      maxWidth = opt.radiusX * Math.cos(Math.PI / 4) * 2,
      lineHeight = opt.lineHeight,
      con = this.context,
      words = node.name.split(' '),
      wordsLength = words.length,
      line = '', height = lineHeight,
      nodeSize: INodeSize = {textWrapped: [], width: 0, height: 0};

    for (let n = 0; n < wordsLength; n++) {
      let testLine = line + words[n] + ' ',
        testWidth = con.measureText(testLine).width;

      if (testWidth > maxWidth && n > 0) {
        nodeSize.textWrapped.push(line);
        line = words[n] + ' ';
        height += lineHeight;
      } else {
        line = testLine;
      }
    }

    nodeSize.textWrapped.push(line);

    let nodeWidth = node.width || opt.radiusX;

    height = height > nodeWidth ? height : nodeWidth;
    height = height / 2 + opt.margin;
    // reset width according to height changed ratio
    nodeSize.width = height;
    nodeSize.height = height;
    return nodeSize;
  }
}
