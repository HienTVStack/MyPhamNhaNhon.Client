import { Slide, useScrollTrigger } from "@mui/material";

function HiddenScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide
            appear={false}
            direction={"down"}
            in={!trigger}
            {...props}
            sx={{
                marginTop: "48px",
                minHeight: "100px",
                zIndex: 10,
            }}
        >
            {children}
        </Slide>
    );
}

export default HiddenScroll;
