import React from 'react'
import * as S from './styles'

import { Delete } from '@mui/icons-material'

export default function DeleteAction({ onClick, styleBox, styleIcon, ...props }) {
  return (
    <S.DeleteBox onClick={onClick} style={styleBox} {...props}>
      <Delete style={styleIcon} />
    </S.DeleteBox>
  )
}
