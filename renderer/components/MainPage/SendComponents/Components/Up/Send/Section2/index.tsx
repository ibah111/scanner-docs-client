import { Grid } from '@mui/material';
import React from 'react';
import CourtDocNum from './CourtDocNum';
import ExecutiveTyp from './ExecutiveTyp';
import FsspDate from './FsspDate';
import Id from './Id';
import DebtGuarantor from './DebtGuarantor';
import ExecNumber from './ExecNumber';
import getData from '../../../../../../../utils/getData';
import StartDateLawExec from './StartDateLawExec';

export default function Section2() {
  const r_court_name_data = getData('r_court_name', 'string');
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
        <DebtGuarantor />
        <Id />
        <ExecNumber />
        <ExecutiveTyp />
        <CourtDocNum />
        <FsspDate />
        {r_court_name_data.value === 'Сбербанк' && <StartDateLawExec />}
      </Grid>
    </>
  );
}
