import { getGooglePoints } from "../core/state-manager-server.js";

export default async (req, res) => {
  const googlePoints = await getGooglePoints();
  res.status(200).json({ data: googlePoints });
};
