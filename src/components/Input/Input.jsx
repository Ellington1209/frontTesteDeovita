import React from 'react'
import {  TextField } from '@mui/material'
import styled from 'styled-components'

const Container = styled.h3`
  
  width: 100%;

`

export default function Input({
  label,
  error,
  helperText,
  value,
  onChange,
  placeholder,
  id,
  className,
  sx,
  ...props
}) {
  return (
    <Container>
      {/* <InputLabel sx={{ fontSize: "21px" }} shrink htmlFor={id}>
        {label}
      </InputLabel> */}
      <TextField
        error={error}
        helperText={helperText}
        variant="outlined"
        label={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id={id}
        sx={{ width: '100%', ...sx }}
        {...props}
      />
    </Container>
  )
}
