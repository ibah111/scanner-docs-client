import { Grid } from '@mui/material';
import BirthDate from './BirthDate';
import BirthPlace from './BirthPlace';
import Company from './Company';
import Education from './Education';
import Email from './Email';
import FamilyStatus from './FamilyStatus';
import IdCard from './IdCard';
import Inn from './Inn';
import National from './National';
import Passport from './Passport';
import Position from './Position';
import Rnn from './Rnn';
import Sex from './Sex';

export default function DialogPhysics() {
  return (
    <Grid item xs={7} container spacing={1} direction="row">
      <BirthDate />
      <Sex />
      <FamilyStatus />
      <IdCard />
      <Email />
      <National />
      <Company />
      <Position />
      <Education />
      <Rnn />
      <Inn />
      <BirthPlace />
      <Passport />
    </Grid>
  );
}
