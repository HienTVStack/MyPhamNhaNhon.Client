// React
import { useEffect, useState } from "react";
// Material UI
import { Drawer, List, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// Material icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// React router dom
import { Link } from "react-router-dom";
// style
import { NavbarTextHeading } from "../../../styles/Navbar";
// Component
import MenuItem from "./MenuItem";
// Data
import categories from "../../../data/categories";
// Api
import { useSelector } from "react-redux";

const MENUS_LIST = categories;

const NavbarHeader = () => {
    const user = useSelector((state) => state.data.user);
    const theme = useTheme();

    return (
        <Stack
            alignItems={"center"}
            backgroundColor={"#fff"}
            color={theme.palette.primary.main}
            p={3}
        >
            <AccountCircleIcon sx={{ width: "70px", height: "70px" }} />
            <NavbarTextHeading component={Link} to={"/dang-nhap"}>
                {user ? user.fullName : "ĐĂNG NHẬP"}
            </NavbarTextHeading>
        </Stack>
    );
};

function Navbar({ ...props }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const categoryList = useSelector((state) => state.data.categories);

    return (
        <Drawer anchor="left" {...props}>
            <List
                sx={{
                    height: "100%",
                    width: matches ? 300 : 380,
                    backgroundColor: theme.palette.secondary.main,
                    overflowY: "auto",
                }}
                subheader={<NavbarHeader />}
            >
                {MENUS_LIST.map((item, index) => (
                    <MenuItem
                        key={index}
                        icon={item.icon}
                        slug={item.slug}
                        title={item.title}
                        categories={categoryList}
                        children={item.children}
                    />
                ))}
            </List>
        </Drawer>
    );
}

export default Navbar;
