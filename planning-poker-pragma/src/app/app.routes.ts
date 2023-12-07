import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/organisms/login/login.component';
import { RegisterComponent } from './components/organisms/register/register.component';
import { ClassroomComponent } from './components/pages/classroom/classroom.component';

export const routes: Routes = [
  { path: '', title: 'Home', component: HomeComponent },
  { path: 'login', title: 'Login', component: LoginComponent },
  { path: 'register', title: 'Register', component: RegisterComponent },
  { path: 'classroom/:id', title: 'Classroom', component: ClassroomComponent },
];
