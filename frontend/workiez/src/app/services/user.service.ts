import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'  //root mens this service can use all across the project 
})
export class UserService {

  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private tokenService:TokenService, private loginService:LoginService) {}

  public addUser(user:User): Observable<string>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<string>(`${this.apiUrl}/auth/register/user`, user , {headers:headers})  //me hama function ekma e e function wlal observale return type eka dela thiyna widiyt backend eke return tika hdnna mathk thiygnna
  }

  public updateUser(user: User):Observable<string>{
    const userToken = this.tokenService.getUserToken(this.loginService.getuser().userId)
    var headers = new HttpHeaders()
    if(userToken){
      headers = headers.set("Authorization" , userToken);
    }
    return this.http.put<string>(`${this.apiUrl}/users/update/${user.userId}` , user , {headers:headers, responseType: 'text' as 'json'});
  }

  public deleteUser(userId: number): Observable<string>{
    const userToken = this.tokenService.getUserToken(this.loginService.getuser().userId);
    var headers = new HttpHeaders()
    if(userToken){
      headers = headers.set("Authorization" , userToken)            
    }
    return this.http.delete<string>(`${this.apiUrl}/users/delete/${userId}`, {headers:headers, responseType: "text" as "json"})
  }
}
