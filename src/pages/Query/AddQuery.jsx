import { Autocomplete, Box, Button, Grid, IconButton, Modal, Paper, TextField, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';



import { Add } from '@mui/icons-material';
import UsersService from '../../services/UsersService';
import { useDebounce } from '../../hooks/UseDebounce';
import BoxModal from './Style';
import AddPatient from '../Patient/AddPatient';
import { connect, useDispatch } from 'react-redux';
import { changeloading } from '../../store/actions/loading.action';
import { changeNotify } from '../../store/actions/notify.actions';
import { useNavigate } from 'react-router-dom';
import { changeIdConsultation } from '../../store/actions/consultation.action';



function AddQuery(idConsultation) {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [exams, setExams] = useState([]);
  const [selectedExams, setSelectedExams] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTextExams, setSearchTextExams] = useState("");
  const [numPrescriptions, setNumPrescriptions] = useState(1);
  const [prescriptions, setPrescriptions] = useState([""]);
  const [openModal, setOpenModal] = useState(false);
  const { debounce } = useDebounce();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchPatient = (searchValue) => {
    debounce(() => {
      UsersService.getPagination({ name: searchValue }, 'patient').then((res) => {
        setPatients(res.patients || []);
      });
    });
  }
  const handleSearchExams = (searchValue) => {
    debounce(() => {
      UsersService.getPagination({ type_of_exam: searchValue }, 'exams').then((res) => {
        setExams(res.exams || []);
      });
    });
  }
  useEffect(() => {
    handleSearchPatient('');
    handleSearchExams('');
    handleStartConsultation();
  }, []);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    // Se o mês atual for menor que o mês de nascimento, ou se estiver no mesmo mês mas o dia atual ainda não passou o dia de nascimento, reduza a idade em 1.
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  const handlePrescriptionChange = (value, index) => {
    const updatedPrescriptions = [...prescriptions];
    updatedPrescriptions[index] = value;
    setPrescriptions(updatedPrescriptions);
  };

  const handleNumPrescriptionsChange = (e) => {
    const count = parseInt(e.target.value, 10);
    if (count < 0) return; // Ignora números negativos
    setNumPrescriptions(count);
    setPrescriptions(Array(count).fill("").map((_, i) => prescriptions[i] || ""));
  };

  function handleStartConsultation() {
    dispatch(changeloading({ open: true, msg: 'Iniciando' }))
    const data = []
    UsersService.create(data, 'consultation/start').then((res) => {
      dispatch(changeloading({ open: false, }))
      dispatch(changeIdConsultation(res.idConsultation));
    })
      .catch((error) => {
        dispatch(changeloading({ open: false, }))
        dispatch(changeNotify({ open: true, class: 'error', msg: error.response.data.message }))
      })
  }


  function handleSubmit() {
    const data = {
      selectedExams: selectedExams,
      patientId: selectedPatient.id,
      prescription: prescriptions,
      idConsultation: idConsultation.idConsultation

    }

    dispatch(changeloading({ open: true, msg: 'Salvando..' }))
    UsersService.create(data, 'consultation').then((res) => {
      dispatch(changeloading({ open: false, }))
      dispatch(changeNotify({ open: true, class: 'success', msg: res.message }))
      navigate("/dashboard/medico");
    })
      .catch((error) => {
        dispatch(changeloading({ open: false, }))
        dispatch(changeNotify({ open: true, class: 'error', msg: error.response.data.message }))
      })
  }



  return (
    <Box>
      <Box component={Paper} elevation={5} padding={2}>
        <Grid container spacing={2} >

          <Grid item xs={10} sm={5} md={5} lg={5}>
            <Autocomplete
              disablePortal
              size='small'
              options={patients}
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) => {
                setSelectedPatient(newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Selecione o paciente" />}
            />
          </Grid>



          <Grid item xs={1} sm={1} md={1} lg={1} >
            <Tooltip title="Adicionar novo paciente">
              <IconButton onClick={handleClickOpen}>
                <Add sx={{ color: "#388e3c" }} />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={11} sm={5} md={5} lg={5}>
            <Autocomplete
              multiple
              disablePortal
              size='small'
              options={exams}
              getOptionLabel={(option) => option.type_of_exam}
              onChange={(event, newValue) => {
                setSelectedExams(newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Selecione o exame" />}
            />
          </Grid>

        </Grid>

        <Grid container spacing={2} marginTop={5}>
          <Grid item xs={6} sm={3} md={3} lg={3}>
            <Typography variant='h5'>Paciente: {selectedPatient ? selectedPatient.name : ''}</Typography>
          </Grid>
          <Grid item xs={6} sm={3} md={3} lg={2}>
            <Typography variant='h5'>Idade: {selectedPatient ? calculateAge(selectedPatient.date_birth) : ''} anos</Typography>
          </Grid>
          <Grid item xs={6} sm={3} md={3} lg={2}>
            <Typography variant='h5'>cpf: {selectedPatient ? selectedPatient.cpf : ''}</Typography>
          </Grid>
          <Grid item xs={6} sm={3} md={3} lg={3}>
            <Typography variant='h5'>Telefone: {selectedPatient ? selectedPatient.phone : ''}</Typography>
          </Grid>
          <Grid item xs={12} marginTop={4}>
            <Typography variant='h5'>Exames: {selectedExams.map(exam => exam.type_of_exam).join(", ")}</Typography>
          </Grid>
        </Grid>



        <Grid container spacing={2} marginTop={2}>
          <Grid item xs={6}>
            <Box display='flex'>
              <Typography sx={{ marginTop: '20px' }}>Quantidade de prescrições:  </Typography>
              <TextField
                type="number"
                value={numPrescriptions}
                onChange={handleNumPrescriptionsChange}
                inputProps={{ min: 1 }}
                sx={{ width: '60px' }}
              />

            </Box>
          </Grid>
          {Array.from({ length: numPrescriptions }, (_, i) => (
            <Grid item xs={12} key={i}>
              <TextField
                label={`Prescrição médica ${i + 1}`}
                fullWidth
                multiline
                minRows={5}
                maxRows={10}
                variant="filled"
                value={prescriptions[i]}
                onChange={(e) => handlePrescriptionChange(e.target.value, i)}
              />
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Button variant='outlined' sx={{ color: '#3f51b5!important' }}
              onClick={handleSubmit}
            >Finalizar consulta</Button>
          </Grid>
        </Grid>

      </Box>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <BoxModal>
          <AddPatient handleClose={handleClose} />
        </BoxModal>
      </Modal>
    </Box>
  );
}
function mapStateToProps(state) {
  return {
    idConsultation: state.consultationReducer.idConsultation,
  };
}
export default connect(mapStateToProps)(AddQuery);