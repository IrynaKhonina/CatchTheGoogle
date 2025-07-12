import { subscribe, unsubscribe } from "../core/state-manager-server.js";

export default async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const observer = (e) => {
    res.write(`data: ${JSON.stringify(e)}\n\n`);
  };

  subscribe(observer);

  req.on("close", () => {
    unsubscribe(observer);
    res.end();
  });
};
