import { darken, Grid, lighten, styled } from '@mui/material';
import { DataGridPremium, useGridApiRef } from '@mui/x-data-grid-premium';
import React from 'react';
import { LawExecPlain } from '../../../../../apiSend/Search/search';
import version from '../../../../../utils/version';
import PopoverHook from '../PopoverHook';
import Dialogs from './Dialogs';
import getColumns from './getColumns';
import { useAppDispatch, useAppSelector } from '../../../../../Reducer';
import { setPageState } from '../../../../../Reducer/StateResult';
const getBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getHoverBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);
const PREFIX = 'ResultsLawExec';
const classes = {
  root: `${PREFIX}-root`,
  rejected: `${PREFIX}-rejected`,
};
const status_rejected = version.rejected;
const law_act_status_rejected = version.rejected_law_act;
const Root = styled(Grid)(({ theme }) => ({
  [`& .${classes.rejected}`]: {
    backgroundColor: getBackgroundColor(
      theme.palette.error.main,
      theme.palette.mode,
    ),
    '&:hover': {
      backgroundColor: getHoverBackgroundColor(
        theme.palette.error.main,
        theme.palette.mode,
      ),
    },
  },
}));
export default function Results() {
  const dispatch = useAppDispatch();
  const [columns] = React.useState(getColumns());
  const [dialog, setDialog] = React.useState(false);
  const [row, setRow] = React.useState<LawExecPlain>();
  const apiRef = useGridApiRef();
  const rows = useAppSelector((state) => state.Results);
  const stateGrid = useAppSelector((state) => state.StateResult.create);
  const { handlePopoverOpen, handlePopoverClose, ElementPopover } = PopoverHook(
    rows.data,
  );
  React.useEffect(() => {
    apiRef.current.restoreState(stateGrid);
  }, [apiRef, stateGrid]);
  return (
    <>
      <Root sx={{ width: '100%' }} xs minHeight={0} item>
        <DataGridPremium
          columns={columns}
          rows={rows.data}
          apiRef={apiRef}
          loading={rows.loading}
          onStateChange={() => {
            dispatch(setPageState(apiRef.current.exportState()));
          }}
          slotProps={{
            cell: {
              onMouseEnter: handlePopoverOpen,
              onMouseLeave: handlePopoverClose,
            },
          }}
          disableRowSelectionOnClick
          disableColumnSelector
          getRowClassName={(params) => {
            /**
             * Решил "поговнокодить"
             * т.к. это единтсвенный способ
             * выполнить то что от меня требуется
             * Сделал
             */
            const debt_reject = status_rejected.includes(
              params.row['Debt.status'],
            )
              ? classes.rejected
              : '';
            const law_act_reject = law_act_status_rejected.includes(
              params.row['LawAct.StatusDict.name'],
            )
              ? classes.rejected
              : '';
            if (debt_reject && law_act_reject) {
              return classes.rejected;
            } else if (debt_reject) {
              return classes.rejected;
            } else if (law_act_reject) {
              return classes.rejected;
            }
            return '';
          }}
          onCellDoubleClick={(params) => {
            setRow(params.row);
            setDialog(true);
          }}
        />
      </Root>
      <ElementPopover />
      {row && (
        <Dialogs open={dialog} onClose={() => setDialog(false)} row={row} />
      )}
    </>
  );
}
