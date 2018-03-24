import {INodeData} from './model/node-data';
import {PositionNodes} from './positioning/position-nodes';
import {IEdgeData} from './model/edge-data';
import {RenderElement} from './renderer/render-element';
import {ID3Option} from './model/id3-option';
import {D3OptionDefault} from './model/d3-option-default';
import 'core-js/es6/object';
import {mergeDeep} from './utils/utils';

// export to global variable for end client
export {init};
/**
 *
 * @param opt
 * @param nodeDatum
 * @param edges
 */
function init(opt: ID3Option, nodeDatum: INodeData[], edges: IEdgeData[]) {
  if (!d3) {
    console.warn('You have to include d3 lib before using d3Diagram lib.');
    return;
  }

  // if (!opt.isValid()) {
  //   return;
  // }

  // merge value from input option and default
  opt = mergeDeep(new D3OptionDefault(), opt);
  let re = new RenderElement(opt),
    pn = new PositionNodes(re.context, nodeDatum, edges, opt);

  re.render(pn.getGraph());

  console.log(re);
}
