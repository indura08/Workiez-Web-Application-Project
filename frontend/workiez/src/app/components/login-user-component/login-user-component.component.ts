import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'login-user-component',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './login-user-component.component.html',
  styleUrl: './login-user-component.component.css'
})
export class LoginUserComponentComponent {

}
