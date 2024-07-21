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

@Component({
  selector: 'app-worker-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './worker-profile.component.html',
  styleUrl: './worker-profile.component.css'
})
export class WorkerProfileComponent implements OnInit {

  constructor(private loginService: LoginService , private jobService: JobService, private applicationService: ApplicationService , private notificationUser:UserNotificationService , private notificationWorkerService:WorkerNotificationService){}

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


}
