/**
 * Define properties for each node
 */
export interface INodeData {
  id: string | number;
  name: string;
  width?: number;
  height?: number;
  textWrapped: string[];
  x: number;
  y: number;
}
