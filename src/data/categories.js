import HomeIcon from "@mui/icons-material/Home";
import CommentIcon from "@mui/icons-material/Comment";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HelpIcon from "@mui/icons-material/Help";
import InfoIcon from "@mui/icons-material/Info";

const categories = [
    { title: "Trang chủ", slug: "", icon: <HomeIcon /> },
    { title: "Bài viết", slug: "bai-viet", icon: <CommentIcon /> },
    {
        title: "Sản phẩm",
        slug: "san-pham",
        icon: <FeaturedPlayListIcon />,
        children: [],
    },
    { title: "Tài khoản", slug: "tai-khoan", icon: <SettingsIcon /> },
    { title: "Giỏ hàng", slug: "gio-hang", icon: <ShoppingCartIcon /> },
    { title: "Giới thiệu", slug: "gioi-thieu", icon: <InfoIcon /> },
    { title: "Hổ trợ", slug: "ho-tro", icon: <HelpIcon /> },
];

export default categories;
