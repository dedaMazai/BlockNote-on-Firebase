import { userReducer, UserSchema } from '@/components/User';
import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';

export interface StateSchema {
    user: UserSchema;
}

export type StateSchemaKey = keyof StateSchema;

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        user: userReducer,
    };

    const store = configureStore({
        reducer: rootReducers,
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
