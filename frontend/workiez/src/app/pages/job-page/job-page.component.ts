import { Component , OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-job-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './job-page.component.html',
  styleUrl: './job-page.component.css'
})
export class JobPageComponent implements OnInit {

  constructor(){}

  ngOnInit(): void {
      
  }

  handleApplication(){
    console.log("application gets you data")
  }

}
