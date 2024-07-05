import { useFormik } from "formik";
import * as Yup from "yup";
import { SCForm } from "@/styles";
import { SCContainer, SCLoginButton } from "./LoginForm.styles";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import usePostUserData from "../../../api/users/users";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email"),
});

type LoginFormProps = {
  handleClose: () => void;
};

function LoginForm({ handleClose }: LoginFormProps) {
  const { mutate, isLoading } = usePostUserData();

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      mutate(values.email);
      handleClose();
    },
  });

  return (
    <SCContainer>
      <SCForm onSubmit={handleSubmit}>
        <TextField
          value={values.email}
          onChange={handleChange}
          placeholder="Use your email to login"
          error={touched.email && !!errors.email}
          name="email"
          type="email"
        />
        <SCLoginButton data-testid="submit-login-button" type="submit">
          {isSubmitting || isLoading ? <CircularProgress /> : "Login"}
        </SCLoginButton>
      </SCForm>
    </SCContainer>
  );
}

export default LoginForm;
