
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import FileUploader from '../fileUploading/fileUploading';

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [error, setError] = useState('');

  const handleAddProduct = async () => {
    try {
      if (!uploadCompleted) {
        setError('Please wait for the file(s) to finish uploading');
        return;
      }

      if (!title || !price || !description || images.length === 0) {
        setError('Please fill in all fields and upload at least one image');
        return;
      }

      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          price,
          description,
          images,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const data = await response.json();
      console.log('Product added:', data);

      // Clear input fields after successfully adding a product
      setTitle('');
      setPrice('');
      setDescription('');
      setImages([]);
      setUploadCompleted(false);
      setError('');
    } catch (error) {
      console.error('Error adding product:', error.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-4">Add New Product</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block font-bold">Title:</label>
        <Input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block font-bold">Price:</label>
        <Input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      
      <div className="mb-4">
        <label htmlFor="images" className="block font-bold">Images:</label>
        <FileUploader setImages={setImages} onUploadComplete={() => setUploadCompleted(true)} />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block font-bold">Description:</label>
        <Input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="flex justify-center">
        <Button onClick={handleAddProduct}>Add Product</Button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default AddProduct;
