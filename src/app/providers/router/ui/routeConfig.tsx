import { RouteProps } from 'react-router-dom';
import { AuthorizationPage } from '@/pages/AuthorizationPage/AuthorizationPage';
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage';
import { BlockNotePage } from '@/pages/BlockNotePage/BlockNotePage';

export type AppRoutersProps = RouteProps & {
    auth?: boolean;
}

export enum AppRouters {
    BLOCK_NOTE = 'block_note',
  AUTHORIZATION = 'authorization',
  // last
  NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRouters, string> = {
    [AppRouters.BLOCK_NOTE]: '/',
    [AppRouters.AUTHORIZATION]: '/authorization',
    // last
    [AppRouters.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRouters, AppRoutersProps> = {
    [AppRouters.BLOCK_NOTE]: {
        path: RoutePath.block_note,
        element: <BlockNotePage />,
        auth: true,
    },
    [AppRouters.AUTHORIZATION]: {
        path: RoutePath.authorization,
        element: <AuthorizationPage />,
    },
    [AppRouters.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
