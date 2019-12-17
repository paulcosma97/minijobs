import React, { useState, useEffect } from 'react';

export interface InfiniteScrollListProps {
    initialPage: number;
    lastPage: number;
    onLoadPage: (nextPage: number) => any;
    loading: boolean;
}

export const InfiniteScrollList: React.FC<InfiniteScrollListProps> = (props) => {
    const [shouldLoadMore, setShouldLoadMore] = useState(false);
  
    window.onscroll = function() {
        const scrollHeight = document.body.scrollHeight;
        const totalHeight = window.scrollY + window.innerHeight;

        if(totalHeight >= scrollHeight) {
            setShouldLoadMore(true);
        }
    }


    useEffect(() => {
        setShouldLoadMore(false);
        props.onLoadPage(props.initialPage + 1);
    }, [shouldLoadMore]);

    return <>{props.children}</>
}