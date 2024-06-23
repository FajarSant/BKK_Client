"use client"
import React, { useState } from 'react';
import axios from 'axios';

const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [penggunaId, setPenggunaId] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('gambar', file as Blob);
    formData.append('penggunaId', penggunaId);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Response:', response.data);
      alert('Gambar berhasil diunggah');
    } catch (error) {
      console.error('Error saat mengunggah gambar:', error);
      alert('Gagal mengunggah gambar');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="gambar">Pilih gambar:</label>
        <input
          type="file"
          id="gambar"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
      </div>
      <div>
        <label htmlFor="penggunaId">ID Pengguna:</label>
        <input
          type="text"
          id="penggunaId"
          value={penggunaId}
          onChange={(e) => setPenggunaId(e.target.value)}
          required
        />
      </div>
      <button type="submit">Unggah Gambar</button>
    </form>
  );
};

export default UploadForm;
