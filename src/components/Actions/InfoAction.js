import React from 'react'
import * as S from './styles'
import { Description } from '@mui/icons-material'

export default function InfoAction({ onClick, styleBox, styleIcon, ...props }) {
  return (
    <S.ActionBox onClick={onClick} style={styleBox} {...props}>
      <Description style={styleIcon} />
    </S.ActionBox>
  )
}
