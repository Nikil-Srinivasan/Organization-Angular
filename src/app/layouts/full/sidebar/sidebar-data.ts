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
    displayName: 'Departments',
    iconName: 'users-group',
    route: '/dashboard/departments',
    roles: [Role.Admin],
  },
  {
    displayName: 'Managers',
    iconName: 'briefcase',
    route: '/dashboard/managers',
    roles: [Role.Admin],

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
    displayName: 'InProgress Tasks',
    iconName: 'calendar-stats',
    route: '/dashboard/tasks/inprogress',
    roles: [Role.Employee],
  },
  {
    displayName: 'Pending Tasks',
    iconName: 'alert-circle-filled',
    route: '/dashboard/tasks/pending',
    roles: [Role.Employee],
  },
  {
    displayName: 'Completed Tasks',
    iconName: 'checkbox',
    route: '/dashboard/tasks/completed',
    roles: [Role.Employee],
  },


];
