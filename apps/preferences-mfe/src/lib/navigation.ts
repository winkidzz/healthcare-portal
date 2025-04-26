export interface NavigationItem {
  name: string;
  href: string;
  exact?: boolean;
}

export const navigationConfig: NavigationItem[] = [
  { name: 'Dashboard', href: '/', exact: true },
  { name: 'Preferences', href: '/preferences', exact: true },
  { name: 'Profile', href: '/profile', exact: true },
];

export const isActiveRoute = (currentPath: string, item: NavigationItem): boolean => {
  if (item.exact) {
    return currentPath === item.href;
  }
  return currentPath.startsWith(item.href);
}; 