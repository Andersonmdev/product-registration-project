interface ProductsListProps {
  products: string[];
  selectedProducts: string[];
  handleChecked: (_product: string) => void;
}
export function ProductsList({ products, selectedProducts, handleChecked }: ProductsListProps) {
  return (
    <ul className="w-full overflow-y-auto max-h-40">
      {
        products.map((product) => {
          return (
            <li key={`${Math.random()}-${product}`}>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-5 w-5"
                  checked={selectedProducts.includes(product)}
                  value={product}
                  onChange={() => handleChecked(product)}
                />
                <span className="ml-2 text-gray-700">{product}</span>
              </div>
            </li>
          );
        })
      }
    </ul>
  );
}
