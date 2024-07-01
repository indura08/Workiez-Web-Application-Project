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

@Component({
  selector: 'app-worker-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './worker-profile.component.html',
  styleUrl: './worker-profile.component.css'
})
export class WorkerProfileComponent implements OnInit {

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

  constructor(private loginService: LoginService , private jobService: JobService, private applicationService: ApplicationService , private notificationUser:UserNotificationService){}

  ngOnInit(): void {
    this.getJobs();
  }

  public setCurrentJob(job:Job):void{
    this.currentJob = job;
    this.applicationNotification.user = job.user;
  }

  public date = new Date();

  public status = ApplicationStatus.PENDING;

  public jobs:Job[] = [];

  public worker:Worker = this.loginService.getWorker();

  public applicationNotification: NotificationUser = {
    notificationId: 0,
    description: "You have a new application for you job",
    user: this.currentJob.user,
    date:this.date.toString()
  }

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


}
