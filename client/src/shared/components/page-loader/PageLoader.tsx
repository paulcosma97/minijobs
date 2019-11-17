import React, {FC, useEffect, useState} from 'react';

const PageLoader: FC = () => {
    const [dots, setDots] = useState(0);

    useEffect(() => {
        const timerId = setInterval(() => setDots(dots === 3 ? 0 : dots + 1), 350);
        return () => clearInterval(timerId);
    });

    return <span style={{fontSize: '2em'}}>Loading {''.padStart(dots, '.')}</span>
};

export default PageLoader;