import Modal from 'react-modal';
import { Button } from '../inputs/Button';

interface DialogProps {
  open: boolean;
  title: string;
  children?: React.ReactNode;
  onAfterOpen: () => void;
  onRequestClose: () => void;
  onRequestConfirm: () => void;
}

export function Dialog(props: DialogProps) {
  return (
    <Modal
      isOpen={props.open}
      ariaHideApp={false}
      onAfterOpen={props.onAfterOpen}
      onRequestClose={props.onRequestClose}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '50%',
          width: '100%',
          maxHeight: 'auto',
          overflow: 'auto',
          padding: '2rem',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <div className='flex flex-col'>
        <h1 className='text-xl text-center mb-4'>{props.title}</h1>
        {props.children}
        <div className='flex space-x-3 mt-6 self-end'>
          <Button width='w-32' outline onClick={props.onRequestClose}>Fechar</Button>
          <Button width='w-32' onClick={props.onRequestConfirm}>Salvar</Button>
        </div>
      </div>
    </Modal>
  );
}
