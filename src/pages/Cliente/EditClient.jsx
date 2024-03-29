import React, { useEffect, useState } from 'react';
import { Box, Button, FormControlLabel, FormLabel, Grid, MenuItem, Paper, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';




import { useDispatch } from 'react-redux';
import { PatternFormat } from 'react-number-format'
import { changeloading } from '../../store/actions/loading.action';
import { MaskNome } from '../../utils/mascaras';
import Logo from '../../image/logoSemFundo.png'
import UsersService from '../../services/UsersService';
import { changeNotify } from '../../store/actions/notify.actions';
import { useLocation, useNavigate } from 'react-router-dom';


function EditClient() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const client = location.state ? location.state.client : null;

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [sexo, setSexo] = useState('');
  const [endereco, setEndereco] = useState('');
  const [estadoSelecionado, setEstadoSelecionado] = useState('0');
  const [cidadeSelecionada, setCidadeSelecionada] = useState('0');
  const [estado, setEstado] = useState([]);
  const [cidade, setCidade] = useState([]);
  const [idEstado, setIdEstado] = useState('');

  useEffect(() => {
    if (client) {
      setNome(client.nome || '');
      setCpf(client.cpf || '');
      setDataNascimento(client.data_nascimento || '');
      setSexo(client.sexo || '');
      setEndereco(client.endereco || '');
      setEstadoSelecionado(client.estado || '0');
      setCidadeSelecionada(client.cidade || '0');
    }
  }, [client]);


  
  const handleChangeEstado = (event) => {
    const estadoSelecionado = event.target.value;
    setEstadoSelecionado(estadoSelecionado);

    const estadoEncontrado = estado.find((estado) => estado.sigla === estadoSelecionado);
    if (estadoEncontrado) {
      setIdEstado(estadoEncontrado.id);
    }
  }

  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then((response) => response.json())
      .then((data) => setEstado(data))
  }, []);

  useEffect(() => {    
    if (idEstado) {
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idEstado}/municipios`)
        .then((response) => response.json())
        .then((data) => setCidade(data));
    }
  }, [idEstado]);


  const handleSubmit = async () => {   
    const data = {
      nome,
      cpf,
      data_nascimento: dataNascimento,
      sexo,
      endereco,
      estado: estadoSelecionado,
      cidade: cidadeSelecionada
    };
    try {
     
      await UsersService.Update(client.id, data,'client');
      dispatch(changeloading({ open: false, }))
      dispatch(changeNotify({ open: true, class: 'success', msg: 'Cliente editado com sucesso' }))      
      navigate('/consultacliente');
    } catch (error) {
      dispatch(changeloading({ open: false, }))
      dispatch(changeNotify({ open: true, class: 'error', msg: error.response.data.error }))
    }
  };

  return (
    <Box component={Paper} elevation={5} sx={{ flexGrow: 1 }} marginTop={1} padding={2}  >
      <Box marginBottom='-20px'>
        <img src={Logo} alt="Logo" />
      </Box>

      <Box component={Paper} elevation={1} padding={2}  >
      
          <Grid container spacing={2} >
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <TextField
                label='Nome'
                variant='outlined'
                fullWidth
                size='small'
                InputLabelProps={{ shrink: true, }}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={2}>
              <PatternFormat
                label='CPF'
                format='###.###.###-##'
                isAllowed={(values) => {
                  const { formattedValue } = values;
                  return !formattedValue || formattedValue.length <= 14;
                }}
                fullWidth
                size='small'
                InputLabelProps={{ shrink: true, }}
                customInput={TextField}
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
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
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
              <Grid container alignItems="center">
                <FormLabel >Sexo:  </FormLabel>
                <RadioGroup row onChange={(e) => setSexo(e.target.value)}>
                  <FormControlLabel sx={{ marginLeft: '5px' }} value="M" control={<Radio />} label="Masculino" />
                  <FormControlLabel value="F" control={<Radio />} label="Feminino" />
                </RadioGroup>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={5}>
              <TextField
                label='Endereço'
                variant='outlined'
                fullWidth
                size='small'
                InputLabelProps={{ shrink: true, }}
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3}>
              <Select
                variant='outlined'
                fullWidth
                size='small'
                value={estadoSelecionado}
                onChange={handleChangeEstado}
              >
                <MenuItem value='0'>Selecione o Estado</MenuItem>
                {estado.map((estado) => (
                  <MenuItem key={estado.id} value={estado.sigla}>
                    {estado.nome}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={4}>
              <Select
                variant='outlined'
                fullWidth
                size='small'
                value={cidadeSelecionada}
                onChange={(e) => setCidadeSelecionada(e.target.value)}
                disabled={!idEstado}                
              >
                <MenuItem value='0'>Selecione a Cidade</MenuItem>
                {cidade.map((cidade) => (
                  <MenuItem key={cidade.id} value={cidade.nome}>
                    {cidade.nome}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={5} md={5} lg={8}></Grid>

            <Grid item xs={12} sm={5} md={5} lg={2}>
              <Button onClick={() => handleSubmit()} fullWidth variant='contained'>Editar</Button>
            </Grid>

            <Grid item xs={12} sm={5} md={5} lg={2}>
              <Button color='secondary' onClick={() => navigate(-1)} fullWidth variant='contained'>Voltar</Button>
            </Grid>

          </Grid>
       
      </Box>
    </Box>
  );
}

export default EditClient;