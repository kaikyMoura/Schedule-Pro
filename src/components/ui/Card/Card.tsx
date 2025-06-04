"use client"
import styles from './Card.module.scss';

interface CardProps {
    children: React.ReactNode | React.ReactNode[],
    className?: string,
    title?: string;
}

const Card = ({ children, className, title}: CardProps) => {
    return (
        <div className={styles.card__container}>
            <div className={`bg-(--component-color) overflow-hidden ${className}`}>
                <div className={`${className}`}>
                    <h2 className="font-medium text-xl">{title}</h2>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Card;