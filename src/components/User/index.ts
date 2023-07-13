export {
    userActions,
    userReducer,
} from './modal/slice/userSlice';

export type {
    UserSchema,
    User,
} from './modal/types/user';

export {
    getUserAuthData,
    getUserInited,
} from './modal/selectors/getUserAuthData';
