// /components/ProductList.tsx
'use client';

import { useQuery } from 'react-query';
import productsService from '../api/services/productsService';
import { Product } from '../types/product';

const ProductList = () => {
  const { data, isLoading, error } = useQuery<Product[]>('products', productsService.fetchAll);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching products</div>;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {data?.map((product: Product) => {
        const imageUrl = product.category?.image || '';

        return (
          <div key={product.id} style={{ border: '1px solid #ccc', borderRadius: '8px', margin: '10px', padding: '10px', flexBasis: 'calc(25% - 20px)', minWidth: '250px', overflow: 'hidden', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 'bold' }}>{product.title}</h2>
            <img src={imageUrl} alt={product.title} style={{ width: '200px', height: 'auto', marginBottom: '8px', display: 'block', margin: '0 auto' }} />
            <p style={{ marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Price: {product.price}</p>
            <p style={{ marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Description: {product.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
