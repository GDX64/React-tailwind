/**
 * Function composition with very good performance
 */
export function pipe<T, K, G, H>(
  f1: (x: T) => K,
  f2: (x: K) => G,
  f3: (x: G) => H
): (x: T) => H;
export function pipe<T, K, G>(f1: (x: T) => K, f2: (x: K) => G): (x: T) => G;
export function pipe(...args: Function[]): Function;
export function pipe(...args: Function[]): Function {
  const [f1, f2, f3] = args;
  if (arguments.length === 2) {
    return (x: any) => f2(f1(x));
  }
  if (arguments.length === 3) {
    return (x: any) => f3(f2(f1(x)));
  }
  throw Error("Maximun number of arguments");
}
