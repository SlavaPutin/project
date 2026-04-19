import React from "react";
import './alerts.css'

const ErrorAlert = ({children}) => {
    return(
        <div className="wrap-error-alert">
            <span>{children}</span>
        </div>
    )
}

export default ErrorAlert;