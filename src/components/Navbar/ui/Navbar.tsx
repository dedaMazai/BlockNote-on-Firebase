import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData } from '@/components/User/modal/selectors/getUserAuthData';
import { classNames } from '@/lib/classNames/classNames';
import { HStack } from '@/components/Stack';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@/app/providers/router/ui/routeConfig';
import { Button, Dropdown, Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import cls from './Navbar.module.scss';
import { userActions } from '@/components/User';

interface NavbarProps {
  className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);

    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <HStack gap="8" justify="between" max>
                    <Button style={{padding: 0}} type='text'>
                        <Typography.Title level={4} style={{marginBottom: 0, color: 'white'}}>... BlockNode ...</Typography.Title>
                    </Button>
                    <Dropdown
                        dropdownRender={(menu) => (
                            <Button onClick={() => dispatch(userActions.logout())}>Выйти</Button>
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
