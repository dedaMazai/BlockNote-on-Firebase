import { VStack } from '@/components/Stack';
import { Button, Input, Typography } from 'antd';
import { useState } from 'react';
import cls from './MainPage.module.scss';

export const MainPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (isLogin) {
            console.log(login)
        } else {
            console.log(password)
        }
    }

    return (
        <div className={cls.MainPage}>
            <VStack justify="center" align="center" gap="8">
                <Typography.Title level={4} style={{marginBottom: 0}}>
                    {isLogin ? 'Авторизация' : 'Регистрация'}
                </Typography.Title>
                <VStack align="center" gap="16" className={cls.bodyAuthorized}>
                    <Input
                        placeholder="Логин"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
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
        </div>
    );
};

