import { Grid } from '@mui/material';
import Contract from './Contract';
import EndDate from './EndDate';
import FairSum from './FairSum';
import FinishDate from './FinishDate';
import Income from './Income';
import QualityCoeff from './QualityCoeff';
import RealSum from './RealSum';
import StartDate from './StartDate';
import Sum from './Sum';

export default function Finance() {
  return (
    <Grid item xs={5} container spacing={1} direction="row">
      <Contract />
      <StartDate />
      <EndDate />
      <FinishDate />
      <Sum />
      <RealSum />
      <FairSum />
      <QualityCoeff />
      <Income />
    </Grid>
  );
}
