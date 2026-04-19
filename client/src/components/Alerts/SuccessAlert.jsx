import React from "react";

const SuccessAlert = ({children}) => {
    return(
        <div className="wrap-success-alert">
            <span>{children}</span>
        </div>
    )
}

export default SuccessAlert;