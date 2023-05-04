import os from "os";
import { printTable } from "console-table-printer";

const SIZES = ["B", "KB", "MB", "GB", "TB"];
const bytesToFormattedSize = (bytes: number) => {
  if (bytes === 0) return "0B";

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${Math.round(bytes / Math.pow(1024, i))} ${SIZES[i]}`;
};

const array = [];

setInterval(() => {
  // assigning random stuff to simulate using memory
  for (let i = 0; i < 5_00_000; i++) {
    const a = i * 2;
    array.push(a);
  }
  printTable([
    {
      id: process.pid,
      cpus: os.cpus().length,
      memory: bytesToFormattedSize(os.totalmem()),
      freeMemory: bytesToFormattedSize(os.freemem()),
      memUsedByProcess: bytesToFormattedSize(process.memoryUsage().heapUsed),
      platform: os.platform(),
      release: os.release(),
      uptime: `${os.uptime()}s`,
      avgLoad: os
        .loadavg()
        .map((load) => load.toFixed(2))
        .join(", "),
    },
  ]);
}, 1_500);
