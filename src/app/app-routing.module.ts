// Angular Import
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import StudentsComponent from './demo/students/students.component';
import SignInComponent from './demo/authentication/sign-in/sign-in.component';
import { authGuard } from './demo/authentication/services/auth.guard';

import {courseResolver} from "./demo/course-details/services/course.resolver";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/signin',
    pathMatch: 'full'
  },
  {
    path: 'auth/signin', component: SignInComponent
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'auth/signin',
        pathMatch: 'full'
      },
      {
        path: 'analytics',
        loadComponent: () => import('./demo/dashboard/dash-analytics.component')
      },
      {
        path: 'component',
        loadChildren: () => import('./demo/ui-element/ui-basic.module').then((m) => m.UiBasicModule)
      },
      {
        path: 'chart',
        loadComponent: () => import('./demo/chart & map/core-apex.component')
      },
      {
        path: 'forms',
        loadComponent: () => import('./demo/forms & tables/form-elements/form-elements.component')
      },
      {
        path: 'tables',
        loadComponent: () => import('./demo/forms & tables/form-elements/form-elements.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/sample-page/sample-page.component')
      },
      {
        path: 'create', canActivate:[authGuard],
        loadComponent: () => import('./demo/teachers/create-teacher/create-teacher.component')
      },
      {
        path: 'list', canActivate:[authGuard],
        loadComponent: () => import('./demo/teachers/teacher-list/teacher-list.component')
      },
      {
        path: 'attendance', canActivate:[authGuard],
        loadComponent: () => import('./demo/teachers/teacher-attendance/teacher-attendance.component')
      },
      {
        path: 'payslip', canActivate:[authGuard],
        loadComponent: () => import('./demo/teachers/teacher-payslip/teacher-payslip.component')
      },
      {
        path: 'departments/create', canActivate:[authGuard],
        loadComponent: () => import('./demo/departments/create-department/create-department.component')
      },
      {
        path: 'departments/list', canActivate:[authGuard],
        loadComponent: () => import('./demo/departments/departments.component')
      },
      {
        path: 'course-details/course', canActivate:[authGuard],
        loadComponent: () => import('./demo/course-details/course-details.component')
      },
      {
        path: 'course-details/add-new-course', canActivate:[authGuard],
        loadComponent: () => import('./demo/course-details/create-course/create-course.component')
      },
      {
        path: 'course-details/course/:id', canActivate:[authGuard], resolve:{course: courseResolver},
        loadComponent: () => import('./demo/course-details/course/course.component')
      },
      {
        path: 'users/create', canActivate:[authGuard],
        loadComponent: () => import('./demo/users/create-user/create-user.component')
      },
      {
        path: 'users/list', canActivate:[authGuard],
        loadComponent: () => import('./demo/users/user-list/user-list.component')
      },
      {
        path: 'users/profiles', canActivate:[authGuard],
        loadComponent: () => import('./demo/users/user-profiles/user-profiles.component')
      },
      {
        path: 'users/change-password', canActivate:[authGuard],
        loadComponent: () => import('./demo/users/change-password/change-password.component')
      },
      {
        path: 'students/registration', canActivate:[authGuard],
        loadComponent: () => import('./demo/students/registration/registration.component')
      },
      {
        path: 'students/reg-list', canActivate:[authGuard],
        loadComponent: () => import('./demo/students/registration-list/registration-list.component')
      },
      {
        path: 'students/admission', canActivate:[authGuard],
        loadComponent: () => import('./demo/students/admission/admission.component')
      },
      {
        path: 'students/adm-list', canActivate:[authGuard],
        loadComponent: () => import('./demo/students/admission-list/admission-list.component')
      },
      {
        path: 'students/student-attendance', canActivate:[authGuard],
        loadComponent: () => import('./demo/students/student-attendance/student-attendance.component')
      }
    ]
  },
  // {
  //   path: '',
  //   component: GuestComponent,
  //   children: [
  //     {
  //       path: 'auth/signup',
  //       loadComponent: () => import('./demo/authentication/sign-up/sign-up.component')
  //     },
  //     {
  //       path: 'auth/signin',
  //       loadComponent: () => import('./demo/authentication/sign-in/sign-in.component')
  //     }
  //   ]
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
