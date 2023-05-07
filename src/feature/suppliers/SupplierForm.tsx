import superagent from 'superagent';
import { useEffect, useState } from 'react';
import { Input } from '@/ui/components/inputs/Input';
import { ProductsList } from './ProductsList';
import { useProducts } from '@/state/hooks/useProducts';
import { applyCnpjMask } from '@/utils/applyCnpjMask';
import { applyPhoneMask } from '@/utils/applyPhoneMask';
import { applyNumberMask } from '@/utils/applyNumberMask';
import { applyZipCodeMask } from '@/utils/applyZipCodeMask';
import { SupplierFormError, SupplierFormInputs } from '@/pages/suppliers';

interface SupplierFormProps {
  form: SupplierFormInputs;
  formErrors: SupplierFormError[];
  setForm: (_form: SupplierFormInputs) => void;
  setFormErrors: (_formErrors: SupplierFormError[]) => void;
}

interface ViacepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export function SupplierForm({ form, setForm, formErrors, setFormErrors }: SupplierFormProps) {
  const { products } = useProducts();
  const [canFetch, setCanFetch] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      if (form.zipCode && form.zipCode.length === 9 && canFetch) {
        try {
          const res = await superagent.get(`http://viacep.com.br/ws/${form.zipCode}/json`);
          const data: ViacepResponse = res.text && JSON.parse(res.text);
          if (data.logradouro && data.bairro && data.localidade && data.uf) {
            setForm({
              ...form,
              street: data.logradouro,
              district: data.bairro,
              city: data.localidade,
              state: data.uf,
            });
            setCanFetch(false);
          }
        } catch (error) { }
      } else {
        if (!canFetch) setCanFetch(true);
      }
    })();
  }, [form]);

  return (
    <form>
      <div className='flex flex-col my-1 justify-between space-y-4'>
        <div className='flex space-x-2'>
          <Input
            required
            placeholder="Nome"
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
            placeholder="CNPJ"
            value={form.cnpj}
            onChange={(event: any) => {
              if (formErrors.find(error => error.id === 'cnpj')) {
                setFormErrors(formErrors.filter(error => error.id !== 'cnpj'));
              }
              const cnpj = applyCnpjMask(event.target.value);
              setForm({ ...form, cnpj });
            }}
            errorMessage={formErrors.find(error => error.id === 'cnpj')?.message}
          />
        </div>
        <div className='flex space-x-2'>
          <Input
            required
            width='w-1/4'
            placeholder="CEP"
            value={form.zipCode}
            onChange={(event: any) => {
              if (formErrors.find(error => error.id === 'zipCode')) {
                setFormErrors(formErrors.filter(error => error.id !== 'zipCode'));
              }
              const zipCode = applyZipCodeMask(event.target.value);
              setForm({ ...form, zipCode });
            }}
            errorMessage={formErrors.find(error => error.id === 'zipCode')?.message}
          />
          <Input
            placeholder="Rua"
            value={form.street}
            onChange={(event: any) => {
              if (formErrors.find(error => error.id === 'street')) {
                setFormErrors(formErrors.filter(error => error.id !== 'street'));
              }
              setForm({ ...form, street: event.target.value });
            }}
            errorMessage={formErrors.find(error => error.id === 'street')?.message}
          />
          <Input
            width='w-1/5'
            placeholder="Número"
            value={form.number}
            onChange={(event: any) => {
              if (formErrors.find(error => error.id === 'number')) {
                setFormErrors(formErrors.filter(error => error.id !== 'number'));
              }
              const number = applyNumberMask(event.target.value);
              setForm({ ...form, number });
            }}
            errorMessage={formErrors.find(error => error.id === 'number')?.message}
          />
        </div>
        <div className='flex space-x-2'>
          <Input
            width='w-1/3'
            placeholder="Bairro"
            value={form.district}
            onChange={(event: any) => {
              if (formErrors.find(error => error.id === 'district')) {
                setFormErrors(formErrors.filter(error => error.id !== 'district'));
              }
              setForm({ ...form, district: event.target.value });
            }}
            errorMessage={formErrors.find(error => error.id === 'district')?.message}
          />
          <Input
            placeholder="Cidade"
            value={form.city}
            onChange={(event: any) => {
              if (formErrors.find(error => error.id === 'city')) {
                setFormErrors(formErrors.filter(error => error.id !== 'city'));
              }
              setForm({ ...form, city: event.target.value });
            }}
            errorMessage={formErrors.find(error => error.id === 'city')?.message}
          />
          <Input
            width='w-1/3'
            placeholder="Estado"
            value={form.state}
            onChange={(event: any) => {
              if (formErrors.find(error => error.id === 'state')) {
                setFormErrors(formErrors.filter(error => error.id !== 'state'));
              }
              setForm({ ...form, state: event.target.value });
            }}
            errorMessage={formErrors.find(error => error.id === 'state')?.message}
          />
        </div>
        <Input
          required
          width='w-1/2'
          placeholder="Telefone"
          value={form.phone}
          onChange={(event: any) => {
            if (formErrors.find(error => error.id === 'phone')) {
              setFormErrors(formErrors.filter(error => error.id !== 'phone'));
            }
            const phone = applyPhoneMask(event.target.value);
            setForm({ ...form, phone });
          }}
          errorMessage={formErrors.find(error => error.id === 'phone')?.message}
        />
        {
          products.length > 0 ? (
            <div>
              <p className='mb-2'>Selecione os produtos do fornecedor:</p>
              <ProductsList
                products={products.map(p => p.name)}
                selectedProducts={form.products}
                handleChecked={(product: string) => {
                  if (form.products.includes(product)) {
                    setForm({ ...form, products: form.products.filter(p => p !== product) });
                  } else {
                    setForm({ ...form, products: [...form.products, product] });
                  }
                }}
              />
              {
                formErrors.find(error => error.id === 'products') && (
                  <div className="mt-2">
                    <p className="text-xs text-red-500">{formErrors.find(error => error.id === 'products')?.message}</p>
                  </div>
                )
              }
            </div>
          ) : (
            <p className='text-xs text-red-500'>
              Não há produtos cadastrados, para criar um fornecedor primeiro cadastre ao menos um produto
            </p>
          )
        }
      </div>
    </form>
  );
}
