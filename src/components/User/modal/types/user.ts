import { User } from "firebase/auth";

export interface UserSchema {
    authData?: User;

    _inited: boolean;
}
