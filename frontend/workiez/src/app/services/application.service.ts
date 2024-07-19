import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Application } from '../../models/application';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { LoginService } from './login.service';
import { TokenService } from './token.service';
import { Job } from '../../models/job';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient, private loginService:LoginService, private tokenService:TokenService){}

  private apiUrl = environment.apiBaseUrl;

  public createApplication(application: Application): Observable<Application>{
    const workerToken = this.tokenService.getWorkerToken(this.loginService.getWorker().workerId);
    if(workerToken){
      const header = new HttpHeaders({"Authorization": `${workerToken}`})
      return this.http.post<Application>(`${this.apiUrl}/application/create` , application , {headers:header})
    }
    return this.http.post<Application>(`${this.apiUrl}/application/create` , application)
  }

  public getApplicationByJobId(jobId:number):Observable<Application[]>{
    const workerToken = this.tokenService.getWorkerToken(this.loginService.getWorker().workerId)
    const userToken = this.tokenService.getUserToken(this.loginService.getuser().userId)

    if(workerToken && !userToken){
      const headers = new HttpHeaders({'Authorization': workerToken})
      return this.http.get<Application[]>(`${this.apiUrl}/application/job/${jobId}`, {headers:headers})
    }
    else if(userToken && !workerToken){
      const headers = new HttpHeaders({'Authorization': userToken})
      return this.http.get<Application[]>(`${this.apiUrl}/application/job/${jobId}`, {headers:headers})
    }
    else if(userToken && workerToken) {
      const headers = new HttpHeaders({'Authorization': userToken})
      return this.http.get<Application[]>(`${this.apiUrl}/application/job/${jobId}`, {headers:headers})
    }
    else {
      const headers = new HttpHeaders({'Authorization': 'Bearer '})
      return this.http.get<Application[]>(`${this.apiUrl}/application/job/${jobId}`, {headers:headers})

    }
  }

  public updateApplication(applicationId:number , application: Application):Observable<string>{
    const userToken = this.tokenService.getUserToken(this.loginService.getuser().userId);
    var headers = new HttpHeaders()
    if(userToken){
      headers = headers.set("Authorization" , userToken);
    }

    return this.http.put<string>(`${this.apiUrl}/application/update/${applicationId}` , application, {headers:headers , responseType: 'text' as 'json'})
  }

  public deleteApplication(applicationId:number ):Observable<string>{
    const userToken = this.tokenService.getUserToken(this.loginService.getuser().userId)
    var headers = new HttpHeaders()
    if(userToken){
      headers = headers.set("Authorization" , userToken);
    }

    return this.http.delete<string>(`${this.apiUrl}/application/delete/${applicationId}` , {headers:headers , responseType: 'text' as 'json'})
  }

  public deleteApplicationByJob(job:Job):Observable<string>{
    const userToken = this.tokenService.getUserToken(this.loginService.getuser().userId)
    var headers = new HttpHeaders()
    if(userToken){
      headers = headers.set("Authorization" , userToken);
    }

    return this.http.delete<string>(`${this.apiUrl}/application/delete/byJob/${job.jobId}`, {headers:headers, responseType: "text" as "json"});
  }

}
