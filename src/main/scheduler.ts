import cron from 'node-cron'
import type { ScheduledTask } from 'node-cron'

export class Scheduler {
  private task: ScheduledTask | null = null

  start(hour: number, minute: number, callback: () => void): void {
    this.stop()
    const cronExpr = `${minute} ${hour} * * *`
    this.task = cron.schedule(cronExpr, callback)
  }

  stop(): void {
    if (this.task) {
      this.task.stop()
      this.task = null
    }
  }

  reschedule(hour: number, minute: number, callback: () => void): void {
    this.start(hour, minute, callback)
  }
}
