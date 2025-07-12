import { getGridSize } from "../core/state-manager-server.js";

export default async (req, res) => {
  const gridSize = await getGridSize();
  res.status(200).json({ data: gridSize });
};
