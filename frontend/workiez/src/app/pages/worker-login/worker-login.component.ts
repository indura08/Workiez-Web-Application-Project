import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { LoginService } from '../../services/login.service';
import { WorkerAuthenticationresponse } from '../../../models/authenticationResponseWorker';
import { TokenService } from '../../services/token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-worker-login',
  standalone: true,
  imports: [FormsModule , CommonModule, HeaderComponent],
  templateUrl: './worker-login.component.html',
  styleUrl: './worker-login.component.css'
})
export class WorkerLoginComponent {

  constructor(private loginService:LoginService , private tokenService: TokenService, private route : Router){}

  public loginWorker(loginForm:NgForm){
    this.loginService.loginWorker(loginForm.value).subscribe(
      (response:WorkerAuthenticationresponse) => {
        this.route.navigate(['/profile/worker'])
        console.log(response)
      },
      (error: HttpErrorResponse) => {
       alert(error.message + " meki awla")
        console.log()
        console.log(loginForm.value)
      }
    )
    
  }

}
