import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { response } from 'express';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../../models/user';
import { error } from 'console';
import { Gender } from '../../../models/Enums/GenderEnum';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { District } from '../../../models/Enums/DistrictEnum';
import { Province } from '../../../models/Enums/ProvinceEnum';
import { Router } from '@angular/router';
import { Role } from '../../../models/Enums/RoleEnum';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [HeaderComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent implements OnInit {
  
  public gender:Gender = Gender.MALE;
  public district: District = District.COLOMBO;
  public province: Province = Province.WESTERN;

  constructor(private userService: UserService, private route: Router){}

  ngOnInit(): void {}
  
  userCreationForm = new FormGroup({
    firstname: new FormControl('' , [Validators.required]),
    lastname: new FormControl("" , [Validators.required]),
    username: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(7)]),
    role: new FormControl(Role.ROLE_USER),
    gender: new FormControl("" , [Validators.required]),
    phone: new FormControl("", [Validators.required]),
    district: new FormControl("", [Validators.required]),
    province: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
  })
  
  public handleGenderValue(value:any){
    if(value == 1){
      this.userCreationForm.patchValue({gender: Gender.MALE})
    }
    else if(value==2){
      this.userCreationForm.patchValue({gender: Gender.FEMALE})
    }
  }

  
  public handleDistrictValue(value:any){
    if(value==1){
      this.userCreationForm.patchValue({district: District.AMPARA})
    }
    else if(value==2){
      this.userCreationForm.patchValue({district: District.ANURADHAPURA})
    }
    else if(value==3){
      this.userCreationForm.patchValue({district: District.BADULAA})
    }
    else if(value==4){
      this.userCreationForm.patchValue({district: District.BATTICALOA})
    }
    else if(value==5){
      this.userCreationForm.patchValue({district: District.COLOMBO})
    }
    else if(value==6){
      this.userCreationForm.patchValue({district: District.GALLE})
    }
    else if(value==7){
      this.userCreationForm.patchValue({district: District.GAMPAHA})
    }
    else if(value==8){
      this.userCreationForm.patchValue({district: District.HAMBANTHOTA})
    }
    else if(value==9){
      this.userCreationForm.patchValue({district: District.JAFFNA})
    }
    else if(value==10){
      this.userCreationForm.patchValue({district: District.KALUTHARA})
    }
    else if(value==11){
      this.userCreationForm.patchValue({district: District.KANDY})
    }
    else if(value==12){
      this.userCreationForm.patchValue({district: District.KEGALLE})
    }
    else if(value==13){
      this.userCreationForm.patchValue({district: District.KILINOCHCHI})
    }
    else if(value==14){
      this.userCreationForm.patchValue({district: District.KURUNEGALA})
    }
    else if(value==15){
      this.userCreationForm.patchValue({district: District.MANNER})
    }
    else if(value==16){
      this.userCreationForm.patchValue({district: District.MATALE})
    }
    else if(value==17){
      this.userCreationForm.patchValue({district: District.MATARA})
    }
    else if(value==18){
      this.userCreationForm.patchValue({district: District.MONARAGALA})
    }
    else if(value==19){
      this.userCreationForm.patchValue({district: District.MULLAITIVU})
    }
    else if(value==20){
      this.userCreationForm.patchValue({district: District.NUWARA_ELIYA})
    }
    else if(value==21){
      this.userCreationForm.patchValue({district: District.POLLANNARUWA})
    }
    else if(value==22){
      this.userCreationForm.patchValue({district: District.PUTTALAM})
    }
    else if(value==23){
      this.userCreationForm.patchValue({district: District.RATHNAPURA})
    }
    else if(value==24){
      this.userCreationForm.patchValue({district: District.TRINCOMALEE})
    }
    else if(value==25){
      this.userCreationForm.patchValue({district: District.VAVUNIYA})
    }
  }

  public handleProvinceValue(value:any){
    if(value==1){
      this.userCreationForm.patchValue({province: Province.CENTRAL })
    }
    else if(value==2){
      this.userCreationForm.patchValue({province: Province.EASTERN})
    }
    else if(value==3){
      this.userCreationForm.patchValue({province: Province.NORTH_CENTRAL})
    }
    else if(value==4){
      this.userCreationForm.patchValue({province: Province.NORTHERN})
    }
    else if(value==5){
      this.userCreationForm.patchValue({province: Province.NORTH_WESTERN})
    }
    else if(value==6){
      this.userCreationForm.patchValue({province: Province.SABARAGAMUWA})
    }
    else if(value==7){
      this.userCreationForm.patchValue({province: Province.SOUTHERN})
    }
    else if(value==8){
      this.userCreationForm.patchValue({province: Province.UVA})
    }
    else if(value==9){
      this.userCreationForm.patchValue({province: Province.WESTERN})
    }
  } 

  public addUser():void{
    if(this.userCreationForm.valid){
      const newUser: User = {
        userId: 0,
        firstname: this.userCreationForm.value.firstname as string,
        lastname: this.userCreationForm.value.lastname as string,
        email: this.userCreationForm.value.email as string,
        password: this.userCreationForm.value.password as string,
        username: this.userCreationForm.value.username as string,
        role: this.userCreationForm.value.role as Role,
        gender: this.userCreationForm.value.gender as Gender,
        phone: this.userCreationForm.value.phone as string,
        district: this.userCreationForm.value.district as District,
        province: this.userCreationForm.value.province as Province,
        city: this.userCreationForm.value.city as string
      }

      this.userService.addUser(newUser).subscribe(
        (response:string)=> {
          console.log(response)
          console.log(newUser)
          //addForm.resetForm();
          this.route.navigate(["/login"]);
        },
  
        (error: HttpErrorResponse)=> {
          alert(error.message);
          console.log(newUser)
          //console.log(addForm.value)
        }
      )
    }
  }


}
