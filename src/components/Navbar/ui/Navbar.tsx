import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/components/User/modal/selectors/getUserAuthData';
import { classNames } from '@/lib/classNames/classNames';
import { HStack } from '@/components/Stack';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, Dropdown, Typography, notification } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { userActions } from '@/components/User';
import {
    signOut,
  } from 'firebase/auth';

import cls from './Navbar.module.scss';
import { auth } from '@/firebase';

interface NavbarProps {
  className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);

    const handleLogout = () => {
        signOut(auth).then(() => {
            dispatch(userActions.logout())
        }).catch((error) => {
            notification.error({
                message: `Ошибка выхода: ${error.message}`,
            })
        });
    };

    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <HStack gap="8" justify="between" max>
                    <Button style={{padding: 0}} type='text'>
                        <Typography.Title level={4} style={{marginBottom: 0, color: 'white'}}>... BlockNode ...</Typography.Title>
                    </Button>
                    <Dropdown
                        dropdownRender={(menu) => (
                            <Button onClick={handleLogout}>Выйти</Button>
                        )}
                        trigger={['click']}
                    >
                        <Button style={{ padding: 0 }} type='text'>
                            <GithubOutlined style={{fontSize: 30, color: 'white'}} />
                        </Button>
                    </Dropdown>
                </HStack>
            </header>
        );
    }
;
    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <HStack gap="8" justify="between" max>
                <Button style={{padding: 0}} type='text'>
                    <Typography.Title level={4} style={{marginBottom: 0, color: '#c1d4ee'}}>... BlockNode ...</Typography.Title>
                </Button>
            </HStack>
        </header>
    );
});
