import { styled } from '@mui/material/styles';

export const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  padding: theme.spacing(1),
}));
