import { componentMap } from "./componentMap";

const Renderer: React.FC<{ jsonTree: any }> = ({ jsonTree }) => {
  // Recursive function to render a node and its children/linkedNodes
  const renderNode = (nodeId: string): React.ReactNode => {
    const node = jsonTree[nodeId];
    const { resolvedName } = node.type;

    // Get the component from the component map
    const Component = componentMap[resolvedName];

    if (!Component) return null;

    // Recursively render the regular children nodes
    const children = node.nodes.map(renderNode);

    // Recursively render the linkedNodes
    const linkedChildren = node.linkedNodes
      ? Object.values(node.linkedNodes).map((linkedNodeId: unknown) =>
          renderNode(linkedNodeId as string)
        )
      : [];

    return (
      <Component key={nodeId} {...node.props}>
        {children.length > 0 ? children : null}
        {linkedChildren.length > 0 ? linkedChildren : null}
      </Component>
    );
  };

  return <>{renderNode("ROOT")}</>;
};

export default Renderer;
