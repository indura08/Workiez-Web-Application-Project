import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(){}
  
  setUserToken(userId:number , token:string){
    localStorage.setItem(`user_${userId}` , token);
  }

  getUserToken(userId:number):string | null{
    return localStorage.getItem(`user_${userId}`);
  }

  setWorkerToken(workerId:number , token:string){
    localStorage.setItem(`worker_${workerId}` , token);
  }

  getWorkerToken(workerId: number):string | null{
    return localStorage.getItem(`worker_${workerId}`);
  }

  public removeUserToken(userId:number):void{
    localStorage.removeItem(`user_${userId}`)
  }

  public removeWorerToken(workerId:number):void{
    localStorage.removeItem(`worker_${workerId}`)
  } 
}


