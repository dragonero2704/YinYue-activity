import winston from "winston";

export const logger = winston.createLogger({
    transports:[
      new winston.transports.Console(),
      new winston.transports.File({filename:"server.log"})
    ],
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD hh:mm:ss',
      }),
      winston.format.colorize({all:true}),
      winston.format.align(),
      winston.format.printf(info=>`[${info.timestamp}] ${info.level}: ${info.message}`)
    )
  })


