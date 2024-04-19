import { createTheme as createThemeOrigin, Theme } from '@mui/material';
import { deepmerge } from '@mui/utils';
export function createTheme(old: Theme) {
  return deepmerge(
    createThemeOrigin({
      components: {
        MuiTextField: {
          defaultProps: { margin: 'dense', fullWidth: true },
        },
        MuiFormControl: { defaultProps: { margin: 'dense', fullWidth: true } },
      },
    }),
    old,
  );
}
