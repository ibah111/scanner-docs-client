import { Button, Link, Menu, MenuItem } from "@mui/material";
import React from "react";

export default function OpenAdmin() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        id="basic-button"
        color="secondary"
        sx={{ width: "180px" }}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
      >
        Настройки ролей
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem component={Link} href="../GridDataRole">
          <em>Открыть</em>
        </MenuItem>
        <MenuItem component={Link} href="../MainPage">
          <em>Закрыть</em>
        </MenuItem>
      </Menu>
    </>
  );
}
