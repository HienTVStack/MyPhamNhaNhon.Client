function ProductContent({ detail, ...props }) {
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

export default ProductContent;
