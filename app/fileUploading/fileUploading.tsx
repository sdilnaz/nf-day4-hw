
import React, { useState } from 'react';
import { axiosInstance } from '../api/apiClient';
import './FileUploading.css';

function FileUploader({ setImages, onUploadComplete }: { setImages: (images: string[]) => void, onUploadComplete: () => void }) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [loadedBytes, setLoadedBytes] = useState(0);
  const [totalBytes, setTotalBytes] = useState(0);

  const uploadFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const uploadedImages: string[] = [];

    const uploadFile = (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      axiosInstance.post('files/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const loaded = progressEvent.loaded;
          const total = progressEvent.total;
          setLoadedBytes(loaded);
          setTotalBytes(total);
          const percent = (loaded / total) * 100;
          setUploadProgress(Math.round(percent));
          setStatus(Math.round(percent) + "% uploaded...");
        }
      })
      .then((response) => {
        setStatus("Upload successful!");
        setUploadProgress(100);
        console.log(response.data);
        uploadedImages.push(response.data.url); // Assuming the response contains the URL of the uploaded image
        if (uploadedImages.length === files.length) {
          setImages(uploadedImages);
          onUploadComplete(); // Call the onUploadComplete callback when all files are uploaded
        }
      })
      .catch((error) => {
        setStatus("Upload failed!");
        console.error(error);
      });
    };

    Array.from(files).forEach(uploadFile);
  };

  return (
    <div className="file-uploader-container">
      <input type="file" name="file" onChange={uploadFiles} multiple />
      <label>
        File progress: <progress value={uploadProgress} max="100" />
      </label>
      <p>{status}</p>
    </div>
  );
}

export default FileUploader;
