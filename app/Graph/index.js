import Loadable from 'react-loadable';

export const AsyncGraph = Loadable({
  loader: () => import('./Graph'),
  loading: () => null
});
