import { useState } from 'react';
import { useSuppliers } from '@/state/hooks/useSuppliers';
import { Page } from '@/ui/components/template/Page';
import { Button } from '@/ui/components/inputs/Button';
import { Table } from '@/ui/components/data-display/Table';
import { SupplierModal } from '@/feature/suppliers/SupplierModal';

export interface SupplierFormInputs {
  name: string;
  cnpj: string;
  zipCode: string;
  street: string;
  district: string;
  number: string;
  city: string;
  state: string;
  phone: string;
  products: string[];
}

export interface SupplierFormError {
  id: string;
  message: string;
}

const DEFAULT_FORM: SupplierFormInputs = {
  name: '',
  cnpj: '',
  zipCode: '',
  street: '',
  district: '',
  number: '',
  city: '',
  state: '',
  phone: '',
  products: [],
};

export default function Suppliers() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [form, setForm] = useState<SupplierFormInputs>(DEFAULT_FORM);
  const [formErrors, setFormErrors] = useState<SupplierFormError[]>([]);

  const { suppliers, setSuppliers } = useSuppliers();

  const resetForm = () => {
    setForm(DEFAULT_FORM);
    setFormErrors([]);
  };

  const isFormValid = () => {
    const errors = [];

    if (!form.name) {
      errors.push({
        id: 'name',
        message: 'Nome do fornecedor é obrigatório',
      });
    }

    if (suppliers.find(s => s.name === form.name)) {
      errors.push({
        id: 'name',
        message: 'Já existe um fornecedor com esse nome',
      });
    }

    if (!form.cnpj) {
      errors.push({
        id: 'cnpj',
        message: 'CNPJ do fornecedor é obrigatório',
      });
    }

    if (suppliers.find(s => s.cnpj === form.cnpj)) {
      errors.push({
        id: 'cnpj',
        message: 'Já existe um fornecedor com esse CNPJ',
      });
    }

    if (!form.zipCode) {
      errors.push({
        id: 'zipCode',
        message: 'CEP do fornecedor é obrigatório',
      });
    }

    if (!form.phone) {
      errors.push({
        id: 'phone',
        message: 'Telefone do fornecedor é obrigatório',
      });
    }

    if (form.products.length === 0) {
      errors.push({
        id: 'products',
        message: 'Selecione ao menos um produto',
      });
    }

    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleFormSubmit = () => {
    if (isFormValid()) {
      setSuppliers([...suppliers, form]);
      setForm(DEFAULT_FORM);
      setIsModalOpen(false);
    }
  };

  return (
    <Page>
      <Button width='w-48' onClick={() => setIsModalOpen(true)}>Cadastrar Fornecedor</Button>
      <SupplierModal
        open={isModalOpen}
        form={form}
        setForm={setForm}
        formErrors={formErrors}
        setFormErrors={setFormErrors}
        onAfterOpen={() => setIsModalOpen(true)}
        onRequestClose={() => {
          resetForm();
          setIsModalOpen(false);
        }}
        onRequestConfirm={handleFormSubmit}
      />
      {
        suppliers.length > 0 ? (
          <Table
            rows={suppliers.map(s => [s.name, s.cnpj, s.zipCode, s.phone])}
            columns={['Nome', 'CNPJ', 'CEP', 'Telefone']}
          />
        ) : (
          <div className='mt-2'>
            {'Nenhum fornecedor cadastrado, clique em "Cadastrar Fornecedor"'}
          </div>
        )
      }
    </Page>
  );
}
