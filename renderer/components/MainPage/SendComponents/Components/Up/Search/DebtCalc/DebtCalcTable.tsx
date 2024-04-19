import { DebtCalc, Dict } from '@contact/models';
import { Box } from '@mui/material';
import {
  DataGridPremium,
  GridColDef,
  GridValueGetterParams,
  useGridApiRef,
} from '@mui/x-data-grid-premium';
import { t } from 'i18next';
import React from 'react';
import getDebtCalc from '../../../../../../../apiSend/DebtCalc/getDebtCalc';
import { useAppDispatch, useAppSelector } from '../../../../../../../Reducer';
import { setDebtCalcState } from '../../../../../../../Reducer/StateResult';
const getColumns = () => {
  const columns: GridColDef<DebtCalc>[] = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'dt',
      type: 'dateTime',
      headerName: t('form.debt_calc.table.dt'),
      valueGetter: (params) => new Date(params.value),
    },
    {
      field: 'calc_date',
      type: 'date',
      headerName: t('form.debt_calc.table.calc_date'),
      valueGetter: (params) => new Date(params.value),
    },
    { field: 'sum', type: 'number', headerName: t('form.debt_calc.table.sum') },
    {
      field: 'PurposeDict',
      headerName: t('form.debt_calc.table.purpose'),
      valueGetter: (params: GridValueGetterParams<DebtCalc, Dict>) =>
        params.value?.name,
    },
    { field: 'dsc', headerName: t('form.debt_calc.table.dsc') },
  ];
  return columns;
};
interface DebtCalcTableProps {
  id: number;
}
export default function DebtCalcTable({ id }: DebtCalcTableProps) {
  const [columns] = React.useState(getColumns());
  const stateGrid = useAppSelector((state) => state.StateResult.debt_calc);
  const apiRef = useGridApiRef();
  const dispatch = useAppDispatch();
  const [rows, setRows] = React.useState<DebtCalc[]>([]);
  React.useEffect(() => {
    const sub = getDebtCalc(id).subscribe(setRows);
    apiRef.current.restoreState(stateGrid);
    return sub.unsubscribe.bind(sub);
  }, [apiRef, id]);
  return (
    <>
      <Box sx={{ width: '100%', height: 400 }}>
        <DataGridPremium
          apiRef={apiRef}
          onStateChange={() => {
            dispatch(setDebtCalcState(apiRef.current.exportState()));
          }}
          columns={columns}
          rows={rows}
        />
      </Box>
    </>
  );
}
