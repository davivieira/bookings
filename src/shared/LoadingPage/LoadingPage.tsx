import CircularProgress from '@mui/material/CircularProgress';
import { LoadingContainer } from './LoadingPage.styles';

function LoadingPage() {
  return (
    <LoadingContainer>
      <CircularProgress />
    </LoadingContainer>
  );
}

export default LoadingPage;