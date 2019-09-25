import winston, { transports } from "winston";

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.label({ label: "MiniJobs" }),
    winston.format.timestamp(),
    winston.format.metadata({
      fillExcept: ["message", "level", "timestamp", "label"]
    }),
    winston.format.colorize(),
    winston.format.printf(info => {
      let out = `${info.timestamp
        .split("T")
        .join(" ")
        .split("Z")
        .join("")} [${info.label}] ${info.level}: ${info.message}`;
      if (info.metadata.error) {
        out = out + " " + info.metadata.error;
        if (info.metadata.error.stack) {
          out = out + " " + info.metadata.error.stack;
        }
      }
      return out;
    })
  ),
  transports: [new transports.Console()]
});

export default logger;
