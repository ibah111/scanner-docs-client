import { darken, Grid, lighten, styled } from '@mui/material';
import { DataGridPremium, useGridApiRef } from '@mui/x-data-grid-premium';
import React from 'react';
import createExec from '../../../../../apiSend/Exec/createExec';
import getComment from '../../../../../apiSend/Comment/getComment';
import getLawAct, {
  LawActPlain,
} from '../../../../../apiSend/LawAct/getLawAct';
import version from '../../../../../utils/version';
import PopoverHook from '../PopoverHook';
import Canceled from './Canceled';
import getColumns from './getColumns';
import { map, mergeMap, tap } from 'rxjs';
import { useAppDispatch, useAppSelector } from '../../../../../Reducer';
import { ResetComment, setLawActComment } from '../../../../../Reducer/Comment';
import { setId } from '../../../../../Reducer/Send';
import { setCreateState } from '../../../../../Reducer/StateResult';

const getBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getHoverBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);
const PREFIX = 'ResultsLawAct';
const classes = {
  root: `${PREFIX}-root`,
  rejected: `${PREFIX}-rejected`,
};
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

const status_rejected = version.rejected;

export default function Table({ handleClose }: { handleClose: () => void }) {
  const [columns] = React.useState(getColumns());
  const dispatch = useAppDispatch();
  const [rows, setRows] = React.useState<LawActPlain[]>([]);
  const [row, setRow] = React.useState<LawActPlain>();
  const [loading, setLoading] = React.useState(false);
  const [openCanceled, setOpenCanceled] = React.useState(false);
  const search = useAppSelector((state) => state.Search);
  const apiRef = useGridApiRef();
  const stateGrid = useAppSelector((state) => state.StateResult.create);
  const { handlePopoverOpen, handlePopoverClose, ElementPopover } =
    PopoverHook(rows);

  React.useEffect(() => {
    setLoading(true);
    const sub = getLawAct().subscribe((res) => {
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
      <Root sx={{ width: '100%', height: 400 }} item>
        <DataGridPremium
          columns={columns}
          rows={rows}
          loading={loading}
          apiRef={apiRef}
          slotProps={{
            cell: {
              onMouseEnter: handlePopoverOpen,
              onMouseLeave: handlePopoverClose,
            },
          }}
          onStateChange={() => {
            dispatch(setCreateState(apiRef.current.exportState()));
          }}
          disableRowSelectionOnClick
          disableColumnSelector
          getRowClassName={(params) =>
            status_rejected.includes(params.row['Debt.status'])
              ? classes.rejected
              : ''
          }
          onCellDoubleClick={(params) => {
            if (params.row['Debt.status'])
              if (params.row['Debt.status'] !== 7) {
                dispatch(ResetComment());
                createExec(params.row.id)
                  .pipe(
                    mergeMap((value) =>
                      getComment({ type: 'law_act', id: params.row.id }).pipe(
                        tap((res) => {
                          dispatch(setLawActComment(res.dsc));
                        }),
                        map(() => value),
                      ),
                    ),
                  )
                  .subscribe((res) => {
                    if (res) {
                      dispatch(setId(res));
                      handleClose();
                    }
                  });
              } else {
                setRow(params.row);
                setOpenCanceled(true);
              }
          }}
        />
        <ElementPopover />
        {row && (
          <Canceled
            onClose={() => setOpenCanceled(false)}
            open={openCanceled}
            row={row}
            next={() => {
              handleClose();
            }}
          />
        )}
      </Root>
    </>
  );
}
