import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { NotificationUser } from '../../models/notificationUser';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserNotificationService {

  constructor(private http:HttpClient, private loginService:LoginService, private tokenService:TokenService) { }

  private apiUrl = environment.apiBaseUrl;

  public createNotification(notification:NotificationUser):Observable<NotificationUser>{
    return this.http.post<NotificationUser>(`${this.apiUrl}/notificationUser/create` , notification);
  }



  public getNotificationByUserId(userId:number):Observable<NotificationUser[]>{
    const userToken = this.tokenService.getUserToken(this.loginService.getuser().userId);
    var headers = new HttpHeaders()
    if(userToken){
      headers = headers.set("Authorization", userToken);
    }

    return this.http.get<NotificationUser[]>(`${this.apiUrl}/notificationUser/user/${userId}`, {headers:headers});
  }



  public deleteNotification(notifId:number):Observable<string>{
    const userToken = this.tokenService.getUserToken(this.loginService.getuser().userId);
    var headers = new HttpHeaders()
    if(userToken){
      headers = headers.set("Authorization", userToken);
    }

    return this.http.get<string>(`${this.apiUrl}/notificationUser/user/${notifId}`, {headers:headers});
  }
}
