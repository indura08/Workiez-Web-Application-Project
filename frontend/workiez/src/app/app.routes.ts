import { Routes } from '@angular/router';
import { LoginUserComponentComponent } from './components/login-user-component/login-user-component.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { LoginWorkerComponent } from './components/login-worker/login-worker.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

export const routes: Routes = [
    {'path': "" , component: MainPageComponent},
    {'path': "login", component:LoginUserComponentComponent},
    {'path': "user/register" , component: UserRegisterComponent},
    {'path': "worker/register", component: LoginWorkerComponent},
    {'path': "profile/user", component: UserProfileComponent},
];
