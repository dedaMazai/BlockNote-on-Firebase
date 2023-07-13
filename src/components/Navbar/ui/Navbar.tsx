import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData } from '@/components/User/modal/selectors/getUserAuthData';
import { classNames } from '@/lib/classNames/classNames';
import { HStack } from '@/components/Stack';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch/useAppDispatch';
import { useNavigate } from 'react-router-dom';

import cls from './Navbar.module.scss';
import { RoutePath } from '@/app/providers/router/ui/routeConfig';
import { Button, Dropdown, Typography } from 'antd';
import Icon from '@ant-design/icons';

interface NavbarProps {
  className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const navigate = useNavigate();

    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <HStack gap="8">
                    <Typography.Title level={4} style={{marginBottom: 0, color: 'white'}}>... BlockNode ...</Typography.Title>
                    <button onClick={() => navigate(RoutePath.block_note)}>123</button>
                </HStack>
            </header>
        );
    }

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <HStack gap="8" justify="between" max>
                <Button style={{padding: 0}} onClick={() => navigate(RoutePath.main)} type='text'>
                    <Typography.Title level={4} style={{marginBottom: 0, color: 'white'}}>... BlockNode ...</Typography.Title>
                </Button>
                <button onClick={() => navigate(RoutePath.block_note)}>123</button>
                <Dropdown
                    dropdownRender={(menu) => <Button>Выйти</Button>}
                    trigger={['click']}
                >
                    <Button style={{ padding: 0 }} type='text'>
                        <img className={cls.Avatar} src="https://cs14.pikabu.ru/avatars/3834/x3834844-1633298862.png" alt='avatar' />
                    </Button>
                </Dropdown>
            </HStack>
        </header>
    );
});
