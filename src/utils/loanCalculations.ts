import { LoanParams, PaymentRow } from '../types/loan';

const getPaymentsPerYear = (paymentPeriod: string): number => {
  const periodsMap: { [key: string]: number } = {
    daily: 365,
    weekly: 52,
    biweekly: 26,
    monthly: 12,
    bimonthly: 6,
    quarterly: 4,
    semiannual: 2,
    annual: 1
  };
  return periodsMap[paymentPeriod];
};

export const calculateLoanPayments = (params: LoanParams): PaymentRow[] => {
  const {
    amount,
    interestRate,
    years,
    months,
    paymentPeriod,
    amortizationType,
    numberOfPeople
  } = params;

  const totalMonths = years * 12 + months;
  const periodsPerYear = getPaymentsPerYear(paymentPeriod);
  const totalPeriods = Math.ceil((totalMonths * periodsPerYear) / 12);
  const periodicRate = (interestRate / 100) / periodsPerYear;

  let payment: number;
  const payments: PaymentRow[] = [];

  // French system (fixed payments)
  if (amortizationType === 'french') {
    payment = amount * (periodicRate * Math.pow(1 + periodicRate, totalPeriods)) / 
             (Math.pow(1 + periodicRate, totalPeriods) - 1);

    let remainingBalance = amount;
    for (let i = 1; i <= totalPeriods; i++) {
      const interest = remainingBalance * periodicRate;
      const principal = payment - interest;
      remainingBalance -= principal;
      
      payments.push({
        paymentNumber: i,
        payment,
        ...(numberOfPeople > 1 && { paymentPerPerson: payment / numberOfPeople }),
        principal,
        interest,
        remainingBalance: Math.max(0, remainingBalance),
        principalPaidPercentage: (amount - remainingBalance) / amount
      });
    }
  }
  // German system (fixed principal payments)
  else if (amortizationType === 'german') {
    const fixedPrincipal = amount / totalPeriods;
    let remainingBalance = amount;

    for (let i = 1; i <= totalPeriods; i++) {
      const interest = remainingBalance * periodicRate;
      payment = fixedPrincipal + interest;
      remainingBalance -= fixedPrincipal;

      payments.push({
        paymentNumber: i,
        payment,
        ...(numberOfPeople > 1 && { paymentPerPerson: payment / numberOfPeople }),
        principal: fixedPrincipal,
        interest,
        remainingBalance: Math.max(0, remainingBalance),
        principalPaidPercentage: (amount - remainingBalance) / amount
      });
    }
  }
  // American system (interest-only payments with final balloon payment)
  else if (amortizationType === 'american') {
    const interest = amount * periodicRate;
    
    // All payments except the last one are interest-only
    for (let i = 1; i < totalPeriods; i++) {
      payments.push({
        paymentNumber: i,
        payment: interest,
        ...(numberOfPeople > 1 && { paymentPerPerson: interest / numberOfPeople }),
        principal: 0,
        interest,
        remainingBalance: amount,
        principalPaidPercentage: 0
      });
    }

    // Last payment includes the full principal plus interest
    const finalPayment = amount + interest;
    payments.push({
      paymentNumber: totalPeriods,
      payment: finalPayment,
      ...(numberOfPeople > 1 && { paymentPerPerson: finalPayment / numberOfPeople }),
      principal: amount,
      interest,
      remainingBalance: 0,
      principalPaidPercentage: 1
    });
  }

  return payments;
}; 