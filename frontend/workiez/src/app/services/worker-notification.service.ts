import { HttpClient } from '@angular/common/http';
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
    return this.http.put<string>(`${this.apiUrl}/notificationWorker/update/${notificationWorker.notificationWorkerId}` , notificationWorker)
  }
}
