import { Button } from '@mui/material';
import React from 'react';
import Link from '../Linker';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
/**@deprecated */
export default function OpenAdminPage() {
  return (
    <>
      <Button
        id="basic-button"
        color="inherit"
        variant="text"
        component={Link}
        href="../AdminPage"
      >
        <AdminPanelSettingsIcon fontSize="large" />
      </Button>
    </>
  );
}
