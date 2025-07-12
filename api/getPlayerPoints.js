import { getPlayerPoints } from "../core/state-manager-server.js";

export default async (req, res) => {
  const { playerNumber } = req.query;
  const playerPoints = await getPlayerPoints(playerNumber);
  res.status(200).json({ data: playerPoints });
};
