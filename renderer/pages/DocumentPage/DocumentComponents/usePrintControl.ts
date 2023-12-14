import React from 'react';
import { EventDialogInterface } from '../../../utils/EventDialogInterface';
import { DocumentEvents, EventDocumentDialog } from '..';

interface usePrintDialog extends EventDialogInterface {}

export default function usePrintControl({
  EventTarget,
  refresh,
}: usePrintDialog) {
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = React.useState<number>(0);

  React.useEffect(() => {
    const callback = ((event: EventDocumentDialog) => {
      setCode(event.value as number);
      setOpen(true);
    }) as EventListener;
    EventTarget.addEventListener(DocumentEvents.openPrintDialog, callback);
  }, []);
  const closePrintDialog = React.useCallback(() => {
    setCode(0);
    setOpen(false);
    refresh();
  }, [refresh, EventTarget]);
  return {
    open,
    code,
    closePrintDialog,
  };
}
