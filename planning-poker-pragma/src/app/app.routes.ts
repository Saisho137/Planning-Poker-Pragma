import { Routes } from '@angular/router';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ClassroomComponent } from './pages/classroom/classroom.component';
import { CreateClassroomComponent } from './pages/create-classroom/create-classroom.component';

export const routes: Routes = [
  { path: '', redirectTo: '/create-classroom', pathMatch: 'full' },
  { path: 'create-classroom', title: 'Create-Classroom', component: CreateClassroomComponent },
  { path: 'login', title: 'Login', component: SignUpComponent },
  { path: 'register', title: 'Register', component: SignUpComponent },
  { path: 'classroom/:id', title: 'Classroom', component: ClassroomComponent },
];
