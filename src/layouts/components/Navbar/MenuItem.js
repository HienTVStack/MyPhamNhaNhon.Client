import { useState } from "react";
// Material UI
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ExpandLess from "@mui/icons-material/ExpandLess";
// Material icons
import ExpandMore from "@mui/icons-material/ExpandMore";
// React router dom
import { Link } from "react-router-dom";

function MenuItem({ icon, title, slug, categories, children }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    return (
        <>
            <ListItemButton
                component={!!children ? "li" : Link}
                to={`/${slug}`}
                sx={{
                    borderBottom: "1px solid #fff",
                    color: "#fff",
                    "&:hover": {
                        backgroundColor: theme.palette.primary.main,
                    },
                }}
                onClick={() => setOpen(!open)}
            >
                <ListItemIcon sx={{ color: "#fff" }}>{icon}</ListItemIcon>
                <ListItemText>
                    <Typography variant="body2" fontSize={"18px"}>
                        {title}
                    </Typography>
                </ListItemText>
                {children && (open ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
            {children && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List sx={{ backgroundColor: theme.palette.primary.main }}>
                        <ListItemButton component={Link} to={`/san-pham`} sx={{ pl: 4, borderBottom: "1px solid #fff" }}>
                            <ListItemText primary={"Tất cả"} />
                        </ListItemButton>
                        {categories.map((item, index) => (
                            <ListItemButton
                                key={index}
                                component={Link}
                                to={`/san-pham/${item?.slug}`}
                                sx={{ pl: 4, borderBottom: "1px solid #fff" }}
                            >
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );
}

export default MenuItem;
