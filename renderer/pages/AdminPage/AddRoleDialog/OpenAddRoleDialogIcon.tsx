import { GridActionsCellItem } from '@mui/x-data-grid-premium';
import AddIcon from '@mui/icons-material/Add';
import { AdminPageDialog, AdminPageEvents } from '..';
interface openAddRoleDialogIconInterface {
  eventTarget: EventTarget;
  userId: number;
}
export default function OpenAddRoleDialogIcon({
  eventTarget,
  userId,
}: openAddRoleDialogIconInterface) {
  return (
    <GridActionsCellItem
      label="addRole"
      onClick={() => {
        eventTarget.dispatchEvent(
          new AdminPageDialog(AdminPageEvents.openAddRoleDialog, userId),
        );
      }}
      icon={<AddIcon />}
    />
  );
}
