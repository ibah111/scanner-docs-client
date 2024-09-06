import { Grid, InputBaseComponentProps, TextField } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import React from 'react';
import getData from '../../../../../../../utils/getData';
import { useTranslation } from 'react-i18next';
interface NumberCustomProps {
  onChange: (args: { target: { name: string; value: string } }) => void;
  name: string;
}
export const NumberFormatCustom = React.forwardRef<
  HTMLInputElement,
  NumberCustomProps
>(function NumberFormatCustom(props, ref) {
  const { onChange, name, ...other } = props;
  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: name,
            value: values.value,
          },
        });
      }}
      thousandSeparator=" "
      decimalSeparator=","
      decimalScale={2}
      isAllowed={({ floatValue }) => {
        if (floatValue && 0 <= floatValue && floatValue <= 10000000) {
          return true;
        } else {
          if (floatValue === undefined) {
            return true;
          }
          return false;
        }
      }}
      suffix="р"
    />
  );
}) as unknown as React.ElementType<InputBaseComponentProps>;
export default function TotalSum() {
  const { t } = useTranslation();
  const total_sum_data = getData('total_sum', 'number', true);

  const court_sum_data = getData('court_sum', 'number');
  const court_sum_value = court_sum_data.value;
  const debt_payments_sum_data = getData(
    'debt_payments_sum',
    'number',
    true,
    true,
  );
  const debt_payments_sum_value = debt_payments_sum_data.value;
  React.useEffect(() => {
    if (court_sum_value && debt_payments_sum_value) {
      const newValue = court_sum_value - debt_payments_sum_value;
      total_sum_data.setValue(newValue);
    }
  });
  return (
    <>
      <Grid item>
        <TextField
          disabled
          error={!total_sum_data.value || total_sum_data.isInvalid}
          label={t('form.send.total_sum')}
          value={total_sum_data.value}
          required
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
          onChange={(event) =>
            total_sum_data.setValue(Number(event.target.value))
          }
        />
      </Grid>
    </>
  );
}
