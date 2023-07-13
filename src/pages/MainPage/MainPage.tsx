import { VStack } from '@/components/Stack';
import { Input, Typography } from 'antd';
import cls from './MainPage.module.scss';

export const MainPage = () => {

    return (
        <div className={cls.MainPage}>
            <VStack justify="center" align="center" gap="8">
                <Typography.Title level={4} style={{marginBottom: 0}}>Авторизация</Typography.Title>
                <VStack gap="16" className={cls.bodyAuthorized}>
                    <Input placeholder="Логин" onChange={(e) => console.log(e.target.value)} />
                    <Input placeholder="Пароль" onChange={(e) => console.log(e.target.value)} />
                </VStack>
            </VStack>
        </div>
    );
};

