import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'  //root mens this service can use all across the project 
})
export class UserService {

  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public addUser(user:User): Observable<string>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<string>(`${this.apiUrl}/auth/register/user`, user , {headers:headers})  //me hama function ekma e e function wlal observale return type eka dela thiyna widiyt backend eke return tika hdnna mathk thiygnna
  }

  public updateUser(user: User , userId : number):Observable<string>{
    return this.http.put<string>(`${this.apiUrl}/users/update/${userId}` , user);
  }

  public deleteUser(userId: number): Observable<string>{
    return this.http.delete<string>(`${this.apiUrl}/users/delete/${userId}`)
  }
}
