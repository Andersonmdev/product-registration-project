import { useState } from 'react';
import { useProducts } from '@/state/hooks/useProducts';
import { Page } from '@/ui/components/template/Page';
import { Button } from '@/ui/components/inputs/Button';
import { Table } from '@/ui/components/data-display/Table';
import { ProductModal } from '@/feature/products/ProductModal';

export interface ProductFormInputs {
  name: string;
  brand: string;
  unit: string;
  photo: string;
}

export interface ProductFormError {
  id: string;
  message: string;
}

const DEFAULT_FORM = {
  name: '',
  brand: '',
  unit: 'Unidade',
  photo: '',
};

export default function Products() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [form, setForm] = useState<ProductFormInputs>(DEFAULT_FORM);
  const [formErrors, setFormErrors] = useState<ProductFormError[]>([]);

  const { products, setProducts } = useProducts();

  const resetForm = () => {
    setForm(DEFAULT_FORM);
    setFormErrors([]);
  };

  const isFormValid = () => {
    const errors = [];

    if (!form.name) {
      errors.push({
        id: 'name',
        message: 'Nome do produto é obrigatório',
      });
    }

    if (products.find(product => product.name === form.name)) {
      errors.push({
        id: 'name',
        message: 'Já existe um produto com esse nome',
      });
    }

    if (!form.brand) {
      errors.push({
        id: 'brand',
        message: 'Marca do produto é obrigatório',
      });
    }

    if (!form.photo) {
      errors.push({
        id: 'photo',
        message: 'Nenhuma foto foi selecionada',
      });
    }

    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleFormSubmit = () => {
    if (isFormValid()) {
      setIsModalOpen(false);
      setProducts([...products, form]);
      setForm({ name: '', brand: '', unit: 'Unidade', photo: '' });
    }
  };

  return (
    <Page>
      <Button width='w-44' onClick={() => setIsModalOpen(true)}>Cadastrar Produto</Button>
      <ProductModal
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
        products.length > 0 ? (
          <Table
            rows={products.map(product => [product.name, product.brand, product.unit])}
            columns={['Nome', 'Marca', 'Unidade']}
          />
        ) : (
          <div className='mt-2'>
            {'Nenhum produto cadastrado, clique em "Cadastrar Produto"'}
          </div>
        )
      }
    </Page>
  );
}
