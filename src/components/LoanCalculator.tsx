import React, { useState } from 'react';
import { Box, Grid, Container } from '@mui/material';
import LoanInputForm from './LoanInputForm';
import LoanResults from './LoanResults';
import { LoanParams } from '../types/loan';

const LoanCalculator: React.FC = () => {
  const [loanParams, setLoanParams] = useState<LoanParams>({
    amount: 0,
    interestRate: 0,
    years: 0,
    months: 0,
    paymentPeriod: 'monthly',
    amortizationType: 'french',
    numberOfPeople: 1
  });

  return (
    <Box sx={{ flexGrow: 1, px: { xs: 1, sm: 2 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2 } }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <LoanInputForm 
              loanParams={loanParams} 
              onParamsChange={setLoanParams} 
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <LoanResults loanParams={loanParams} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LoanCalculator; 