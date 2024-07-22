import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Worker } from '../../models/worker';
import { TokenService } from './token.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  private apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient, private tokenService: TokenService, private loginService:LoginService) {}

  public addWorker(worker: Worker): Observable<string>{
    const headers = new HttpHeaders({'content-type' : 'application/json'})
    return this.http.post<string>(`${this.apiUrl}/auth/register/worker` , worker , {headers: headers})
  }

  public updateWorker(worker: Worker): Observable<string>{
    const workerToken = this.tokenService.getWorkerToken(this.loginService.getWorker().workerId)
    var headers = new HttpHeaders()
    if(workerToken){
      headers = headers.set("Authorization" , workerToken);
    }
    return this.http.put<string>(`${this.apiUrl}/worker/update/${worker.workerId}` , worker, {headers:headers , responseType: "text" as "json"})
  }

  public deleteWorker(workerId: number): Observable<string>{
    const workerToken = this.tokenService.getWorkerToken(this.loginService.getWorker().workerId)
    var headers = new HttpHeaders()
    if(workerToken){
      headers = headers.set("Authorization" , workerToken);
    } 
    return this.http.delete<string>(`${this.apiUrl}/worker/delete/${workerId}`, {headers:headers , responseType: "text" as "json"})
  }


}
