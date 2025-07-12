import { movePlayer } from "../core/state-manager-server.js";

export default async (req, res) => {
  const { playerNumber, direction } = req.query;
  await movePlayer(playerNumber, direction);
  res.status(200).json({ status: "OK" });
};
