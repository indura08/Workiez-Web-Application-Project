import { District } from "./Enums/DistrictEnum";
import { Gender } from "./Enums/GenderEnum";
import { Province } from "./Enums/ProvinceEnum";
import { Role } from "./Enums/RoleEnum";

export interface User{
    userId:number,
    firstname: string,
    lastname:string,
    username:string,
    email:string,
    password:string,
    role:Role
    gender: Gender,
    phone: string,
    district: District,
    province:Province,
    city:string

}