import { Route, Routes } from 'react-router-dom';
import { memo, Suspense, useCallback } from 'react';
import { RequireAuth } from './RequireAuth';
import { PageLoader } from '@/components/PageLoader';
import { AppRoutersProps, routeConfig } from './routeConfig';

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutersProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>
                {route.element}
            </Suspense>
        );

        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.auth ? <RequireAuth>{element}</RequireAuth> : element}
            />
        );
    }, []);

    return (
        <Routes>
            {Object.values(routeConfig).map(renderWithWrapper)}
        </Routes>
    );
};

export default memo(AppRouter);
