import { useEffect, useState } from 'react';
import styles from '../styles/CustomerSatisfactionBar.module.css';

const CustomerSatisfactionBar = () => {
    const [emojiIndex, setEmojiIndex] = useState(2);

    useEffect(() => {
        const cursor = document.querySelector(`.${styles.cursor}`);
        const container = document.querySelector(`.${styles.container}`);
        const emojis = ['😠', '😞', '😐', '😊', '😁'];
        const colors = ['#ff0000', '#ff9900', '#ffff00', '#66ff66', '#0066ff'];

        const updateCursorPosition = (clientX) => {
            const rect = container.getBoundingClientRect();
            let offsetX = clientX - rect.left - cursor.offsetWidth / 2;
            if (offsetX < 0) offsetX = 0;
            if (offsetX > rect.width - cursor.offsetWidth) offsetX = rect.width - cursor.offsetWidth;
            cursor.style.left = offsetX + 'px';

            const percentage = offsetX / (rect.width - cursor.offsetWidth);
            const newEmojiIndex = Math.floor(percentage * (emojis.length - 1));
            setEmojiIndex(newEmojiIndex);
            cursor.style.backgroundColor = colors[newEmojiIndex];
        };

        const handleDragStart = (e) => {
            e.dataTransfer.setDragImage(new Image(), 0, 0);
        };

        const handleDragOver = (e) => {
            e.preventDefault();
            updateCursorPosition(e.clientX);
        };

        const handleTouchMove = (e) => {
            updateCursorPosition(e.touches[0].clientX);
        };

        cursor.addEventListener('dragstart', handleDragStart);
        container.addEventListener('dragover', handleDragOver);
        container.addEventListener('touchmove', handleTouchMove);

        return () => {
            cursor.removeEventListener('dragstart', handleDragStart);
            container.removeEventListener('dragover', handleDragOver);
            container.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.bar}>
                <div className={styles.red}><br></br>Very Dissatisfied</div>
                <div className={styles.orange}><br></br>Dissatisfied</div>
                <div className={styles.yellow}><br></br>Neutral</div>
                <div className={styles.green}><br></br>Satisfied</div>
                <div className={styles.blue}><br></br>Very Satisfied</div>
            </div>
            <div className={styles.cursor} draggable="true">
                <span className={styles.emoji}>{['😠', '😞', '😐', '😊', '😁'][emojiIndex]}</span>
            </div>
        </div>
    );
};

export default CustomerSatisfactionBar;
