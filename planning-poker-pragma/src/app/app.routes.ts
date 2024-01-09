import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { ClassroomComponent } from './pages/classroom/classroom.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', title: 'Home', component: HomeComponent },
  { path: 'login', title: 'Login', component: LoginComponent },
  { path: 'register', title: 'Register', component: RegisterComponent },
  { path: 'classroom/:id', title: 'Classroom', component: ClassroomComponent },
];
