import { Address } from '@contact/models';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import updateDebtGuarantorAddress from '../../../../../../../apiSend/updateDebtGuarantorAddress';
import {
  resetDebtGuarantorAddress,
  setDebtGuarantorAddress,
  setDebtGuarantorAddressValue,
  useDgDispatch,
  useDgSelector,
} from '../../Reducer';
import Dsc from './Dsc';
import FullAdr from './FullAdr';
import Typ from './Typ';

interface FormProps {
  address?: Address;
  r_debt_guarantor: number;
  debt_id: number;
  onClose: () => void;
}
export default function Form({
  address,
  r_debt_guarantor,
  debt_id,
  onClose,
}: FormProps) {
  const { t } = useTranslation();
  const data = useDgSelector((state) => state.Address);
  const dispatch = useDgDispatch();
  React.useEffect(() => {
    if (address) {
      dispatch(setDebtGuarantorAddress(address));
    } else {
      dispatch(resetDebtGuarantorAddress());
      dispatch(setDebtGuarantorAddressValue(['parent_id', debt_id]));
      dispatch(
        setDebtGuarantorAddressValue(['r_debt_guarantor_id', r_debt_guarantor]),
      );
    }
  }, [address, debt_id, dispatch, r_debt_guarantor]);
  return (
    <Dialog open={true} fullWidth onClose={onClose}>
      <DialogTitle>{t('form.address.name')}</DialogTitle>
      <DialogContent>
        <Typ />
        <FullAdr />
        <Dsc />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() =>
            updateDebtGuarantorAddress(data).subscribe(() => onClose())
          }
        >
          {t('form.address.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
