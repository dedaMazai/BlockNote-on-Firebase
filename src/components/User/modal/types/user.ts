export interface User {
    refresh_token?: string;
    access_token?: string;
}

export interface UserSchema {
    authData?: User;

    _inited: boolean;
}
