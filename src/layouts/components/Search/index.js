// React
import { Fragment, useEffect, useRef, useState } from "react";
// Material UI
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
// Material icons
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
// React router dom
import { Link } from "react-router-dom";
// Components
// Styles
import {
    SearchInput,
    SearchResultHeadingWrapper,
    SearchTooltip,
    SearchWrapper,
    SearchWrapperIconSearch,
} from "../../../styles/Search";
import productApi from "../../../api/productApi";
import { useDebounce } from "../../../hook";
import SearchItem from "./SearchResulProduct";
import blogApi from "../../../api/blogApi";
import SearchResultBlog from "./SearchResultBlog";

function Search({ matches }) {
    const inputRef = useRef();
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [searchResultBlog, setSearchResultBlog] = useState([]);
    const [loading, setLoading] = useState(false);

    const debounce = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!searchValue.trim()) {
            if (!debounce.trim()) {
                setSearchResult([]);
                return;
            }
        }

        const handleSearch = async () => {
            try {
                setLoading(true);
                const res = await productApi.search(searchValue);
                const blogs = await blogApi.search(searchValue);
                setSearchResultBlog(blogs);
                setSearchResult(res);
                setLoading(false);
            } catch (error) {
                alert(error);
            }
        };
        handleSearch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounce]);

    const handleSearch = (e) => {
        const value = e.target.value;
        if (!value.startsWith(" ")) {
            setSearchValue(value);
        }
    };

    const handleClear = () => {
        setSearchValue("");
        setSearchResult([]);
        inputRef.current.focus();
    };

    return (
        <Fragment>
            <SearchTooltip
                sx={{ width: matches ? "300px" : "400px" }}
                open={!!searchValue}
                title={
                    <Fragment>
                        <SearchResultHeadingWrapper>
                            {!!searchValue && loading && (
                                <CircularProgress size={20} />
                            )}
                            {!loading && <SearchIcon />}

                            <Typography
                                variant="body2"
                                component={"span"}
                                fontSize={"18px"}
                                ml={1}
                            >
                                {!!searchResult &&
                                    `Kết quả tìm kiếm cho "${searchValue}"`}
                            </Typography>
                        </SearchResultHeadingWrapper>
                        <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            padding={"6px 0 10px 0"}
                        >
                            <Typography
                                variant={"body1"}
                                component={"h2"}
                                fontSize={"18px"}
                                sx={{ color: "rgba(22, 24, 35, 0.5)" }}
                            >
                                Sản phẩm
                            </Typography>
                            <Typography
                                variant={"body1"}
                                component={Link}
                                color={"primary"}
                                to={"/"}
                            >
                                Xem tất cả
                            </Typography>
                        </Box>
                        {searchResult.map((product) => (
                            <SearchItem key={product._id} product={product} />
                        ))}
                        <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            padding={"6px 0 10px 0"}
                        >
                            <Typography
                                variant={"body1"}
                                component={"h2"}
                                fontSize={"18px"}
                                sx={{ color: "rgba(22, 24, 35, 0.5)" }}
                            >
                                Bài viết
                            </Typography>
                            <Typography
                                variant={"body1"}
                                component={Link}
                                color={"primary"}
                                to={"/"}
                            >
                                Xem tất cả
                            </Typography>
                        </Box>
                        {searchResultBlog.map((blog) => (
                            <SearchResultBlog key={blog._id} blog={blog} />
                        ))}
                    </Fragment>
                }
            >
                <SearchWrapper>
                    <SearchInput
                        ref={inputRef}
                        name="search"
                        id="search"
                        placeholder="Xin chào, bạn đang tìm gì thế?"
                        spellCheck={false}
                        value={searchValue}
                        onChange={handleSearch}
                    />
                    {searchValue && (
                        <IconButton
                            children={<ClearIcon />}
                            onClick={handleClear}
                        />
                    )}
                    <SearchWrapperIconSearch>
                        <SearchIcon />
                    </SearchWrapperIconSearch>
                </SearchWrapper>
            </SearchTooltip>
        </Fragment>
    );
}

export default Search;
