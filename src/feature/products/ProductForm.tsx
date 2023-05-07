import { Input } from '@/ui/components/inputs/Input';
import { Select } from '@/ui/components/inputs/Select';
import { ProductFormError, ProductFormInputs } from '@/pages/products';

interface ProductFormProps {
  form: ProductFormInputs;
  formErrors: ProductFormError[];
  setForm: (_form: ProductFormInputs) => void;
  setFormErrors: (_formErrors: ProductFormError[]) => void;
}

export function ProductForm({ form, setForm, formErrors, setFormErrors }: ProductFormProps) {
  return (
    <form>
      <div className='flex flex-col my-1 justify-between space-y-4'>
        <div className='flex space-x-2'>
          <Input
            required
            placeholder="Descrição"
            value={form.name}
            onChange={(event: any) => {
              if (formErrors.find(error => error.id === 'name')) {
                setFormErrors(formErrors.filter(error => error.id !== 'name'));
              }
              setForm({ ...form, name: event.target.value });
            }}
            errorMessage={formErrors.find(error => error.id === 'name')?.message}
          />
          <Input
            required
            type="text"
            placeholder="Marca"
            errorMessage={formErrors.find(error => error.id === 'brand')?.message}
            value={form.brand}
            onChange={(event: any) => {
              if (formErrors.find(error => error.id === 'brand')) {
                setFormErrors(formErrors.filter(error => error.id !== 'brand'));
              }
              setForm({ ...form, brand: event.target.value });
            }}
          />
        </div>
        <Select
          options={['Unidade', 'Quilograma', 'Metro']}
          onChange={(value: string) => setForm({ ...form, unit: value })}
        />
        <Input
          required={form.photo === ''}
          type="file"
          placeholder={
            form.photo ?
              form.photo.split('\\')[form.photo.split('\\').length - 1] :
              'Clique para selecionar a foto do produto'
          }
          onChange={(event: any) => {
            if (formErrors.find(error => error.id === 'photo')) {
              setFormErrors(formErrors.filter(error => error.id !== 'photo'));
            }
            setForm({ ...form, photo: event.target.value });
          }}
          errorMessage={formErrors.find(error => error.id === 'photo')?.message}
        />
      </div>
    </form>
  );
}
