import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { response } from 'express';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../../models/user';
import { error } from 'console';
import { Gender } from '../../../models/Enums/GenderEnum';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { District } from '../../../models/Enums/DistrictEnum';
import { Province } from '../../../models/Enums/ProvinceEnum';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [HeaderComponent, FormsModule, CommonModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent implements OnInit {
  
  public gender:Gender = Gender.MALE;
  public district: District = District.COLOMBO;
  public province: Province = Province.WESTERN;

  constructor(private userService: UserService){}

  ngOnInit(): void {}
  
  
  public handleGenderValue(value:any){
    if(value == 1){
      this.gender = Gender.MALE;
    }
    else if(value==2){
      this.gender = Gender.FEMALE;
    }
  }

  
  public handleDistrictValue(value:any){
    if(value==1){
      this.district = District.AMPARA
    }
    else if(value==2){
      this.district = District.ANURADHAPURA
    }
    else if(value==3){
      this.district = District.BADULAA
    }
    else if(value==4){
      this.district = District.BATTICALOA
    }
    else if(value==5){
      this.district = District.COLOMBO
    }
    else if(value==6){
      this.district = District.GALLE
    }
    else if(value==7){
      this.district = District.GAMPAHA
    }
    else if(value==8){
      this.district = District.HAMBANTHOTA
    }
    else if(value==9){
      this.district = District.JAFFNA
    }
    else if(value==10){
      this.district = District.KALUTHARA
    }
    else if(value==11){
      this.district = District.KANDY
    }
    else if(value==12){
      this.district = District.KEGALLE
    }
    else if(value==13){
      this.district = District.KILINOCHCHI
    }
    else if(value==14){
      this.district = District.KURUNEGALA
    }
    else if(value==15){
      this.district = District.MANNER
    }
    else if(value==16){
      this.district = District.MATALE
    }
    else if(value==17){
      this.district = District.MATARA
    }
    else if(value==18){
      this.district = District.MONARAGALA
    }
    else if(value==19){
      this.district = District.MULLAITIVU
    }
    else if(value==20){
      this.district = District.NUWARA_ELIYA
    }
    else if(value==21){
      this.district = District.POLLANNARUWA
    }
    else if(value==22){
      this.district = District.PUTTALAM
    }
    else if(value==23){
      this.district = District.RATHNAPURA
    }
    else if(value==24){
      this.district = District.TRINCOMALEE
    }
    else if(value==25){
      this.district = District.VAVUNIYA
    }
  }

  public handleProvinceValue(value:any){
    if(value==1){
      this.province = Province.CENTRAL
    }
    else if(value==2){
      this.province = Province.EASTERN
    }
    else if(value==3){
      this.province = Province.NORTH_CENTRAL
    }
    else if(value==4){
      this.province = Province.NORTHERN
    }
    else if(value==5){
      this.province = Province.NORTH_WESTERN
    }
    else if(value==6){
      this.province = Province.SABARAGAMUWA
    }
    else if(value==7){
      this.province = Province.SOUTHERN
    }
    else if(value==8){
      this.province = Province.UVA
    }
    else if(value==9){
      this.province = Province.WESTERN
    }
  } 

  public addUser(addForm:NgForm):void{
    this.userService.addUser(addForm.value).subscribe(
      (response:string)=> {
        console.log(response)
        addForm.resetForm();
      },

      (error: HttpErrorResponse)=> {
        alert(error.message);
      }
    )
  }

  public updateUser(user:User):void{
    this.userService.updateUser(user, user.userId).subscribe(
      (response:string) => {
        console.log(response);
      },

      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public deleteUser(userId :number):void{
    this.userService.deleteUser(userId).subscribe(
      (response: string) => {
        console.log(response)
      },

      (error:HttpErrorResponse) => {
        alert(error.message);
      }

    )
  }

}
