import { District } from "./Enums/DistrictEnum";
import { Gender } from "./Enums/GenderEnum";
import { Province } from "./Enums/ProvinceEnum";
import { Role } from "./Enums/RoleEnum";
import { User } from "./user";

export interface UserDTO {

    userdId:number,
    firstname:string,
    lastname:string,
    email:string,
    username: string,
    phone:string,
    role:Role,
    district:District,
    province:Province
    gender:Gender,
    city:string,
}