import { merge } from 'lodash';

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

const cow = {
  texturewidth: 64,
  textureheight: 32,
  bones: [
    {
      name: 'body',
      reset: true,
      pivot: [0.0, 19.0, 2.0],
      cubes: [
        {
          origin: [-6.0, 11.0, -5.0],
          size: [12, 18, 10],
          uv: [18, 4],
        },
        {
          origin: [-2.0, 11.0, -6.0],
          size: [4, 6, 1],
          uv: [52, 0],
        },
      ],
    },
    {
      name: 'head',
      reset: true,
      pivot: [0.0, 20.0, -8.0],
      cubes: [
        {
          origin: [-4.0, 16.0, -14.0],
          size: [8, 8, 6],
          uv: [0, 0],
        },
        {
          origin: [-5.0, 22.0, -12.0],
          size: [1, 3, 1],
          uv: [22, 0],
        },
        {
          origin: [4.0, 22.0, -12.0],
          size: [1, 3, 1],
          uv: [22, 0],
        },
      ],
    },
    {
      name: 'leg0',
      pivot: [-4.0, 12.0, 7.0],
    },
    {
      name: 'leg1',
      pivot: [4.0, 12.0, 7.0],
    },
    {
      name: 'leg2',
      pivot: [-4.0, 12.0, -6.0],
    },
    {
      name: 'leg3',
      pivot: [4.0, 12.0, -6.0],
    },
  ],
};

const cowMerged = {};

// Replace bones when reset === true
// This only works when the parent and child have the same number of bones
const cowMergedBones = [];
for (let i = 0; i < cow.bones.length; i += 1) {
  const quadBone = quadruped.bones[i];
  const cowBone = cow.bones[i];
  if (cowBone.reset) {
    cowMergedBones.push(cowBone);
  } else {
    cowMergedBones.push(merge({}, quadBone, cowBone));
  }
}
cowMerged.bones = cowMergedBones;

export default cowMerged;
