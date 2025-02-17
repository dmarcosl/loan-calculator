export type PaymentPeriod = 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'bimonthly' | 'quarterly' | 'semiannual' | 'annual';

export type AmortizationType = 'french' | 'german' | 'american';

export interface LoanParams {
  amount: number;
  interestRate: number;
  years: number;
  months: number;
  paymentPeriod: PaymentPeriod;
  amortizationType: AmortizationType;
  numberOfPeople: number;
}

export interface PaymentRow {
  paymentNumber: number;
  payment: number;
  paymentPerPerson?: number;
  principal: number;
  interest: number;
  remainingBalance: number;
  principalPaidPercentage: number;
} 