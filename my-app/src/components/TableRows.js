import React from "react";
import DetailsModal from "./Modal";

const TableRows = (props) => {
    return (
        <>
            <tr key={props.id}
                className="colors"
                style={{background: 'linear-gradient(to left, transparent 30%,' + props.color + ')'}}
            >
                <td className="color-id">{props.id}</td>
                <td className="color-name">{props.name}</td>
                <td>
                    <DetailsModal name={props.name}
                                  year={props.year}
                                  pantone={props.pantone}
                                  color={props.color}
                    />
                </td>
                <td className="color-year">{props.year}</td>
            </tr>
        </>
    );
};

export default TableRows;


