import { useContext } from 'react';
import { SupplierContext } from '../context/supplierContext';

export const useSuppliers = () => useContext(SupplierContext);
