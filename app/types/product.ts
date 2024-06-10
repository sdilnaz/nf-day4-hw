//types/product.ts
export interface Product {
    id: number;
    title: string;
    price: string;
    description: string;
    category: Category;
  }
  

  export interface Category {
    id: number;
    name: string;
    image: string;
  }