import { Page } from '@/ui/components/template/Page';

export default function Home() {
  return (
    <Page>
      <div className='flex flex-col flex-grow justify-center items-center'>
        <h1 className='text-5xl mb-4'>Seja bem-vindo</h1>
        <p className='text-lg'>Acesse os Produtos e Fornecedores por meio do menu lateral</p>
      </div>
    </Page>
  );
}
