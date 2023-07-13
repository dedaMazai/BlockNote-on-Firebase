import { classNames } from '@/lib/classNames/classNames';
import cls from './NotFoundPage.module.scss';

interface NotFoundPageProps {
  className?: string;
}

export const NotFoundPage = ({ className }: NotFoundPageProps) => {

    return (
        <div className={classNames(cls.NotFoundPage, {}, [className])}>
            Not found page
        </div>
    );
};
