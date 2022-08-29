import { useState, useEffect } from "react";

function useDebounce(value, delay) {
    const [deBounceValue, setDeBounceValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDeBounceValue(value);
        }, delay);
        return () => clearTimeout(handler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return deBounceValue;
}

export default useDebounce;
