import React from 'react' // for IntelliSense. delete for production
const style = {
    overlay : {
        position: "fixed",
        top: "0px",
        left: "0px",
        backgroundColor: "rgba(0,0,0,0.32)",
        width: "100vw",
        height:"100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    header : {
        display: "flex", 
        justifyContent: "space-between", 
        padding: "20px",
    },
    // close : {
    //     float: "right",
    //     backgroundColor: "inherit",
    //     color: "gray",
    //     borderRadius: "5px",
    //     border: "2px solid gray",
    //     fontSize: "1rem",
    //     alignSelf: "center"
    // },
    wrapper: {
        height: "67%",
        alignSelf: "center"
    },
    footer : {
        display: "flex", 
        justifyContent: "flex-end",
        padding: "20px",
        paddingRight: "40px",
        backgroundColor: "teal",
        borderRadius: "0px 0px 10px 10px",
        marginTop: "20px"
    },
    buttonContainer: {
        width: "66%",
        display: "flex", 
        justifyContent: "space-around",
    },
    submit : {
        color: "black",
        backgroundColor: "rgb(255, 202, 56)",
        border: "none",
        padding: "12px 15px",
        borderRadius: "6px"
    },
};

export default style;