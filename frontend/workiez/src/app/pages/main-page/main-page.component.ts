import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NewsletterComponent } from '../../components/newsletter/newsletter.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterModule } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [NewsletterComponent, FooterComponent, HeaderComponent, RouterModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  constructor(private router: Router){}

  routeFunction1(){
    this.router.navigate(['/login'])
  }

}
