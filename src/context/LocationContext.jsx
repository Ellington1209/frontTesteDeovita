import React, { createContext, useState, useEffect } from 'react';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [estado, setEstado] = useState([]);
  const [cidade, setCidade] = useState([]);
  const [idEstado, setIdEstado] = useState('');

  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then((response) => response.json())
      .then((data) => setEstado(data));
  }, []);

  useEffect(() => {
    if (idEstado) {
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idEstado}/municipios`)
        .then((response) => response.json())
        .then((data) => setCidade(data));
    }
  }, [idEstado]);

  return (
    <LocationContext.Provider value={{ estado, cidade, setIdEstado }}>
      {children}
    </LocationContext.Provider>
  );
};
