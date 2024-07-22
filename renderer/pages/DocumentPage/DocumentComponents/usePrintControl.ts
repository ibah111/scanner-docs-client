import React from 'react';
import { EventDialogInterface } from '../../../utils/EventDialogInterface';
import { DocumentEvents, EventDocumentDialog } from '..';
import getCodes from '../../../api/Codes/getCodes';

interface usePrintDialog extends EventDialogInterface {}

export default function usePrintControl({
  EventTarget,
  refresh,
}: usePrintDialog) {
  const [open, setOpen] = React.useState(false);
  const [docId, setDocId] = React.useState<number>(0);
  const [docCode, setDocCode] = React.useState<string>('');
  const [titleCode, setTitleCode] = React.useState<string>('');
  React.useEffect(() => {
    const callback = ((event: EventDocumentDialog) => {
      const value = event.value as number;
      const title = event.title as string;
      setTitleCode(title);
      setDocId(value);
      setOpen(true);
      getCodes(value).then((code) => {
        setDocCode(code);
      });
    }) as EventListener;
    EventTarget.addEventListener(DocumentEvents.openPrintDialog, callback);
  }, [EventTarget]);
  const closePrintDialog = React.useCallback(() => {
    setDocId(0);
    setOpen(false);
    refresh();
  }, [refresh]);
  return {
    open,
    docId,
    docCode,
    closePrintDialog,
    titleCode,
  };
}
