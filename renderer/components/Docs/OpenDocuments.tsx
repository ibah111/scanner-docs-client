import { Box, Dialog, Grid, Typography } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid-premium';
import React from 'react';
import getDocuments from '../../api/getDocuments';
import { changeMime } from '../../utils/fileConvert';
import PanoramaIcon from '@mui/icons-material/Panorama';
import MenuBar from '../menuBar';
import {
  LoadError,
  SpecialZoomLevel,
  Viewer,
  Worker,
} from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/search/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import ru_RU from '@react-pdf-viewer/locales/lib/ru_RU.json';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { searchPlugin } from '@react-pdf-viewer/search';

interface DialogFileProps {
  id: number;
  title: string;
}

export default function OpenDocuments({ id, title }: DialogFileProps) {
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState<string>('');
  React.useEffect(() => {
    if (open)
      getDocuments(id).then((res) => {
        const file = changeMime(title, res);
        setFile(URL.createObjectURL(file));
      });
  }, [open]);

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [defaultTabs[0]],
  });
  const searchPluginInstance = searchPlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const renderError = (error: LoadError) => {
    let message = '';
    switch (error.name) {
      case 'InvalidPDFException':
        message = 'Документ недействителен или поврежден';
        break;
      case 'MissingPDFException':
        message = 'Документ отсутствует';
        break;
      case 'UnexpectedResponseException':
        message = 'Неожиданный ответ сервера';
        break;
      default:
        message = 'Не удается загрузить документ';
        break;
    }
    return (
      <>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ pt: 10 }}
        >
          <Box sx={{ width: 600, height: 40, backgroundColor: '#e53e3e' }}>
            <Typography sx={{ fontSize: 24 }} align={'center'}>
              {message}
            </Typography>
          </Box>
        </Grid>
      </>
    );
  };
  return (
    <>
      <Worker workerUrl="/build/pdf.worker.js">
        <GridActionsCellItem
          icon={<PanoramaIcon />}
          onClick={() => setOpen(true)}
          label="Открыть документы"
        />
        <Dialog open={open} fullScreen onClose={() => setOpen(false)}>
          <MenuBar back={() => setOpen(false)} />
          <Grid item xs>
            {file && (
              <Viewer
                fileUrl={file}
                plugins={[
                  defaultLayoutPluginInstance,
                  pageNavigationPluginInstance,
                  searchPluginInstance,
                ]}
                defaultScale={1.12}
                localization={ru_RU}
                renderError={renderError}
              />
            )}
          </Grid>
        </Dialog>
      </Worker>
    </>
  );
}
