import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PaymentRow } from '../types/loan';

interface PaymentScheduleTableProps {
  payments: PaymentRow[];
}

const PaymentScheduleTable: React.FC<PaymentScheduleTableProps> = ({ payments }) => {
  const { t } = useTranslation();
  const showPaymentPerPerson = payments.length > 0 && 'paymentPerPerson' in payments[0];

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t('paymentNumber')}</TableCell>
            <TableCell align="right">{t('payment')}</TableCell>
            {showPaymentPerPerson && (
              <TableCell align="right">{t('paymentPerPerson')}</TableCell>
            )}
            <TableCell align="right">{t('principal')}</TableCell>
            <TableCell align="right">{t('interest')}</TableCell>
            <TableCell align="right">{t('remainingBalance')}</TableCell>
            <TableCell align="right">{t('principalPaidPercentage')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((row) => (
            <TableRow key={row.paymentNumber}>
              <TableCell>{row.paymentNumber}</TableCell>
              <TableCell align="right">{row.payment.toFixed(2)}</TableCell>
              {showPaymentPerPerson && (
                <TableCell align="right">{row.paymentPerPerson?.toFixed(2)}</TableCell>
              )}
              <TableCell align="right">{row.principal.toFixed(2)}</TableCell>
              <TableCell align="right">{row.interest.toFixed(2)}</TableCell>
              <TableCell align="right">{row.remainingBalance.toFixed(2)}</TableCell>
              <TableCell align="right">{`${(row.principalPaidPercentage * 100).toFixed(1)}%`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaymentScheduleTable; 