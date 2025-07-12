import { start } from "../core/state-manager-server.js";

export default async (req, res) => {
  await start();
  res.send({ status: "OK" });
};
