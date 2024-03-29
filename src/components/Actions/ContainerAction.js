import React from "react";
import * as S from "./styles";

export default function ContainerAction({ children, ...props }){
  
  return(
    <S.ContainerAction {...props}>
      {children}
    </S.ContainerAction>
  )
}