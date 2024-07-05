import { useState } from "react";
import GenericModal from "../../../shared/GenericModal/GenericModal";
import { SButton, SLogInOutText } from "./LoginModalGroup.styles"
import LoginIcon from "@mui/icons-material/Login";
import LoginForm from "../LoginForm/LoginForm";

function LoginModalGroup() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <SButton onClick={() => setOpen(true)} color="inherit">
        <SLogInOutText>Login</SLogInOutText><LoginIcon />
      </SButton>
      <GenericModal open={open} handleClose={handleClose}>
        <LoginForm handleClose={handleClose}/>
      </GenericModal>
    </>
  )
}

export default LoginModalGroup