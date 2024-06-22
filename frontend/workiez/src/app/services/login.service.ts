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
import { AsyncLocalStorage } from 'async_hooks';
import { stringify } from 'querystring';

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

  setUser(user:User):void{
    localStorage.setItem(`userobj_${user.userId}` , JSON.stringify(user))
  }

  getuser(userId:number):User | null{
    const userJson = localStorage.getItem(`userobj_${userId}`)
    if(userJson){
      this.user = JSON.parse(userJson);
      return this.user;
    }
    return null
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
