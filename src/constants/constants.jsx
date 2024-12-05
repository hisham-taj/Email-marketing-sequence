import { MarkerType } from "reactflow";

export const normalNodeWidth = 100;
export const addButtonWidth = 30;

export const addButtonStyle = {
  width: addButtonWidth,
  height: 30,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "2px solid #80B4E7",
  color: "#80B4E7",
  fontWeight: "bold",
};

export const nodeStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const initialNodes = [
  {
    id: "0",
    type: "default",
    data: { label: "+ Add lead source" },
    position: { x: 0, y: 0 },
    draggable: false,
    style: { height: 70, width: normalNodeWidth, ...nodeStyle },
  },
  {
    id: "1",
    type: "default",
    data: { label: "Starting point" },
    position: { x: 0, y: 130 },
    draggable: false,
    style: { height: 30, width: normalNodeWidth, ...nodeStyle },
  },
  {
    id: "add-button",
    type: "default",
    data: { label: "+" },
    position: {
      x: (normalNodeWidth - addButtonWidth) / 2,
      y: 100 + 70,
    },
    draggable: false,
    style: {
      width: addButtonWidth,
      ...addButtonStyle,
    },
  },
];

export const initialEdges = [
  {
    id: "edge-0-1",
    source: "0",
    target: "1",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
  {
    id: "edge-1-add-button",
    source: "1",
    target: "add-button",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];
