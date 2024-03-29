import React, { useState } from 'react';
import TableCliente from './TableCliente';
import ConsultaCliente from './ConsultaCliente';
import { Box, Paper } from '@mui/material';

function Consulta() {
  const [clientes, setClientes] = useState([]);
  console.log('componente pai',clientes)

  return (
    <Box component={Paper} elevation={5} sx={{ flexGrow: 1 }} marginTop={1} padding={2} >
      <Box>
        <ConsultaCliente onClientesChange={setClientes} />
      </Box>
      <Box marginTop={5}>        
        <TableCliente  clientes={clientes} />
      </Box>
    </Box>
  );
}

export default Consulta;
