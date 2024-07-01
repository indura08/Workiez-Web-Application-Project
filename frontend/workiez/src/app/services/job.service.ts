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
  
    const userToken = this.tokenService.getUserToken(this.loginService.getuser()?.userId);
    const workerToken = this.tokenService.getWorkerToken(this.loginService.getWorker().workerId);

    if(userToken && !workerToken){
      const headers = new HttpHeaders({'Authorization':  userToken})
      return this.http.get<Job[]>(`${this.apiUrl}/job/all` , {headers:headers})
    }
    else if(!userToken && workerToken){
      const headers = new HttpHeaders({'Authorization':  workerToken})
      return this.http.get<Job[]>(`${this.apiUrl}/job/all` , {headers:headers})
    }
    //i havent established to check the logged one is user or worker so still didint established  the secenario where worker and user both tokens are available
    else if(userToken && workerToken){
      console.log(workerToken + " " + userToken +  "this is worker token and this is job service speaking?")
      const headers = new HttpHeaders({'Authorization' : userToken})
      return this.http.get<Job[]>(`${this.apiUrl}/job/all` , {headers:headers})
    }

    else{
      console.log(workerToken + " " + userToken +  "this is worker token and this is job service speaking?")
      const headers = new HttpHeaders({'Authorization' : 'Bearer '})
      return this.http.get<Job[]>(`${this.apiUrl}/job/all` , {headers:headers})
    }

  }

  public createJob(job: Job):Observable<string>{
    const userToken = this.tokenService.getUserToken(this.loginService.getuser().userId)
    var headers;
    if(userToken){
      headers = new HttpHeaders({"Authorization": userToken})
    }
    
    return this.http.post<string>(`${this.apiUrl}/job/create` , job , {headers:headers})
  }

  // public getJobById(jobId: number):Observable<string>{
  //   const headers = new HttpHeaders({"Authorization": ""})
  //   return this.http.get<string>(`${this.apiUrl}/job/${jobId}`)
  // } no need yet

  public deletJob(jobId:number):Observable<string>{
    const headers = new HttpHeaders({"Authorization": ""})
    return this.http.delete<string>(`${this.apiUrl}/job/delete/${jobId}`)
  }
}
