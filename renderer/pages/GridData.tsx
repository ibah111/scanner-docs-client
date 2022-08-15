import { Box } from "@mui/material";
import Docs from "../components/Docs/Docs";

import { useAppSelector } from "../Reducer";

export default function GridData() {
  const User = useAppSelector((state) => state.User);
  // return <Box>{User.roles.includes("viewer_logs") && <Docs />}</Box>;
  return (
    <Box>
      <Docs />
    </Box>
  );
}
