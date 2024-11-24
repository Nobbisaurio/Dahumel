import React from 'react';

interface FileUploaderProps {
  onFileLoad: (fuerza: number[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileLoad }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;
      const fuerza = content
        .split('\n')
        .map(line => parseFloat(line.trim()))
        .filter(value => !isNaN(value));

      onFileLoad(fuerza);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" accept=".dat" onChange={handleFileChange} />
      <p>Carga un archivo .dat con valores de fuerza.</p>
    </div>
  );
};

export default FileUploader;
