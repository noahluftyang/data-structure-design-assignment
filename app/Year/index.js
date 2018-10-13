import Loadable from 'react-loadable';

export const AsyncYear = Loadable({
  loader: () => import('./Year'),
  loading: () => null
});
