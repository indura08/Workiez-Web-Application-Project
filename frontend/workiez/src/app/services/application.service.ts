import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Application } from '../../models/application';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { LoginService } from './login.service';
import { TokenService } from './token.service';

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

}
