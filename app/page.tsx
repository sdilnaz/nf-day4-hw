'use client'
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductList from './components/ProductList';
import Header from './components/header'

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header /> {/* Add your header component here */}
        <div className="min-h-screen px-20 py-4">
          <ProductList />
        </div>
    </QueryClientProvider>
  );
}
