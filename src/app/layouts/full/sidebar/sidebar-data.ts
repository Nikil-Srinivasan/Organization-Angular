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
    iconName: 'rosette',
    route: '/dashboard/employees',
    roles: [Role.Admin,Role.Employee],
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
