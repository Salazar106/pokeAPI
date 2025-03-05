import { useState } from 'react';

export function useFileUpload() {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file.name);
    }
  };

  return {
    uploadedFile,
    handleFileUpload,
  };
}
