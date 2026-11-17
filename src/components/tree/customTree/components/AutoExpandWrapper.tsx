import { ReactNode, useMemo } from 'react';

type TreeItemNode = {
  id?: string | number;
  children?: TreeItemNode[];
};

type TreeItems = TreeItemNode[];

// Computes which nodes should be expanded by default up to the given depth.
export const collectExpandedIds = (items: TreeItems, expandDepth?: number): string[] => {
  const traverse = (nodes: TreeItems, depth: number): string[] => {
    return nodes.flatMap((node) => {
      const children = node.children ?? [];
      const shouldInclude = expandDepth === undefined || depth < expandDepth;
      const currentId = shouldInclude && node.id !== undefined ? [String(node.id)] : [];

      return [...currentId, ...traverse(children, depth + 1)];
    });
  };

  return traverse(items, 0);
};

interface AutoExpandWrapperProps {
  items: TreeItems;
  expandDepth?: number;
  children: (expandedIds: string[]) => ReactNode;
}

// Render-prop helper to provide expanded ids to any consumer.
const AutoExpandWrapper = ({ items, expandDepth, children }: AutoExpandWrapperProps) => {
  const expandedIds = useMemo(() => collectExpandedIds(items, expandDepth), [items, expandDepth]);

  return <>{children(expandedIds)}</>;
};

export default AutoExpandWrapper;
