import { DocAttach } from '@contact/models';
import { DataGridPremium, useGridApiRef } from '@mui/x-data-grid-premium';
import React from 'react';
import getLawExecDocuments from '../../../../../../../apiSend/Documents/getLawExecDocuments';
import { useAppDispatch, useAppSelector } from '../../../../../../../Reducer';
import { setDocumentsState } from '../../../../../../../Reducer/StateResult';
import BackDrop from './BackDrop';
import DialogFile from './DialogFile';
import { getLawExecColumns } from './getColumns';
interface DocumentsTableProps {
  id: number;
}
export default function LawExecDocumentsTable({ id }: DocumentsTableProps) {
  const refresh = React.useCallback(() => {
    const sub = getLawExecDocuments(id, 'law_exec').subscribe((res) => {
      setRows(res);
    });
    return sub.unsubscribe.bind(sub);
  }, [id]);
  const [columns] = React.useState(getLawExecColumns(refresh));
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState<number | null>(null);
  const stateGrid = useAppSelector((state) => state.StateResult.documents);
  const apiRef = useGridApiRef();
  const dispatch = useAppDispatch();
  const [rows, setRows] = React.useState<DocAttach[]>([]);
  React.useEffect(() => {
    apiRef.current.restoreState(stateGrid);
    return refresh();
  }, [apiRef, refresh]);
  return (
    <>
      <DialogFile
        file={file}
        open={open}
        onClose={() => {
          setOpen(false);
          setFile(null);
        }}
      />
      <BackDrop id={id} refresh={refresh}>
        <DataGridPremium
          apiRef={apiRef}
          onStateChange={() => {
            dispatch(setDocumentsState(apiRef.current.exportState()));
          }}
          sx={{
            cursor: 'default',
            userSelect: 'none',
            '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
          }}
          columns={columns}
          disableColumnReorder
          slotProps={{
            cell: {
              disableDragEvents: true,
            },
          }}
          disableRowSelectionOnClick
          onCellDoubleClick={(params, event) => {
            event.defaultMuiPrevented = true;
            setFile(params.id as number);
            setOpen(true);
          }}
          rows={rows}
        />
      </BackDrop>
    </>
  );
}
