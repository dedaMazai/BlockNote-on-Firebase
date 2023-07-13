import { PageLoader } from '@/components/PageLoader';
import { getUserInited, userActions } from '@/components/User';
import { classNames } from '@/lib/classNames/classNames';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRouter } from './providers/router';

export const App = () => {
    const dispatch = useDispatch();
    const inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app', {}, [])}>
            <Suspense fallback={<PageLoader />}>
                <div className="content-page">
                    {inited && (
                        <AppRouter />
                    )}
                </div>
            </Suspense>
        </div>
    );
};
