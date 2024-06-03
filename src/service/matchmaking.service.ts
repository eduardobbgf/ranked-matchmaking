import { Game } from "../entities/Game";
import { Player } from "../entities/Player";
import { generateUniqueId } from "./utils";

export const fakeService = {
  fetchData: (
    playersPool: Player[]
  ): Promise<{ game: Game; newPool: Player[] }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return {
          game: {
            id: generateUniqueId(),
          },
        };
      }, 1000); // Simulate a 1-second delay
    });
  },
};
