import { useState, useEffect } from "react";

function useNavbar(value) {
    const [open, setOpen] = useState(value);

    useEffect(() => {
        setOpen(value);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return open;
}

export default useNavbar;
