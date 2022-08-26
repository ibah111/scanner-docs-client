import { generateLicense, LicenseInfo } from '@mui/x-license-pro';
export default function license() {
  const oneDayInMS = 1000 * 60 * 60 * 24;
  const oneYear = oneDayInMS * 365;
  const validLicense = generateLicense({
    expiryDate: new Date(new Date().getTime() + oneYear),
    orderNumber: 'MUI-45675676',
    scope: 'premium',
  });
  LicenseInfo.setLicenseKey(validLicense);
}
license();
