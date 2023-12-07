import { Routes } from '@angular/router';
import { RegisterComponent } from './components/organisms/register/register.component';
import { ClassroomComponent } from './components/organisms/classroom/classroom.component';
import { HomeComponent } from './components/organisms/home/home.component';
import { LoginComponent } from './components/organisms/login/login.component';

export const routes: Routes = [
  { path: '', title: 'Home', component: HomeComponent },
  { path: 'login', title: 'Login', component: LoginComponent },
  { path: 'register', title: 'Register', component: RegisterComponent },
  { path: 'classroom/:id', title: 'Classroom', component: ClassroomComponent },
];
