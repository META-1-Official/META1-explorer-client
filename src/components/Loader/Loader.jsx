import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader({size}) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
      }}
    >
      <CircularProgress />
    </Box>
  );
}
