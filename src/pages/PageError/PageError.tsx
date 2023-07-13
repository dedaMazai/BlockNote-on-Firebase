import { classNames } from '@/lib/classNames/classNames';
import { Button } from 'antd';
import cls from './PageError.module.scss';

interface PageErrorProps {
  className?: string
}

export const PageError = ({ className }: PageErrorProps) => {

    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    return (
        <div className={classNames(cls.PageError, {}, [className])}>
            Не известная ошибка.
            <Button onClick={reloadPage}>
                Обновить сайт
            </Button>
        </div>
    );
};
