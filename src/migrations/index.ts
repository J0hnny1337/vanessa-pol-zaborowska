import * as migration_20261012_193423_initial from './20261012_193423_initial';

export const migrations = [
  {
    up: migration_20261012_193423_initial.up,
    down: migration_20261012_193423_initial.down,
    name: '20261012_193423_initial'
  },
];
