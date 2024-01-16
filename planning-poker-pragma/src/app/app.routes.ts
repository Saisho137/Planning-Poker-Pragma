import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { ClassroomComponent } from './pages/classroom/classroom.component';
import { CreateClassroomComponent } from './pages/create-classroom/create-classroom.component';

export const routes: Routes = [
  { path: '', redirectTo: '/create-classroom', pathMatch: 'full' },
  { path: 'create-classroom', title: 'Create-Classroom', component: CreateClassroomComponent },
  { path: 'login', title: 'Login', component: RegisterComponent },
  { path: 'register', title: 'Register', component: RegisterComponent },
  { path: 'classroom/:id', title: 'Classroom', component: ClassroomComponent },
];
