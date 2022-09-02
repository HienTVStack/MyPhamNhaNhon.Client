import { Pagination as PaginationMUI, PaginationItem } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

function Pagination({ pageCount, url }) {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get("page") || "1", pageCount);
    return (
        <PaginationMUI
            count={pageCount}
            page={page}
            variant="outlined"
            shape="rounded"
            color="primary"
            renderItem={(item, index) => (
                <PaginationItem
                    key={index}
                    component={Link}
                    to={`/${url}${item.page === 1 ? "" : `?page=${item.page}`}`}
                    {...item}
                />
            )}
        />
    );
}

export default Pagination;
