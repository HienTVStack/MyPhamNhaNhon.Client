import NumberFormat from "react-number-format";

function FormatNumber({ number }) {
    return (
        <NumberFormat
            value={number}
            displayType="text"
            thousandSeparator={true}
            suffix={" đ"}
            renderText={(value, props) => (
                <div style={{ display: "inline" }} {...props}>
                    {value}
                </div>
            )}
        />
    );
}

export default FormatNumber;
