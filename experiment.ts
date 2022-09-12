type Experiment = {
  id: string;
  name: string;
  description: string;
  dependOn: string[];
};

export const experiments: Experiment[] = [
  {
    id: "align-object-to-vector",
    name: "Align Object to Vector",
    description: "Rotates an object to face the same direction as a vector",
    dependOn: ["three-r92"],
  },

  {
    id: "arrow-helper",
    name: "Arrow Helper",
    description: "Simple ArrowHelper experiment",
    dependOn: ["three-r87"],
  },

  {
    id: "blender-cube-obj",
    name: "Blender Cube OBJ",
    description: "Loads and displays a simple Blender cube",
    dependOn: ["three-r83"],
  },

  {
    id: "box-wireframe",
    name: "Box Wireframe",
    description: "Simple box wireframe",
    dependOn: ["three-r83"],
  },

  {
    id: "camera-rotation-angle",
    name: "Camera Rotation Angle",
    description: "Camera rotation experiment with Euler angles",
    dependOn: ["three-r84"],
  },

  {
    id: "circle-outline",
    name: "Circle Outline",
    description: "Simple example of an outlined circle (not filled in)",
    dependOn: ["three-r83"],
  },

  {
    id: "clock-delta-animation",
    name: "Clock Delta Animation",
    description: "Rotating cubes at different rates using clock delta values",
    dependOn: ["three-r83"],
  },

  {
    id: "cross-product",
    name: "Cross Product",
    description: "Simple geometric interpretation of a cross product",
    dependOn: ["three-r83"],
  },

  {
    id: "cube-textures",
    name: "Cube Textures",
    description: "Cube with a different texture on each face",
    dependOn: ["three-r83"],
  },

  {
    id: "custom-geometry",
    name: "Custom Geometry",
    description: "Simple experiment with a custom geometry",
    dependOn: ["three-r83"],
  },

  {
    id: "fractal-tree",
    name: "Fractal Tree",
    description: "Fractal experiment with a tree shape",
    dependOn: ["three-r83"],
  },

  {
    id: "frames-per-second",
    name: "Frames Per Second",
    description: "Example to make some frames per second measurements",
    dependOn: ["three-r83"],
  },

  {
    id: "geometry-uvs",
    name: "Geometry UVs",
    description: "Example of manipulating Geometry UVs",
    dependOn: ["three-r83"],
  },

  {
    id: "geometry-vertices",
    name: "Geometry Vertices",
    description: "Example of manipulating Geometry vertices",
    dependOn: ["three-r83"],
  },

  {
    id: "helpers",
    name: "Helpers",
    description: "Simple example showing an AxisHelper and a GridHelper",
    dependOn: ["three-r83"],
  },

  {
    id: "interactive-cubes",
    name: "Interactive Cubes",
    description: "Simple example of interacting with objects in a scene",
    dependOn: ["three-r83"],
  },

  {
    id: "keyboard-move",
    name: "Keyboard Move",
    description: "Experiment to move an object with the keyboard",
    dependOn: ["three-r83"],
  },

  {
    id: "line-vs-mesh",
    name: "Line vs Mesh",
    description: "Explore difference between a Line and a Mesh",
    dependOn: ["three-r84"],
  },

  {
    id: "load-obj",
    name: "Load OBJ",
    description: "Loads and displays a simple OBJ object",
    dependOn: ["three-r83"],
  },

  {
    id: "load-texture",
    name: "Load Texture",
    description: "Simple example to load a texture with CORS",
    dependOn: ["three-r84"],
  },

  {
    id: "matrix-vector-multiplication",
    name: "Matrix Vector Multiplication",
    description: "Experimenting with Matrix and Vector multiplication",
    dependOn: ["three-r83"],
  },

  {
    id: "minecraft-head",
    name: "Minecraft Head",
    description:
      "Example of cube texture mapping with a Minecraft head geometry",
    dependOn: ["three-r83"],
  },

  {
    id: "minecraft-quadruped",
    name: "Minecraft Quadruped",
    description: "Experiment with a Minecraft Vanilla Resource Mob model",
    dependOn: ["three-r83"],
  },

  {
    id: "minecraft-quadruped-no-skeleton",
    name: "Minecraft Quadruped without Skeleton",
    description: "Experiment with a Minecraft Vanilla Resource Mob model",
    dependOn: ["three-r84"],
  },

  {
    id: "moving-relative-objects",
    name: "Moving Relative Objects",
    description: "Moving joined objects relative to each other",
    dependOn: ["three-r83"],
  },
];
