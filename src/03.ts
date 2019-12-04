type point = [number, number];
function pointCompare(a1: point, a2: point) {
  return JSON.stringify(a1) === JSON.stringify(a2);
}
function pSub(a1: point, a2: point) {
  return [a1[0] - a2[0], a1[1] - a2[1]] as point;
}
function pAdd(a1: point, a2: point) {
  return [a1[0] + a2[0], a1[1] + a2[1]] as point;
}
export function manhattenDistance(
  [x1, y1]: point,
  [x2, y2]: point
) {
  const xDist = Math.abs(x1 - x2);
  const yDist = Math.abs(y1 - y2);
  return xDist + yDist;
}
export const copy = (pt: point) => pt.slice() as point;
export function coordToPoint(coord: string) {
  const xsArr = coord.match(/[A-Z]/);
  if (!xsArr) throw new Error(`bad point ${coord}`);
  const x = xsArr[0].charCodeAt(0) - 0x41;
  const ysArr = coord.match(/\d+/);
  if (!ysArr) throw new Error(`bad point ${coord}`);
  const y = +ysArr[0];
  return [x, y] as point;
}
export function walkWire(cornersArray: point[]) {
  const start = cornersArray[0];
  const end = cornersArray[cornersArray.length - 1];
  const cornersToGo = cornersArray.slice();
  let pos = cornersToGo.shift()!;
  let nextCorner = cornersToGo.shift()!;
  const visited: point[] = [copy(start)];
  while (!pointCompare(pos, end)) {
    const sign = pSub(nextCorner, pos).map(d =>
      Math.sign(d)
    ) as point;
    pos = pAdd(pos, sign);
    if (!visited.find(pt => pointCompare(pos, pt))) {
      visited.push(copy(pos));
    }
    if (
      pointCompare(pos, nextCorner) &&
      cornersToGo.length > 0
    )
      nextCorner = cornersToGo.shift()!;
  }
  return visited;
}
