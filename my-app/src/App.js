import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableRows from "./components/TableRows";

function App() {
    const [colors, setColors] = useState([]);
    const [foundColors, setFoundColors] = useState([]);
    const [number, setNumber] = useState(1);
    const [colorPerPage] = useState(5);
    const [id, setId] = useState('');

    useEffect(() => {
        axios.get(`https://reqres.in/api/products`)
            .then((response) => {
                setColors(response.data.data);
            })
            .catch((error) => {
                alert(error);
            })
    }, [])

    const lastColor = number * colorPerPage;
    const firstColor = lastColor - colorPerPage;
    const currentColor = colors.slice(firstColor, lastColor);
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(colors.length / colorPerPage); i++) {
        pageNumber.push(i);
    }

    const ChangePage = (pageNumber) => {
        setNumber(pageNumber);
    };

    const filter = (e) => {
        const value = e.target.value.replace(/\D/g, "");

        if (value !== '') {
            const results = colors.filter((product) => {
                return product.id === Math.floor(value);
            });
            setFoundColors(results);
        } else {
            setFoundColors(colors.data);
        }
        setId(value);
    };

    return (
        <div className="container">
            <div className="header">
                <input
                    type="search"
                    value={id}
                    onChange={filter}
                    className="input"
                    placeholder="Szukaj po numerze ID"
                />
                <div className="picasso-logo"> </div>
            </div>
            <table className="color-list">
                <thead>
                    <tr className="colors">
                        <th className="color-id">Id</th>
                        <th className="color-name-header">Nazwa</th>
                        <th> </th>
                        <th className="color-year">Rok</th>
                    </tr>
                </thead>
                <tbody>
                {foundColors && foundColors.length > 0 ? (
                    foundColors.map((color) => (
                        <TableRows id={color.id}
                                   name={color.name}
                                   year={color.year}
                                   color={color.color}
                                   pantone={color.pantone_value}
                        />
                    ))
                ) : (
                    currentColor.map((color) => (
                        <TableRows id={color.id}
                                   name={color.name}
                                   year={color.year}
                                   color={color.color}
                                   pantone={color.pantone_value}
                        />
                    ))
                )}
                </tbody>
            </table>
            <div className="pagination-buttons">
                <div>
                    {number !== 1 ? (
                        <button className="pagination-button" onClick={() => setNumber(number - 1)}>
                            <div className="previous-icon"> </div> Poprzednia
                        </button>
                    ) : (
                        <button className="pagination-button" disabled>
                            <div className="previous-icon"> </div> Poprzednia
                        </button>
                    )}
                </div>
                {pageNumber.map((number) => (
                    <button className="pagination-button page-number" onClick={() => ChangePage(number)}>
                        {number}
                    </button>
                ))}
                <div>
                    {number === 1 ? (
                        <button className="pagination-button" onClick={() => setNumber(number + 1)}>
                            Następna <div className="next-icon"> </div>
                        </button>
                    ) : (
                        <button className="pagination-button" disabled>
                            Następna <div className="next-icon"> </div>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
