import { Grid } from '@mui/material';
import { DataGridPremium, useGridApiRef } from '@mui/x-data-grid-premium';
import React from 'react';
import getDebt from '../../../../../../apiSend/Debt/getDebt';
import { LawExecPlain } from '../../../../../../apiSend/Search/search';
import updateDebt from '../../../../../../apiSend/Debt/updateDebt';
import getColumns from './getColumns';
import { useAppDispatch, useAppSelector } from '../../../../../../Reducer';
import { ReloadResults } from '../../../../../../Reducer/Results';
import { setDebtState } from '../../../../../../Reducer/StateResult';

export default function Table({
  row,
  handleClose,
}: {
  row: LawExecPlain;
  handleClose: () => void;
}) {
  const [columns] = React.useState(getColumns());
  const dispatch = useAppDispatch();
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const search = useAppSelector((state) => state.Search);
  const apiRef = useGridApiRef();
  const stateGrid = useAppSelector((state) => state.StateResult.debt);

  React.useEffect(() => {
    setLoading(true);
    const sub = getDebt().subscribe((res) => {
      setRows(res);
      setLoading(false);
    });
    return sub.unsubscribe.bind(sub);
  }, [search]);
  React.useEffect(() => {
    apiRef.current.restoreState(stateGrid);
  }, [apiRef]);
  return (
    <>
      <Grid sx={{ width: '100%', height: 400 }} item>
        <DataGridPremium
          columns={columns}
          rows={rows}
          loading={loading}
          apiRef={apiRef}
          onStateChange={() => {
            dispatch(setDebtState(apiRef.current.exportState()));
          }}
          disableRowSelectionOnClick
          disableColumnSelector
          onCellDoubleClick={(params) => {
            updateDebt({ law_exec_id: row.id }, params.row.id).subscribe(() => {
              dispatch(ReloadResults());
              handleClose();
            });
          }}
        />
      </Grid>
    </>
  );
}
