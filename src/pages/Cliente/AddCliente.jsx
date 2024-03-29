import React, { useEffect, useState } from 'react';
import { Box, Button, FormControlLabel, FormLabel, Grid, MenuItem, Paper, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';


import * as yup from 'yup';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useDispatch } from 'react-redux';
import { PatternFormat } from 'react-number-format'
import { changeloading } from '../../store/actions/loading.action';
import { MaskNome } from '../../utils/mascaras';
import Logo from '../../image/logoSemFundo.png'
import UsersService from '../../services/UsersService';
import { changeNotify } from '../../store/actions/notify.actions';

const schema = yup.object({
  nome: yup.string().required().min(3),
  cpf: yup.string().required().min(11),
  data_nascimento: yup.string().required(),
  sexo: yup.string().required(),
  endereco: yup.string().required(),
  estado: yup.string().required(),
  cidade: yup.string().required(),
});


function AddCliente() {
  const { register, handleSubmit: onSubmit, formState: { errors }, setValue, reset } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();
  const [estado, setEstado] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState('0');
  const [idEstado, setIdEstado] = useState('');
  const [cidade, setCidade] = useState([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState('0');


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

  function handleSubmit(data) {
    dispatch(changeloading({ open: true, msg: 'Salvando..' }))
    UsersService.create(data, 'client').then((res) => {
      dispatch(changeloading({ open: false, }))
      dispatch(changeNotify({ open: true, class: 'success', msg: res.message }))
      reset()
    })
    .catch((error) => {
      dispatch(changeloading({ open: false, }))
      dispatch(changeNotify({ open: true, class: 'error', msg: error.message.error }))
    })
  }


  return (
    <Box component={Paper} elevation={5} sx={{ flexGrow: 1 }} marginTop={1} padding={2}  >
      <Box marginBottom='-20px'>
        <img src={Logo} alt="Logo" />
      </Box>

      <Box component={Paper} elevation={1} padding={2}  >
        <form onSubmit={onSubmit(handleSubmit)}>
          <Grid container spacing={2} >
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <TextField
                label='Nome'
                variant='outlined'
                fullWidth
                size='small'
                {...register("nome")}
                onInput={(e) => {
                  e.target.value = MaskNome(e.target.value);
                  setValue("nome", e.target.value, { shouldValidate: true });
                }}
              />
              <Typography variant='subtitle2'>{errors?.nome?.message}</Typography>
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
                customInput={TextField}
                onInput={(e) => setValue("cpf", e.target.value, { shouldValidate: true })}
                {...register("cpf")}
              />
              <Typography variant='subtitle2'>{errors?.cpf?.message}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3}>
              <TextField
                label='Data Nascimento'
                variant='outlined'
                InputLabelProps={{ shrink: true, }}
                fullWidth
                size='small'
                type='date'
                {...register("data_nascimento")}
              />
              <Typography variant='subtitle2'>{errors?.data_nascimento?.message}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
              <Grid container alignItems="center">
                <FormLabel >Sexo:  </FormLabel>
                <RadioGroup row onChange={(e) => setValue("sexo", e.target.value)}>
                  <FormControlLabel sx={{ marginLeft: '5px' }} value="M" control={<Radio />} label="Masculino" />
                  <FormControlLabel value="F" control={<Radio />} label="Feminino" />
                </RadioGroup>
              </Grid>
              <Typography variant='subtitle2'>{errors?.sexo?.message}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={5}>
              <TextField
                label='Endereço'
                variant='outlined'
                fullWidth
                size='small'
                {...register("endereco")}
              />
              <Typography variant='subtitle2'>{errors?.endereco?.message}</Typography>

            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3}>
              <Select
                variant='outlined'
                fullWidth
                size='small'
                {...register('estado')}
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
              <Typography variant='subtitle2'>{errors?.estado?.message}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={4}>
              <Select
                variant='outlined'
                fullWidth
                size='small'
                {...register('cidade')}
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
              <Typography variant='subtitle2'>{errors?.cidade?.message}</Typography>
            </Grid>

            <Grid item xs={12} sm={5} md={5} lg={8}></Grid>

            <Grid item xs={12} sm={5} md={5} lg={2}>
              <Button type='submit' fullWidth variant='contained'>Salvar</Button>
            </Grid>
            
            <Grid item xs={12} sm={5} md={5} lg={2}>
              <Button color='secondary' onClick={() => reset()} fullWidth variant='contained'>Limpar</Button>
            </Grid>

          </Grid>
        </form>
      </Box>
    </Box>
  );
}

export default AddCliente;
