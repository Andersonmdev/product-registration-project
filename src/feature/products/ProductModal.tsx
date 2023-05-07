import { ProductForm } from './ProductForm';
import { Dialog } from '@/ui/components/feedback/Dialog';
import { ProductFormError, ProductFormInputs } from '@/pages/products';

interface ProductModalProps {
  open: boolean;
  form: ProductFormInputs;
  formErrors: ProductFormError[];
  setForm: (_form: ProductFormInputs) => void;
  setFormErrors: (_formErrors: ProductFormError[]) => void;
  onAfterOpen: () => void;
  onRequestClose: () => void;
  onRequestConfirm: () => void;
}

export function ProductModal(props: ProductModalProps) {
  return (
    <Dialog
      open={props.open}
      title='Cadastro de Produto'
      onAfterOpen={props.onAfterOpen}
      onRequestClose={props.onRequestClose}
      onRequestConfirm={props.onRequestConfirm}
    >
      <ProductForm
        form={props.form}
        setForm={props.setForm}
        formErrors={props.formErrors}
        setFormErrors={props.setFormErrors}
      />
    </Dialog>
  );
}
