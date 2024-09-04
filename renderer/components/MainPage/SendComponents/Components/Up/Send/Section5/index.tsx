import { Grid } from '@mui/material';
import React from 'react';
import Address from './Address';
import RCourtId from './RCourtId';
import Requisits from './Requisuts';
import BoxTypeSelect from './BoxTypeSelect';
import RequisitsIconButton from './RequisitesIconButton';
import RequisitesTableDialog from './RequisitesForm/RequisitesTableDialog';

export default function Section5() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid
        container
        item
        spacing={1}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <RCourtId />
        <Address />
        <BoxTypeSelect />
        <Requisits />
        <RequisitsIconButton handleOpen={() => handleOpen()} />
        {open && (
          <RequisitesTableDialog open={open} onClose={() => handleClose()} />
        )}
      </Grid>
    </>
  );
}
