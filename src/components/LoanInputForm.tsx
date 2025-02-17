import React from 'react';
import { 
  Card, 
  CardContent, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Stack,
  Typography,
  Grid
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LoanParams } from '../types/loan';
import { SelectChangeEvent } from '@mui/material/Select';

interface LoanInputFormProps {
  loanParams: LoanParams;
  onParamsChange: (params: LoanParams) => void;
}

const defaultValues: LoanParams = {
  amount: 100000,
  interestRate: 6,
  years: 10,
  months: 0,
  paymentPeriod: 'monthly',
  amortizationType: 'french',
  numberOfPeople: 1
};

const LoanInputForm: React.FC<LoanInputFormProps> = ({ loanParams, onParamsChange }) => {
  const { t } = useTranslation();

  // Set default values when mounting the component
  React.useEffect(() => {
    onParamsChange(defaultValues);
  }, []);

  const handleNumberChange = (field: keyof LoanParams) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value === '' ? 0 : Number(event.target.value);
    onParamsChange({
      ...loanParams,
      [field]: value
    });
  };

  const handleSelectChange = (field: keyof LoanParams) => (
    event: SelectChangeEvent
  ) => {
    onParamsChange({
      ...loanParams,
      [field]: event.target.value
    });
  };

  const inputSx = {
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    },
    '& input[type=number]': {
      '-moz-appearance': 'textfield'
    }
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={3}>
          <Typography variant="h5" component="h1" gutterBottom>
            {t('appTitle')}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {t('appDescription')}
          </Typography>

          <Grid container spacing={2} sx={{ mx: 'auto', width: { xs: 'calc(100% - 20px)', sm: 'calc(100% - 24px)' } }}>
            <Grid item xs={6}>
              <TextField
                label={t('amount')}
                type="number"
                value={loanParams.amount || ''}
                onChange={handleNumberChange('amount')}
                fullWidth
                sx={inputSx}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label={t('interestRate')}
                type="number"
                value={loanParams.interestRate || ''}
                onChange={handleNumberChange('interestRate')}
                fullWidth
                InputProps={{
                  endAdornment: '%'
                }}
                sx={inputSx}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mx: 'auto', width: { xs: 'calc(100% - 20px)', sm: 'calc(100% - 24px)' } }}>
            <Grid item xs={6}>
              <TextField
                label={t('years')}
                type="number"
                value={loanParams.years || ''}
                onChange={handleNumberChange('years')}
                fullWidth
                sx={inputSx}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label={t('months')}
                type="number"
                value={loanParams.months}
                onChange={handleNumberChange('months')}
                fullWidth
                sx={inputSx}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mx: 'auto', width: { xs: 'calc(100% - 20px)', sm: 'calc(100% - 24px)' } }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>{t('paymentPeriod')}</InputLabel>
                <Select
                  value={loanParams.paymentPeriod}
                  onChange={handleSelectChange('paymentPeriod')}
                  label={t('paymentPeriod')}
                >
                  {['daily', 'weekly', 'biweekly', 'monthly', 'bimonthly', 'quarterly', 'semiannual', 'annual'].map(period => (
                    <MenuItem key={period} value={period}>
                      {t(period)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mx: 'auto', width: { xs: 'calc(100% - 20px)', sm: 'calc(100% - 24px)' } }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>{t('amortizationType')}</InputLabel>
                <Select
                  value={loanParams.amortizationType}
                  onChange={handleSelectChange('amortizationType')}
                  label={t('amortizationType')}
                >
                  {['french', 'german', 'american'].map(type => (
                    <MenuItem key={type} value={type}>
                      {t(type)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mx: 'auto', width: { xs: 'calc(100% - 20px)', sm: 'calc(100% - 24px)' } }}>
            <Grid item xs={12}>
              <TextField
                label={t('numberOfPeople')}
                type="number"
                value={loanParams.numberOfPeople || ''}
                onChange={handleNumberChange('numberOfPeople')}
                fullWidth
                sx={inputSx}
                inputProps={{ min: 1 }}
              />
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default LoanInputForm; 