import { GridColDef } from '@mui/x-data-grid-premium';
import { t } from 'i18next';

export default function getColumns(): GridColDef[] {
  const columns: GridColDef[] = [
    { field: 'id', headerName: t('form.results.debt.id') },
    { field: 'Person.fio', headerName: t('form.results.person.fio') },
    { field: 'debt_sum', headerName: t('form.results.debt.debt_sum') },
    { field: 'contract', headerName: t('form.results.debt.contract') },
    { field: 'StatusDict.name', headerName: t('form.results.debt.status') },
    { field: 'Portfolio.name', headerName: t('form.results.portfolio.name') },
  ];
  return columns;
}
