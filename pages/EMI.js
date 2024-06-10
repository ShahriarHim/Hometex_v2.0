import React, { useState } from 'react';
import styles from '../styles/EMIPage.module.css';

const EMIPage = () => {
    const emiData = {
        'City Bank (AMEX Only)': [
            { term: '3 EMIs', fee: 'Convenience Fee (0%): 24,000.00/m' },
            { term: '6 EMIs', fee: 'Convenience Fee (0%): 12,000.00/m' },
            { term: '9 EMIs', fee: 'Convenience Fee (0%): 8,000.00/m' },
            { term: '12 EMIs', fee: 'Convenience Fee (0%): 6,000.00/m' }
        ],
        'BRAC Bank': [
            { term: '3 EMIs', fee: 'Convenience Fee (0%): 23,000.00/m' },
            { term: '6 EMIs', fee: 'Convenience Fee (0%): 11,500.00/m' },
            { term: '9 EMIs', fee: 'Convenience Fee (0%): 7,666.67/m' },
            { term: '12 EMIs', fee: 'Convenience Fee (0%): 5,750.00/m' }
        ],
        'Eastern Bank': [
            { term: '3 EMIs', fee: 'Convenience Fee (0%): 22,000.00/m' },
            { term: '6 EMIs', fee: 'Convenience Fee (0%): 11,000.00/m' },
            { term: '9 EMIs', fee: 'Convenience Fee (0%): 7,333.33/m' },
            { term: '12 EMIs', fee: 'Convenience Fee (0%): 5,500.00/m' }
        ],
        'Southeast Bank': [
            { term: '3 EMIs', fee: 'Convenience Fee (0%): 21,000.00/m' },
            { term: '6 EMIs', fee: 'Convenience Fee (0%): 10,500.00/m' },
            { term: '9 EMIs', fee: 'Convenience Fee (0%): 7,000.00/m' },
            { term: '12 EMIs', fee: 'Convenience Fee (0%): 5,250.00/m' }
        ],
        'United Commercial Bank': [
            { term: '3 EMIs', fee: 'Convenience Fee (0%): 25,566.33/m' },
            { term: '6 EMIs', fee: 'Convenience Fee (0%): 12,783.17/m' },
            { term: '9 EMIs', fee: 'Convenience Fee (0%): 8,522.11/m' },
            { term: '12 EMIs', fee: 'Convenience Fee (0%): 6,391.58/m' }
        ],
        'Trust Bank': [
            { term: '3 EMIs', fee: 'Convenience Fee (0%): 26,000.00/m' },
            { term: '6 EMIs', fee: 'Convenience Fee (0%): 13,000.00/m' },
            { term: '9 EMIs', fee: 'Convenience Fee (0%): 8,666.67/m' },
            { term: '12 EMIs', fee: 'Convenience Fee (0%): 6,500.00/m' }
        ],
        'LankaBangla Finance': [
            { term: '3 EMIs', fee: 'Convenience Fee (0%): 24,500.00/m' },
            { term: '6 EMIs', fee: 'Convenience Fee (0%): 12,250.00/m' },
            { term: '9 EMIs', fee: 'Convenience Fee (0%): 8,166.67/m' },
            { term: '12 EMIs', fee: 'Convenience Fee (0%): 6,125.00/m' }
        ],
        'Mutual Trust Bank': [
            { term: '3 EMIs', fee: 'Convenience Fee (0%): 23,500.00/m' },
            { term: '6 EMIs', fee: 'Convenience Fee (0%): 11,750.00/m' },
            { term: '9 EMIs', fee: 'Convenience Fee (0%): 7,833.33/m' },
            { term: '12 EMIs', fee: 'Convenience Fee (0%): 5,875.00/m' }
        ],
        'Dutch Bangla Bank': [
            { term: '3 EMIs', fee: 'Convenience Fee (0%): 22,500.00/m' },
            { term: '6 EMIs', fee: 'Convenience Fee (0%): 11,250.00/m' },
            { term: '9 EMIs', fee: 'Convenience Fee (0%): 7,500.00/m' },
            { term: '12 EMIs', fee: 'Convenience Fee (0%): 5,625.00/m' }
        ],
        'Jamuna Bank': [
            { term: '3 EMIs', fee: 'Convenience Fee (0%): 21,500.00/m' },
            { term: '6 EMIs', fee: 'Convenience Fee (0%): 10,750.00/m' },
            { term: '9 EMIs', fee: 'Convenience Fee (0%): 7,166.67/m' },
            { term: '12 EMIs', fee: 'Convenience Fee (0%): 5,375.00/m' }
        ]
        // Add other bank data here...
    };
    const [activeBank, setActiveBank] = useState('United Commercial Bank');

    const showEmiDetails = (bank) => {
        setActiveBank(bank);
    };
    return (
        <div className={styles.card}>
            <div >
                <div className={styles['header-left']}>EMI Details</div>
                <div className={styles['header-right']}>T&C</div>
            </div>
            <div className={styles.container}>

                <div className={styles['bank-list']}>
                    <ul>
                        {Object.keys(emiData).map((bank, index) => (
                            <li key={index} onClick={() => showEmiDetails(bank)} className={activeBank === bank ? styles.active : ''}>
                                {bank}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles['emi-details']}>
                    <h2>{activeBank}</h2>
                    {emiData[activeBank].map((emi, index) => (
                        <div key={index} className={styles['emi-option']}>
                            <strong>{emi.term}</strong> | {emi.fee}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EMIPage;