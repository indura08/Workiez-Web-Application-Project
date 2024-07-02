import { Component , OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { LoginUserComponentComponent } from '../login-user-component/login-user-component.component';
import { LoginService } from '../../services/login.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { District } from '../../../models/Enums/DistrictEnum';
import { Province } from '../../../models/Enums/ProvinceEnum';
import { JobService } from '../../services/job.service';
import { HttpErrorResponse } from '@angular/common/http';
import { JobStatus } from '../../../models/Enums/JobstatusEnum';
import { Job } from '../../../models/job';
import { error } from 'console';
import { ApplicationService } from '../../services/application.service';
import { Application } from '../../../models/application';
import { UserNotificationService } from '../../services/user-notification.service';
import { NotificationUser } from '../../../models/notificationUser';
import { ApplicationStatus } from '../../../models/Enums/ApplicationStatusEnum';
import { response } from 'express';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [LoginUserComponentComponent , FormsModule, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  public district:District = District.COLOMBO
  public province:Province = Province.WESTERN
  public jobStatus: JobStatus = JobStatus.PENDING;

  constructor(private notificationUser:UserNotificationService , private loginService: LoginService , private jobService:JobService , private applicationService:ApplicationService){}

  ngOnInit(): void {
    this.getJobs();
    this.getAllNotification();
  }

  public jobs:Job[] = [];

  public user:User = this.loginService.getuser();
  public dateTime = new Date();

  public jobId:number = 0;

  public applicationList :Application[] = [];

  public currentapplication:Application = {
    applicationId: 0,
    applicationName: "name",
    worker: this.loginService.getWorker(),
    job: this.jobs[0],                        //temorarily assigining
    applicationStatus: ApplicationStatus.ACCEPTED,
    applicationDateAndTime:this.dateTime.toString()
  }

  public notifications : NotificationUser[] = [];

  public setCurrentApplication(application:Application):void{
    this.currentapplication = application;
    this.currentapplication.applicationStatus = ApplicationStatus.ACCEPTED;
    this.currentapplication.job = application.job;
    
    this.applicationService.updateApplication(this.currentapplication.applicationId , this.currentapplication).subscribe(
      (response:string) => {
        console.log(response)
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    )   //dan application eka approve wenwa anik application delete krla daanai thiynne heta krddi

    console.log(this.currentapplication);
  }

  public setCurrentJobId(jobId:number){
    this.jobId = jobId;
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
  
  public createJob(jobForm:NgForm):void{
    this.jobService.createJob(jobForm.value).subscribe(
      (response:string) => {
        console.log(response)
      },
      (error:HttpErrorResponse) => {
        console.log(error.message +" this method was executed")
        console.log(jobForm.value)
      }
    )
  }

  public getJobs():void{
    this.jobService.getJobs().subscribe(
      (response:Job[]) => {
        this.jobs = response
        console.log(response)
      },
      (error:HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public getApplicationsByJobId(jobId:number){
    this.applicationService.getApplicationByJobId(jobId).subscribe(
      (response:Application[]) => {
        this.applicationList = response;
        //alert("ÿou are now viewing all the applications for your job")
        console.log(this.applicationList);
      },
      (error:HttpErrorResponse) => {
        alert("error occured " + error.message);
        console.log(jobId);
      }
    )
  }

  public getAllNotification():void{
    this.notificationUser.getNotificationByUserId(this.user.userId).subscribe(
      (response:NotificationUser[]) => {
        this.notifications = response;
        console.log("notification extrcated successfully!")
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
        console.log(error.message)
        console.log(this.notifications)
      }
    )
  }

  


}
