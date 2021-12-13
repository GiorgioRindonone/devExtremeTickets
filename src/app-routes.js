import { withNavigationWatcher } from './contexts/navigation';
import { HomePage, TasksPage, ticket1Page } from './pages';

const routes = [
  {
    path: '/tasks',
    component: TasksPage
  },
  {
    path: '/tisket1',
    component: ticket1Page
  },
  {
    path: '/home',
    component: HomePage
  }
];

export default routes.map(route => {
  return {
    ...route,
    component: withNavigationWatcher(route.component)
  };
});
