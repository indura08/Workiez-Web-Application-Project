import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  private apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  public addWorker(worker: Worker): Observable<string>{
    const headers = new HttpHeaders({'content-type' : 'application/json'})
    return this.http.post<string>(`${this.apiUrl}/auth/register/worker` , worker , {headers: headers})
  }

  public updateWorker(worker: Worker , worekrId: number): Observable<string>{
    return this.http.put<string>(`${this.apiUrl}/worker/update/${worekrId}` , worker)
  }

  public deleteWorker(workerId: number): Observable<string>{
    return this.http.delete<string>(`${this.apiUrl}/delete/${workerId}`)
  }


}
