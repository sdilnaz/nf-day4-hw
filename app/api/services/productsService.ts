// /services/productsService.ts
import { axiosInstance } from "../apiClient";
import axios from "axios";

const productsService = {
  fetchAll: async () => {
    const response = await axiosInstance.get('/products');
    return response.data;
  },
  create: async (product: any) => {
    const response = await axiosInstance.post('/products', product);
    return response.data;
  },
  uploadImage: async (image: File) => {
    const formData = new FormData();
    formData.append('file', image);

    const response = await axios.post('https://fakeapi.platzi.com/v1/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default productsService;
