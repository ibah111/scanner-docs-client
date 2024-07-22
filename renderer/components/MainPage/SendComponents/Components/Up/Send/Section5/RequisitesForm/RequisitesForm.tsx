import { Grid } from '@mui/material';
import NameTextField from './RequisitesFormTextFields/NameTextField';
import RecipientTextField from './RequisitesFormTextFields/RecipientTextField';
import BrNameTextField from './RequisitesFormTextFields/BrNameTextField';
import InnTextField from './RequisitesFormTextFields/InnTextfield';
import KppTextField from './RequisitesFormTextFields/KppTextField';
import RAccountTextField from './RequisitesFormTextFields/RAccountTextField';
import PayPurposeTextField from './RequisitesFormTextFields/PayPurposeTextField';
import BrAddressTextField from './RequisitesFormTextFields/BrAddressTextField';
import TypTextField from './RequisitesFormTextFields/TypTextField';
import BikTextField from './RequisitesFormTextFields/BikTextField';
import KBETextField from './RequisitesFormTextFields/KBETextField';
import KNPTextField from './RequisitesFormTextFields/KNPTextField';
import KODTextField from './RequisitesFormTextFields/KODTextField';
import KAccountTextField from './RequisitesFormTextFields/KAccountTextField';

export default function RequisitesForm() {
  return (
    <>
      <Grid container rowSpacing={1}>
        <Grid item container spacing={1}>
          <Grid item xs={4}>
            <NameTextField />
          </Grid>
          <Grid item xs={4}>
            <RecipientTextField />
          </Grid>
          <Grid item xs={4}>
            <BrNameTextField />
          </Grid>
        </Grid>
        <Grid item container spacing={1}>
          <Grid item xs={4}>
            <InnTextField />
          </Grid>
          <Grid item xs={4}>
            <KppTextField />
          </Grid>
          <Grid item xs={4}>
            <RAccountTextField />
          </Grid>
        </Grid>
        <Grid item container spacing={1}>
          <Grid item xs={4}>
            <BikTextField />
          </Grid>
          <Grid item xs={4}>
            <KAccountTextField />
          </Grid>
          <Grid item xs={4}>
            <PayPurposeTextField />
          </Grid>
        </Grid>
        <Grid item container spacing={1}>
          <Grid item xs={4}>
            <BrAddressTextField />
          </Grid>
          <Grid item xs={2}>
            <TypTextField />
          </Grid>
          <Grid item xs={2}>
            <KBETextField />
          </Grid>
          <Grid item xs={2}>
            <KNPTextField />
          </Grid>
          <Grid item xs={2}>
            <KODTextField />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
