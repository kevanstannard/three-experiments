import { ONE_MILLION, ONE_BILLION } from '../lib/constants';

export default {
  name: 'sol',
  radius: 695700,
  color: 0xffff00,
  planets: [
    {
      name: 'mercury',
      color: 0xffffff,
      radius: 2440, // kms
      orbitRadius: 58000000, // kms
      orbitPeriod: 88, // days
    },
    {
      name: 'venus',
      color: 0xd2691e,
      radius: 6052, // kms
      orbitRadius: 108000000, // kms
      orbitPeriod: 225, // days
    },
    {
      name: 'earth',
      color: 0x0000ff,
      radius: 6371, // kms
      orbitRadius: 150000000, // kms
      orbitPeriod: 365, // days
      moons: [
        {
          name: 'moon',
          color: 0xffffff,
          radius: 1737, // kms
          orbitRadius: 384000, // kms
          orbitPeriod: 27, // days
        },
      ],
    },
    {
      name: 'mars',
      color: 0xff0000,
      radius: 3390, // kms
      orbitRadius: 230000000, // kms
      orbitPeriod: 687, // days
    },
    {
      name: 'jupiter',
      color: 0xff6347,
      radius: 69911, // kms
      orbitRadius: 778 * ONE_MILLION, // kms
      orbitPeriod: 4329, // days
      moons: [
        {
          name: 'ganymede',
          color: 0xffffff,
          radius: 5262 / 2,
          orbitRadius: 1.07 * ONE_MILLION,
          orbitPeriod: 7,
        },
        {
          name: 'callisto',
          color: 0xffffff,
          radius: 4821 / 2,
          orbitRadius: 1.8827 * ONE_MILLION,
          orbitPeriod: 17,
        },
        {
          name: 'io',
          color: 0xffffff,
          radius: 3660 / 2,
          orbitRadius: 0.422 * ONE_MILLION,
          orbitPeriod: 1.7691,
        },
      ],
    },
    {
      name: 'saturn',
      color: 0xffd700,
      radius: 58232, // kms
      orbitRadius: 1.4 * ONE_BILLION, // kms
      orbitPeriod: 10759, // days
    },
    {
      name: 'uranus',
      color: 0xccffff,
      radius: 25362, // kms
      orbitRadius: 3 * ONE_BILLION, // kms
      orbitPeriod: 84 * 365, // days
    },
    {
      name: 'neptune',
      color: 0x336699,
      radius: 24622, // kms
      orbitRadius: 4.5 * ONE_BILLION, // kms
      orbitPeriod: 165 * 365, // days
    },
  ],
};
