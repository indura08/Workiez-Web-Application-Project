import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Application } from '../../models/application';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient){}

  private apiUrl = environment.apiBaseUrl;

  public createApplication(application: Application): Observable<Application>{
    const header = new HttpHeaders({"Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsZXJveTEwQGdtYWlsLmNvbSIsImlhdCI6MTcxOTA3MzgxMSwiZXhwIjoxNzE5MDc1MjUxfQ.yIPuAEouZOV31DPuBi6LpHpCT3DkAlgzKqwW5ZC78Zs"})
    return this.http.post<Application>(`${this.apiUrl}/application/create` , application , {headers:header})
  }

}
