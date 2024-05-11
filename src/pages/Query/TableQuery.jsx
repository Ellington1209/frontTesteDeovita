import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  IconButton,
  Box,
  Tooltip,
  TablePagination
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useDebounce } from '../../hooks/UseDebounce';
import UsersService from '../../services/UsersService';

function Row({ row }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{
        '& > *': { borderBottom: 'unset' },
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        }
      }}>
        <TableCell>
          <Tooltip title="Exibir exames">
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell component="th" scope="row">{row.name}</TableCell>
        <TableCell align="right">{row.email}</TableCell>
        <TableCell align="right">{row.date}</TableCell>
        <TableCell align="right">{row.phone}</TableCell>
        <TableCell align="right">{row.sex}</TableCell>
        <TableCell align="right">{row.duration}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="exams">
                <TableHead>
                  <TableRow>
                    <TableCell>Exames</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.exams.map((exam, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {exam}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function TableQuery() {
  const { debounce } = useDebounce();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);


  const handleGetConsultation = () => {
    debounce(() => {
      UsersService.getPagination({}, 'consultation', page + 1, rowsPerPage)
        .then((res) => {
          setRows(res.consultations || []);
          setTotalRows(res.totalItems);
        });
    });
  };

  useEffect(() => {
    handleGetConsultation();
  }, []);


  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow sx={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}>
            <TableCell />
            <TableCell>Nome</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Data</TableCell>
            <TableCell align="right">Telefone</TableCell>
            <TableCell align="right">Sexo</TableCell>
            <TableCell align="right">Duração</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        labelRowsPerPage="Linhas por página:"
      />
    </TableContainer>
  );
}

export default TableQuery;
