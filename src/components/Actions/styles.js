import styled from 'styled-components'


export const ActionBox = styled.div`
  display: flex;
  width: 30px;
  height: 30px;

  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 5px;
  margin: 1px 2px;
  background-color: ${(props) => props.theme.colors.green} !important;
  cursor: pointer;

  :hover {
    background-color: ${(props) => props.theme.colors.greenLight} !important;
  }
`
export const EditBox = styled.div`
  display: flex;
  width: 30px;
  height: 30px;

  align-items: center;
  justify-content: center;

  border-radius: 5px;
  margin: 1px 2px;
  background-color: #00923f !important;

  color: white;

  cursor: pointer;

  :hover {
    background-color: #11bf59 !important;
  }
`
export const EstornoBox = styled.div`
  display: flex;
  width: 30px;
  height: 30px;

  align-items: center;
  justify-content: center;

  border-radius: 5px;
  margin: 1px 2px;
  background-color: #9347AD !important;

  color: white;

  cursor: pointer;

  :hover {
    background-color: #7B3C91 !important;
  }
`
export const DeleteBox = styled.div`
  display: flex;
  width: 30px;
  height: 30px;

  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 5px;
  margin: 1px 2px;
  background-color: #ee5533 !important;
  cursor: pointer;

  :hover {
    background-color: #f97a61 !important;
  }
`
export const ContainerAction = styled.div`
  display: flex;
  justify-content: end;

  flex-wrap: wrap;

  .check {
    background-color: #00923F !important;
  }

  .danger {
    background-color: #e00808 !important;
  }

  .pendente {
    background-color: #F9A825 !important;
  }
`


export const StatusBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  border: 1px solid transparent;
  border-radius: 100%;

  height: 20px;
  width: 20px;

  cursor: pointer;

`
