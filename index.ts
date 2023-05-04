import os from "os";
import { printTable } from "console-table-printer";

const SIZES = ["B", "KB", "MB", "GB", "TB"];
const bytesToFormattedSize = (bytes: number) => {
  if (bytes === 0) return "0B";

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${Math.round(bytes / Math.pow(1024, i))} ${SIZES[i]}`;
};

setInterval(() => {
  printTable([
    {
      cpus: os.cpus().length,
      memory: bytesToFormattedSize(os.totalmem()),
      freeMemory: bytesToFormattedSize(os.freemem()),
      platform: os.platform(),
      release: os.release(),
      uptime: `${os.uptime()}s`,
      avgLoad: os
        .loadavg()
        .map((load) => load.toFixed(2))
        .join(", "),
    },
  ]);
}, 5_000);
