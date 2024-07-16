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
import { NotificationWorker } from '../../../models/notificationWorker';
import { WorkerNotificationService } from '../../services/worker-notification.service';
import { Gender } from '../../../models/Enums/GenderEnum';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [LoginUserComponentComponent , FormsModule, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  public district:District = District.COLOMBO
  public province:Province = Province.WESTERN;
  public jobStatus: JobStatus = JobStatus.PENDING;

  constructor(private notificationUser:UserNotificationService , private loginService: LoginService , 
              private jobService:JobService , private applicationService:ApplicationService , 
              private workerNotificationService: WorkerNotificationService, private userService: UserService, 
              private route: Router){}

  ngOnInit(): void {
    this.getJobs();
    this.getAllNotification();
  }

  public jobs:Job[] = [];

  public user:User = this.loginService.getuser();
  public dateTime = new Date();

  public jobId:number = 0;

  public selectedJob:Job = {
    jobId: 0,
    JobName: "",
    description: "test",
    user : this.loginService.getuser(),
    locationDistrict: District.COLOMBO,
    locationProvince:Province.WESTERN,
    city:"",
    jobStatus:JobStatus.PENDING,
    creationDateTime:""
  }

  public setCurrentJob(job:Job):void{
    this.selectedJob = job;
    console.log(this.selectedJob);
  }

  public applicationList :Application[] = [];

  public editJob(jobform:NgForm):void{
    this.jobService.UpdateJob(jobform.value).subscribe(
      (response:string) => {
        alert("job updated successfully")
        console.log(response);
        this.jobService.getJobs();
      },
      (error:HttpErrorResponse) => {
        alert(error.message)
        console.log(jobform.value);
      }
    )
  }

  public currentapplication:Application = {
    applicationId: 0,
    applicationName: "name",
    worker: this.loginService.getWorker(),
    job: this.jobs[0],                        //temorarily assigining
    applicationStatus: ApplicationStatus.ACCEPTED,
    applicationDateAndTime:this.dateTime.toString()
  }

  public notifications : NotificationUser[] = [];

  public endingJobfunction(application: Application):void{
    application.applicationStatus = ApplicationStatus.FINISHED
    application.job.jobStatus = JobStatus.COMPLETED

    this.applicationService.updateApplication(application.applicationId , application).subscribe(
      (response:string) => {
        alert("job finished suceesfully")
        console.log(response);
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    )

    this.jobService.UpdateJob(application.job).subscribe(
      (response:string) => {
        console.log(response)
        alert("Job has been finished successfully, feel free to give us a feedback or complaints if available")
      },
      (error:HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public workerNotification: NotificationWorker = {

    notificationWorkerId: 0,
    description: `Your application for job ${this.currentapplication.applicationName} has been approved , now you can visit to do the job`,
    worker:this.currentapplication.worker,
    date: this.dateTime.toString(),
  
  }

  public applicationJob: Job = {
    jobId: 0,
    JobName: "",
    description: "test",
    user : this.loginService.getuser(),
    locationDistrict: District.COLOMBO,
    locationProvince:Province.WESTERN,
    city:"",
    jobStatus:JobStatus.IN_PROGRESS,
    creationDateTime:""
  }

  public setCurrentApplication(application:Application):void{
    this.currentapplication = application;
    this.currentapplication.applicationStatus = ApplicationStatus.ACCEPTED;
    this.currentapplication.job = application.job;
    this.applicationJob = application.job;

    this.applicationJob.jobStatus = JobStatus.IN_PROGRESS;
    this.applicationJob.JobName = "name1"
    
    
    this.workerNotification.worker = application.worker;
    
    this.applicationService.updateApplication(this.currentapplication.applicationId , this.currentapplication).subscribe(
      (response:string) => {
        console.log(response)
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    )   //dan application eka approve wenwa anik application delete krla daanai thiynne heta krddi

    this.workerNotificationService.createtWorkerNotification(this.workerNotification).subscribe(
      (response:string) => {
        console.log(response)
      },

      (error:HttpErrorResponse) => {
        alert(error.message);
      }

    )

    this.jobService.UpdateJob(this.applicationJob).subscribe(
      (response:string) => {
        console.log(response)
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
        console.log(error.message)
        console.log(this.applicationJob)
      }
    )

    this.applicationList.map(application => {

      if(application.applicationId !== this.currentapplication.applicationId){
        this.applicationService.deleteApplication(application.applicationId).subscribe(
          (response:string) => {
            alert("all other applications for your job has been deleted")
            console.log(response)
            this.getApplicationsByJobId(application.job.jobId)
          },
          (error:HttpErrorResponse) => {
            console.log(error.message);
          }
        )
      }
    } )

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
        this.getJobs()
        alert("job created successfully")
        jobForm.reset();
      },
      (error:HttpErrorResponse) => {
        alert(error.message +" this method was executed")
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

  public deleteNotification(notificationId:number):void{
    this.notificationUser.deleteNotification(notificationId).subscribe(
      (response:string) => {
        console.log(response)
        this.getAllNotification()
      },
      (error:HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }

  public deleteJob(jobId:number):void{
    this.jobService.deletJob(jobId).subscribe(
      (response:string) => {
        alert("job deleted successfully")
        console.log(response)
        this.getJobs();
      },
      (error:HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  //functions and properties for edit user profile
  public gender:Gender = this.user.gender;
  public userdistrict: District = this.user.district;
  public userprovince: Province = Province.WESTERN;

  public handleGenderValue(value:any){
    if(value == 1){
      this.gender = Gender.MALE;
    }
    else if(value==2){
      this.gender = Gender.FEMALE;
    }
  }

  public handleUserDistrictValue(value:any){
    if(value==1){
      this.userdistrict = District.AMPARA
    }
    else if(value==2){
      this.userdistrict = District.ANURADHAPURA
    }
    else if(value==3){
      this.userdistrict = District.BADULAA
    }
    else if(value==4){
      this.userdistrict = District.BATTICALOA
    }
    else if(value==5){
      this.userdistrict = District.COLOMBO
    }
    else if(value==6){
      this.userdistrict = District.GALLE
    }
    else if(value==7){
      this.userdistrict = District.GAMPAHA
    }
    else if(value==8){
      this.userdistrict = District.HAMBANTHOTA
    }
    else if(value==9){
      this.userdistrict = District.JAFFNA
    }
    else if(value==10){
      this.userdistrict = District.KALUTHARA
    }
    else if(value==11){
      this.userdistrict = District.KANDY
    }
    else if(value==12){
      this.userdistrict = District.KEGALLE
    }
    else if(value==13){
      this.userdistrict = District.KILINOCHCHI
    }
    else if(value==14){
      this.userdistrict = District.KURUNEGALA
    }
    else if(value==15){
      this.userdistrict = District.MANNER
    }
    else if(value==16){
      this.userdistrict = District.MATALE
    }
    else if(value==17){
      this.userdistrict = District.MATARA
    }
    else if(value==18){
      this.userdistrict = District.MONARAGALA
    }
    else if(value==19){
      this.userdistrict = District.MULLAITIVU
    }
    else if(value==20){
      this.userdistrict = District.NUWARA_ELIYA
    }
    else if(value==21){
      this.userdistrict = District.POLLANNARUWA
    }
    else if(value==22){
      this.userdistrict = District.PUTTALAM
    }
    else if(value==23){
      this.userdistrict = District.RATHNAPURA
    }
    else if(value==24){
      this.userdistrict = District.TRINCOMALEE
    }
    else if(value==25){
      this.userdistrict = District.VAVUNIYA
    }
  }

  public handleUserProvinceValue(value:any){
    if(value==1){
      this.userprovince = Province.CENTRAL
    }
    else if(value==2){
      this.userprovince = Province.EASTERN
    }
    else if(value==3){
      this.userprovince = Province.NORTH_CENTRAL
    }
    else if(value==4){
      this.userprovince = Province.NORTHERN
    }
    else if(value==5){
      this.userprovince = Province.NORTH_WESTERN
    }
    else if(value==6){
      this.userprovince = Province.SABARAGAMUWA
    }
    else if(value==7){
      this.userprovince = Province.SOUTHERN
    }
    else if(value==8){
      this.userprovince = Province.UVA
    }
    else if(value==9){
      this.userprovince = Province.WESTERN
    }
  }

  public editUserProfile(userForm:NgForm):void{
    this.userService.updateUser(userForm.value).subscribe(
      (response:string) => {
        console.log(response)
        userForm.reset();
      },
      (error:HttpErrorResponse) => {
        alert("error occured the error: " + error.message);
        console.log();
      }
    )
  }

  public deleteUser(userId: number):void{
    this.jobService.deleteJobByuser(userId).subscribe(
      (response:string) => {
        console.log(response)
      },
      (error: HttpErrorResponse) => {
        alert("couldn't delete user try again" + " error is : " + error.message)
      }
    )
    this.userService.deleteUser(userId).subscribe(
      (response:string) => {
        console.log(response)
        alert("deleted succesfully thanks for using workiez");
        this.route.navigate([""])
      },
      (error:HttpErrorResponse) => {
        alert("error occured!: "  + error.message);
      }
    ) 
  } 

}
