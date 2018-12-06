import React from 'react' // for IntelliSense. delete for production

export default {
    overlay: {
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
    wrapper: {
        height: "67%",
        alignSelf: "center"
    },
    modal: {
        overflow: "hidden"
    },
    header: {
        display: "flex", 
        justifyContent: "space-between", 
        padding: "10px 20px",
        marginBottom: "20px",
        backgroundColor: "rgb(55,55,55)"
    },
    title: {
        color: "whitesmoke"
    },
    footer: {
        display: "flex", 
        justifyContent: "flex-end",
        padding: "10px 40px 20px 20px",
        paddingRight: "40px",
        backgroundColor: "teal",
        marginTop: "20px"
    },
    buttonContainer: {
        width: "66%",
        display: "flex", 
        justifyContent: "space-around",
    },
    submit: {
        color: "black",
        backgroundColor: "rgb(255, 202, 56)",
        border: "none",
        padding: "12px 15px",
        borderRadius: "6px",
        cursor: "pointer"
    },
};
