import { Worker } from "./worker";

export interface NotificationWorker{

    notificationWorkerId: number,
    description:string,
    worker:Worker;
    date:string,

}