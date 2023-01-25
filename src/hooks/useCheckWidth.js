import React, {useEffect, useState} from "react";

const useCheckWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setheight] = useState(window.innerHeight);
    
    const handleWindowSizeChange = () => {
            setWidth(window.innerWidth);
            setheight(window.innerHeight);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    return {height:height, width:width};
}

export default useCheckWidth