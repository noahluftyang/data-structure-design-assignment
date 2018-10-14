import Loadable from 'react-loadable';

export const AsyncStats = Loadable({
  loader: () => import('./Stats'),
  loading: () => null
});
