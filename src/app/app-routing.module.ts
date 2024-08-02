// Angular Import
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminComponent } from './theme/layout/admin/admin.component';

import SignInComponent from './demo/authentication/sign-in/sign-in.component';
import { authGuard } from './demo/authentication/services/auth.guard';



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
        path: 'classes/create-class', canActivate:[authGuard],
        loadComponent: () => import('./demo/classes/classes.component')
      },
      {
        path: 'classes/create-attendance', canActivate:[authGuard],
        loadComponent: () => import('./demo/classes/attendance-type/attendance-type.component')
      },
      {
        path: 'classes/list-attendance', canActivate:[authGuard],
        loadComponent: () => import('./demo/classes/attendance-list/attendance-list.component')
      },
      {
        path: 'courses/new-course', canActivate:[authGuard],
        loadComponent: () => import('./demo/cources/create-course/create-course.component')
      },
      {
        path: 'courses/course-list', canActivate:[authGuard],
        loadComponent: () => import('./demo/cources/cources.component')
      },
      {
        path: 'courses/new-lesson', canActivate:[authGuard],
        loadComponent: () => import('./demo/cources/create-lesson/create-lesson.component')
      },
      {
        path: 'courses/lesson-list', canActivate:[authGuard],
        loadComponent: () => import('./demo/cources/lesson-list/lesson-list.component')
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
        path: 'holidays/create-holiday', canActivate:[authGuard],
        loadComponent: () => import('./demo/holidays/create-holiday/create-holiday.component')
      },
      {
        path: 'holidays/holiday-list', canActivate:[authGuard],
        loadComponent: () => import('./demo/holidays/holidays.component')
      },
      {
        path: 'holidays/holiday-calendar', canActivate:[authGuard],
        loadComponent: () => import('./demo/holidays/holidays-calendar/holidays-calendar.component')
      },
      {
        path: 'employees/create-employee', canActivate:[authGuard],
        loadComponent: () => import('./demo/employees/create-employee/create-employee.component')
      },
      {
        path: 'employees/employees-list', canActivate:[authGuard],
        loadComponent: () => import('./demo/employees/employees.component')
      },
      {
        path: 'feesconfiguration/feesconfig', canActivate:[authGuard],
        loadComponent: () => import('./demo/feesconfiguration/feesconfiguration.component')
      },
      {
        path: 'feesconfiguration/feestype', canActivate:[authGuard],
        loadComponent: () => import('./demo/feesconfiguration/feestypes/feestypes.component')
      },
      {
        path: 'feesconfiguration/adm-fees/:id', canActivate:[authGuard],
        loadComponent: () => import('./demo/feesconfiguration/collect-admission-fees/collect-admission-fees.component')
      },
      {
        path: 'fees-paid/fee-paid', canActivate:[authGuard],
        loadComponent: () => import('./demo/fees-paid/fees-paid.component')
      },
      {
        path: 'fees-paid/fee-history', canActivate:[authGuard],
        loadComponent: () => import('./demo/fees-paid/fees-paid-history/fees-paid-history.component')
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
