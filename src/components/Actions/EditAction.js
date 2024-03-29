import React from 'react'
import * as S from './styles'

import { Edit } from '@mui/icons-material'

export default function EditAction({ onClick, styleBox, styleIcon, ...props }) {
  return (
    <S.EditBox onClick={onClick} style={styleBox} {...props}>
      <Edit style={styleIcon} />
    </S.EditBox>
  )
}
