import { VStack } from '@/components/Stack';
import { Button, Input, Typography } from 'antd';
import cls from './MainPage.module.scss';

export const MainPage = () => {

    return (
        <div className={cls.MainPage}>
            <VStack justify="center" align="center" gap="8">
                <Typography.Title level={4} style={{marginBottom: 0}}>Авторизация</Typography.Title>
                <VStack align="center" gap="16" className={cls.bodyAuthorized}>
                    <Input placeholder="Логин" onChange={(e) => console.log(e.target.value)} />
                    <Input placeholder="Пароль" onChange={(e) => console.log(e.target.value)} />
                    <Button type="default" style={{width: '100%', marginTop: '10px'}}>Войти</Button>
                </VStack>
                <Button type="text">Зарегистрироваться</Button>
            </VStack>
        </div>
    );
};

