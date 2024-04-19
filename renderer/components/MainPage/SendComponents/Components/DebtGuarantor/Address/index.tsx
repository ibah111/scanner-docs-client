import { Address } from '@contact/models';
import { Box, Button } from '@mui/material';
import {
  DataGridPremium,
  GridToolbarContainer,
} from '@mui/x-data-grid-premium';
import React from 'react';
import { useTranslation } from 'react-i18next';
import getDebtGuarantorAddress from '../../../../../../apiSend/DebtGuarantor/getDebtGuarantorAddress';
import useData from '../useData';
import getColumns from './columns';
import Form from './Form';
import { useObservableMemo } from '../../../../../../utils/useObservableMemo';
interface CustomToolbarProps {
  onCreate: () => void;
}
function CustomToolbar({ onCreate }: CustomToolbarProps) {
  const { t } = useTranslation();
  return (
    <GridToolbarContainer>
      <Button onClick={() => onCreate()}>{t('form.address.create')}</Button>
    </GridToolbarContainer>
  );
}
export default function AddressGrid() {
  const columns = React.useMemo(() => getColumns(), []);
  const { value: id } = useData('id');
  const { value: debt_id } = useData('parent_id');
  const [address, setAddress] = React.useState<Address>();
  const [open, setOpen] = React.useState(false);
  const rows = useObservableMemo(
    () => (id ? getDebtGuarantorAddress(id as number) : undefined),
    [id, open],
  );
  return (
    <Box sx={{ display: 'flex', height: 300 }}>
      <DataGridPremium
        columns={columns}
        slots={{ toolbar: CustomToolbar }}
        slotProps={{
          toolbar: {
            onCreate() {
              setAddress(undefined);
              setOpen(true);
            },
          },
        }}
        rows={rows || []}
        onCellDoubleClick={(params) => {
          setAddress(params.row);
          setOpen(true);
        }}
      />
      {open && (
        <Form
          address={address}
          debt_id={debt_id as number}
          r_debt_guarantor={id as number}
          onClose={() => setOpen(false)}
        />
      )}
    </Box>
  );
}
