const quadruped = {
  bones: [
    {
      name: 'body',
      pivot: [0.0, 19.0, 2.0],
      cubes: [
        {
          origin: [-5.0, 13.0, -5.0],
          size: [10, 16, 8],
          uv: [28, 8],
        },
      ],
    },
    {
      name: 'head',
      pivot: [0.0, 18.0, -6.0],
      cubes: [
        {
          origin: [-4.0, 14.0, -14.0],
          size: [8, 8, 8],
          uv: [0, 0],
        },
      ],
    },
    {
      name: 'leg0',
      pivot: [-3.0, 12.0, 7.0],
      cubes: [
        {
          origin: [-5.0, 0.0, 5.0],
          size: [4, 12, 4],
          uv: [0, 16],
        },
      ],
    },
    {
      name: 'leg1',
      pivot: [3.0, 12.0, 7.0],
      cubes: [
        {
          origin: [1.0, 0.0, 5.0],
          size: [4, 12, 4],
          uv: [0, 16],
        },
      ],
    },
    {
      name: 'leg2',
      pivot: [-3.0, 12.0, -5.0],
      cubes: [
        {
          origin: [-5.0, 0.0, -7.0],
          size: [4, 12, 4],
          uv: [0, 16],
        },
      ],
    },
    {
      name: 'leg3',
      pivot: [3.0, 12.0, -5.0],
      cubes: [
        {
          origin: [1.0, 0.0, -7.0],
          size: [4, 12, 4],
          uv: [0, 16],
        },
      ],
    },
  ],
};

export default quadruped;
