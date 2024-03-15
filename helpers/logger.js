import  { createLogger, transports, format }from 'winston';

// Configure Winston logger
const Logger = createLogger({
  level: 'info', // Set the minimum logging level
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Log errors to error.log file
    new transports.File({ filename: 'logs/combined.log' }) // Log other logs to combined.log file
  ]
});

// If we're not in production, log to the console as well
if (process.env.NODE_ENV !== 'production') {
    Logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }));
}

export default Logger;
