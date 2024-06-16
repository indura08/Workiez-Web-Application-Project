import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NewsletterComponent } from '../newsletter/newsletter.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [NewsletterComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  constructor(private router: Router){}

  routeFunction1(){
    this.router.navigate(['login'])
  }

}
