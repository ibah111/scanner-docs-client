import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import getDocs from "../../api/getDocs";
import { useAppDispatch } from "../../Reducer";
import { resetDocs, setDocs } from "../../Reducer/Docs";
import Link from "../Link";

export default function UpdateDocs() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useAppDispatch();
  const [connected, setConnected] = React.useState(false);
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
        Документы
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
        <MenuItem></MenuItem>
        {!connected ? (
          <MenuItem
            component={Link}
            href="../GridData"
            onClick={() => {
              setConnected(true);
            }}
          >
            <em>Открыть все</em>
          </MenuItem>
        ) : (
          <MenuItem
            component={Link}
            href="../MainPage"
            onClick={() => {
              setConnected(false);
            }}
          >
            <em>Закрыть</em>
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
