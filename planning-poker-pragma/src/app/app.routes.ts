import { Routes } from '@angular/router';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { ClassroomComponent } from './pages/classroom/classroom.component';
import { CreateClassroomComponent } from './pages/create-classroom/create-classroom.component';

export const routes: Routes = [
  { path: '', redirectTo: '/create-classroom', pathMatch: 'full' },
  { path: 'create-classroom', title: 'Create-Classroom', component: CreateClassroomComponent },
  { path: 'login', title: 'Login', component: AuthenticationComponent },
  { path: 'register', title: 'Register', component: AuthenticationComponent },
  { path: 'classroom/:id', title: 'Classroom', component: ClassroomComponent },
];
