import React from 'react';
import { EventDialogInterface } from '../../../utils/EventDialogInterface';
import { AdminPageEvents } from '..';
import { EventDocumentDialog } from '../../DocumentPage';
interface useAdminDialog extends EventDialogInterface {}
export default function useAddRoleDialogControl({
  EventTarget,
  refresh,
}: useAdminDialog) {
  const [userId, setUserId] = React.useState<number>(0);
  const [open, setOpen] = React.useState<boolean>(false);
  React.useEffect(() => {
    const callback = ((event: EventDocumentDialog) => {
      const value = event.value as number;
      setUserId(value);
      setOpen(true);
    }) as EventListener;
    EventTarget.addEventListener(AdminPageEvents.openAddRoleDialog, callback);
    return () =>
      EventTarget.addEventListener(AdminPageEvents.openAddRoleDialog, callback);
  });
  const onClose = React.useCallback(() => {
    setOpen(false);
    refresh();
  }, []);
  return { open, onClose, userId };
}
