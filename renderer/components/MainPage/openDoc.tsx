import { Dialog } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid-premium';
import React from 'react';
import { useAppSelector } from '../../Reducer';
import fileConvert from '../../utils/fileConvert';
import MenuBar from '../menuBar';
import PanoramaIcon from '@mui/icons-material/Panorama';

export default function OpenDoc() {
  const data = useAppSelector((state) => state.Data?.file);
  const [open, setOpen] = React.useState(false);
  const [fileUrl, setUrl] = React.useState('');
  const Click = () => {
    const file = fileConvert(data);
    setUrl(URL.createObjectURL(file));
    setOpen(true);
  };
  return (
    <>
      <GridActionsCellItem
        icon={<PanoramaIcon />}
        onClick={Click}
        label="Открыть документы"
      />
      <Dialog open={open} fullScreen onClose={() => setOpen(false)}>
        <MenuBar back={() => setOpen(false)} />
        <iframe src={fileUrl} height="100%" width="100%"></iframe>
      </Dialog>
    </>
  );
}
