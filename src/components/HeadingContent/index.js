import { Box, Button, Fade, Grid, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { HeadingContentTitle, HeadingContentViewAll, HeadingContentWrapper } from "../../styles/HeadingContent";

function HeadingContent({ title, viewList, urlViewAll }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleShow = (e) => {
        setAnchorEl(e.currentTarget);
    };
    return (
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: 1, mb: 1 }}>
            <HeadingContentWrapper>
                <HeadingContentTitle variant="body2" component={"h3"}>
                    {title}
                </HeadingContentTitle>
                {!!urlViewAll && (
                    <HeadingContentViewAll component={Link} to={`${urlViewAll}`}>
                        Xem tất cả
                    </HeadingContentViewAll>
                )}
                {!!viewList && !urlViewAll && (
                    <Box>
                        <Button
                            sx={{
                                backgroundColor: "#fff",
                                "&:hover": { backgroundColor: "#fff" },
                            }}
                            endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            onClick={handleShow}
                        >
                            Tất cả
                        </Button>
                        <Menu open={open} anchorEl={anchorEl} TransitionComponent={Fade} onClose={() => setAnchorEl(null)}>
                            <MenuItem component={Link} to="/">
                                Tất cả
                            </MenuItem>
                            {viewList.map((item, index) => (
                                <MenuItem key={index} component={Link} to={`/san-pham/${item.namUrl}`}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                )}
            </HeadingContentWrapper>
        </Grid>
    );
}

export default HeadingContent;
