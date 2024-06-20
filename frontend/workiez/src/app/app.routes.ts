import { Routes } from '@angular/router';
import { LoginUserComponentComponent } from './pages/login-user-component/login-user-component.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { LoginWorkerComponent } from './pages/login-worker/login-worker.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { WorkerProfileComponent } from './pages/worker-profile/worker-profile.component';
import { JobPageComponent } from './pages/job-page/job-page.component';

export const routes: Routes = [
    {'path': "" , component: MainPageComponent},
    {'path': "login", component:LoginUserComponentComponent},
    {'path': "user/register" , component: UserRegisterComponent},   //done
    {'path': "worker/register", component: LoginWorkerComponent},   //done
    {'path': "profile/user", component: UserProfileComponent},
    {'path': "profile/worker", component: WorkerProfileComponent},
    {'path': "jobs", component:JobPageComponent},                   //ongoing
    
];
