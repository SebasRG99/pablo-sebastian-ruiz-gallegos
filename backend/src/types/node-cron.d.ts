declare module 'node-cron' {
    interface ScheduleOptions {
        scheduled?: boolean;
        timezone?: string;
    }
    type Task = () => void;
    
    function schedule(cronExpression: string, task: Task, options?: ScheduleOptions): void;
    export { schedule };
}