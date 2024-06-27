import { District } from "./Enums/DistrictEnum"
import { JobStatus } from "./Enums/JobstatusEnum"
import { Province } from "./Enums/ProvinceEnum"
import { UserDTO } from "./UserDTO"
import { User } from "./user"

export interface Job {
    jobId: number,
    JobName: string,
    description: string
    user : User,
    locationDistrict: District,
    locationProvince:Province,
    city:string,
    jobStatus:JobStatus,
    creationDateTime:string
}