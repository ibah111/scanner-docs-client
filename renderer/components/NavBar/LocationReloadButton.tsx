import { Button, Tooltip } from '@mui/material';
import React from 'react';
import ReplayIcon from '@mui/icons-material/Replay';

export default function LocationReloadButton() {
  const handleReload = React.useCallback(() => {
    document.location.reload();
  }, []);
  return (
    <>
      <Tooltip title="Перезагрузить приложение">
        <Button
          onClick={() => handleReload()}
          color="inherit"
          id="basic-button"
          sx={{
            mt: 0.5,
          }}
        >
          <ReplayIcon />
        </Button>
      </Tooltip>
    </>
  );
}
