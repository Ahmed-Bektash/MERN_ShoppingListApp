import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import TextFieldWrapper from "../components/Forms/FormTextField";
import { Context, fetchUserData } from "../logic/DataProvider.js";
import { EditUser, LoginUser } from "../logic/User/UserProvider";
import { headersConfig, isAuthenticated } from "../logic/utils";
import "react-toastify/dist/ReactToastify.css";
import { PAGE_REF } from "../config";
import Logout from "../components/Logout";
import DarkModeButton from "../components/DarkModeButton";
import CustomButton from "../components/CustomButton.js";
import { GlobalStateActions } from "../logic/GlobalStateActions.js";
import Loading from "../components/Loading";
import GenericModal from "../components/GenericModal.js";
import { colourPalette } from "../Theme.js";
import { NOTIFICATION_TYPE, NotifyUser } from "../logic/Notification";

const ResetPasswordForm = (props) => {
  const { openState, toggle } = props;
  const { UserDispatch, GlobalDispatch } = useContext(Context);

  const initialValues = {
    email: "",
  };
  const validation = Yup.object({
    email: Yup.string().email().required("Required"),
  });

  const handleForgotPassword = async (email) => {
    const response = await EditUser(UserDispatch, { email: email }, "verify");
    return response;
  };
  return (
    <GenericModal
      btn_style={{ backgroundColor: colourPalette.WARNING }}
      btn_txt={"Forgot Password"}
      open={openState}
      toggle={toggle}
    >
      <Typography variant="h2">
        Please add your email for reset password notification
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={async (values, actions) => {
          GlobalDispatch({ type: GlobalStateActions.LOADING, payload: true });
          try {
            const passwordResp = await handleForgotPassword(values.email);
            if (!passwordResp.success) {
              throw new Error(passwordResp.message);
            }
            GlobalDispatch({
              type: GlobalStateActions.LOADING,
              payload: false,
            });
            actions.resetForm();
          } catch (error) {
            NotifyUser(
              NOTIFICATION_TYPE.ERR,
              `Something went wrong , please try again later, error: ${error.message}`
            );
          }
        }}
      >
        <Form>
          <Grid item xs={12} sx={{ mb: 3 }}>
            <TextFieldWrapper label={"Email"} name={"email"} />
          </Grid>

          <CustomButton
            variant={"contained"}
            type={"submit"}
            buttonStyles={{
              backgroundColor: (theme) => theme.palette.secondary.main,
              mt: 3,
              mb: 2,
            }}
            clickHandler={toggle}
            text={"Send me an email for resetting my password"}
          />
        </Form>
      </Formik>
    </GenericModal>
  );
};

const LogInForm = () => {
  const { UserDispatch, ItemDispatch, ListDispatch, GlobalDispatch } =
    useContext(Context);
  const navigate = useNavigate();

  const HandleLoginResponse = async (user) => {
    await fetchUserData(
      GlobalDispatch,
      ListDispatch,
      ItemDispatch,
      UserDispatch,
      user.token
    );
    headersConfig.headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    navigate("/user", { state: { from: PAGE_REF.LOGIN } });
  };

  const initialValues = {
    email: "",
    password: "",
    // keepLoggedIn: false
  };
  const validation = Yup.object({
    email: Yup.string().email().required("Required"),
    password: Yup.string().required("Required"),
    // keepLoggedIn:Yup.boolean()
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validation}
      onSubmit={async (values, actions) => {
        // console.log(values)
        // alert(JSON.stringify(values, null, 2));
        const LoggedInUser = await LoginUser(
          UserDispatch,
          values.email,
          values.password
        );
        if (LoggedInUser) {
          GlobalDispatch({ type: GlobalStateActions.LOADING, payload: true });
          actions.setSubmitting(false);
          await HandleLoginResponse(LoggedInUser);
          GlobalDispatch({ type: GlobalStateActions.LOADING, payload: false });
        } else {
          actions.resetForm();
        }
      }}
    >
      <Form>
        <Grid item xs={12} sx={{ mb: 3 }}>
          <TextFieldWrapper label={"Email"} name={"email"} />
        </Grid>

        <Grid item xs={12} sx={{ mb: 3 }}>
          <TextFieldWrapper
            label={"Password"}
            name={"password"}
            type={"password"}
          />
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: (theme) => theme.palette.secondary.main,
            mt: 3,
            mb: 2,
          }}
        >
          <Typography variant="button">Submit</Typography>
        </Button>
      </Form>
    </Formik>
  );
};

export default function Login() {
  const theme = useTheme();
  const { GlobalState, UserState, UserDispatch } = useContext(Context);
  const [openResetPassword, setOpenResetPassword] = useState(false);

  const toggleResetPasswordModal = () => {
    setOpenResetPassword(!openResetPassword);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: GlobalState.darkMode ? "primary.main" : "background.paper",
    boxShadow: 15,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <Container component="main" maxWidth="xs">
      {!isAuthenticated(UserState) ? (
        <Box sx={style}>
          <Container sx={{ display: "flex", justifyContent: "center" }}>
            <DarkModeButton />
          </Container>
          <Typography component="h1" variant="h5" align="center" mb={3}>
            Log In
          </Typography>

          <LogInForm />
          <ResetPasswordForm
            openState={openResetPassword}
            toggle={toggleResetPasswordModal}
          />

          <Grid container justifyContent="center">
            <Grid item>
              <Link
                to={"../register"}
                style={{ textDecoration: "none" }}
                state={{ from: PAGE_REF.LOGIN }}
              >
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.secondary.main }}
                >
                  Don&apos;t have an account? Sign up
                </Typography>
              </Link>
            </Grid>
          </Grid>
          <Link
            to={"../"}
            style={{ textDecoration: "none" }}
            state={{ from: PAGE_REF.LOGIN }}
          >
            <Typography
              variant="body1"
              sx={{ color: theme.palette.secondary.main }}
            >
              Go to Home
            </Typography>
          </Link>
        </Box>
      ) : (
        <>
          {GlobalState.loading ? (
            <Loading />
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                height: "80vh",
              }}
            >
              <Typography variant="body1">
                You are already logged in...
              </Typography>

              <Container
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  mt: 2,
                }}
              >
                <Link
                  to={"../"}
                  style={{ textDecoration: "none" }}
                  state={{ from: PAGE_REF.LOGIN }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: (theme) => theme.palette.secondary.main,
                      mb: 2,
                    }}
                  >
                    {" "}
                    Go to Home{" "}
                  </Button>
                </Link>

                <Logout />
              </Container>
            </Box>
          )}
        </>
      )}
    </Container>
  );
}
