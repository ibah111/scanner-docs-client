import { DebtGuarantor } from '@contact/models';
import { Button } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import updateDebtGuarantor from '../../../../../apiSend/updateDebtGuarantor';
import { useDgSelector } from './Reducer';
interface SubmitProps {
  onClose: (id?: number) => void;
}
function checkDebtGuarantor(
  data: { update: boolean } | DebtGuarantor,
): data is DebtGuarantor {
  if (data?.update === true) return false;
  return true;
}
export default function Submit({ onClose }: SubmitProps) {
  const data = useDgSelector((state) => state.DebtGuarantor);
  const { t } = useTranslation();
  const save = React.useCallback(() => {
    updateDebtGuarantor(data).subscribe((res) => {
      if (checkDebtGuarantor(res)) {
        onClose(res.id);
      } else {
        onClose();
      }
    });
  }, [data, onClose]);
  return <Button onClick={save}>{t('form.debt_guarantor.save')}</Button>;
}
