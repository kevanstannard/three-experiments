import { merge } from 'lodash';
import quadruped from './quadruped';

const mob = {
  texturewidth: 64,
  textureheight: 32,

  bones: [
    {
      name: 'body',
      reset: true,
      pivot: [0.0, 13.0, 2.0],
      cubes: [
        {
          origin: [-5.0, 7.0, -5.0],
          size: [10, 16, 8],
          uv: [28, 8],
        },
      ],
    },
    {
      name: 'head',
      reset: true,
      pivot: [0.0, 12.0, -6.0],
      cubes: [
        {
          origin: [-4.0, 8.0, -14.0],
          size: [8, 8, 8],
          uv: [0, 0],
        },
        {
          origin: [-2.0, 9.0, -15.0],
          size: [4, 3, 1],
          uv: [16, 16],
        },
      ],
    },
    {
      name: 'leg0',
      reset: true,
      pivot: [-3.0, 6.0, 7.0],
      cubes: [
        {
          origin: [-5.0, 0.0, 5.0],
          size: [4, 6, 4],
          uv: [0, 16],
        },
      ],
    },
    {
      name: 'leg1',
      reset: true,
      pivot: [3.0, 6.0, 7.0],
      cubes: [
        {
          origin: [1.0, 0.0, 5.0],
          size: [4, 6, 4],
          uv: [0, 16],
        },
      ],
    },
    {
      name: 'leg2',
      reset: true,
      pivot: [-3.0, 6.0, -5.0],
      cubes: [
        {
          origin: [-5.0, 0.0, -7.0],
          size: [4, 6, 4],
          uv: [0, 16],
        },
      ],
    },
    {
      name: 'leg3',
      reset: true,
      pivot: [3.0, 6.0, -5.0],
      cubes: [
        {
          origin: [1.0, 0.0, -7.0],
          size: [4, 6, 4],
          uv: [0, 16],
        },
      ],
    },
  ],
};

const merged = {};

// Replace bones when reset === true
// This only works when the parent and child have the same number of bones
const mergedBones = [];
for (let i = 0; i < mob.bones.length; i += 1) {
  const quadBone = quadruped.bones[i];
  const mobBone = mob.bones[i];
  if (mobBone.reset) {
    mergedBones.push(mobBone);
  } else {
    mergedBones.push(merge({}, quadBone, mobBone));
  }
}
merged.bones = mergedBones;

export default merged;
