import { Role } from "./Enums/RoleEnum";

export interface Admin {
    adminId: number,
    name:string,
    email:string,
    password:string,
    location:string,
    phone:string,
    role: Role
}