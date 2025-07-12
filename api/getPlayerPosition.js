import { getPlayerPosition } from "../core/state-manager-server.js";

export default async (req, res) => {
  const { playerNumber } = req.query;
  const playerPosition = await getPlayerPosition(playerNumber);
  res.status(200).json({ data: playerPosition });
};
