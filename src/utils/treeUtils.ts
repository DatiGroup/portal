const traverseTreeAtDepth = (node: any, currentDepth: number, targetDepth: number, result: any[]) => {
  if (currentDepth === targetDepth) return result.concat(node);
  if (!node.children || node.children.length === 0) return result;

  node.children.forEach((child: any) => {
    result = traverseTreeAtDepth(child, currentDepth + 1, targetDepth, result);
  });

  return result;
};

export const getNodesByDepth = <T extends { children?: T[] }>(head: T, depth: number): T[] => {
  return traverseTreeAtDepth(head, 0, depth, []);
};

export const traverseNodes = <T extends { children?: T[] }, K extends keyof T>(
  nodes: T[],
  flatMap: Map<T[K] & PropertyKey, T>,
  nodeIdKey: K
): void => {
  nodes.forEach((node: T) => {
    flatMap.set(node[nodeIdKey] as T[K] & PropertyKey, node);
    if (node.children && node.children.length > 0) traverseNodes(node.children, flatMap, nodeIdKey);
  });
};

export const treeToFlatMap = <T extends { children?: T[] }, K extends keyof T>(
  nodes: T[],
  flatMap: Map<T[K] & PropertyKey, T>,
  nodeIdKey: K
): Map<T[K] & PropertyKey, T> => {
  traverseNodes(nodes, flatMap, nodeIdKey);

  return flatMap;
};
