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
    roles: [Role.Manager],
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
    navCap: 'Table',
    roles: [Role.Manager],
  },
  {
    displayName: 'Employee List',
    iconName: 'users',
    route: '/dashboard/employee-list',
    roles: [Role.Manager],
  },
  {
    navCap: 'Tasks',
    roles: [Role.Employee],
  },
  {
    displayName: 'Employees',
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
    displayName: 'Managers',
    iconName: 'briefcase',
    route: '/dashboard/managers',
    roles: [Role.Admin],

  },
  {
    displayName: 'Department',
    iconName: 'users-group',
    route: '/dashboard/departments',
    roles: [Role.Admin],
  },
];
