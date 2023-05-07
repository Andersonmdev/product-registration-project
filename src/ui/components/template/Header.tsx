import { useRouter } from 'next/router';

export function Header() {
  const { route } = useRouter();

  const getTitle = () => {
    switch (route) {
      case '/':
        return 'Página Inicial';
      case '/products':
        return 'Produtos';
      case '/suppliers':
        return 'Fornecedores';
      default:
        return '';
    }
  };

  return (
    <header className="flex items-center justify-center h-16 px-4 bg-[#063c7b]">
      <span className="text-white font-bold text-xl">{getTitle()}</span>
    </header>
  );
}
