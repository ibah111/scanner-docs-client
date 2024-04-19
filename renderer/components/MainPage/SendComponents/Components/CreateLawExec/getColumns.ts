import { GridColDef } from '@mui/x-data-grid-pro';
import { t } from 'i18next';

export default function getColumns(): GridColDef[] {
  return [
    { field: 'Person.id', headerName: t('form.results.person.id'), width: 70 },
    { field: 'Debt.id', headerName: t('form.results.debt.id'), width: 70 },
    { field: 'id', headerName: t('form.results.law_act.id'), width: 70 },
    {
      field: 'Person.fio',
      headerName: t('form.results.person.fio'),
      width: 200,
    },
    {
      field: 'LawActPersonLink.DebtGuarantor.fio',
      headerName: t('form.results.debt_guarantor.fio'),
      width: 200,
    },
    {
      field: 'Debt.contract',
      headerName: t('form.results.debt.contract'),
      width: 150,
    },
    {
      field: 'Debt.name',
      width: 200,
      headerName: t('form.results.debt.name'),
    },
    {
      field: 'Address',
      headerName: t('form.results.address'),
      width: 200,
      valueGetter: (params) =>
        params.row['Person.Addresses']?.[0]?.full_adr
          ? params.row['Person.Addresses']?.[0]?.full_adr
          : `АДРЕС НЕ ЗАПОЛЕН. НАДО НАЙТИ ДОЛГ ПО ID = ${params.row['Debt.id']}`,
    },
    { field: 'Debt.debt_sum', headerName: t('form.results.debt.debt_sum') },
    {
      field: 'Portfolio.name',
      headerName: t('form.results.portfolio.name'),
    },
    {
      field: 'Debt.StatusDict.name',
      headerName: t('form.results.debt.status'),
    },
    {
      field: 'typ',
      headerName: t('form.results.law_act.typ'),
      valueGetter: (params) => {
        switch (params.value) {
          case 0:
            return 'Не определено';
          case 1:
            return 'Приказ';
          case 2:
            return 'Иск';
          case 3:
            return 'Правопреемство';
          case 4:
            return 'Банкротство';
          default:
            return 'Не определено';
        }
      },
    },
    {
      field: 'Status',
      width: 300,
      headerName: t('form.results.law_act.status'),
      valueGetter: (params) => {
        switch (params.row['typ']) {
          case 0:
            return params.row['ActStatusDict.name'];
          case 1:
            return params.row['StatusDict.name'];
          case 2:
            return params.row['ActStatusDict.name'];
          case 3:
            return params.row['ActStatusDict.name'];
          case 4:
            return params.row['ActStatusDict.name'];
          default:
            return params.row['ActStatusDict.name'];
        }
      },
    },
  ];
}
