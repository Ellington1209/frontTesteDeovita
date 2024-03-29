import { Box, Paper, TextField, Button, Grid, FormLabel, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';
import React, { useState } from 'react';
import Logo from '../../../image/logoSemFundo.png'
import { PatternFormat } from 'react-number-format';


import { useDispatch } from 'react-redux';
import { changeloading } from '../../../store/actions/loading.action';
import UsersService from '../../../services/UsersService';


function ConsultaCliente({onClientesChange}) {
  const [filtro, setFiltro] = useState({
    cpf: '',
    nome: '',
    data_nascimento: '',
    sexo: '',
    estado: '',
    cidade: ''
  });

  const dispatch = useDispatch();


  const handleSearch = async () => {
    dispatch(changeloading({ open: true, msg:'carregando..' }));
    try {
      const result = await UsersService.getPagination(filtro, 'client');        
      const clientes = Array.isArray(result.clientes) ? result.clientes : [];
      onClientesChange(clientes); // Passa uma matriz de clientes
      dispatch(changeloading({ open: false }));
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  return (
    <Box  >
      <Box marginBottom='-20px'>
        <img src={Logo} alt="Logo" />
      </Box>
      <Box component={Paper} elevation={3} padding={2}  >
        <Typography variant='h3' sx={{ color: '#01579b' }}>Consulta cliente</Typography>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              name="nome"
              label="Nome"
              variant="outlined"
              fullWidth
              size="small"
              value={filtro.nome}
              onChange={(e) => setFiltro({ ...filtro, nome: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <PatternFormat
              label='CPF'
              format='###.###.###-##'
              isAllowed={(values) => {
                const { formattedValue } = values;
                return !formattedValue || formattedValue.length <= 14;
              }}
              fullWidth
              size='small'
              customInput={TextField}
              value={filtro.cpf}
              onChange={(e) => setFiltro({ ...filtro, cpf: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={3}>
            <TextField
              label='Data Nascimento'
              variant='outlined'
              InputLabelProps={{ shrink: true, }}
              fullWidth
              size='small'
              type='date'
              value={filtro.data_nascimento}
              onChange={(e) => setFiltro({ ...filtro, data_nascimento: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
            <Grid container alignItems="center">
              <FormLabel >Sexo:  </FormLabel>
              <RadioGroup row onChange={(e) => setFiltro({ ...filtro, sexo: e.target.value })}>
                <FormControlLabel sx={{ marginLeft: '5px' }} value="m" control={<Radio />} label="Masculino" />
                <FormControlLabel value="f" control={<Radio />} label="Feminino" />
              </RadioGroup>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={5}>
            <TextField
              label='Estado'
              variant='outlined'
              fullWidth
              size='small'
              value={filtro.estado}
              onChange={(e) => setFiltro({ ...filtro, estado: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={5}>
            <TextField
              label='Cidade'
              variant='outlined'
              fullWidth
              size='small'
              value={filtro.cidade}
              onChange={(e) => setFiltro({ ...filtro, cidade: e.target.value })}
            />
          </Grid>


          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Button onClick={() => handleSearch()} fullWidth variant="contained" color="primary">Pesquisar</Button>
          </Grid>
        </Grid>
      </Box>    
    </Box>
  );
}

export default ConsultaCliente;
