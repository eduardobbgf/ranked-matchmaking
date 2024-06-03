import { Player } from "./Player";

export type Game = {
  id?: string;
  radiant: Player[];
  dire: Player[];
  mmrAverage: number;
  mmrDifference: number;
};
