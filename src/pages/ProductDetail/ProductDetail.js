function ProductDetail({ detail, ...props }) {
    return (
        <>
            <span
                dangerouslySetInnerHTML={{
                    __html: `${detail}`,
                }}
            ></span>
        </>
    );
}

export default ProductDetail;
