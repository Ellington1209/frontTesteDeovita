import styled, { css } from 'styled-components';
import {  grey } from '@mui/material/colors';

export const Container = styled.div`
  display: flex;
  header {
    background-color:#363636;
  }

.name{
  color:rgba(208, 210, 214, 1);
  padding-left: 15px;
 ;
}
  //SIDER BAR STYLES
  ${({ theme }) => css`

    .MuiDrawer-paper svg, .MuiDrawer-paper {
      color: #FFF;
      font-size: 18px;
     
    }
    .MuiButtonBase-root{
      color:rgba(208, 210, 214, 1);
    }
    .MuiButtonBase-root:hover{
      color: ${grey[100]}
    }

    .MuiDivider-root {
      background-color: #FFFFFF;
      width: 90%;
      margin-left: 3%;
    }

    .MuiTypography-root {
      font-size: 15px;
      
    }

    .MuiListItemIcon-root {
      min-width: 32px;
      margin-left: 15px;
      
    }
    .MuiList-root li {
      display: flex;
      flex-direction: column;
     

    }
    .MuiCollapse-root .muiListItemText-root{
      padding-left:31px;
    }
    .MuiList-root li a, .MuiListItemButton-root, .MuiCollapse-root {
      width: 100%;
    }
    .MuiCollapse-root .MuiListItemText-root {
      padding-left: 31px;
    }
  `}
`;

export const BoxAvatar = styled.div`
  display:  flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;