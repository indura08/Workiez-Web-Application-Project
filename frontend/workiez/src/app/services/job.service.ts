import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Job } from '../../models/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getJobs():Observable<Job[]>{
    const headers = new HttpHeaders({"Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpbmR1cmFwZXJlcmEzQGdtYWlsLmNvbSIsImlhdCI6MTcxODkxMjc2OSwiZXhwIjoxNzE4OTE0MjA5fQ.6r6uPH-diAX8aPCATd1v0nmM8QnXWqZaHGDvup2o-KM"})
    return this.http.get<Job[]>(`${this.apiUrl}/job/all` , {headers:headers})
  }

  public createJob(job: Job):Observable<string>{
    return this.http.post<string>(`${this.apiUrl}/job/create` , job)
  }

  public getJobById(jobId: number):Observable<string>{
    return this.http.get<string>(`${this.apiUrl}/job/${jobId}`)
  }

  public deletJob(jobId:number):Observable<string>{
    return this.http.delete<string>(`${this.apiUrl}/job/delete/${jobId}`)
  }
}
