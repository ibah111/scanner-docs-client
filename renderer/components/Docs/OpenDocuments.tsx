import { Dialog } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid-premium';
import React from 'react';
import getDocuments from '../../api/getDocuments';
import { changeMime } from '../../utils/fileConvert';
import PanoramaIcon from '@mui/icons-material/Panorama';
import MenuBar from '../menuBar';

interface DialogFileProps {
  id: number;
  title: string;
}

export default function OpenDocuments({ id, title }: DialogFileProps) {
  const [open, setOpen] = React.useState(false);
  const [fileUrl, setUrl] = React.useState('');
  React.useEffect(() => {
    if (open)
      getDocuments(id).then((res) => {
        const file = changeMime(title, res);
        setUrl(URL.createObjectURL(file));
        setOpen(true);
      });
  }, [open]);
  return (
    <>
      <GridActionsCellItem
        icon={<PanoramaIcon />}
        onClick={() => setOpen(true)}
        label="Открыть документы"
      />
      <Dialog open={open} fullScreen onClose={() => setOpen(false)}>
        <MenuBar back={() => setOpen(false)} />
        <iframe src={fileUrl} height="100%" width="100%"></iframe>
      </Dialog>
    </>
  );
}
