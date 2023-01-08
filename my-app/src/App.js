import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DetailsModal from "./components/Modal";

function App(props) {
    const [APIData, setAPIData] = useState([]);
    const [id, setId] = useState('');
    const [foundProducts, setFoundProducts] = useState(APIData);

    useEffect(() => {
        axios.get(`https://reqres.in/api/products`)
            .then((response) => {
                setAPIData(response.data);
            })
            .catch((error) => {
                alert(error);
            })
    }, [])

    const filter = (e) => {
        const value = e.target.value.replace(/\D/g, "");

        if (value !== '') {
            const results = APIData.data.filter((product) => {
                return product.id === Math.floor(value);
            });
            setFoundProducts(results);
        } else {
            setFoundProducts(APIData.data);
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
        <div className="product-list">
            {foundProducts && foundProducts.length > 0 ? (
                foundProducts.map((product) => (
                    <li key={product.id}
                        className="products"
                        style={{background: 'linear-gradient(to left, transparent 30%,' + product.color + ')'}}
                    >
                        <span className="product-id">{product.id}</span>
                        <span className="product-name">{product.name}</span>
                        <DetailsModal name={product.name}
                                      year={product.year}
                                      pantone={product.pantone_value}
                                      color={product.color}
                        />
                        <span className="product-year">{product.year}</span>
                    </li>
                ))
            ) : (
                <div className="no-results">Brak wyników</div>
            )}
        </div>
    </div>
  );
}

export default App;
