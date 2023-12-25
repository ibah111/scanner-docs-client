import { Grid } from '@mui/material';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import useAdminPageGrid from './useAdminPageGrid';
import { CustomToolbar } from '../../components/CustomToolbar';
import CustomPagination from '../../components/Pagination/CustomPagination';
import React from 'react';
import AddRoleDialog from './AddRoleDialog/AddRoleDialog';
import useAddRoleDialogControl from './AddRoleDialog/useAddRoleDialogControl';
export enum AdminPageEvents {
  openAddRoleDialog = 'openAddRoleDialog',
}
export class AdminPageDialog<Value = number | string | object> extends Event {
  constructor(type: AdminPageEvents, value: Value) {
    super(type);
    this.value = value;
  }
  value: Value;
}
export default function AmdinPage() {
  const EventTargets = React.useMemo(() => new EventTarget(), []);
  const { ...gridProps } = useAdminPageGrid(EventTargets);
  const control = useAddRoleDialogControl({
    EventTarget: EventTargets,
    refresh: () => {},
  });
  return (
    <>
      <Grid
        item
        xs
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ minHeight: 0, minWidth: 0 }}
      >
        <DataGridPremium
          pagination
          sx={{ width: '100%' }}
          paginationMode="server"
          filterMode="server"
          sortingMode="server"
          slots={{
            toolbar: CustomToolbar,
            pagination: CustomPagination,
          }}
          {...gridProps}
        />
      </Grid>
      {control.open && (
        <AddRoleDialog open={control.open} onClose={control.onClose} />
      )}
    </>
  );
}
