import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import getDebtGuarantor from '../../../../../apiSend/getDebtGuarantor';
import AddressGrid from './Address';
import DialogPhysics from './DialogPhysics';
import ExtId from './ExtId';
import Finance from './Finance';
import Fio from './Fio';
import {
  resetDebtGuarantor,
  setDebtGuarantor,
  setDebtGuarantorValue,
  useDgDispatch,
} from './Reducer';
import SelectRole from './SelectRole';
import SelectTyp from './SelectTyp';
import Submit from './Submit';
import useData from './useData';
interface FormProps {
  id?: number;
  parent_id?: number | null;
  onClose: (id?: number) => void;
}
export default function Form({ id, parent_id, onClose }: FormProps) {
  const dispatch = useDgDispatch();
  const { t } = useTranslation();
  React.useEffect(() => {
    if (id) {
      const sub = getDebtGuarantor(id).subscribe((res) => {
        dispatch(setDebtGuarantor(res));
      });
      return sub.unsubscribe.bind(sub);
    } else {
      dispatch(resetDebtGuarantor());
      if (parent_id) dispatch(setDebtGuarantorValue(['parent_id', parent_id]));
    }
  }, [dispatch, id, parent_id]);
  const data = useData('id');
  return (
    <>
      <DialogTitle>{t('form.debt_guarantor.name')}</DialogTitle>
      <DialogContent>
        <Grid
          container
          width="100%"
          spacing={1}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={1}>
            <TextField
              label={t('form.debt_guarantor.id')}
              value={data.value}
              disabled
            />
          </Grid>
          <Fio />
          <SelectTyp />
          <SelectRole />
          <ExtId />
        </Grid>
        <Grid
          width="100%"
          container
          direction="row"
          spacing={1}
          justifyContent="center"
          alignItems="flex-start"
        >
          <DialogPhysics />
          <Finance />
        </Grid>
        {id && <AddressGrid />}
      </DialogContent>
      <DialogActions>
        <Submit onClose={onClose} />
      </DialogActions>
    </>
  );
}
