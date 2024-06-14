import { Routes } from '@angular/router';
import { LoginUserComponentComponent } from './components/login-user-component/login-user-component.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { LoginWorkerComponent } from './components/login-worker/login-worker.component';

export const routes: Routes = [
    {'path': "login", component:LoginUserComponentComponent},
    {'path': "user/register" , component: UserRegisterComponent},
    {'path': "worker/register", component: LoginWorkerComponent},
];
