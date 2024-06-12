import { ApplicationStatus } from "./Enums/ApplicationStatusEnum";
import { Job } from "./job";

export interface Application {
    applicationId: number,
    applicationName: string,
    worker: Worker,
    job: Job,
    applicationStatus:ApplicationStatus,
    applicationDateAndTime:string
    
}