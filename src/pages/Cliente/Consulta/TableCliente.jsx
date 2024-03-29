import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Confirm, TableComponet } from '../../../components';
import { useDispatch } from 'react-redux';
import { changeloading } from '../../../store/actions/loading.action';
import { changeNotify } from '../../../store/actions/notify.actions';
import UsersService from '../../../services/UsersService';
import { useNavigate } from 'react-router-dom';


const headers = [
  {
    id: "nome",
    label: "Cliente",
    props: {
      align: 'left',
    },
  },
  {
    id: "cpf",
    label: "Cpf",
    props: {
      align: 'right',
    },
  },
  {
    id: 'data_nascimento',
    label: 'Data Nascimento',
    props: {
      align: 'right',
    },
  },
  {
    id: 'estado',
    label: 'Estado',
    props: {
      align: 'right',
    },
  },
  {
    id: 'cidade',
    label: 'Cidade',
    props: {
      align: 'right',
    },
  },
  {
    id: 'sexo',
    label: 'Sexo',
    props: {
      align: 'right',
    },
  },

  {
    id: 'actionRows',
    label: 'Ações',
    props: {
      align: 'right',
    },
  },
];


function TableCLiente({ clientes }) {

  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPages] = useState(0);
  const [clientesTable, setClientesTable] = useState(clientes);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    setClientesTable(clientes);
    console.log('Dados dos clientes:', clientes);
  }, [clientes])



  const [confirmar, setConfirmar] = useState({
    id: null,
    confirmDialogOpen: false,
  });

  const handleOpenConfirmDialog = (id) => {
    setConfirmar({ id, confirmDialogOpen: true });
  };

  const handleCloseConfirmDialog = () => {
    setConfirmar({ id: null, confirmDialogOpen: false });
  };

  const handleDelete = () => {
    const idToDelete = confirmar.id.id;
    UsersService.Delete(idToDelete, 'client')
      .then((res) => {
        dispatch(changeloading({ open: false }));
        dispatch(changeNotify({ open: true, class: 'success', msg: res.message }));
        // Atualize o estado da tabela após a exclusão
        updateTableAfterDelete(idToDelete);
      })
      .catch((error) => {
        dispatch(changeloading({ open: false }));
        dispatch(changeNotify({ open: true, class: 'error', msg: error.message }));
      })
      .finally(() => {
        // Feche o dialogo de confirmação independentemente do resultado
        handleCloseConfirmDialog();
      });
  };

  const updateTableAfterDelete = (id) => {
    setClientesTable((prevClientes) => prevClientes.filter((cliente) => cliente.id !== id));
  };

  const handleEdit = (client) => { 
    navigate(`/editcliente/${client.id}`, { state: { client } });
  };

  

  return (
    <Box>
      
      <Confirm
        open={confirmar.confirmDialogOpen}
        title="Deseja realmente excluir esse cliente?"
        onClose={handleCloseConfirmDialog}
        onConfirm={handleDelete}
      />
      <TableComponet
        headers={headers}
        data={clientesTable}
        labelCaption={'Nenhum Cliente encontrado!!'}
        labelTable={'Clientes'}
        handlerEditarAction={(id) => { handleEdit(id) }}
        handlerDeletarAction={(event) => handleOpenConfirmDialog(event)}
        request
        qdtPage={totalPage}
        loading={loading}
        setData={setClientesTable}
        handlerRequest={async (page, size) => {
          setLoading(true);
          UsersService.getPagination('', 'client', page, size)
            .then((data) => {
              setLoading(false);
              setClientesTable(data.clientes || []);
              setTotalPages(data.totalPages || 0);
              return data;
            });
          return [];
        }}
      />
    </Box>
  );
}

export default TableCLiente;
