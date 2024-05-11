import { useDispatch } from 'react-redux';
import { useContext, useState } from 'react';

import { Box, Button, FormControlLabel, FormLabel, Grid, MenuItem, Paper, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';


import * as yup from 'yup';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { PatternFormat } from 'react-number-format'
import { changeloading } from '../../store/actions/loading.action';
import { MaskNome } from '../../utils/mascaras';
import Logo from '../../image/logo.png'
import UsersService from '../../services/UsersService';
import { changeNotify } from '../../store/actions/notify.actions';
import { LocationContext } from '../../context/LocationContext';
import { MaskUsuario } from '../../utils/mascaras/MaskUsuario';

const schema = yup.object({
  name: yup.string().required().min(3),
  email: yup.string().required().email(),
  name_user: yup.string().required(),
  cpf: yup.string().required(),
  crm: yup.string().required(),
  date_birth: yup.string().required(),
  phone: yup.string().required(),
  sex: yup.string().required(),
});


function AddDoctor() {
  const { register, handleSubmit: onSubmit, formState: { errors }, setValue, reset } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();

  const { estado, cidade, setIdEstado } = useContext(LocationContext);
  const [estadoSelecionado, setEstadoSelecionado] = useState('0');
  const [cidadeSelecionada, setCidadeSelecionada] = useState('0');



  const handleChangeEstado = (event) => {
    const estadoSelecionado = event.target.value;
    setEstadoSelecionado(estadoSelecionado);

    const estadoEncontrado = estado.find(e => e.sigla === estadoSelecionado);
    if (estadoEncontrado) {
      setIdEstado(estadoEncontrado.id);
    }
  };



  function handleSubmit(data) {
    dispatch(changeloading({ open: true, msg: 'Salvando..' }))
    UsersService.create(data, 'doctor').then((res) => {
      dispatch(changeloading({ open: false, }))
      dispatch(changeNotify({ open: true, class: 'success', msg: res.message }))
      reset()
    })
      .catch((error) => {
        dispatch(changeloading({ open: false, }))
        dispatch(changeNotify({ open: true, class: 'error', msg: error.response.data.message }))
      })
  }


  return (
    <Box component={Paper} elevation={5} sx={{ flexGrow: 1 }} marginTop={1} padding={2}  >
      <Box marginBottom='-20px'>
        <img src={Logo} alt="Logo" style={{ margin: '8px', width: 'auto', height: '130px' }} />
      </Box>

      <Box padding={2}  >
        <form onSubmit={onSubmit(handleSubmit)}>
          <Grid container spacing={2} >
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <TextField
                label='Nome'
                variant='outlined'
                fullWidth
                size='small'
                {...register("name")}
                onInput={(e) => {
                  e.target.value = MaskNome(e.target.value);
                  setValue("name", e.target.value, { shouldValidate: true });
                }}
              />
              <Typography variant='subtitle2'>{errors?.name?.message}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3}>
              <TextField
                label='email'
                type='email'
                variant='outlined'
                fullWidth
                size='small'
                {...register("email")}
              />
              <Typography variant='subtitle2'>{errors?.email?.message}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={2}>
              <TextField
                label='Nome de Usuario'
                placeholder='usuario1209'
                variant='outlined'
                fullWidth
                size='small'
                {...register("name_user")}
                onInput={(e) => {
                  e.target.value = MaskUsuario(e.target.value);
                  setValue("name_user", e.target.value, { shouldValidate: true });
                }}
              />
              <Typography variant='subtitle2'>{errors?.name_user?.message}</Typography>
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

            <Grid item xs={12} sm={6} md={6} lg={2}>
              <PatternFormat
                label='CRM'
                format='#####'
                isAllowed={(values) => {
                  const { formattedValue } = values;
                  return !formattedValue || formattedValue.length <= 6;
                }}
                fullWidth
                size='small'
                customInput={TextField}
                onInput={(e) => setValue("crm", e.target.value, { shouldValidate: true })}
                {...register("crm")}
              />
              <Typography variant='subtitle2'>{errors?.crm?.message}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3}>
              <TextField
                label='Data Nascimento'
                variant='outlined'
                InputLabelProps={{ shrink: true, }}
                fullWidth
                size='small'
                type='date'
                {...register("date_birth")}
              />
              <Typography variant='subtitle2'>{errors?.data_nascimento?.message}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={2}>
              <PatternFormat
                label='Telefone'
                format='(##)#####-####'
                isAllowed={(values) => {
                  const { formattedValue } = values;
                  return !formattedValue || formattedValue.length <= 14;
                }}
                fullWidth
                size='small'
                customInput={TextField}
                onInput={(e) => setValue("phone", e.target.value, { shouldValidate: true })}
                {...register("phone")}
              />
              <Typography variant='subtitle2'>{errors?.phone?.message}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
              <Grid container alignItems="center">
                <FormLabel >Sexo:  </FormLabel>
                <RadioGroup row onChange={(e) => setValue("sex", e.target.value)}>
                  <FormControlLabel sx={{ marginLeft: '5px' }} value="M" control={<Radio />} label="Masculino" />
                  <FormControlLabel value="F" control={<Radio />} label="Feminino" />
                </RadioGroup>
              </Grid>
              <Typography variant='subtitle2'>{errors?.sex?.message}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={4} xl={2}>
              <TextField
                label='Endereço'
                variant='outlined'
                fullWidth
                size='small'
                {...register("address")}
              />


            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
              <Select
                variant='outlined'
                fullWidth
                size='small'
                {...register('state')}
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

            <Grid item xs={12} sm={6} md={6} lg={3} xl={2}>
              <Select
                variant='outlined'
                fullWidth
                size='small'
                {...register('city')}
                value={cidadeSelecionada}
                onChange={(e) => setCidadeSelecionada(e.target.value)}
                disabled={!estado}
              >
                <MenuItem value='0'>Selecione a Cidade</MenuItem>
                {cidade.map((cidade) => (
                  <MenuItem key={cidade.id} value={cidade.nome}>
                    {cidade.nome}
                  </MenuItem>
                ))}
              </Select>

            </Grid>

            <Grid container spacing={2} margin={3}>
              <Grid item xs={12} sm={5} md={5} lg={2}>
                <Button type='submit' fullWidth variant='contained'>Salvar</Button>
              </Grid>

              <Grid item xs={12} sm={5} md={5} lg={2}>
                <Button color='secondary' onClick={() => reset()} fullWidth variant='contained'>Limpar</Button>
              </Grid>

            </Grid>


          </Grid>
        </form>
      </Box>
    </Box>
  );
}

export default AddDoctor;
