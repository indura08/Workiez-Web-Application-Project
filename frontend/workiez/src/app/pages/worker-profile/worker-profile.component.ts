import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Worker } from '../../../models/worker';
import { Job } from '../../../models/job';
import { JobService } from '../../services/job.service';
import { response } from 'express';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ApplicationService } from '../../services/application.service';
import { Application } from '../../../models/application';
import { District } from '../../../models/Enums/DistrictEnum';
import { Province } from '../../../models/Enums/ProvinceEnum';
import { JobStatus } from '../../../models/Enums/JobstatusEnum';
import { Gender } from '../../../models/Enums/GenderEnum';
import { Role } from '../../../models/Enums/RoleEnum';
import { ApplicationStatus } from '../../../models/Enums/ApplicationStatusEnum';
import { UserNotificationService } from '../../services/user-notification.service';
import { NotificationUser } from '../../../models/notificationUser';
import { WorkerNotificationService } from '../../services/worker-notification.service';
import { NotificationWorker } from '../../../models/notificationWorker';
import { error } from 'console';
import { WorkerService } from '../../services/worker.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-worker-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './worker-profile.component.html',
  styleUrl: './worker-profile.component.css'
})
export class WorkerProfileComponent implements OnInit {

  constructor(private loginService: LoginService , private jobService: JobService, 
              private applicationService: ApplicationService , private notificationUser:UserNotificationService , 
              private notificationWorkerService:WorkerNotificationService , private workerService: WorkerService,
              private route: Router){}

  ngOnInit(): void {
    this.getJobs();
    this.getAllNotification();
    this.getAppliedJobs();
  }

  public date = new Date();

  public currentJob:Job = {
    jobId: 0,
    JobName: '',
    description: '',
    user: {
      userId: 0,
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      role: Role.ROLE_USER,
      gender: Gender.MALE,
      phone: '',
      district: District.COLOMBO,
      province: Province.WESTERN,
      city: ''
    },
    locationDistrict: District.COLOMBO,
    locationProvince: Province.WESTERN,
    city: '',
    jobStatus: JobStatus.PENDING,
    creationDateTime: ''
  }


  public applicationNotification: NotificationUser = {
    notificationId: 0,
    description:  '',
    user: this.currentJob.user,
    date:this.date.toString()
  }

  public setCurrentJob(job:Job):void{
    this.currentJob = job;
    this.applicationNotification.user = job.user;
    this.applicationNotification.description = `You have a new application for your job - "${job.description}"`
  }

  public status = ApplicationStatus.PENDING;

  public jobs:Job[] = [];

  public workerNotificationList:NotificationWorker[] = [];

  public worker:Worker = this.loginService.getWorker();

  public appliedJobs:Job[] = [];

  public getJobs():void {
    this.jobService.getJobs().subscribe(
      (response:Job[]) => {
        this.jobs = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public createApplication(applicationForm:NgForm){
    this.applicationService.createApplication(applicationForm.value).subscribe(
      (response:Application) => {
        alert("Application submitted succesfully")
        this.createNotification(this.applicationNotification);
        console.log("application created successfully " + response );
        console.log("currentJOb is " + this.currentJob.user.userId)
        this.getAppliedJobs();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public createNotification(notification:NotificationUser){
    this.notificationUser.createNotification(notification).subscribe(
      (response:NotificationUser) => {
        console.log(response)
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
        console.log(this.applicationNotification.user)
      }
    )
  }

  public getAllNotification():void{
    this.notificationWorkerService.getAllNotificationBYworker(this.worker.workerId).subscribe(
      (response:NotificationWorker[]) => {
        this.workerNotificationList = response;
        console.log(this.workerNotificationList);
      },
      (error:HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public deleteNotification(notificationId:number):void{
    this.notificationWorkerService.deleteNotificationById(notificationId).subscribe(
      (response:string) => {
        console.log("notification deleted succesully")
        console.log(response)
        this.getAllNotification()
      },
      (error:HttpErrorResponse) =>{
        alert(error.message)
      }
    )
  }

  public getAppliedJobs():void{
    this.applicationService.getApplicationByWorker(this.worker.workerId).subscribe(
      (response:Application[]) => {
        for(let i = 0 ; i < response.length; i++){
          this.appliedJobs.push(response[i].job)
        }
      },
      (error:HttpErrorResponse) => {
        alert("Couldnt find jobs that you have applied error happend try again later " )
        console.log(error.message);
      }
    )
  }

  public currentApplication :Application = {
    applicationId: 0,
    applicationName: '',
    worker: this.worker,
    job: this.currentJob,
    applicationStatus:ApplicationStatus.PENDING,
    applicationDateAndTime:""
  }

  public getApplicationByJob(job:Job):void{
    this.applicationService.getApplicationByJobId(job.jobId).subscribe(
      (response:Application[]) => {
        var app = response.find(application => application.worker.workerId == this.worker.workerId);
        if(app){
          this.currentApplication = app;
        }
        else{
          alert("application coudln't found")
        }
      }
    )
  }

  //edit worker profile functionality

  public gender: Gender = this.worker.gender
  public workerdistrict: District = this.worker.baseDistrict;
  public workerprovince: Province = this.worker.baseProvince;

  public handleGenderValue(value:any){
    if(value == 1){
      this.gender = Gender.MALE;
    }
    else if(value==2){
      this.gender = Gender.FEMALE;
    }
  }

  public handleWorkerDistrictValue(value:any){
    if(value==1){
      this.workerdistrict = District.AMPARA
    }
    else if(value==2){
      this.workerdistrict = District.ANURADHAPURA
    }
    else if(value==3){
      this.workerdistrict = District.BADULAA
    }
    else if(value==4){
      this.workerdistrict = District.BATTICALOA
    }
    else if(value==5){
      this.workerdistrict = District.COLOMBO
    }
    else if(value==6){
      this.workerdistrict = District.GALLE
    }
    else if(value==7){
      this.workerdistrict = District.GAMPAHA
    }
    else if(value==8){
      this.workerdistrict = District.HAMBANTHOTA
    }
    else if(value==9){
      this.workerdistrict = District.JAFFNA
    }
    else if(value==10){
      this.workerdistrict = District.KALUTHARA
    }
    else if(value==11){
      this.workerdistrict = District.KANDY
    }
    else if(value==12){
      this.workerdistrict = District.KEGALLE
    }
    else if(value==13){
      this.workerdistrict = District.KILINOCHCHI
    }
    else if(value==14){
      this.workerdistrict = District.KURUNEGALA
    }
    else if(value==15){
      this.workerdistrict = District.MANNER
    }
    else if(value==16){
      this.workerdistrict = District.MATALE
    }
    else if(value==17){
      this.workerdistrict = District.MATARA
    }
    else if(value==18){
      this.workerdistrict = District.MONARAGALA
    }
    else if(value==19){
      this.workerdistrict = District.MULLAITIVU
    }
    else if(value==20){
      this.workerdistrict = District.NUWARA_ELIYA
    }
    else if(value==21){
      this.workerdistrict = District.POLLANNARUWA
    }
    else if(value==22){
      this.workerdistrict = District.PUTTALAM
    }
    else if(value==23){
      this.workerdistrict = District.RATHNAPURA
    }
    else if(value==24){
      this.workerdistrict = District.TRINCOMALEE
    }
    else if(value==25){
      this.workerdistrict = District.VAVUNIYA
    }
  }

  public handleWorkerProvinceValue(value:any){
    if(value==1){
      this.workerprovince = Province.CENTRAL
    }
    else if(value==2){
      this.workerprovince = Province.EASTERN
    }
    else if(value==3){
      this.workerprovince = Province.NORTH_CENTRAL
    }
    else if(value==4){
      this.workerprovince = Province.NORTHERN
    }
    else if(value==5){
      this.workerprovince = Province.NORTH_WESTERN
    }
    else if(value==6){
      this.workerprovince = Province.SABARAGAMUWA
    }
    else if(value==7){
      this.workerprovince = Province.SOUTHERN
    }
    else if(value==8){
      this.workerprovince = Province.UVA
    }
    else if(value==9){
      this.workerprovince = Province.WESTERN
    }
  }

  public editWorkerProfile(workerForm:NgForm):void{
    this.workerService.updateWorker(workerForm.value).subscribe(
      (response:string) => {
        console.log(response)
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  //delete worker
  public deleteWorkerProfile(workerId:number):void{
    this.applicationService.getApplicationByWorker(workerId).subscribe(
      (response:Application[]) => {
        for(let i = 0; i < response.length; i++){
          this.applicationService.deleteApplication(response[i].applicationId).subscribe(
            (response:string) => {
              console.log(response)
            },
            (error:HttpErrorResponse) => {
              console.log(error.message)
            }
          )
        }
        this.notificationWorkerService.getAllNotificationBYworker(this.worker.workerId).subscribe(
          (response: NotificationWorker[]) => {
            for(let i = 0 ; i< response.length ; i++){
              this.notificationWorkerService.deleteNotificationById(response[i].notificationWorkerId).subscribe(
                (response:string) => {
                  console.log(response)
                },
                (error:HttpErrorResponse) => {
                  console.log(error.message);
                }
              )
            }
            this.workerService.deleteWorker(workerId).subscribe(
              (response:string) => {
                console.log(response)
                this.route.navigate([""])
                
              },
              (error:HttpErrorResponse) => {
                alert(error.message);
              }
            )
          },
          (error:HttpErrorResponse) => {
            console.log(error.message)
          }
        )
      }
    )
  }

}
