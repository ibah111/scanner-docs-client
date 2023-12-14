import React from 'react';
import { EventDialogInterface } from '../../../utils/EventDialogInterface';
import { DocumentEvents, EventDocumentDialog } from '..';

interface usePrintDialog extends EventDialogInterface {}

export default function usePrintControl({
  EventTarget,
  refresh,
}: usePrintDialog) {
  const [open, setOpen] = React.useState(false);
  const [docId, setDocId] = React.useState<number>(0);

  React.useEffect(() => {
    const callback = ((event: EventDocumentDialog) => {
      setDocId(event.value as number);
      setOpen(true);
    }) as EventListener;
    EventTarget.addEventListener(DocumentEvents.openPrintDialog, callback);
  }, []);
  const closePrintDialog = React.useCallback(() => {
    setDocId(0);
    setOpen(false);
    refresh();
  }, [refresh, EventTarget]);
  return {
    open,
    docId,
    closePrintDialog,
  };
}
