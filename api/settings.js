import {
  getSettings,
  setGrid,
  setPointsToLose,
  setPointsToWin,
  toggleSound,
} from "../core/state-manager-server.js";

export default async (req, res) => {
  const { path } = req.query;

  if (path === "sound") {
    await toggleSound();
  } else if (path === "grid") {
    await setGrid(req.query.size);
  } else if (path === "pointsToLose") {
    await setPointsToLose(req.query.counts);
  } else if (path === "pointsToWin") {
    await setPointsToWin(req.query.counts);
  } else {
    const data = await getSettings();
    return res.send({ data });
  }

  res.send({ status: "OK" });
};
