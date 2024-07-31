import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from '../../../models/user';
import { Worker } from '../../../models/worker';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  constructor(private loginservice: LoginService){}

  public loggedInUser: User = this.loginservice.getuser();
  public loggedInWorker: Worker = this.loginservice.getWorker();

}
