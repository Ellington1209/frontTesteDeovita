import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import { changeAlert } from "../../store/actions/alert.action";
import { useDispatch, useSelector } from "react-redux";
import { styled } from '@mui/material/styles';
import { CheckCircle, Error } from "@mui/icons-material";


export default function Alert() {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alertReducer);
  if(alert.open){
    setTimeout(()=> dispatch( changeAlert({open:false})), alert.time);
  }

  const StyledModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white"
  });

  
  return (
    <StyledModal
      open={alert.open}
      onClose={() => dispatch(changeAlert({ open: false }))}     
    >
      <Box display="flex" alignItems="center"  backgroundColor='white' width="12%" height="9%" maxHeight="600px" className="no-border" >
        {alert.class === "success" && (
          <CheckCircle  color="success" style={{ fontSize: "2.5rem", padding: "8px" }}/>
        )}
        {alert.class === "error" && (
          <Error color="error" style={{ fontSize: "2.5rem", padding: "8px" }}  />
        )}
        <Typography color="secondary.dark" alignItems="center" fontSize="20px">
          {alert.msg}
        </Typography>
      </Box>
    </StyledModal>
  );
}