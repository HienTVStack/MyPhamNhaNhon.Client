// React
import { Fragment, useEffect, useRef, useState } from "react";
// Material UI
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
// Material icons
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
// React router dom
import { Link, useLocation } from "react-router-dom";
// Components
// Styles
import { SearchInput, SearchResultHeadingWrapper, SearchTooltip, SearchWrapper, SearchWrapperIconSearch } from "../../../styles/Search";
// import productApi from "../../../api/productApi";
import { useDebounce } from "../../../hooks";
import SearchItem from "./SearchResultProduct";
// import blogApi from "../../../api/blogApi";
import SearchResultBlog from "./SearchResultBlog";
import { useSelector } from "react-redux";

function Search({ matches }) {
    const inputRef = useRef();
    const location = useLocation();
    const productList = useSelector((state) => state.data.productList || []);
    const blogList = useSelector((state) => state.data.blogList || []);
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [searchResultBlog, setSearchResultBlog] = useState([]);
    const [loading, setLoading] = useState(false);

    const debounce = useDebounce(searchValue, 500);

    useEffect(() => {
        // if (!searchValue.trim()) {
        //     if (!debounce.trim()) {
        //         setSearchResult([]);
        //         return;
        //     }
        // }
        // const handleSearch = async () => {
        //     try {
        //         setLoading(true);
        //         const res = await productApi.search(searchValue);
        //         const blogs = await blogApi.search(searchValue);
        //         setSearchResultBlog(blogs);
        //         setSearchResult(res);
        //         setLoading(false);
        //     } catch (error) {
        //         console.log(error);
        //         setLoading(false);
        //     }
        // };
        // handleSearch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounce]);

    useEffect(() => {
        setSearchValue("");
    }, [location.pathname]);

    const handleSearch = (e) => {
        setLoading(true);
        const value = e.target.value;
        if (!value.startsWith(" ")) {
            setSearchValue(value);
        }
        const resultSearchProduct = productList.filter((item) => {
            return item.name.toUpperCase().includes(value.toUpperCase());
        });
        const resultSearchBlog = blogList.filter((item) => {
            return item.title.toUpperCase().includes(value.toUpperCase());
        });
        setSearchResult(resultSearchProduct);
        setSearchResultBlog(resultSearchBlog);
        setLoading(false);
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
                            {!!searchValue && loading && <CircularProgress size={20} />}
                            {!loading && <SearchIcon />}

                            <Typography variant="body2" component={"span"} fontSize={"18px"} ml={1}>
                                {!!searchResult && `Kết quả tìm kiếm cho "${searchValue}"`}
                            </Typography>
                        </SearchResultHeadingWrapper>
                        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} padding={"6px 0 10px 0"}>
                            <Typography variant={"body1"} component={"h2"} fontSize={"18px"} sx={{ color: "rgba(22, 24, 35, 0.5)" }}>
                                Sản phẩm
                            </Typography>
                            <Typography variant={"body1"} component={Link} color={"primary"} to={"/"}>
                                Xem tất cả
                            </Typography>
                        </Box>
                        {searchResult?.slice(0, 4).map((product) => (
                            <SearchItem key={product._id} product={product} />
                        ))}
                        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} padding={"6px 0 10px 0"}>
                            <Typography variant={"body1"} component={"h2"} fontSize={"18px"} sx={{ color: "rgba(22, 24, 35, 0.5)" }}>
                                Bài viết
                            </Typography>
                            <Typography variant={"body1"} component={Link} color={"primary"} to={"/"}>
                                Xem tất cả
                            </Typography>
                        </Box>
                        {searchResultBlog?.slice(0, 4).map((blog) => (
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
                    {searchValue && <IconButton children={<ClearIcon />} onClick={handleClear} />}
                    <SearchWrapperIconSearch>
                        <SearchIcon />
                    </SearchWrapperIconSearch>
                </SearchWrapper>
            </SearchTooltip>
        </Fragment>
    );
}

export default Search;
