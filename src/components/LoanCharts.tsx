import React from 'react';
import { Box, useTheme, Typography } from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { PaymentRow } from '../types/loan';
import { useTranslation } from 'react-i18next';

interface LoanChartsProps {
  payments: PaymentRow[];
  totalAmount: number;
  totalInterest: number;
  isMobile: boolean;
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ 
  cx, 
  cy, 
  midAngle, 
  innerRadius, 
  outerRadius, 
  percent, 
  theme 
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  theme: any;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill={theme.palette.mode === 'dark' ? '#fff' : '#000'}
      textAnchor="middle" 
      dominantBaseline="central"
      style={{ fontSize: '0.8rem', fontWeight: 'bold' }}
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

const LoanCharts: React.FC<LoanChartsProps> = ({ 
  payments, 
  totalAmount, 
  totalInterest,
  isMobile 
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const pieData = [
    { name: t('principal'), value: totalAmount - totalInterest },
    { name: t('interest'), value: totalInterest }
  ];

  const COLORS = [theme.palette.primary.main, theme.palette.secondary.main];

  return (
    <Box sx={{ 
      width: '100%', 
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: 2,
      minHeight: isMobile ? 600 : 450
    }}>
      <Box sx={{ 
        width: isMobile ? '100%' : '50%', 
        height: isMobile ? 300 : 450,
        mb: isMobile ? 4 : 0,
        position: 'relative',
        pb: isMobile ? 2 : 5
      }}>
        <Typography variant="h6" gutterBottom align="center">
          {t('pieChartTitle')}
        </Typography>
        <ResponsiveContainer>
          <PieChart margin={{ bottom: isMobile ? 5 : 20 }}>
            <Pie
              data={pieData}
              cx="50%"
              cy={isMobile ? "45%" : "40%"}
              innerRadius={isMobile ? 50 : 60}
              outerRadius={isMobile ? 70 : 80}
              paddingAngle={5}
              dataKey="value"
              labelLine={false}
              label={(props) => renderCustomizedLabel({ ...props, theme })}
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Legend 
              verticalAlign="bottom"
              align="center"
              layout="horizontal"
              wrapperStyle={{ 
                position: 'absolute',
                bottom: isMobile ? 30 : 0,
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      <Box sx={{ 
        width: isMobile ? '100%' : '50%', 
        height: isMobile ? 300 : 450,
        position: 'relative',
        pb: isMobile ? 2 : 5
      }}>
        <Typography variant="h6" gutterBottom align="center">
          {t('lineChartTitle')}
        </Typography>
        <ResponsiveContainer>
          <LineChart
            data={payments}
            margin={{ top: 5, right: 30, left: 20, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="paymentNumber" 
              label={{ 
                value: t('paymentNumber'), 
                position: 'insideBottom', 
                offset: -10 
              }} 
            />
            <YAxis 
              label={{ 
                value: t('amount'), 
                angle: -90, 
                position: 'insideLeft' 
              }} 
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: theme.palette.mode === 'dark' 
                  ? theme.palette.grey[800] 
                  : theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1
              }}
              labelStyle={{
                color: theme.palette.text.primary,
                fontWeight: 'bold',
                marginBottom: 1
              }}
              itemStyle={{
                color: theme.palette.text.primary
              }}
              formatter={(value: number) => value.toFixed(2)}
              labelFormatter={(label) => `${t('paymentNumber')}: ${label}`}
            />
            <Legend 
              verticalAlign="bottom"
              align="center"
              layout="horizontal"
              wrapperStyle={{ 
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            />
            <Line
              type="monotone"
              dataKey="principal"
              stroke={COLORS[0]}
              name={t('principal')}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="interest"
              stroke={COLORS[1]}
              name={t('interest')}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default LoanCharts; 