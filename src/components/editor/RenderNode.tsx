import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useNode, useEditor } from "@craftjs/core";
import { ROOT_NODE } from "@craftjs/utils";
import {
  ArrowUpOutlined,
  DeleteOutlined,
  DragOutlined,
} from "@ant-design/icons";

export const RenderNode = ({ render }: { render: React.ReactNode }) => {
  const { id } = useNode();
  const { actions, query, isActive } = useEditor((_, query) => ({
    isActive: query.getEvent("selected").contains(id),
  }));

  const {
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag },
    parent,
  } = useNode((node) => ({
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
  }));

  const currentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dom) {
      if (isActive || isHover) dom.classList.add("component-selected");
      else dom.classList.remove("component-selected");
    }
  }, [dom, isActive, isHover]);

  const getPos = useCallback((dom: HTMLElement | null) => {
    if (!dom) return { top: "0px", left: "0px" };
    const { top, left, bottom } = dom.getBoundingClientRect();
    return {
      top: `${top > 0 ? top : bottom}px`,
      left: `${left}px`,
    };
  }, []);

  const scroll = useCallback(() => {
    const { current: currentDOM } = currentRef;

    if (!currentDOM) return;
    const { top, left } = getPos(dom);
    currentDOM.style.top = top;
    currentDOM.style.left = left;
  }, [dom, getPos]);

  useEffect(() => {
    const renderer = document.querySelector(".craftjs-renderer");
    if (renderer) {
      renderer.addEventListener("scroll", scroll);
      return () => renderer.removeEventListener("scroll", scroll);
    }
  }, [scroll]);

  return (
    <>
      {(isHover || isActive) &&
        // https://react.dev/reference/react-dom/createPortal
        createPortal(
          <div
            ref={currentRef}
            className="indicator-div"
            style={{
              left: getPos(dom).left,
              top: getPos(dom).top,
            }}
          >
            <h2 className="component-name">{name}</h2>
            {moveable && (
              <a className="btn move-btn" ref={drag as any}>
                <DragOutlined />
              </a>
            )}
            {id !== ROOT_NODE && (
              <a
                className="btn up-btn"
                onClick={() => parent && actions.selectNode(parent)}
              >
                <ArrowUpOutlined />
              </a>
            )}
            {deletable && (
              <a
                className="btn delete-btn"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  actions.delete(id);
                }}
              >
                <DeleteOutlined />
              </a>
            )}
          </div>,
          document.querySelector(".page-container") as Element
        )}
      {render}
    </>
  );
};
