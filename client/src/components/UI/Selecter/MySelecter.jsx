import React from "react";

const MySelecter = (props) => {
    return(
        <select {...props}  onChange={event => props.onChange(event.target.value)} >
                {props.options.map(option => 
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                )}
        </select>
    )
};

export default MySelecter;