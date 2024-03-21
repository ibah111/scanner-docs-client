import { Grid } from '@mui/material';
import React from 'react';
import AddInterests from './AddInterests';
import CourtDate from './CourtDate';
import DeliveryTyp from './DeliveryTyp';
import TemplateTyp from './TemplateTyp';
import AppealTyp from './AppealTyp';
import { useAppSelector } from '../../../../../../../ReducerSend';

export default function Section1() {
  const typ = useAppSelector((state) => state.Send.template_typ);
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
        <CourtDate />
        <DeliveryTyp />
        <TemplateTyp />
        {typ === 30 && <AppealTyp />}
        <AddInterests />
      </Grid>
    </>
  );
}
