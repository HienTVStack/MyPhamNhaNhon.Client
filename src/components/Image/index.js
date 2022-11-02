import { useState } from "react";
import images from "../../assets/images";

function Image({ src, alt, fallback: customFallback = images.noImage, props, ref }) {
    const [fallback, setFallback] = useState("");
    const handleError = () => {
        setFallback(customFallback);
    };
    return (
        <img
            src={fallback || src}
            ref={ref}
            alt={alt}
            {...props}
            onError={handleError}
            width={"100%"}
            height={"100%"}
            style={{ objectFit: "cover", verticalAlign: "middle" }}
        />
    );
}

export default Image;
