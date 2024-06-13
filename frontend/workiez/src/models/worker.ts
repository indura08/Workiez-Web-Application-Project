import { District } from "./Enums/DistrictEnum";
import { Gender } from "./Enums/GenderEnum";
import { Province } from "./Enums/ProvinceEnum";
import { Role } from "./Enums/RoleEnum";
import { Service } from "./service";

export interface Worker{
    
    workerId: number,
    firstname:string,
    lastname:string,
    username:string,
    email:string,
    password: string,
    baseDistrict: District,
    baseProvince: Province,
    baseCity: string,
    gender: Gender,
    phone : string,
    services: Service[],
    availability: boolean,
    experienceDescription:string,
    role:Role,

}