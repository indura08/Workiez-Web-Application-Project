import { User } from "./user";

export interface NotificationUser {
    notificationId: number,
    description: string,
    user:User,
    date:string
    time:string

}