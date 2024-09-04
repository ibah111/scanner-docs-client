import { IconButton, Tooltip } from '@mui/material';
import TableRowsIcon from '@mui/icons-material/TableRows';

interface Props {
  handleOpen: () => void;
}

export default function RequisitsIconButton({ handleOpen }: Props) {
  return (
    <>
      <Tooltip title="Реквизиты">
        <IconButton onClick={handleOpen}>
          <TableRowsIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}
