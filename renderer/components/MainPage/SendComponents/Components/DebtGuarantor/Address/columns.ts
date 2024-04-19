import { Address } from '@contact/models';
import { GridColDef } from '@mui/x-data-grid-premium';
import { t } from 'i18next';
export default function getColumns() {
  const columns: GridColDef<Address>[] = [
    {
      field: 'id',
      headerName: t('form.address.id'),
      type: 'number',
    },
    {
      field: 'typ',
      headerName: t('form.address.typ'),
      valueGetter: (params) => params.row.Typ?.name,
    },
    { field: 'full_adr', headerName: t('form.address.full_adr') },
  ];
  return columns;
}
