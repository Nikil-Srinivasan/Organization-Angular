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
    iconName: 'rosette',
    route: '/dashboard/employees',
    roles: [Role.Admin],
  },
  {
    displayName: 'All Tasks',
    iconName: 'rosette',
    route: '/dashboard/tasks',
    roles: [Role.Employee],
  },
  {
    displayName: 'Pending',
    iconName: 'rosette',
    route: '/dashboard/tasks/pending',
    roles: [Role.Employee],
  },
  {
    displayName: 'Ongoing',
    iconName: 'rosette',
    route: '/dashboard/tasks/ongoing',
    roles: [Role.Employee],
  },
  {
    displayName: 'Manager',
    iconName: 'rosette',
    route: '/dashboard/manager',
    roles: [Role.Admin],

  },
  {
    displayName: 'Product',
    iconName: 'rosette',
    route: '/dashboard/product',
    roles: [Role.Admin],

  },
  {
    displayName: 'Customer',
    iconName: 'rosette',
    route: '/dashboard/customer',
    roles: [Role.Admin],

  },
  {
    displayName: 'Department',
    iconName: 'rosette',
    route: '/dashboard/department',
    roles: [Role.Admin],
  },
];
