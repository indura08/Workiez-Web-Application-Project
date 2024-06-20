import { Component , OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Job } from '../../../models/job';
import { JobService } from '../../services/job.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './job-page.component.html',
  styleUrl: './job-page.component.css'
})
export class JobPageComponent implements OnInit {

  public jobs:Job[] = []

  constructor(private jobservice: JobService){}

  ngOnInit(): void {
      this.getJobs()
  }

  handleApplication(){
    console.log("application gets you data")
  }

  public getJobs():void{
    this.jobservice.getJobs().subscribe(
      (response:Job[]) => {
        this.jobs = response;
      },

      (error:HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

}
