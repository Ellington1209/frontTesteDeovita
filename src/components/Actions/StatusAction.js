import React from 'react'
import * as S from './styles'
import { Check, Close } from '@mui/icons-material'
import { Tooltip } from '@mui/material'

export default function StatusAction({
  styleBox,
  value,
  labelTrue,
  labelFalse,
  ...props
}) {
  return (
    <Tooltip
      title={value ? labelTrue : labelFalse}
      placement="top"
      style={{ fontSize: '20px !important' }}
    >
      <S.StatusBox
        className={value ? 'check' : 'danger'}
        style={styleBox}
        {...props}
      >
        {value ? <Check /> : <Close />}
      </S.StatusBox>
    </Tooltip>
  )
}
