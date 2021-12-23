import { withNavigationWatcher } from './contexts/navigation';
import { HomePage, TasksPage, ticket1Page, TicketT1053113, TicketForm } from './pages';

const routes = [
  {
    path: '/TicketT1053113',
    component: TicketT1053113
  },
  {
    path: '/tisket1',
    component: ticket1Page
  },
  {
    path: '/home',
    component: HomePage
  },
  {
    path: '/ticketform',
    component: TicketForm
  }
];

export default routes.map(route => {
  return {
    ...route,
    component: withNavigationWatcher(route.component)
  };
});
