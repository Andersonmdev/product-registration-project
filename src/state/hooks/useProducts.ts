import { useContext } from 'react';
import { ProductContext } from '../context/productContext';

export const useProducts = () => useContext(ProductContext);
