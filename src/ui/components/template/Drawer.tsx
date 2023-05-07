import Link from 'next/link';

export function Drawer() {
  return (
    <div className="flex flex-col bg-gray-800">
      <div className="flex flex-col flex-grow justify-between">
        <nav className="flex-1 p-2">
          <Link
            href="/"
            className='block text-lg p-3 rounded-md font-medium text-white hover:bg-gray-700'
          >
            Início
          </Link>
          <Link
            href="/products"
            className='block text-lg p-3 rounded-md font-medium text-white hover:bg-gray-700'>Produtos</Link>
          <Link
            href="/suppliers"
            className='block text-lg p-3 rounded-md font-medium text-white hover:bg-gray-700'>Fornecedores</Link>
        </nav>
        <div className="flex justify-center p-4 bg-gray-900">
          <a
            target="_blank"
            href="https://github.com/Andersonmdev"
            className="text-blue-500 font-medium hover:text-blue-200">
            Feito com ❤ por Anderson
          </a>
        </div>
      </div>
    </div>
  );
}
