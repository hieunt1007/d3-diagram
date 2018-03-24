/**
 * Additional properties/functions declaration for dagre in case the default one doesn't have
 * Default declaration file of dagre in typings/globals/dagre
 */
declare namespace Dagre {
  interface Edge {
    backgroundColor: string;
  }

  export interface Graph {
    new (opt: any): Graph;
    edges(): Edge[];
    setDefaultNodeLabel(callback: () => void): Graph;
  }
}
