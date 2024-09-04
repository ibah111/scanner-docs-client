import { Portfolio } from '@contact/models';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import React from 'react';
import PortfolioToRequisitesColumns from './PortfolioToRequisitesColumns';
import AddToolbar from './Toolbar/AddToolbar';
import SearchAndAddDialog from './Toolbar/SearchAndAddDialog';
import getAllLinksByRequisites from '../../../../../../../../../../apiSend/PortfoliosToRequisites/getAllLinksByRequisites';

interface DialogProps {
  open: boolean;
  id: number;
  onClose: () => void;
}

export default function PortfoliosToRequisits({
  id,
  onClose,
  open,
}: DialogProps) {
  const [rows, setRows] = React.useState<Portfolio[]>([]);
  const [openPortfolio, setOpenPortfolio] = React.useState<boolean>(false);
  const callback = React.useCallback(() => {
    getAllLinksByRequisites(id).subscribe((result) => setRows(result));
  }, [id]);

  const columns = PortfolioToRequisitesColumns({
    id,
    refresh: callback,
  });

  React.useEffect(() => {
    if (id > 0) {
      callback();
    }
  }, [callback, id]);
  /**
   @todo
   * 
   */

  const handleOpenFunction = () => {
    setOpenPortfolio(true);
  };
  const handleClosePortfolio = () => {
    setOpenPortfolio(false);
    getAllLinksByRequisites(id).subscribe((result) => setRows(result));
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth={'xl'}
        sx={{ width: '100%', height: '100%' }}
      >
        <DialogTitle>{`Привязанные портфели к реквизиту`}</DialogTitle>
        <DialogContent>
          <DataGridPremium
            columns={columns}
            rows={rows}
            autoHeight
            slots={{
              toolbar: AddToolbar,
            }}
            slotProps={{
              toolbar: {
                handleOpenFunction,
              },
            }}
          />
          {openPortfolio && (
            <SearchAndAddDialog
              id={id}
              open={openPortfolio}
              onClose={handleClosePortfolio}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
