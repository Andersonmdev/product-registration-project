import '@/ui/styles/globals.css';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import { ProductProvider } from '@/state/context/productContext';
import { SupplierProvider } from '@/state/context/supplierContext';

const roboto = Roboto({ weight: ['100', '300', '400', '500', '700', '900'], subsets: [] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProductProvider>
      <SupplierProvider>
        <main className={roboto.className}>
          <Component {...pageProps} />
        </main>
      </SupplierProvider>
    </ProductProvider>
  );
}
