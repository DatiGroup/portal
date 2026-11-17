import type { NavigateFunction } from 'react-router';

let globalRouter = { navigate: null } as {
  navigate: null | NavigateFunction;
};

export default globalRouter;
