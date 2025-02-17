import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const userLanguage = navigator.language.split('-')[0];
const defaultLanguage = ['es', 'en'].includes(userLanguage) ? userLanguage : 'en';

const currentYear = new Date().getFullYear();

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: defaultLanguage,
  resources: {
    en: {
      translation: {
        appTitle: 'Loan Calculator',
        pageTitle: 'Loan Calculator - Simulate your payments',
        appDescription: 'Simulate your loan payments with different amortization methods and payment periods. Compare options and visualize your payment schedule.',
        amount: 'Amount',
        interestRate: 'Interest Rate',
        years: 'Years',
        months: 'Months',
        paymentPeriod: 'Payment Period',
        amortizationType: 'Amortization Type',
        // Períodos de pago
        daily: 'Daily',
        weekly: 'Weekly',
        biweekly: 'Biweekly',
        monthly: 'Monthly',
        bimonthly: 'Bimonthly',
        quarterly: 'Quarterly',
        semiannual: 'Semiannual',
        annual: 'Annual',
        // Tipos de amortización
        french: 'French System',
        german: 'German System',
        american: 'American System',
        // Columnas de tabla
        paymentNumber: 'Payment No.',
        payment: 'Payment',
        principal: 'Principal',
        interest: 'Interest',
        remainingBalance: 'Remaining Balance',
        principalPaidPercentage: 'Paid (%)',
        // Footer
        disclaimer: 'This calculator provides representative values for illustration purposes only. Each financial institution may vary its terms, rates, and conditions. We are not responsible for any decisions made based on these calculations.',
        copyright: `© ${currentYear} Daniel Marcos Lorrio.`,
        // Resultados
        totalPayments: 'Total Payments',
        totalAmount: 'Total Amount to Pay',
        totalInterest: 'Total Interest',
        paymentSchedule: 'Payment Schedule',
        charts: 'Charts',
        pieChartTitle: 'Distribution of Principal and Interest',
        lineChartTitle: 'Payment Evolution',
        expandCharts: 'Show Charts',
        expandTable: 'Show Payment Schedule',
        totalPerPerson: 'Amount per Person',
        loanAmountPerPerson: 'Loan Amount per Person',
        totalAmountPerPerson: 'Total Amount per Person',
        interestPerPerson: 'Interest per Person',
        numberOfPeople: 'Number of People',
        paymentPerPerson: 'Payment per Person',
        totalLoanAmount: 'Loan Amount',
      }
    },
    es: {
      translation: {
        appTitle: 'Calculadora de Préstamos',
        pageTitle: 'Calculadora de Préstamos - Simula tus pagos',
        appDescription: 'Simula los pagos de tu préstamo con diferentes métodos de amortización y períodos de pago. Compara opciones y visualiza tu calendario de pagos.',
        amount: 'Monto',
        interestRate: 'Tasa de Interés',
        years: 'Años',
        months: 'Meses',
        paymentPeriod: 'Período de Pago',
        amortizationType: 'Tipo de Amortización',
        // Períodos de pago
        daily: 'Diario',
        weekly: 'Semanal',
        biweekly: 'Quincenal',
        monthly: 'Mensual',
        bimonthly: 'Bimestral',
        quarterly: 'Trimestral',
        semiannual: 'Semestral',
        annual: 'Anual',
        // Tipos de amortización
        french: 'Sistema Francés',
        german: 'Sistema Alemán',
        american: 'Sistema Americano',
        // Columnas de tabla
        paymentNumber: 'Nº Pago',
        payment: 'Cuota',
        principal: 'Capital',
        interest: 'Interés',
        remainingBalance: 'Capital Pendiente',
        principalPaidPercentage: 'Pagado (%)',
        // Footer
        disclaimer: 'Esta calculadora proporciona valores representativos solo con fines ilustrativos. Cada entidad financiera puede variar sus términos, tasas y condiciones. No nos hacemos responsables de las decisiones tomadas en base a estos cálculos.',
        copyright: `© ${currentYear} Daniel Marcos Lorrio.`,
        // Resultados
        totalPayments: 'Número de Pagos',
        totalAmount: 'Importe Total a Pagar',
        totalInterest: 'Intereses Totales',
        paymentSchedule: 'Calendario de Pagos',
        charts: 'Gráficos',
        pieChartTitle: 'Distribución de Capital e Intereses',
        lineChartTitle: 'Evolución de Pagos',
        expandCharts: 'Ver Gráficos',
        expandTable: 'Ver Calendario de Pagos',
        totalPerPerson: 'Importe total por Persona',
        loanAmountPerPerson: 'Monto por Persona',
        totalAmountPerPerson: 'Importe total por Persona',
        interestPerPerson: 'Intereses por Persona',
        numberOfPeople: 'Número de Personas',
        paymentPerPerson: 'Cuota por Persona',
        totalLoanAmount: 'Monto del Préstamo',
      }
    }
  }
});

export default i18n; 