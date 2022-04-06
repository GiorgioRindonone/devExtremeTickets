import { withNavigationWatcher } from './contexts/navigation';
import { HomePage, TasksPage, ticket1Page, TicketT1053113, TicketForm, GridCRUD, CrudProblem2 } from './pages';

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
  },
  {
    path: '/gridCRUD',
    component: GridCRUD
  },
  {
    path: '/crudproblem2',
    component: CrudProblem2
  }
];

export default routes.map(route => {
  return {
    ...route,
    component: withNavigationWatcher(route.component)
  };
});
