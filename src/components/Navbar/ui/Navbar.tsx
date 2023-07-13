import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData } from '@/components/User/modal/selectors/getUserAuthData';
import { classNames } from '@/lib/classNames/classNames';
import { HStack } from '@/components/Stack';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch/useAppDispatch';

import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);

    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <HStack gap="8">
                    123
                </HStack>
            </header>
        );
    }

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            0000
        </header>
    );
});
