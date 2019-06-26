import React from "react";
import "../../styles/Section.css"

export default function Section({date, category, amount}){
    return(
        <tr>
            <td className="tab">{date}</td>
            <td className="tab">{category}</td>
            <td className="tab">$ {amount}</td>
        </tr>
    )
} 