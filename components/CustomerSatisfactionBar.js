import { useEffect, useState, useRef } from 'react';
import styles from '../styles/CustomerSatisfactionBar.module.css';

const CustomerSatisfactionBar = () => {
    const [emojiIndex, setEmojiIndex] = useState(2);
    const cursorRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const container = containerRef.current;
        const emojis = ['😠', '😞', '😐', '😊', '😁'];
        const colors = ['#ff0000', '#ff9900', '#ffff00', '#66ff66', '#0066ff'];

        if (!cursor || !container) return;

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
        <div className={styles.container} ref={containerRef}>
            <div className={styles.bar}>
                <div className={styles.barWrapper}>
                    <div className={styles.red}></div>
                    <div className={styles.barText}>Very Dissatisfied</div>
                </div>
                <div className={styles.barWrapper}>
                    <div className={styles.orange}></div>
                    <div className={styles.barText}>Dissatisfied</div>
                </div>
                <div className={styles.barWrapper}>
                    <div className={styles.yellow}></div>
                    <div className={styles.barText}>Neutral</div>
                </div>
                <div className={styles.barWrapper}>
                    <div className={styles.green}></div>
                    <div className={styles.barText}>Satisfied</div>
                </div>
                <div className={styles.barWrapper}>
                    <div className={styles.blue}></div>
                    <div className={styles.barText}>Very Satisfied</div>
                </div>
            </div>
            <div className={styles.cursor} ref={cursorRef} draggable="true">
                <span className={styles.emoji}>{['😠', '😞', '😐', '😊', '😁'][emojiIndex]}</span>
            </div>
        </div>
    );
};

export default CustomerSatisfactionBar;