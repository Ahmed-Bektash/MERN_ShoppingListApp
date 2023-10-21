import { Button, Container, Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";
import { PAGE_REF } from "../config";
import { Link } from "react-router-dom";

export default function ErrorPage() { //add UI elements
  const error = useRouteError();
  console.error(error);

  const error_styles = {
    display:'flex',
    flexDirection: 'column',
    alignItems:'center',
    justifyContent:'center',
    gap: 3,
    height:'80vh',
  }

  const oops_styles = {
    fontSize: '4rem',
    color: 'secondary.main'
  }
  return (
    <div id="error-page">
      <Container sx={error_styles}>
        <Typography variant="h1" sx={oops_styles}>
          Ooops!
        </Typography>
        <Typography variant="h5">
          Sorry, an unexpected error has occurred.
        </Typography>
        <Typography variant="body2">
          Problem with the page: {error.statusText || error.message}
        </Typography>
        <Link 
          to={"../"} 
          style={{textDecoration:"none"}} 
          state={{ from: PAGE_REF.ERROR}}
          >
            <Button variant="contained" sx={{backgroundColor:theme=>theme.palette.secondary.main,mb:2}}> Go to Home </Button>
          </Link>
      </Container>
    </div>
  );
}