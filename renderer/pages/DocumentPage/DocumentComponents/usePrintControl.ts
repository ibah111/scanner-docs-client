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
  const [boxCode, setBoxCode] = React.useState<string>('');

  React.useEffect(() => {
    const callback = ((event: EventDocumentDialog) => {
      const value = event.value as number;
      setDocId(value);
      setOpen(true);
      getCodes(value).then((res) => {
        setDocCode(res.doc_code);
        setBoxCode(res.box_code);
      });
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
    boxCode,
    docCode,
    closePrintDialog,
  };
}
