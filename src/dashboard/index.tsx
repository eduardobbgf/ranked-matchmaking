import React, { useEffect, useState } from "react";
import generateRandomData from "../service/players-pool.service";
import { Player } from "../entities/Player";
import { Game } from "../entities/Game";

export default function Dashboard() {
  const [playersPool, setPlayersPool] = useState<Player[]>([]);
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    setPlayersPool(generateRandomData(100));
  }, []);

  useEffect(() => {
    console.log(playersPool);

    const interval = setInterval(() => {
      if (playersPool?.length === 0) {
        return;
      }
      const playerGamePool = playersPool.slice(0, 10);
      const radiant = playerGamePool.slice(0, 5);
      const dire = playerGamePool.slice(5, 10);
      playersPool?.splice(0, 10);
      const totalMMR = playerGamePool?.reduce(
        (acc, player) => acc + player.mmr,
        0
      );
      const avgMmr = playerGamePool?.length
        ? totalMMR / playerGamePool?.length
        : 0;
      const radiantMmr = radiant.reduce((acc, player) => acc + player.mmr, 0);
      const direMmr = dire.reduce((acc, player) => acc + player.mmr, 0);

      const newGame: Game = {
        radiant: radiant,
        dire: dire,
        mmrAverage: avgMmr,
        mmrDifference: radiantMmr - direMmr,
      };
      console.log(newGame);

      setGames((prevGames) => [...prevGames, newGame]);
    }, 1000);

    return () => clearInterval(interval);
  }, [playersPool?.length]);

  return (
    <div className="h-screen">
      <h1 className="text-3xl font-bold underline">Dota Matchmaking</h1>
      <div className="grid grid-cols-3 gap-3 h-full">
        <div className="h-screen overflow-scroll">
          <h3>Player Pool: {playersPool?.length}</h3>
          {playersPool?.map((player) => (
            <div key={player.id}>
              <span>{player.name}</span>
              <span>{player.mmr}</span>
            </div>
          ))}
        </div>
        <div className="col-span-2">
          {games?.map((game) => (
            <div
              key={game.mmrAverage + game.mmrDifference}
              className="grid grid-cols-3 gap-2"
            >
              <div>
                <div>{game.mmrAverage}</div>
                <div>{game.mmrDifference}</div>
              </div>
              <div>
                {game.radiant.map((player) => (
                  <div style={{ padding: "5px" }} key={player.id}>
                    <span>{player.name}</span>
                    <span>{player.mmr}</span>
                  </div>
                ))}
              </div>
              <div>
                {game.dire.map((player) => (
                  <div style={{ padding: "5px" }} key={player.id}>
                    <span>{player.name}</span>
                    <span>{player.mmr}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
