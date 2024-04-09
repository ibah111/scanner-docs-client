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
  const [columns] = React.useState(getColumns());
  const dispatch = useAppDispatch();
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
  }, [apiRef]);
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
          getRowClassName={(params) =>
            status_rejected.includes(params.row['Debt.status'])
              ? classes.rejected
              : ''
          }
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
