import {
  Box,
  Collapse,
  Grid,
  LinearProgress,
  linearProgressClasses,
  Paper,
  styled,
  Typography,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import uploadFile from '../../../../../../../apiSend/uploadFile';
import { forkJoin } from 'rxjs';
interface BackDropProps {
  children: React.ReactNode;
  refresh: () => void;
  id: number;
}
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 30,
  width: '100%',
  borderRadius: 20,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 20,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));
export default function BackDrop({ children, id, refresh }: BackDropProps) {
  const [loading, setLoading] = React.useState(false);
  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      setLoading(true);
      forkJoin(acceptedFiles.map((file) => uploadFile(id, file))).subscribe({
        next: () => {
          refresh();
          setLoading(false);
        },
        error: () => setLoading(false),
      });
    },
    [id, refresh],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      'application/pdf': ['.pdf'],
    },
  });
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: 400,
          overflow: 'hidden',
          position: 'relative',
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Collapse
          mountOnEnter
          key={1}
          in={isDragActive || loading}
          unmountOnExit
        >
          {loading ? (
            <Paper
              elevation={3}
              sx={{
                boxSizing: 'border-box',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                background: '#fafafa',
                width: '100%',
              }}
            >
              <Grid
                container
                width={'100%'}
                height={80}
                direction="column"
                justifyContent="space-around"
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="h4">Загрузка</Typography>
                </Grid>
                <Grid width={'96%'} item>
                  <BorderLinearProgress />
                </Grid>
              </Grid>
            </Paper>
          ) : (
            <Paper
              sx={{
                boxSizing: 'border-box',
                height: '100%',
                width: '100%',
                background: '#fafafa',
                display: 'flex',
                border: 'dashed grey 2px',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CloudUploadIcon sx={{ fontSize: 80, color: '#BFBFBF' }} />
            </Paper>
          )}
        </Collapse>
        {children}
      </Box>
    </>
  );
}
