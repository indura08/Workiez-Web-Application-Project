import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Job } from '../../models/job';
import { TokenService } from './token.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient , private tokenService: TokenService , private loginService: LoginService){}

  public getJobs():Observable<Job[]>{
    //const workerToken = this.tokenService.getWorkerToken();
    const userToken = this.tokenService.getUserToken(this.loginService.user.userId);
    var headers;
    if(userToken){
      headers = new HttpHeaders({'Authorization':  userToken})
    }
    console.log(userToken + "this is job service speaking?")
    return this.http.get<Job[]>(`${this.apiUrl}/job/all` , {headers:headers})
    
  }

  public createJob(job: Job):Observable<string>{
    const userToken = this.tokenService.getUserToken(this.loginService.user.userId)
    var headers;
    if(userToken){
      headers = new HttpHeaders({"Authorization": userToken})
    }
    
    return this.http.post<string>(`${this.apiUrl}/job/create` , job , {headers:headers})
  }

  public getJobById(jobId: number):Observable<string>{
    const headers = new HttpHeaders({"Authorization": ""})
    return this.http.get<string>(`${this.apiUrl}/job/${jobId}`)
  }

  public deletJob(jobId:number):Observable<string>{
    const headers = new HttpHeaders({"Authorization": ""})
    return this.http.delete<string>(`${this.apiUrl}/job/delete/${jobId}`)
  }
}
