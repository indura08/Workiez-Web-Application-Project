import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { TokenService } from './token.service';
import { NotificationWorker } from '../../models/notificationWorker';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkerNotificationService {

  constructor(private http: HttpClient , private loginService:LoginService , private tokenService:TokenService){}
  private apiUrl = environment.apiBaseUrl;

  public createtWorkerNotification(notificationWorker:NotificationWorker):Observable<string>{
    return this.http.post<string>(`${this.apiUrl}/notificationWorker/create` , notificationWorker)
  }

  public getAllNotificationBYworker(workerId:number):Observable<NotificationWorker[]>{
    const workerToken = this.tokenService.getWorkerToken(this.loginService.getWorker().workerId)
    var headers = new HttpHeaders()
    if(workerToken){
      headers = headers.set("Authorization" , workerToken)
    }

    return this.http.get<NotificationWorker[]>(`${this.apiUrl}/notificationWorker/worker/${workerId}` , {headers:headers})
  }
}
