import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Tabs, 
  Tab, 
  Box, 
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import { LoanParams } from '../types/loan';
import PaymentScheduleTable from './PaymentScheduleTable';
import LoanCharts from './LoanCharts';
import { calculateLoanPayments } from '../utils/loanCalculations';

interface LoanResultsProps {
  loanParams: LoanParams;
}

const LoanResults: React.FC<LoanResultsProps> = ({ loanParams }) => {
  const [activeTab, setActiveTab] = useState(0);
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const payments = calculateLoanPayments(loanParams);
  const totalPayments = payments.length;
  const totalAmount = payments.reduce((sum, row) => sum + row.payment, 0);
  const totalInterest = totalAmount - loanParams.amount;

  const summarySection = (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
      {/* Primera fila */}
      <Box sx={{ 
        display: 'grid', 
        gap: 2, 
        gridTemplateColumns: { 
          xs: '1fr',
          sm: 'repeat(5, 1fr)'
        }
      }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2">{t('totalPayments')}</Typography>
          <Typography variant="h6">{totalPayments}</Typography>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2">{t('totalLoanAmount')}</Typography>
          <Typography variant="h6">{loanParams.amount.toFixed(2)}</Typography>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2">{t('totalInterest')}</Typography>
          <Typography variant="h6">{totalInterest.toFixed(2)}</Typography>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2">{t('totalAmount')}</Typography>
          <Typography variant="h6">{totalAmount.toFixed(2)}</Typography>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2">{t('payment')}</Typography>
          <Typography variant="h6">{payments[0]?.payment.toFixed(2) || '0.00'}</Typography>
        </Paper>
      </Box>

      {/* Segunda fila - solo visible si hay más de una persona */}
      {loanParams.numberOfPeople > 1 && (
        <Box sx={{ 
          display: 'grid', 
          gap: 2, 
          gridTemplateColumns: { 
            xs: '1fr',
            sm: 'repeat(5, 1fr)'
          }
        }}>
          <Box /> {/* Espacio vacío */}
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">{t('loanAmountPerPerson')}</Typography>
            <Typography variant="h6">
              {(loanParams.amount / loanParams.numberOfPeople).toFixed(2)}
            </Typography>
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">{t('interestPerPerson')}</Typography>
            <Typography variant="h6">
              {(totalInterest / loanParams.numberOfPeople).toFixed(2)}
            </Typography>
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">{t('totalAmountPerPerson')}</Typography>
            <Typography variant="h6">
              {(totalAmount / loanParams.numberOfPeople).toFixed(2)}
            </Typography>
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">{t('paymentPerPerson')}</Typography>
            <Typography variant="h6">
              {((payments[0]?.payment || 0) / loanParams.numberOfPeople).toFixed(2)}
            </Typography>
          </Paper>
        </Box>
      )}
    </Box>
  );

  if (isMobile) {
    return (
      <Card>
        <CardContent>
          {summarySection}
          
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{t('expandTable')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <PaymentScheduleTable payments={payments} />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{t('expandCharts')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <LoanCharts 
                payments={payments} 
                totalAmount={totalAmount}
                totalInterest={totalInterest}
                isMobile={true}
              />
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        {summarySection}

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
            <Tab label={t('paymentSchedule')} />
            <Tab label={t('charts')} />
          </Tabs>
        </Box>

        <Box sx={{ mt: 2 }}>
          {activeTab === 0 ? (
            <PaymentScheduleTable payments={payments} />
          ) : (
            <LoanCharts 
              payments={payments} 
              totalAmount={totalAmount}
              totalInterest={totalInterest}
              isMobile={false}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default LoanResults; 