import React, { useEffect } from 'react'
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableRow, TableHead, Paper, useTheme, Checkbox, Toolbar, Typography, Tooltip, alpha, LinearProgress} from '@mui/material'
import PropTypes from 'prop-types'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import DeleteIcon from '@mui/icons-material/Delete'
import * as S from './styles'
import  Utils  from '../../utils/Utils'
import{ Mask }from '../../utils/mascaras'
import ContainerAction from '../Actions/ContainerAction'
import EditAction from '../Actions/EditAction'
import DeleteAction from '../Actions/DeleteAction'
import PlagiarismOutlinedIcon from '@mui/icons-material/PlagiarismOutlined'
import Input from '../Input/Input'
import StatusAction from '../Actions/StatusAction'
import InfoAction from '../Actions/InfoAction'
import ExtornoAction from '../Actions/ExtornoAction'

function EnhancedTableToolbar(props) {
  const { numSelected, labelTable, handlerDelete, Action } = props

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        border: '1px solid rgba(224, 224, 224, 1)',
        borderTopLeftRadius: '3px',
        borderTopRightRadius: '3px',
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
         
        >
          {numSelected} Selecionados
        </Typography>
      ) : (
        <Typography
          sx={{
            flex: '1 1 100%',
            fontSize: '18px !important',
            fontWeight: 'bolder',
          }}
          variant="h6"
          id="tableTitle"
        
          
        >
          {labelTable}
        </Typography>
      )}

      {Action && numSelected > 0 && <Action />}
      {handlerDelete && numSelected > 0 && (
        <Tooltip title="Remover" size="lg" style={{ fontSize: '18px' }}>
          <IconButton onClick={handlerDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  Action: PropTypes.elementType,
}

function TablePaginationActions(props) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange, request, rows } = props

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      {!request && (
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="Primeira pagina"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
      )}
      <IconButton
        onClick={handleBackButtonClick}
        aria-label="Pagina anterior"
        disabled={page === 0}
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        aria-label="Proxima pagina"
        disabled={
          request
            ? rows.length < rowsPerPage
            : page >= Math.ceil(count / rowsPerPage) - 1
        }
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      {!request && (
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Ultima pagina"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      )}
    </Box>
  )
}

const TableComponet= ({
  headers,
  data,
  request,
  handlerRequest,
  setData,
  selected,
  handleClickSelected,
  handleSelectAllClick,
  selectedName,
  labelTable,
  labelCaption,
  handlerDelete,
  handlerEditarAction,
  handlerEstornarAction,
  handlerDeletarAction,
  handlerDetalhesAction,
  ActionSelect,
  qdtPage,
  loading,
  status,
  statusLabelTrue,
  statusLabelFalse,
}) => {
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  }

  const [page, setPage] = React.useState(0)
  const [pageLabel, setPageLabel] = React.useState(1)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [rows, setRows] = React.useState([])

  function mountedRows(newData) {
    let newRows = []

    if (Utils.isArrayNotEmpty(newData)) {
      newData.forEach((item) => {
        const row = {}
        headers.forEach((header) => {
          row[header.id] = item[header.id]

          if (header.id === 'actionRows') {
            row[header.id] = ActionRows(item)
          }
          if (header.id === 'statusRows') {
            row[header.id] = StatusRows(item)
          }
        })
        newRows.push(row)
      })
    }
    setRows(newRows)
  }

  let mounted = true

  useEffect(() => {
    async function getData() {
      if (request) {
        if (mounted) {
          const res = await handlerRequest(page + 1, rowsPerPage)
          setData(res)
        }
      }
    }

    getData()
    return () => (mounted = false)
  }, [rowsPerPage, page])

  useEffect(() => {
    mountedRows(data)
  }, [data])

  useEffect(() => {
    setPageLabel(page + 1)
  }, [page])

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const handleChangePage = (event, newPage) => {
    mounted = true
    setPage(newPage)
  }

  const ActionRows = (row) => {
    return (
      <ContainerAction>
        {handlerDetalhesAction && (
          <InfoAction onClick={() => handlerDetalhesAction(row)} />
        )}
        {handlerEditarAction && (
          <EditAction onClick={() => handlerEditarAction(row)} />
        )}
        {handlerEstornarAction && (
          <ExtornoAction onClick={() => handlerEstornarAction(row)} />
        )}
        {handlerDeletarAction && (
          <DeleteAction
            onClick={(e) => {
              e.stopPropagation()
              handlerDeletarAction(row)
            }}
          />
        )}
      </ContainerAction>
    )
  }

  const StatusRows = (row) => {
    return (
      <ContainerAction>
        {status && (
          <StatusAction
            value={row[status]}
            labelTrue={statusLabelTrue}
            labelFalse={statusLabelFalse}
          />
        )}
      </ContainerAction>
    )
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const rowsPageLabel = () => {
    let pagNum = (rows.length / rowsPerPage).toFixed()
    return (
      <div style={{ display: 'flex', flexDirection: 'row', width: '185px' }}>
        {request ? (
          <Input
            id={'page'}
            value={pageLabel}
            onChange={(e) => setPageLabel(e.target.value)}
            onBlur={(e) => {
              handleChangePage(e, Number.parseInt(e.target.value) - 1)
            }}
            sx={{ minWidth: '70px', padding: '2px !important' }}
            size="small"
            type="number"
            InputProps={{
              inputProps: { min: 0, max: Number.parseInt(qdtPage) },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        ) : (
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              marginLeft: '5px',
              minWidth: '70px',
            }}
          >
            {pageLabel}
          </span>
        )}

        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '14px',
            marginLeft: '5px',
            width: '390px',
          }}
        >
          de {qdtPage ? qdtPage : pagNum === "0" ? 1 : pagNum   } páginas
        </span>
      </div>
    )
  }

  const isSelected = (id) =>
    selected.some((product) => product[selectedName] === id)

  return (
    <S.Container>
      {selected && (
        <EnhancedTableToolbar
          labelTable={labelTable}
          numSelected={selected.length}
          handlerDelete={handlerDelete}
          Action={ActionSelect}
        />
      )}
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 300, border: 'none' }}
          aria-label="Linhas por pagina: pagination table"
          size="medium"
        >
          {loading && (
            <caption style={{ textAlign: 'center' }}>
              <LinearProgress sx={{ width: '100%' }} />
            </caption>
          )}
          {rows.length === 0 && !loading && (
            <caption style={{ textAlign: 'center' }}>
              <PlagiarismOutlinedIcon sx={{ margin: '10px 0px -5px 0px' }} />
              {labelCaption}
            </caption>
          )}
          <TableHead>
            <TableRow>
              {selected && (
                <TableCell padding="checkbox" width={10}>
                  <Checkbox
                    color="primary"
                    indeterminate={
                      selected.length > 0 && selected.length < rows.length
                    }
                    checked={rows.length > 0 && selected.length === rows.length}
                    onChange={(e) => handleSelectAllClick(e, selectedName)}
                    inputProps={{
                      'aria-label': 'select all desserts',
                    }}
                  />
                </TableCell>
              )}
              {headers.map((header) => {
                return (
                  <TableCell
                    {...header.props}
                    key={header.id}
                    sx={{ fontSize: '18px', fontWeight: '300' }}
                  >
                    {header.label}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && (data.length === rows.length) &&
              (rowsPerPage > 0
                ? request
                  ? rows
                  : rows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage,
                    )
                : rows
              ).map((row, index) => {

                const isItemSelected =
                  selected && isSelected(row[selectedName])
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    key={index}
                    //  selected={isItemSelected}
                    onClick={(event) =>
                      selected && handleClickSelected(event, row)
                    }
                    sx={{ cursor: 'pointer' }}
                  >
                    {selected && (
                      <TableCell padding="checkbox" width={10}>
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                    )}
                    {headers.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell
                          key={column.id}
                          sx={{ fontSize: '12px', fontWeight: '400' }}
                          {...column.props}
                        >
                          { Utils.isNotNull(column.props.data) ? Mask.maskDateBrSemHoras(value) : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}

            {/* {!request && emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}

            {request && !loading && (
              <TableRow
                style={{ height: 64.8 * (rowsPerPage - rows.length) }}
              ></TableRow>
            )} */}
          </TableBody>
          {rows.length > 0 && !loading && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={12}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  labelRowsPerPage="Itens por pagina"
                  onPageChange={handleChangePage}
                  labelDisplayedRows={() => rowsPageLabel()}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={(subProps) => (
                    <TablePaginationActions
                      {...subProps}
                      request={request}
                      rows={rows}
                    />
                  )}
                />
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
    </S.Container>
  )
}

export default TableComponet