import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ProductsResponse } from 'core/types/Product';
import { makeRequest } from 'core/utils/request';
import ProductCard from './components/ProductCard'
import ProductCardLoader from './components/Loaders/ProductCardLoader';
import './styles.scss'

const Catalog = () => {
    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [isLoading, setIsloading] = useState(false);

    const params = {
        page: 0,
        linesPerPage: 12
    }

    useEffect(() => {
        setIsloading(true);
        makeRequest({ url: '/products', params })
            .then(response => setProductsResponse(response.data))
            .finally(() => {
                setIsloading(false);
            })

    }, []);

    return (
        <div className="catalog-container">
            <h1 className="catalog-title">
                Catalogo de Produtos
            </h1>
            <div className="catalog-products">
                {isLoading ? <ProductCardLoader /> : (
                    productsResponse?.content.map(product => (
                        <Link to={`/products/${product.id}`} key={product.id}>
                            <ProductCard product={product} />
                        </Link>
                    )))}
            </div>
        </div>
    );
}

export default Catalog;
