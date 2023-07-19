import { Role } from 'src/app/models/role';
import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
    roles: [Role.Admin],
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',  
    roles: [Role.Employee],
  },
  {
    navCap: 'Tables',
    roles: [Role.Admin],
  },
  {
    navCap: 'Tasks',
    roles: [Role.Employee],
  },
  {
    displayName: 'Employee',
    iconName: 'users',
    route: '/dashboard/employees',
    roles: [Role.Admin],
  },
  {
    displayName: 'New Tasks',
    iconName: 'notification',
    route: '/dashboard/tasks/new',
    roles: [Role.Employee],
  },
  {
    displayName: 'InProgress',
    iconName: 'calendar-stats',
    route: '/dashboard/tasks/inprogress',
    roles: [Role.Employee],
  },
  {
    displayName: 'Pending',
    iconName: 'alert-circle-filled',
    route: '/dashboard/tasks/pending',
    roles: [Role.Employee],
  },
  {
    displayName: 'Completed',
    iconName: 'checkbox',
    route: '/dashboard/tasks/completed',
    roles: [Role.Employee],
  },
  {
    displayName: 'Manager',
    iconName: 'briefcase',
    route: '/dashboard/manager',
    roles: [Role.Admin],

  },
  {
    displayName: 'Department',
    iconName: 'users-group',
    route: '/dashboard/departments',
    roles: [Role.Admin],
  },
];
