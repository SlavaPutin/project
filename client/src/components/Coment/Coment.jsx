import React from "react";
import './coment.css'
import OneComent from "./OneComents";
import { observer } from "mobx-react-lite";

const Coments = observer(({coments}) => {
    return(
        <div className="wrap-coments">
            <div className="wrap-coments-content">
                <div className="wrap-coments2">
                    {coments.map(coment => (
                        <OneComent coment={coment} key={coment.id}/>
                    ))}
                </div>
            </div>
        </div>
    )
})

export default Coments