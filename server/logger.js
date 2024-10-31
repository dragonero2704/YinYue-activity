import winston from "winston";
import "winston-daily-rotate-file"

const infoFormat = (info) =>
  `${info.level} [${info.timestamp}] : ${info.message}`;

const dailyRotate = new winston.transports.DailyRotateFile({
  filename: "logs/%DATE%-server.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.uncolorize(),
    winston.format.align(),
    winston.format.printf(infoFormat)
  ),
});

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({ filename: "server.log" }),
    dailyRotate
  ],
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD hh:mm:ss",
    }),
    winston.format.colorize({ all: true }),
    winston.format.align(),
    winston.format.printf(
      infoFormat
    )
  ),
});
