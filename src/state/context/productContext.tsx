import { createContext, useMemo, useState } from 'react';

export interface Product {
  name: string;
  brand: string;
  unit: string;
  photo: string;
}

interface ProductContextData {
  products: Product[];
  setProducts: (_products: Product[]) => void;
}

export const ProductContext = createContext<ProductContextData>({} as ProductContextData);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<any[]>([]);

  const value = useMemo(() => {
    return {
      products,
      setProducts,
    };
  }, [products]);

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}
