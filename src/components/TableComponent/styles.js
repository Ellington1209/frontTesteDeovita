import { grey } from '@mui/material/colors'
import styled from 'styled-components'

export const Container = styled.div`
  .MuiTableContainer-root {
    //box-shadow: none;
    // border: 1px solid transparent;
  }

  border: 1px solid transparent;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;

  div table tbody tr th,
  div table tbody tr td {
    font-size: 14px;
  }

  div table thead tr th {
    font-size: 16px;
    font-weight: 600;
  }

  div table thead {
    background-color: rgba(0, 0, 0, 0.03);
  }

  div table tfoot tr td div p,
  div table tfoot tr td div button {
    font-size: 12px;
  }
  .MuiTablePagination-selectLabel {
  color: ${grey[800]};
}
.MuiTablePagination-menuItem{
  color: black
}
.MuiTablePagination-displayedRows {
  color: ${grey[800]};
}

`