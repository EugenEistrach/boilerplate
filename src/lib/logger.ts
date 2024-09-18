const logLevels = ["info", "warn", "error"] as const
type LogLevel = (typeof logLevels)[number]

const logger = logLevels.reduce(
  (acc, level) => {
    acc[level] = (...args: any[]) => {
      console[level](`[${level.toUpperCase()}]`, ...args)
    }
    return acc
  },
  {} as Record<LogLevel, (...args: any[]) => void>
)

export { logger }
