import { LicenseInfo, generateLicense } from '@mui/x-license-pro';
import moment from 'moment';
const expiryDate = moment().add(1, 'y').toDate();
const license = generateLicense({
  expiryDate,
  orderNumber: 'MUI-45675676',
  scope: 'premium',
  licensingModel: 'perpetual',
});
LicenseInfo.setLicenseKey(license);
