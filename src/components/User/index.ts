export {
    userActions,
    userReducer,
} from './modal/slice/userSlice';

export type {
    UserSchema,
} from './modal/types/user';

export {
    getUserAuthData,
    getUserInited,
} from './modal/selectors/getUserAuthData';
