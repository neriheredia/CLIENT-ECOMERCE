import { useEffect } from 'react';
import { useState } from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';
// import { popularProducts } from "../data";
import Product from '../Product/Product';
import axios from 'axios';
import { Container, ContainerProd, Arrow } from './Products.style';
import s from '../../pages/Favorites/favorites.module.css';

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [productForPage] = useState(8);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const indexLast = page * productForPage;
  const indexFirst = indexLast - productForPage;
  const allProductsForPage = products.slice(indexFirst, indexLast);
  const allProducts = products.length;
  let pagesNumber = [];

  filteredProducts.sort((a, b) => {
    if (sort === 'desc' && b.price > a.price) {
      return 1;
    } else if (sort === 'desc' && b.price < a.price) {
      return -1;
    } else {
      return 0;
    }
  });
  filteredProducts.sort((a, b) => {
    if (sort === 'asc' && a.price > b.price) {
      return 1;
    } else if (sort === 'asc' && a.price < b.price) {
      return -1;
    } else {
      return 0;
    }
  });

  function onPage(value) {
    setPage(value);
  }

  for (let i = 1; i <= Math.ceil(allProducts / productForPage); i++) {
    pagesNumber.push(i);
  }

  const handleClickPrev = () => {
    if (page !== 1) setPage(page - 1);
  };

  const handleClickNext = () => {
    if (page !== Math.ceil(allProducts / productForPage)) setPage(page + 1);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `https://back-ecomerce.vercel.app/api/products?category=${cat}`
            : 'https://back-ecomerce.vercel.app/api/products'
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);
  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([Key, value]) =>
            item[Key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  return (
    <>
      {products ? (
        <Container>
          <ContainerProd>
            <Arrow>
              <ArrowLeftOutlined onClick={() => handleClickPrev()} />
            </Arrow>
            {pagesNumber.map((number) => {
              return (
                <Arrow key={number} onClick={() => onPage(number)}>
                  {number}
                </Arrow>
              );
            })}
            <Arrow>
              <ArrowRightOutlined onClick={() => handleClickNext()} />
            </Arrow>
          </ContainerProd>
          <ContainerProd>
            {cat
              ? filteredProducts.map((item) => (
                  <Product item={item} key={item._id} />
                ))
              : allProductsForPage.map((item) => (
                  <Product item={item} key={item._id} />
                ))}
          </ContainerProd>
        </Container>
      ) : (
        <div className={s.containerH3}>
          <h3 className={s.h3}>Favorites is empty</h3>
        </div>
      )}
    </>
  );
};

export default Products;
