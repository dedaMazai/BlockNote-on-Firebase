import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { VStack } from '@/components/Stack';
import { Button, Input, Typography, notification } from 'antd';
import { useState } from 'react';
import { getUserAuthData, userActions } from "@/components/User";
import { useSelector } from "react-redux";

import cls from './AuthorizationPage.module.scss';
import { useAppDispatch } from "@/lib/hooks/useAppDispatch/useAppDispatch";
import { USER_LOCALSTORAGE_KEY } from "@/const/localstorage";

export const AuthorizationPage = () => {
    const dispatch = useAppDispatch();
    const auth = useSelector(getUserAuthData);
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const auth = getAuth();
        if (isLogin) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user)
                    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
                    dispatch(userActions.setAuthData(user));
                })
                .catch((error) => {
                    console.log(error)
                    notification.error({
                        message: `Ошибка авторизации: ${error.message}`,
                    })
                });
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user; //!!!!!!!!!!!
                    console.log(user)
                })
                .catch((error) => {
                    console.log(error)
                    notification.error({
                        message: `Ошибка регистрации: ${error.message}`,
                    })
                });
        }
    };

    return (
        <div className={cls.AuthorizationPage}>
            {auth ? (
                <VStack justify="center" align="center" gap="8">
                    <Typography.Title level={4} style={{marginBottom: 0}}>
                        {'Вы авторизованы'}
                    </Typography.Title>
                </VStack>
            ) : (
                <VStack justify="center" align="center" gap="8">
                    <Typography.Title level={4} style={{marginBottom: 0}}>
                        {isLogin ? 'Авторизация' : 'Регистрация'}
                    </Typography.Title>
                    <VStack align="center" gap="16" className={cls.bodyAuthorized}>
                        <Input
                            placeholder="Логин"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="default"
                            style={{width: '100%', marginTop: '10px'}}
                            onClick={handleLogin}
                        >
                            {isLogin ? 'Войти' : 'Зарегистрироваться'}
                        </Button>
                    </VStack>
                    <Button type="text" onClick={() => setIsLogin((prev) => !prev)}>
                        {isLogin ? 'Зарегистрироваться' : 'Авторизоваться'}
                    </Button>
                </VStack>
            )}
        </div>
    );
};

