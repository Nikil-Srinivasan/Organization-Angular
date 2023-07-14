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
    navCap: 'Tables',
    roles: [Role.Admin],
  },
  {
    displayName: 'Employee',
    iconName: 'users',
    route: '/dashboard/employee',
    roles: [Role.Admin,Role.Employee],
  },
  {
    displayName: 'Manager',
    iconName: 'briefcase',
    route: '/dashboard/manager',
    roles: [Role.Admin],

  },
  {
    displayName: 'Product',
    iconName: 'device-desktop-code',
    route: '/dashboard/product',
    roles: [Role.Admin],

  },
  {
    displayName: 'Customer',
    iconName: 'user-plus',
    route: '/dashboard/customer',
    roles: [Role.Admin],

  },
  {
    displayName: 'Department',
    iconName: 'users-group',
    route: '/dashboard/department',
    roles: [Role.Admin],
  },
];
