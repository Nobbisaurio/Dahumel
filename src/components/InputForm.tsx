import React, { useState } from 'react';

interface InputFormProps {
  onSubmit: (params: {
    masa: number;
    rigidez: number;
    amortiguamiento: number;
    frecuencia: number;
    paso: number;
  }) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [inputs, setInputs] = useState({
    masa: 1,
    rigidez: 1,
    amortiguamiento: 0.05,
    frecuencia: 1,
    paso: 0.01,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Verifica que el valor sea un número válido
    const numericValue = parseFloat(value);
    setInputs({
      ...inputs,
      [name]: isNaN(numericValue) ? 0 : numericValue, // Si no es un número, asigna 0
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inputs);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Masa:
        <input
          name="masa"
          type="number"
          value={inputs.masa || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Rigidez:
        <input
          name="rigidez"
          type="number"
          value={inputs.rigidez || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Amortiguamiento:
        <input
          name="amortiguamiento"
          type="number"
          value={inputs.amortiguamiento || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Frecuencia:
        <input
          name="frecuencia"
          type="number"
          value={inputs.frecuencia || ''}
          onChange={handleChange}
        />
      </label>
      <label>
        Paso de Tiempo:
        <input
          name="paso"
          type="number"
          value={inputs.paso || ''}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Calcular</button>
    </form>
  );
};

export default InputForm;
