import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Worker } from '../../../models/worker';
import { Job } from '../../../models/job';
import { JobService } from '../../services/job.service';
import { response } from 'express';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-worker-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './worker-profile.component.html',
  styleUrl: './worker-profile.component.css'
})
export class WorkerProfileComponent implements OnInit {

  constructor(private loginService: LoginService , private jobService: JobService){}

  ngOnInit(): void {
    this.getJobs();
  }

  public jobs:Job[] = [];

  public worker:Worker = this.loginService.getWorker();

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
}
