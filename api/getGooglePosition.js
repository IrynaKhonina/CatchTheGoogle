import { getGooglePosition } from "../core/state-manager-server.js";

export default async (req, res) => {
  const googlePosition = await getGooglePosition();
  res.status(200).json({ data: googlePosition });
};
