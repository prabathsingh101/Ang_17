export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: NavigationItem[];
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/analytics',
        icon: 'feather icon-home'
      }
    ]
  },

  {
    id: 'class',
    title: 'Class',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'class',
        title: 'Class',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'create-class',
            title: 'Add Class',
            type: 'item',
            icon: 'feather icon-at-sign',
            url: '/classes/create-class'
          },
          {
            id: 'create-attendance',
            title: 'Atendance Type',
            type: 'item',
            icon: 'feather icon-at-sign',
            url: '/classes/create-attendance'
          }
        ]
      }
    ]
  },

  {
    id: 'student',
    title: 'Students',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'students',
        title: 'Students',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'registration',
            title: 'Registration',
            type: 'item',
            url: '/students/registration'
          },
          {
            id: 'list',
            title: 'Registration List',
            type: 'item',
            url: '/students/reg-list'
          },
          // {
          //   id: 'admission',
          //   title: 'Admission',
          //   type: 'item',
          //   url: '/students/admission'
          // },
          {
            id: 'admission-list',
            title: 'Admission List',
            type: 'item',
            url: '/students/adm-list'
          },
          // {
          //   id: 'stusent-attendance',
          //   title: 'Attendance',
          //   type: 'item',
          //   url: '/students/student-attendance'
          // }
          // {
          //   id: 'breadcrumb-pagination',
          //   title: 'Breadcrumb & Pagination',
          //   type: 'item',
          //   url: '/component/breadcrumb-paging'
          // },
          // {
          //   id: 'collapse',
          //   title: 'Collapse',
          //   type: 'item',
          //   url: '/component/collapse'
          // },
          // {
          //   id: 'tabs-pills',
          //   title: 'Tabs & Pills',
          //   type: 'item',
          //   url: '/component/tabs-pills'
          // },
          // {
          //   id: 'typography',
          //   title: 'Typography',
          //   type: 'item',
          //   url: '/component/typography'
          // }
        ]
      }
    ]
  },

  {
    id: 'teacher',
    title: 'Teachers',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'teachers',
        title: 'Teacher',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'creates',
            title: 'Creates',
            type: 'item',
            icon: 'feather icon-at-sign',
            url: '/create'
          },
          {
            id: 'lists',
            title: 'Lists',
            type: 'item',
            icon: 'feather icon-at-sign',
            url: '/list'
          },
          // {
          //   id: 'teacher-attendance',
          //   title: 'Attendance',
          //   type: 'item',
          //   icon: 'feather icon-at-sign',
          //   url: '/attendance'
          // },
          {
            id: 'payslip',
            title: 'Payslip',
            type: 'item',
            icon: 'feather icon-at-sign',
            url: '/payslip'
          }
        ]
      }
    ]
  },

  {
    id: 'departments',
    title: 'Departments',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'departments',
        title: 'Departments',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'create',
            title: 'Create',
            type: 'item',
            icon: 'feather icon-at-sign',
            url: '/departments/create'
          },
          {
            id: 'list',
            title: 'Lists',
            type: 'item',
            icon: 'feather icon-at-sign',
            url: '/departments/list'
          }
        ]
      }
    ]
  },

  {
    id: 'courses',
    title: 'Courses',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'courses',
        title: 'Courses',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          // {
          //   id: 'add-new-course',
          //   title: 'Add New Course',
          //   type: 'item',
          //   icon: 'feather icon-at-sign',
          //   url: '/courses/new-course'
          // },
          // {
          //   id: 'add-new-lesson',
          //   title: 'Add New Lesson',
          //   type: 'item',
          //   icon: 'feather icon-at-sign',
          //   url: '/courses/new-lesson'
          // },
          {
            id: 'course-list',
            title: 'Course',
            type: 'item',
            icon: 'feather icon-at-sign',
            url: '/courses/course-list'
          },

          {
            id: 'lesson-list',
            title: 'Lesson',
            type: 'item',
            icon:'feather icon-at-sign',
            url: '/courses/lesson-list'
          },
        ]
      }
    ]
  },

  {
    id: 'holidays',
    title: 'Holidays',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'holidays',
        title: 'Holidays',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'holiday',
            title: 'Create Holidays',
            type: 'item',
            icon: 'feather icon-at-sign',
            url: '/holidays/create-holiday'
          },
          {
            id: 'holiday-list',
            title: 'Holiday List',
            type: 'item',
            icon: 'feather icon-at-sign',
            url: '/holidays/holiday-list'
          },
          {
            id: 'holiday-calendar',
            title: 'Holiday Calendar',
            type: 'item',
            icon: 'feather icon-at-sign',
            url: '/holidays/holiday-calendar'
          }
        ]
      }
    ]
  },

  {
    id: 'settings',
    title: 'Settings',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'users',
        title: 'Users',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'create',
            title: 'Create',
            type: 'item',
            icon: 'feather icon-at-sign',
            url: '/users/create'
          },
          {
            id: 'list',
            title: 'Lists',
            type: 'item',
            icon: 'feather icon-at-sign',
            url: '/users/list'
          },
          {
            id: 'profile',
            title: 'Profiles',
            type: 'item',
            icon: 'feather icon-at-sign',
            url: '/users/profiles'
          },
          {
            id: 'changepassword',
            title: 'Change Password',
            type: 'item',
            icon: 'feather icon-at-sign',
            url: '/users/change-password'
          }
        ]
      }
    ]
  },

  {
    id: 'Authentication',
    title: 'Authentication',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'signup',
        title: 'Sign up',
        type: 'item',
        url: '/auth/signup',
        icon: 'feather icon-at-sign',
        target: true,
        breadcrumbs: false
      },
      {
        id: 'signin',
        title: 'Sign in',
        type: 'item',
        url: '/auth/signin',
        icon: 'feather icon-log-in',
        target: true,
        breadcrumbs: false
      }
    ]
  },

  {
    id: 'chart',
    title: 'Chart',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'apexchart',
        title: 'ApexChart',
        type: 'item',
        url: '/chart',
        classes: 'nav-item',
        icon: 'feather icon-pie-chart'
      }
    ]
  },
  {
    id: 'forms & tables',
    title: 'Forms & Tables',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'forms',
        title: 'Basic Forms',
        type: 'item',
        url: '/forms',
        classes: 'nav-item',
        icon: 'feather icon-file-text'
      },
      {
        id: 'tables',
        title: 'tables',
        type: 'item',
        url: '/tables',
        classes: 'nav-item',
        icon: 'feather icon-server'
      }
    ]
  }

  // {
  //   id: 'other',
  //   title: 'Other',
  //   type: 'group',
  //   icon: 'icon-group',
  //   children: [
  //     {
  //       id: 'sample-page',
  //       title: 'Sample Page',
  //       type: 'item',
  //       url: '/sample-page',
  //       classes: 'nav-item',
  //       icon: 'feather icon-sidebar'
  //     },
  //     {
  //       id: 'menu-level',
  //       title: 'Menu Levels',
  //       type: 'collapse',
  //       icon: 'feather icon-menu',
  //       children: [
  //         {
  //           id: 'menu-level-2.1',
  //           title: 'Menu Level 2.1',
  //           type: 'item',
  //           url: 'javascript:',
  //           external: true
  //         },
  //         {
  //           id: 'menu-level-2.2',
  //           title: 'Menu Level 2.2',
  //           type: 'collapse',
  //           children: [
  //             {
  //               id: 'menu-level-2.2.1',
  //               title: 'Menu Level 2.2.1',
  //               type: 'item',
  //               url: 'javascript:',
  //               external: true
  //             },
  //             {
  //               id: 'menu-level-2.2.2',
  //               title: 'Menu Level 2.2.2',
  //               type: 'item',
  //               url: 'javascript:',
  //               external: true
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // }
];
