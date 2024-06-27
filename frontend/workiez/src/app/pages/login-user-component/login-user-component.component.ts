import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { response } from 'express';
import { environment } from '../../../environment/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationResponse } from '../../../models/authenticationResponse';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { Role } from '../../../models/Enums/RoleEnum';
import { Gender } from '../../../models/Enums/GenderEnum';
import { District } from '../../../models/Enums/DistrictEnum';
import { Province } from '../../../models/Enums/ProvinceEnum';
import { TokenService } from '../../services/token.service';
@Component({
  selector: 'login-user-component',
  standalone: true,
  imports: [HeaderComponent, FormsModule, CommonModule],
  templateUrl: './login-user-component.component.html',
  styleUrl: './login-user-component.component.css'
})
export class LoginUserComponentComponent {

  constructor(private loginService:LoginService , private route : Router , private tokenService: TokenService){}

  public loginUser(loginForm: NgForm):void{
    this.loginService.loginUser(loginForm.value).subscribe(
      (response:AuthenticationResponse) => {
        this.tokenService.setUserToken(response.user.userId , `Bearer ${response.token}`)
        this.loginService.setUser(response.user)
        
        console.log(response.token + "new token")               //these code lines are for debuggin purposes
        //console.log(loginForm.value)
        console.log(this.loginService.getuser())        //these code lines are for debuggin purposes
        this.route.navigate(['/profile/user'])
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
        console.log("this is error speaking in login user Component")  //these code lines are for debuggin purposes
        console.log(loginForm.value)  	    //these code lines are for debuggin purposes
      }
    )
  }

}
