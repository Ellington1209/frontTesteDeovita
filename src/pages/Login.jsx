import React from 'react';
import { Box, Button,  Paper, TextField, Typography } from '@mui/material';

// react hook form
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"


import { useDispatch } from 'react-redux';
import { login } from '../store/actions/authActions';
import { useNavigate } from 'react-router-dom';



const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required().min(5),
  })

function Login() {
  const { register, handleSubmit: onSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (credentials) => {
    try {
      await dispatch(login(credentials));
      navigate("/addcliente");
    } catch (error) {
      return
    }
  };

  return (
    <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'
      sx={{ background: 'linear-gradient(to bottom, #333333, #666666 30%, #999999 70%, #DDDDDD, #333333)', }}>
      <Box component={Paper} elevation={4} display='flex' flexDirection='column' alignItems='center' width={380} height={330}  bgcolor='#fff' >
        <Typography marginTop={2} variant='h1'>Teste UPD8</Typography>
        <form onSubmit={onSubmit(handleSubmit)}>        
            <Box marginTop="20px">
              <TextField
                label="Email"
                type="email"
                size='small'
                fullWidth
                {...register("email")}
                autoComplete='email'
              />
              <Typography variant='subtitle2'>{errors?.email?.message}</Typography>
            </Box>

            <Box marginTop="20px">
              <TextField
                label="Senha"
                type="password"
                size='small'
                fullWidth
                {...register("password")}
                color="secondary"
              />
              <Typography variant='subtitle2'>{errors?.password?.message}</Typography>
            </Box>
            <Box marginTop="20px">
              <Button type='submit' variant='contained' fullWidth>Enviar</Button>
            </Box>         
        </form>
      </Box>
    </Box>
  )

}

export default Login;