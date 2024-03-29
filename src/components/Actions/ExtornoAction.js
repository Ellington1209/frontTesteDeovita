import React from 'react'
import * as S from './styles'

import { FlipCameraAndroid } from '@mui/icons-material'

export default function ExtornoAction({ onClick, styleBox, styleIcon, ...props }) {
  return (
    <S.EstornoBox onClick={onClick} style={styleBox} {...props}>
      <FlipCameraAndroid style={styleIcon} />
    </S.EstornoBox>
  )
}
