import { useEffect } from 'react';
import styles from '../styles/CustomerSatisfactionBar.module.css';

const CustomerSatisfactionBar = () => {
    useEffect(() => {
        const cursor = document.querySelector(`.${styles.cursor}`);
        const container = document.querySelector(`.${styles.container}`);
        
        const handleDragStart = (e) => {
            e.dataTransfer.setDragImage(new Image(), 0, 0);
        };

        const handleDragOver = (e) => {
            e.preventDefault();
            const rect = container.getBoundingClientRect();
            let offsetX = e.clientX - rect.left - cursor.offsetWidth / 2;
            if (offsetX < 0) offsetX = 0;
            if (offsetX > rect.width - cursor.offsetWidth) offsetX = rect.width - cursor.offsetWidth;
            cursor.style.left = offsetX + 'px';
        };

        cursor.addEventListener('dragstart', handleDragStart);
        container.addEventListener('dragover', handleDragOver);

        return () => {
            cursor.removeEventListener('dragstart', handleDragStart);
            container.removeEventListener('dragover', handleDragOver);
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.bar}>
                <div className={styles.red}></div>
                <div className={styles.orange}></div>
                <div className={styles.yellow}></div>
                <div className={styles.green}></div>
                <div className={styles.blue}></div>
            </div>
            <div className={styles.cursor} draggable="true"></div>
            <div className={styles.label}>
                <span>😠</span>
                <span>😞</span>
                <span>😐</span>
                <span>😊</span>
                <span>😁</span>
            </div>
        </div>
    );
};

export default CustomerSatisfactionBar;
