import { getGameStatus } from "../core/state-manager-server.js";

export default async (req, res) => {
  const gameStatus = await getGameStatus();
  res.status(200).json({ data: gameStatus });
};
