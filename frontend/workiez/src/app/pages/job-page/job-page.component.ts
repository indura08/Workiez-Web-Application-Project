import { Component , OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Job } from '../../../models/job';
import { JobService } from '../../services/job.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { environment } from '../../../environment/environment';
import { TokenService } from '../../services/token.service';
import { response } from 'express';
import { District } from '../../../models/Enums/DistrictEnum';
import { Province } from '../../../models/Enums/ProvinceEnum';
import { LoginService } from '../../services/login.service';
import { Worker } from '../../../models/worker';
import { User } from '../../../models/user';
import { JobStatus } from '../../../models/Enums/JobstatusEnum';
import { ApplicationService } from '../../services/application.service';
import { Application } from '../../../models/application';
import { error } from 'console';
import { UserDTO } from '../../../models/UserDTO';
import { Role } from '../../../models/Enums/RoleEnum';
import { Gender } from '../../../models/Enums/GenderEnum';

@Component({
  selector: 'app-job-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './job-page.component.html',
  styleUrl: './job-page.component.css'
})
export class JobPageComponent implements OnInit {

  public jobs:Job[] = []
  public district:District = District.COLOMBO
  public province:Province = Province.WESTERN

  constructor(private jobservice: JobService , private loginService: LoginService ,private tokenService: TokenService, private applicationService: ApplicationService){}

  public jobUser:User = this.loginService.getuser()
  
  public dateTime = new Date();

  public worker:string = "indura";

  public applicationWorker: Worker = this.loginService.worker;

  public jobStatus: JobStatus = JobStatus.PENDING;

  ngOnInit(): void {
      this.getJobs()
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

  public getJobs():void{
    this.jobservice.getJobs().subscribe(
      (response:Job[]) => {
        this.jobs = response;
        console.log(this.loginService.getuser())
        console.log('Jobs updated:', this.jobs)
      },

      (error:HttpErrorResponse) => {
        console.log(error.message + "err");
        console.log("is the token");
        console.log(this.loginService.getuser())
      }
    )
  }

  public createJob(jobForm:NgForm):void{
    this.jobservice.createJob(jobForm.value).subscribe(
      (response:string) => {
        console.log(response)
        console.log(jobForm.value)
        this.getJobs();
        console.log(this.jobUser)
      },

      (error:HttpErrorResponse) => {
        alert(error.message)
        console.log(jobForm.value)
        console.log(this.jobUser)
        this.getJobs();
      }
    )
  }


  public createApplication(applicationForm: NgForm){
    this.applicationService.createApplication(applicationForm.value).subscribe(
      (response:Application) => {
        console.log(response)
      },
      (error:HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }
  

}
