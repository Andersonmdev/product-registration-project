import { Drawer } from './Drawer';
import { Header } from './Header';
import { Content } from './Content';

interface PageProps {
  children?: React.ReactNode;
}

export function Page({ children }: PageProps) {
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='flex flex-auto'>
        <Drawer />
        <Content>
          {children}
        </Content>
      </div>
    </div>
  );
}
