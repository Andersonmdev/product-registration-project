import { SupplierForm } from './SupplierForm';
import { Dialog } from '@/ui/components/feedback/Dialog';
import { SupplierFormError, SupplierFormInputs } from '@/pages/suppliers';

interface SupplierModalProps {
  open: boolean;
  form: SupplierFormInputs;
  formErrors: SupplierFormError[];
  setForm: (_form: SupplierFormInputs) => void;
  setFormErrors: (_formErrors: SupplierFormError[]) => void;
  onAfterOpen: () => void;
  onRequestClose: () => void;
  onRequestConfirm: () => void;
}

export function SupplierModal(props: SupplierModalProps) {
  return (
    <Dialog
      open={props.open}
      title='Cadastro de Fornecedor'
      onAfterOpen={props.onAfterOpen}
      onRequestClose={props.onRequestClose}
      onRequestConfirm={props.onRequestConfirm}
    >
      <SupplierForm
        form={props.form}
        setForm={props.setForm}
        formErrors={props.formErrors}
        setFormErrors={props.setFormErrors}
      />
    </Dialog>
  );
}
