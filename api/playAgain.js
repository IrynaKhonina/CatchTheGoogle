import { playAgain } from "../core/state-manager-server.js";

export default async (req, res) => {
  await playAgain();
  res.status(200).json({ status: "OK" });
};
