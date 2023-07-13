
import { classNames } from '@/lib/classNames/classNames';
import cls from './BlockNotePage.module.scss';

interface BlockNotePageProps {
  className?: string;
}

export const BlockNotePage = ({ className }: BlockNotePageProps) => {

    return (
        <div className={classNames(cls.BlockNotePage, {}, [className])}>
            BlockNotePage page
        </div>
    );
};
