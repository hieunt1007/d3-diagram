/**
 * Declaration for kld lib
 */
declare namespace kldIntersections {
  class Intersection {
    public static intersectCircleLine(c: Point2D, r: number|undefined, a1: Point2D, a2: Point2D): Intersection;

    public static intersectEllipseLine(c: Point2D, rx: number|undefined, ry: number|undefined,
                                       a1: Point2D, a2: Point2D): Intersection;

    public static intersectLineRectangle(a1: Point2D, a2: Point2D, r1: Point2D, r2: Point2D): Intersection;

    public points: Point2D[];
  }

  /* tslint:disable:max-classes-per-file */
  class Point2D {
    public x: number;
    public y: number;

    constructor(x, y);
  }
  /* tslint:enable:max-classes-per-file */
}

declare module 'kld-intersections' {
  export = kldIntersections;
}
