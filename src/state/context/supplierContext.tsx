import { createContext, useMemo, useState } from 'react';

export interface Suppliers {
  name: string;
  cnpj: string;
  zipCode: string;
  street: string;
  district: string;
  number: string;
  city: string;
  state: string;
  phone: string;
  products: string[];
}

interface SupplierContextData {
  suppliers: Suppliers[];
  setSuppliers: (_suppliers: Suppliers[]) => void;
}

export const SupplierContext = createContext<SupplierContextData>({} as SupplierContextData);

export function SupplierProvider({ children }: { children: React.ReactNode }) {
  const [suppliers, setSuppliers] = useState<any[]>([]);

  const value = useMemo(() => {
    return {
      suppliers,
      setSuppliers,
    };
  }, [suppliers]);

  return (
    <SupplierContext.Provider value={value}>
      {children}
    </SupplierContext.Provider>
  );
}
