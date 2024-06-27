import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../../models/loginRequest';
import { AuthenticationResponse } from '../../models/authenticationResponse';
import { User } from '../../models/user';
import { Role } from '../../models/Enums/RoleEnum';
import { Gender } from '../../models/Enums/GenderEnum';
import { District } from '../../models/Enums/DistrictEnum';
import { Province } from '../../models/Enums/ProvinceEnum';
import { WorkerAuthenticationresponse } from '../../models/authenticationResponseWorker';
import { Worker } from '../../models/worker';
import { stringify } from 'querystring';
import { UserDTO } from '../../models/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiBaseUrl;

  public user:User = {
    userId:0,
    firstname: '',
    lastname:'',
    username:'',
    email:'',
    password:'',
    role:Role.ROLE_USER,
    gender: Gender.MALE,
    phone: '',
    district: District.COLOMBO,
    province:Province.WESTERN,
    city:''
  }

  // setUser(user:User){
  //   this.user = user;
  // }

  // getUser(): User {
  //   return this.user;
  // }

  public worker: Worker = {
    workerId:0 ,
    firstname:'',
    lastname:'',
    username:'',
    email:'',
    password: '',
    baseDistrict: District.COLOMBO,
    baseProvince: Province.WESTERN,
    baseCity: '',
    gender: Gender.MALE,
    phone : '',
    services:[],
    availability: true,
    experienceDescription:'',
    role:Role.ROLE_WORKER,
  }

  // setWorker(worker:Worker){
  //   this.worker = worker;
  // }

  // getWorker(): Worker {
  //   return this.worker;
  // }

  public jobUserDTO:UserDTO = {
    userdId:0,
    firstname:"",
    lastname:"",
    email:"",
    username: "",
    phone:"",
    role:Role.ROLE_USER,
    district:District.COLOMBO,
    province:Province.WESTERN,
    gender:Gender.MALE,
    city:"",
  }

  setGlboalUser():void{
    localStorage.setItem(`globalUser` , JSON.stringify(this.user));
  }

  setUser(user:User):void{
    localStorage.setItem(`globalUser` , JSON.stringify(user));
  }

  getuser():User{
    const userJson = localStorage.getItem(`globalUser`)
    if(userJson){
      return JSON.parse(userJson)
    }
    return this.user
  }

  setGlobalWorker():void{
    localStorage.setItem(`globalWorker` , JSON.stringify(this.worker))
  }

  setWorker(worker:Worker):void{
    localStorage.setItem(`globalWorker` , JSON.stringify(worker))
  }

  getWorker():Worker{
    const currentWorker = localStorage.getItem(`globalWorker`)
    if(currentWorker){
      return JSON.parse(currentWorker)
    }else {
      return this.worker
    }
    
  }

  setGlobalJobUser(){
    localStorage.setItem(`globalJobUser` , JSON.stringify(this.jobUserDTO))
  }

  setJobUserDTO(user:User):void{

    this.jobUserDTO = {
      userdId: user.userId,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email:user.email,
      phone: user.phone,
      role:user.role,
      district:user.district,
      province:user.province,
      gender:user.gender,
      city:user.city
    }

    localStorage.setItem(`globalJobUser` , JSON.stringify(this.jobUserDTO));

  }
    

  getJobUserDTO():UserDTO{
    const stringJobUser = localStorage.getItem(`globalJobUser`)
    if(stringJobUser){
      return JSON.parse(stringJobUser)
    }
    return this.jobUserDTO;
  }



  constructor(private http: HttpClient){}

  public loginUser(loginRequest:LoginRequest):Observable<AuthenticationResponse>{
    const headers = new HttpHeaders({'Content-type': 'application/json'})
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/auth/login/user`, loginRequest , {headers:headers})
  }

  public loginWorker(loginRequest:LoginRequest):Observable<WorkerAuthenticationresponse>{
    const headers = new HttpHeaders({ 'Content-type': 'application/json' })
    return this.http.post<WorkerAuthenticationresponse>(`${this.apiUrl}/auth/login/worker` , loginRequest , {headers:headers});
  }
}
