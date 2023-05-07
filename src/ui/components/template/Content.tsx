interface MainContainerProps {
  children?: React.ReactNode;
}

export function Content({ children }: MainContainerProps) {
  return (
    <main className='flex flex-col flex-grow p-2'>
      {children}
    </main>
  );
}
