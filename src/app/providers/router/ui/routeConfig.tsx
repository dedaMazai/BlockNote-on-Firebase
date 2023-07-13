import { RouteProps } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage';
import { BlockNotePage } from '@/pages/BlockNotePage/BlockNotePage';

export type AppRoutersProps = RouteProps & {
    authOnly?: boolean;
}

export enum AppRouters {
  MAIN = 'main',
  BLOCK_NOTE = 'block_note',
  // last
  NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRouters, string> = {
    [AppRouters.MAIN]: '/',
    [AppRouters.BLOCK_NOTE]: '/block_note',
    // last
    [AppRouters.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRouters, AppRoutersProps> = {
    [AppRouters.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRouters.BLOCK_NOTE]: {
        path: RoutePath.block_note,
        element: <BlockNotePage />,
        // authOnly: true,
    },
    [AppRouters.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
