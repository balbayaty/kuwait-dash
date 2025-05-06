import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import { ArrowRight, ArrowUp, ArrowDown, Clock, DollarSign, TrendingUp, Truck, AlertTriangle, CheckCircle, Calendar, ChevronRight, BarChart2, Activity } from 'lucide-react';

// Flex branding colors
const colors = {
  primary: '#ff9e00',
  secondary: '#a4a3a3',
  dark: '#2c3e50',
  light: '#f8f9fa',
  accent: '#3498db',
  warning: '#e74c3c',
  success: '#2ecc71',
  yellow: '#f39c12',
  purple: '#9b59b6',
  teal: '#1abc9c'
};

// Journey data
const journeyPhases = [
  { name: 'Origin', hours: 13.71, percentage: 10.2, color: colors.accent },
  { name: 'Transport', hours: 25.62, percentage: 19.1, color: colors.success },
  { name: 'Customs', hours: 78.38, percentage: 58.3, color: colors.warning },
  { name: 'Destination', hours: 16.77, percentage: 12.5, color: colors.yellow }
];

const touchpoints = [
  { id: 6, name: 'Kuwait custom clearance', phase: 'Customs', hours: 55.43, percentage: 44.22, best: 24.97, issues: 'Limited hours (8am-1pm), closed Fridays', color: colors.warning },
  { id: 12, name: 'SA custom clearance (return)', phase: 'Customs', hours: 15.21, percentage: 11.31, best: 3.27, issues: '2x longer than outbound despite 24/7 operation', color: colors.yellow },
  { id: 9, name: 'Actual offloading time', phase: 'Destination', hours: 8.83, percentage: 7.04, best: 6.18, issues: 'Wide variation in processing times', color: colors.accent },
  { id: 13, name: 'Return to transporter yard', phase: 'Transport', hours: 9.10, percentage: 6.77, best: null, issues: 'Final leg of return journey', color: colors.accent },
  { id: 8, name: 'Waiting outside working hours', phase: 'Destination', hours: 7.94, percentage: 6.33, best: 0.00, issues: '47.4% of time spent waiting outside working hours', color: colors.secondary },
  { id: 5, name: 'Saudi custom clearance', phase: 'Customs', hours: 7.21, percentage: 5.75, best: 3.28, issues: 'Thorough inspection for chemical shipments', color: colors.primary },
  { id: 2, name: 'Truck Loading Time', phase: 'Origin', hours: 6.54, percentage: 5.22, best: 3.00, issues: 'Standard chemical loading protocols', color: colors.primary }
];

const arrivalWindow = [
  { name: 'Early Morning (5-8am)', efficiency: 100, outsideHours: 0, avgTotal: 7.09 },
  { name: 'Night (10pm-5am)', efficiency: 45.35, outsideHours: 11.70, avgTotal: 21.41 },
  { name: 'Afternoon (12-5pm)', efficiency: 42.60, outsideHours: 13.00, avgTotal: 22.65 }
];

const arrivalDay = [
  { name: 'Monday', efficiency: 80.48, outsideHours: 2.00, avgTotal: 10.25, count: 6 },
  { name: 'Sunday', efficiency: 56.70, outsideHours: 5.67, avgTotal: 13.09, count: 3 },
  { name: 'Tuesday', efficiency: 56.57, outsideHours: 8.00, avgTotal: 18.42, count: 7 },
  { name: 'Friday', efficiency: 22.33, outsideHours: 28.00, avgTotal: 36.05, count: 1 },
  { name: 'Thursday', efficiency: 17.08, outsideHours: 30.00, avgTotal: 36.18, count: 1 }
];

const idleTime = [
  { name: 'Kuwait Customs', hours: 55.43, percentage: 50.9, color: colors.warning },
  { name: 'Saudi Return', hours: 15.21, percentage: 14.0, color: colors.yellow },
  { name: 'Offloading', hours: 16.77, percentage: 15.4, color: colors.accent },
  { name: 'Other idle time', hours: 21.45, percentage: 19.7, color: colors.secondary }
];

const phases = [
  { name: 'Phase 1: Scheduling', timeframe: '0-3 months', hours: 7.94, percentage: 13.6, color: colors.accent },
  { name: 'Phase 2: Process', timeframe: '3-6 months', hours: 15.02, percentage: 25.7, color: colors.yellow },
  { name: 'Phase 3: External', timeframe: '6-12 months', hours: 35.43, percentage: 60.7, color: colors.success }
];

// Component for the Logo
const FlexLogo = () => (
  <svg width="100" height="40" viewBox="0 0 1350 554">
    <g>
      <path fill={colors.primary} d="M911.05,314.51l-12.41,80.56c-.17.71-1.55.85-2.13.93-23.6,3.5-48.83,4.17-72.69,5.4s-48.98,2.78-73.31,2.98c-46.31.38-87.61-14.84-89.06-67.68,9.33-77.84,23.33-155.22,35.8-232.61,18.61-74.8,83.07-68.15,145.47-66.76,21.36.48,42.57.89,63.89,2.35,15.68,1.07,31.41,2.67,46.96,4.78l-12.35,81.51-127.48-.03c-29.31,2-25.34,25.56-29.22,47.88l122.99,5.94-13.02,80.37-124.2,4.43c-.63.5-.81,1.21-1.02,1.93-1.88,6.47-5,27.68-4.14,33.98.85,6.21,4.21,10.32,10.1,12.37,1.27.44,5.58,1.67,6.61,1.67h129.23Z"/>
      <polygon fill={colors.primary} points="1087.88,36.71 1124.26,137.18 1192.27,36.71 1299.62,36.71 1295.96,42.81 1164.3,230.97 1239.02,400.78 1239.29,402.57 1131.65,402.57 1097.05,305.63 1095.44,306.99 1030.81,402.57 923.47,402.57 1055.85,211.24 1054.87,207.71 979.65,36.71 1087.88,36.71"/>
      <path fill={colors.primary} d="M545.54,36.71l-.08,3.17-40.13,253.06c-.5,8.71.45,17.13,9.46,20.67,2,.79,7.2,2.08,9.16,2.08h112.08l-14.57,86.8-155.49.11c-43.41-2.19-68.13-26.19-64.13-70.65l46.71-295.24h96.99Z"/>
      <path fill={colors.primary} d="M59.98,402.57l23.84-146.69c7.34-37.15,24.27-67.71,65.73-71.44l235.71.03-13.1,79.12-170.57.06c-13.63.98-23.63,7.64-25.52,21.78l-18.52,117.14H59.98Z"/>
      <path fill={colors.primary} d="M410.11,36.71l-13.39,78.53-250.12.06c-13.77,1.22-27.28,4.02-40.18,8.9,1.85-17.51,5.58-35.14,13.47-50.97,7.72-15.49,19.62-26.62,36.04-32.54,3.33-1.2,11.79-3.98,14.95-3.98h239.23Z"/>
    </g>
  </svg>
);

// KPI Card Component
const KPICard = ({ title, value, icon: Icon, trend, trendValue, trendLabel, color }) => (
  <div className="bg-white rounded-lg shadow-md p-5 flex flex-col">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <h3 className="text-2xl font-bold mt-1" style={{ color: color || '#333' }}>{value}</h3>
      </div>
      <div className="bg-gray-100 p-2 rounded-lg">
        <Icon size={20} color={color || '#333'} />
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center">
        {trendValue > 0 ? (
          <ArrowUp size={14} color={colors.success} className="mr-1" />
        ) : (
          <ArrowDown size={14} color={colors.warning} className="mr-1" />
        )}
        <span className="text-xs font-medium" style={{ color: trendValue > 0 ? colors.success : colors.warning }}>
          {Math.abs(trendValue)}% {trendLabel}
        </span>
      </div>
    )}
  </div>
);

// Financial Calculator Component
const FinancialCalculator = () => {
  const [tripsPerMonth, setTripsPerMonth] = useState(150);
  const [detentionRate, setDetentionRate] = useState(880);
  const [currentBaseRate, setCurrentBaseRate] = useState(3300);
  const [optimizedBaseRate, setOptimizedBaseRate] = useState(3450);
  
  const currentDetentionDays = 1.56; // Per trip
  const optimizedDetentionDays = 0.28; // Per trip
  
  const currentDetentionCost = currentDetentionDays * detentionRate;
  const optimizedDetentionCost = optimizedDetentionDays * detentionRate;
  
  const currentTripCost = currentBaseRate + currentDetentionCost;
  const optimizedTripCost = optimizedBaseRate + optimizedDetentionCost;
  
  const currentAnnualCost = currentTripCost * tripsPerMonth * 12;
  const optimizedAnnualCost = optimizedTripCost * tripsPerMonth * 12;
  const annualSavings = currentAnnualCost - optimizedAnnualCost;
  const savingsPercentage = ((annualSavings / currentAnnualCost) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold mb-4">Financial Impact Calculator</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-2">Parameters</h4>
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Monthly Trips</label>
              <input
                type="number"
                value={tripsPerMonth}
                onChange={(e) => setTripsPerMonth(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Detention Rate (SAR/day)</label>
              <input
                type="number"
                value={detentionRate}
                onChange={(e) => setDetentionRate(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Current Base Rate (SAR)</label>
              <input
                type="number"
                value={currentBaseRate}
                onChange={(e) => setCurrentBaseRate(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Optimized Base Rate (SAR)</label>
              <input
                type="number"
                value={optimizedBaseRate}
                onChange={(e) => setOptimizedBaseRate(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-2">Financial Impact</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-600">Current Trip Cost</p>
              <p className="text-2xl font-bold">{currentTripCost.toLocaleString()} SAR</p>
              <div className="text-xs text-gray-500 mt-1">
                <p>Base: {currentBaseRate.toLocaleString()} SAR</p>
                <p>Detention: {currentDetentionCost.toLocaleString()} SAR</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-600">Optimized Trip Cost</p>
              <p className="text-2xl font-bold text-green-600">{optimizedTripCost.toLocaleString()} SAR</p>
              <div className="text-xs text-gray-500 mt-1">
                <p>Base: {optimizedBaseRate.toLocaleString()} SAR</p>
                <p>Detention: {optimizedDetentionCost.toLocaleString()} SAR</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-600">Annual Cost (Current)</p>
              <p className="text-lg font-bold">{currentAnnualCost.toLocaleString()} SAR</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-600">Annual Cost (Optimized)</p>
              <p className="text-lg font-bold text-green-600">{optimizedAnnualCost.toLocaleString()} SAR</p>
            </div>
            <div className="bg-green-50 p-4 rounded-md col-span-2">
              <p className="text-sm font-medium text-green-600">Annual Savings</p>
              <p className="text-2xl font-bold text-green-700">{annualSavings.toLocaleString()} SAR</p>
              <p className="text-xs text-green-600 mt-1">({savingsPercentage}% reduction)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Fleet Calculator Component
const FleetCalculator = () => {
  const [tripsPerMonth, setTripsPerMonth] = useState(4);
  const [monthlyLeaseCost, setMonthlyLeaseCost] = useState(25000);
  const [monthlyFixedCost, setMonthlyFixedCost] = useState(4000);
  const [oneWayRate, setOneWayRate] = useState(3300);
  
  const totalMonthlyCost = monthlyLeaseCost + monthlyFixedCost;
  const costPerTrip = totalMonthlyCost / tripsPerMonth;
  const costPerTripOptimized = totalMonthlyCost / 8; // 8 trips per month is the optimized utilization
  
  const costDifference = oneWayRate - costPerTrip;
  const isProfitable = costDifference > 0;
  
  const utilization = (tripsPerMonth / 8) * 100; // Assuming 8 trips is max utilization
  
  // Calculate annual impact
  const annualTripVolume = 150 * 12; // 150 trips per month
  const currentAnnualCost = oneWayRate * annualTripVolume;
  const fleetTripsRequired = annualTripVolume / tripsPerMonth;
  const fleetAnnualCost = totalMonthlyCost * (fleetTripsRequired / 12);
  const fleetAnnualSavings = currentAnnualCost - fleetAnnualCost;
  const savingsPercentage = fleetAnnualSavings > 0 ? 
                          ((fleetAnnualSavings / currentAnnualCost) * 100).toFixed(1) : 
                          ((fleetAnnualCost / currentAnnualCost - 1) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold mb-4">Dedicated Fleet Calculator</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-2">Parameters</h4>
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Trips Per Truck Per Month</label>
              <input
                type="number"
                value={tripsPerMonth}
                onChange={(e) => setTripsPerMonth(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Monthly Lease Cost (SAR)</label>
              <input
                type="number"
                value={monthlyLeaseCost}
                onChange={(e) => setMonthlyLeaseCost(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Monthly Fixed Cost (SAR)</label>
              <input
                type="number"
                value={monthlyFixedCost}
                onChange={(e) => setMonthlyFixedCost(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">One-Way Trip Rate (SAR)</label>
              <input
                type="number"
                value={oneWayRate}
                onChange={(e) => setOneWayRate(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-2">Financial Impact</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-600">Fleet Utilization</p>
              <p className="text-2xl font-bold">{utilization.toFixed(1)}%</p>
              <p className="text-xs text-gray-500 mt-1">
                ({tripsPerMonth} of potential 8 trips per month)
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-600">Total Monthly Cost</p>
              <p className="text-2xl font-bold">{totalMonthlyCost.toLocaleString()} SAR</p>
            </div>
            <div className={`p-4 rounded-md ${isProfitable ? 'bg-green-50' : 'bg-red-50'}`}>
              <p className="text-sm font-medium text-gray-600">Cost Per Trip</p>
              <p className={`text-2xl font-bold ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
                {costPerTrip.toLocaleString()} SAR
              </p>
              <p className="text-xs mt-1 font-medium" style={{ color: isProfitable ? colors.success : colors.warning }}>
                {isProfitable 
                  ? `${costDifference.toLocaleString()} SAR below market rate`
                  : `${Math.abs(costDifference).toLocaleString()} SAR above market rate`}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-600">Cost at 8 Trips/Month</p>
              <p className="text-2xl font-bold text-green-600">{costPerTripOptimized.toLocaleString()} SAR</p>
              <p className="text-xs text-green-600 mt-1">
                {(oneWayRate - costPerTripOptimized).toLocaleString()} SAR below market rate
              </p>
            </div>
            <div className={`p-4 rounded-md col-span-2 ${fleetAnnualSavings > 0 ? 'bg-blue-50' : 'bg-red-50'}`}>
              <p className="text-sm font-medium" style={{ color: fleetAnnualSavings > 0 ? colors.accent : colors.warning }}>
                Annual Impact (150 trips/month)
              </p>
              <p className="text-xl font-bold" style={{ color: fleetAnnualSavings > 0 ? colors.accent : colors.warning }}>
                {fleetAnnualSavings > 0 ? '+' : ''}{fleetAnnualSavings.toLocaleString()} SAR
              </p>
              <p className="text-xs mt-1" style={{ color: fleetAnnualSavings > 0 ? colors.accent : colors.warning }}>
                {fleetAnnualSavings > 0 ? 'Savings of ' : 'Additional cost of '} {Math.abs(savingsPercentage)}%
              </p>
              <p className="text-xs mt-1 text-gray-500">
                Requires {Math.ceil(fleetTripsRequired / 12)} trucks at current utilization
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Implementation Phase Card
const PhaseCard = ({ title, timeframe, impact, description, objectives, color }) => (
  <div className="bg-white rounded-lg shadow-md p-5" style={{ borderTop: `4px solid ${color}` }}>
    <h3 className="text-lg font-bold mb-1">{title}</h3>
    <p className="text-sm text-gray-500 mb-3">{timeframe}</p>
    <p className="text-base font-semibold mb-2" style={{ color }}>{impact}</p>
    <p className="text-sm mb-4">{description}</p>
    <h4 className="font-semibold text-sm mb-2">Key Activities:</h4>
    <ul className="text-sm space-y-1">
      {objectives.map((objective, i) => (
        <li key={i} className="flex items-start">
          <ChevronRight size={16} className="mt-1 mr-1 flex-shrink-0" style={{ color }} />
          <span>{objective}</span>
        </li>
      ))}
    </ul>
  </div>
);

// Comparative Analysis Card
const ComparativeCard = ({ title, data, metric, bestValue, color, isHigherBetter = true }) => {
  // Sort data by the metric, either ascending or descending based on isHigherBetter
  const sortedData = [...data].sort((a, b) => {
    return isHigherBetter 
      ? b[metric] - a[metric]
      : a[metric] - b[metric];
  });
  
  const getBgColor = (value) => {
    if (value === bestValue) return 'bg-green-100';
    if (isHigherBetter) {
      return value > sortedData[Math.floor(sortedData.length/2)][metric] ? 'bg-green-50' : 'bg-red-50';
    } else {
      return value < sortedData[Math.floor(sortedData.length/2)][metric] ? 'bg-green-50' : 'bg-red-50';
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <div className="overflow-hidden rounded-md border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {metric.charAt(0).toUpperCase() + metric.slice(1).replace(/([A-Z])/g, ' $1')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((item, index) => (
              <tr key={index} className={getBgColor(item[metric])}>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {item.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right font-bold" style={{ color: item[metric] === bestValue ? colors.success : undefined }}>
                  {typeof item[metric] === 'number' ? item[metric].toLocaleString() : item[metric]}
                  {metric.includes('efficiency') && '%'}
                  {metric.includes('hours') && ' hrs'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Timeline Component
const TimelineComponent = ({ phases }) => (
  <div className="bg-white rounded-lg shadow-md p-5">
    <h3 className="text-lg font-bold mb-4">Implementation Timeline</h3>
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
      
      {/* Timeline items */}
      <div className="space-y-8">
        {phases.map((phase, index) => (
          <div key={index} className="relative pl-10">
            {/* Timeline dot */}
            <div className="absolute left-2 top-1.5 w-5 h-5 rounded-full" style={{ backgroundColor: phase.color, transform: 'translateX(-50%)' }}></div>
            
            {/* Content */}
            <div className="pb-2">
              <div className="flex justify-between items-start">
                <h4 className="text-base font-bold">{phase.name}</h4>
                <span className="text-sm text-gray-500">{phase.timeframe}</span>
              </div>
              <p className="text-sm mt-1 font-medium" style={{ color: phase.color }}>{phase.hours} hours savings ({phase.percentage}% of total)</p>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div className="h-1.5 rounded-full" style={{ width: `${phase.percentage}%`, backgroundColor: phase.color }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Tab Component
const TabView = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);
  
  // Extract tabs and content from children
  const tabs = React.Children.map(children, child => child.props.title);
  
  return (
    <div>
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 font-medium text-sm border-b-2 ${
              activeTab === index
                ? 'border-orange-500 text-gray-800'
                : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
            } focus:outline-none transition-colors duration-200`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>
        {React.Children.toArray(children)[activeTab]}
      </div>
    </div>
  );
};

// Tab Panel Component
const TabPanel = ({ title, children }) => <div>{children}</div>;

// Dashboard Component
const Dashboard = () => {
  const [activeView, setActiveView] = useState('oneWay');
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-800 text-white py-4 px-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <FlexLogo />
            <div>
              <h1 className="text-xl font-bold">Saudi-Kuwait Logistics Optimization</h1>
              <p className="text-sm opacity-80">April 9, 2025</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeView === 'oneWay' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
              onClick={() => setActiveView('oneWay')}
            >
              One-Way Optimization
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeView === 'fleet' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
              onClick={() => setActiveView('fleet')}
            >
              Dedicated Fleet Analysis
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6 max-w-7xl mx-auto">
        {activeView === 'oneWay' ? (
          /* One-Way Route Optimization View */
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Saudi-Kuwait One-Way Route Optimization</h2>
              <div className="flex items-center text-sm text-gray-500">
                <Clock size={16} className="mr-1" />
                <span>Last updated: April 9, 2025</span>
              </div>
            </div>
            
            {/* KPIs */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Executive Dashboard</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard 
                  title="Current Journey Time" 
                  value="125.37 hours" 
                  icon={Clock} 
                  color={colors.primary} 
                />
                <KPICard 
                  title="Idle Time" 
                  value="86%" 
                  icon={AlertTriangle} 
                  trendValue={-43.4}
                  trendLabel="potential improvement" 
                  color={colors.warning} 
                />
                <KPICard 
                  title="Potential Time Savings" 
                  value="58.39 hours" 
                  icon={TrendingUp} 
                  trendValue={43.4}
                  trendLabel="reduction" 
                  color={colors.success} 
                />
                <KPICard 
                  title="On-Time Delivery" 
                  value="63% → 95%" 
                  icon={CheckCircle} 
                  trendValue={32}
                  trendLabel="improvement" 
                  color={colors.accent} 
                />
              </div>
            </section>

            {/* Journey Analysis */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Journey Analysis</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Journey Phases</h3>
                    <div className="flex items-center text-xs text-gray-500">
                      <BarChart2 size={14} className="mr-1" />
                      <span>Hours by phase</span>
                    </div>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={journeyPhases}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`${value} hours`, 'Duration']}
                        />
                        <Legend />
                        <Bar dataKey="hours" name="Hours" fill={colors.primary}>
                          {journeyPhases.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Idle Time Analysis</h3>
                    <div className="flex items-center text-xs text-gray-500">
                      <Activity size={14} className="mr-1" />
                      <span>86% of journey time</span>
                    </div>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={idleTime}
                          dataKey="hours"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        >
                          {idleTime.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} hours`, 'Duration']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Total idle time: 108.86 hours (86% of journey)</p>
                </div>
              </div>
            </section>

            {/* Bottleneck Analysis */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Bottleneck Analysis</h2>
              <div className="bg-white rounded-lg shadow-md p-5 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Key Touchpoints</h3>
                  <div className="flex items-center text-xs text-gray-500">
                    <Activity size={14} className="mr-1" />
                    <span>Current vs. Best Observed</span>
                  </div>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={touchpoints} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={150} />
                      <Tooltip formatter={(value) => [`${value} hours`, 'Duration']} />
                      <Legend />
                      <Bar dataKey="hours" name="Current Hours" fill={colors.primary}>
                        {touchpoints.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                      <Bar dataKey="best" name="Best Observed" fill={colors.success} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Arrival Window Impact</h3>
                    <div className="flex items-center text-xs text-gray-500">
                      <Activity size={14} className="mr-1" />
                      <span>Efficiency by time of day</span>
                    </div>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={arrivalWindow}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="efficiency" name="Efficiency %" fill={colors.success} />
                        <Bar yAxisId="right" dataKey="outsideHours" name="Outside Hours" fill={colors.warning} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Early morning arrivals (5-8am) consistently achieve 100% efficiency</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Arrival Day Performance</h3>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar size={14} className="mr-1" />
                      <span>Efficiency by day of week</span>
                    </div>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={arrivalDay}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="efficiency" name="Efficiency %" fill={colors.accent} />
                        <Bar yAxisId="right" dataKey="outsideHours" name="Outside Hours" fill={colors.warning} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Thursday/Friday arrivals result in 28-30 hours of waiting time</p>
                </div>
              </div>
              
              <div className="mt-6">
                <TabView>
                  <TabPanel title="Kuwait Customs Bottleneck">
                    <div className="bg-white rounded-lg shadow-md p-5">
                      <div className="flex items-center mb-3 text-warning">
                        <AlertTriangle size={20} className="mr-2" style={{ color: colors.warning }} />
                        <h3 className="text-lg font-bold" style={{ color: colors.warning }}>Critical Bottleneck: Kuwait Customs</h3>
                      </div>
                      
                      <p className="mb-4"><strong>Current Time:</strong> 55.43 hours (44.22% of total journey)</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div>
                          <h4 className="font-semibold mb-2">Root Causes</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Limited hours: 8am-1pm (Sat-Thu), closed Friday</li>
                            <li>Only 30 hrs/week vs 168 hrs for 24/7 facilities</li>
                            <li>Return clearance at same facility: 0.53 hrs (100x faster)</li>
                            <li>Weekend impact adds up to 30+ hours waiting time</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Recommendations</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Engage Kuwait authorities for extended processing hours</li>
                            <li>Establish trusted shipper program</li>
                            <li>Develop dedicated lanes for regular chemical shipments</li>
                            <li>Document & leverage efficiency from return process</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <p className="text-sm font-medium text-gray-600">Current Time</p>
                          <p className="text-2xl font-bold text-warning" style={{ color: colors.warning }}>55.43 hours</p>
                          <p className="text-xs text-gray-500 mt-1">44.22% of total journey time</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <p className="text-sm font-medium text-gray-600">Target Time</p>
                          <p className="text-2xl font-bold text-success" style={{ color: colors.success }}>20.00 hours</p>
                          <p className="text-xs text-gray-500 mt-1">63.9% reduction potential</p>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-md">
                        <p className="text-sm font-medium text-green-600">Potential Savings</p>
                        <p className="text-2xl font-bold text-green-700">35.43 hours</p>
                        <p className="text-xs text-green-600 mt-1">60.7% of total optimization potential</p>
                      </div>
                    </div>
                  </TabPanel>
                  
                  <TabPanel title="Truck Offloading Bottleneck">
                    <div className="bg-white rounded-lg shadow-md p-5">
                      <div className="flex items-center mb-3">
                        <AlertTriangle size={20} className="mr-2" style={{ color: colors.yellow }} />
                        <h3 className="text-lg font-bold" style={{ color: colors.yellow }}>Secondary Bottleneck: Truck Offloading</h3>
                      </div>
                      
                      <p className="mb-4"><strong>Current Time:</strong> 16.77 hours (12.47% of total journey)</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div>
                          <h4 className="font-semibold mb-2">Root Causes</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Misaligned arrivals with warehouse hours (5am-4pm)</li>
                            <li>47.35% of time spent waiting outside working hours</li>
                            <li>Early morning arrivals (5-8am) have zero waiting time</li>
                            <li>Weekend arrivals experience up to 30 hours waiting</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Recommendations</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Target arrivals between 5-8am to eliminate waiting</li>
                            <li>Standardize offloading procedures across all shipments</li>
                            <li>Avoid Thursday/Friday arrivals to eliminate weekend impact</li>
                            <li>Implement scheduling tool for optimal departures</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <p className="text-sm font-medium text-gray-600">Current Time</p>
                          <p className="text-2xl font-bold" style={{ color: colors.yellow }}>16.77 hours</p>
                          <p className="text-xs text-gray-500 mt-1">12.47% of total journey time</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <p className="text-sm font-medium text-gray-600">Target Time</p>
                          <p className="text-2xl font-bold text-success" style={{ color: colors.success }}>6.78 hours</p>
                          <p className="text-xs text-gray-500 mt-1">59.6% reduction potential</p>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-md">
                        <p className="text-sm font-medium text-green-600">Potential Savings</p>
                        <p className="text-2xl font-bold text-green-700">9.99 hours</p>
                        <p className="text-xs text-green-600 mt-1">17.1% of total optimization potential</p>
                      </div>
                    </div>
                  </TabPanel>
                  
                  <TabPanel title="Saudi Return Customs Bottleneck">
                    <div className="bg-white rounded-lg shadow-md p-5">
                      <div className="flex items-center mb-3">
                        <AlertTriangle size={20} className="mr-2" style={{ color: colors.accent }} />
                        <h3 className="text-lg font-bold" style={{ color: colors.accent }}>Tertiary Bottleneck: Saudi Return Customs</h3>
                      </div>
                      
                      <p className="mb-4"><strong>Current Time:</strong> 15.21 hours (11.31% of total journey)</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div>
                          <h4 className="font-semibold mb-2">Root Causes</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>2x longer than outbound (7.21 hrs) despite 24/7 operation</li>
                            <li>High variability (10.4-21.8 hrs) in processing times</li>
                            <li>Different inspection protocols for returning vehicles</li>
                            <li>Return processing deprioritized vs. inbound shipments</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Recommendations</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Harmonize outbound and return clearance procedures</li>
                            <li>Develop expedited processing for empty return vehicles</li>
                            <li>Align return processing time with outbound clearance</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <p className="text-sm font-medium text-gray-600">Current Time</p>
                          <p className="text-2xl font-bold" style={{ color: colors.accent }}>15.21 hours</p>
                          <p className="text-xs text-gray-500 mt-1">11.31% of total journey time</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <p className="text-sm font-medium text-gray-600">Target Time</p>
                          <p className="text-2xl font-bold text-success" style={{ color: colors.success }}>7.21 hours</p>
                          <p className="text-xs text-gray-500 mt-1">52.6% reduction potential</p>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-md">
                        <p className="text-sm font-medium text-green-600">Potential Savings</p>
                        <p className="text-2xl font-bold text-green-700">8.00 hours</p>
                        <p className="text-xs text-green-600 mt-1">13.7% of total optimization potential</p>
                      </div>
                    </div>
                  </TabPanel>
                  
                  <TabPanel title="Comparative Analysis">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ComparativeCard 
                        title="Arrival Window Efficiency" 
                        data={arrivalWindow} 
                        metric="efficiency"
                        bestValue={100}
                        color={colors.success}
                        isHigherBetter={true}
                      />
                      
                      <ComparativeCard 
                        title="Arrival Day Efficiency" 
                        data={arrivalDay} 
                        metric="efficiency"
                        bestValue={80.48}
                        color={colors.success}
                        isHigherBetter={true}
                      />
                    </div>
                  </TabPanel>
                </TabView>
              </div>
            </section>

            {/* Financial Analysis */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Financial Analysis</h2>
              <FinancialCalculator />
            </section>

            {/* Implementation Plan */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Implementation Plan</h2>
              <div className="bg-white rounded-lg shadow-md p-5 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Optimization Roadmap</h3>
                  <div className="flex items-center text-xs text-gray-500">
                    <TrendingUp size={14} className="mr-1" />
                    <span>Potential Hours Savings</span>
                  </div>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={phases}
                        dataKey="hours"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                      >
                        {phases.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} hours`, 'Time Savings']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-gray-600 mt-2">Total potential savings: 58.39 hours (43.4% of journey time)</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <TimelineComponent phases={phases} />
                
                <div className="bg-white rounded-lg shadow-md p-5">
                  <h3 className="text-lg font-bold mb-4">Impact Analysis</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Journey Time Reduction</span>
                        <span className="text-sm font-bold text-success" style={{ color: colors.success }}>-43.4%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: '43.4%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Detention Reduction</span>
                        <span className="text-sm font-bold text-success" style={{ color: colors.success }}>-82.1%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: '82.1%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">On-Time Delivery Improvement</span>
                        <span className="text-sm font-bold text-success" style={{ color: colors.success }}>+32.0%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: '32.0%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Cost Reduction</span>
                        <span className="text-sm font-bold text-success" style={{ color: colors.success }}>-20.9%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: '20.9%' }}></div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200 mt-4">
                      <h4 className="font-semibold text-sm mb-2">Key Success Metrics</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Current Journey Time</p>
                          <p className="text-lg font-bold">125.37 hours</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Target Journey Time</p>
                          <p className="text-lg font-bold text-success" style={{ color: colors.success }}>66.98 hours</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Current Detention</p>
                          <p className="text-lg font-bold">1.56 days</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Target Detention</p>
                          <p className="text-lg font-bold text-success" style={{ color: colors.success }}>0.28 days</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <PhaseCard
                  title="Phase 1: Scheduling Optimization"
                  timeframe="0-3 months"
                  impact="7.94 hours savings (13.6%)"
                  description="Eliminate waiting time outside consignee's working hours"
                  objectives={[
                    "Target arrivals between 5-8am",
                    "Avoid Thursday/Friday arrivals",
                    "Develop scheduling tool",
                    "Train dispatchers and planners"
                  ]}
                  color={colors.accent}
                />
                <PhaseCard
                  title="Phase 2: Process Optimization"
                  timeframe="3-6 months"
                  impact="15.02 hours savings (25.7%)"
                  description="Standardize and optimize internal processes"
                  objectives={[
                    "Standardize offloading procedures",
                    "Implement digital documentation",
                    "Enable parallel processing",
                    "Develop performance monitoring"
                  ]}
                  color={colors.yellow}
                />
                <PhaseCard
                  title="Phase 3: External Engagement"
                  timeframe="6-12 months"
                  impact="35.43 hours savings (60.7%)"
                  description="Work with customs authorities to improve processing times"
                  objectives={[
                    "Engage Kuwait customs authorities",
                    "Develop trusted shipper program",
                    "Optimize Saudi customs return",
                    "Implement new customs procedures"
                  ]}
                  color={colors.success}
                />
              </div>
            </section>

            {/* Recommendations */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Conclusions & Recommendations</h2>
              <div className="bg-gray-50 rounded-lg shadow-md p-6 border-l-4" style={{ borderColor: colors.primary }}>
                <h3 className="text-lg font-bold mb-3">Key Recommendations</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li className="font-medium">
                    <span className="font-semibold">Immediate Scheduling Changes:</span> Target all arrivals between 5-8am at the Kuwait warehouse and implement day-of-week controls to avoid Thursday/Friday arrivals.
                  </li>
                  <li className="font-medium">
                    <span className="font-semibold">Process Standardization:</span> Document and replicate best practices from high-performing shipments, implement electronic documentation, and enable parallel processing workflows.
                  </li>
                  <li className="font-medium">
                    <span className="font-semibold">Customs Authority Engagement:</span> Begin formal discussions with Kuwait customs for extended hours and develop trusted shipper status proposals for both Saudi and Kuwait authorities.
                  </li>
                  <li className="font-medium">
                    <span className="font-semibold">Performance Monitoring:</span> Implement real-time tracking of touchpoint performance with standardized KPIs to measure improvement against baselines.
                  </li>
                </ol>
                <div className="mt-4 bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-semibold mb-2">SLA Compliance Benefits</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li><strong>Loading & Documentation:</strong> Reduction from 11.82 to 8.00 hours (within 24-hour allowance)</li>
                    <li><strong>Border Processing:</strong> Reduction from 78.38 to 38.00 hours (within 48-hour allowance)</li>
                    <li><strong>Offloading:</strong> Reduction from 16.77 to 6.78 hours (within 24-hour allowance)</li>
                    <li><strong>Demurrage Elimination:</strong> Optimized process stays within all SLA free time windows</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        ) : (
          /* Dedicated Fleet Analysis View */
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Saudi-Kuwait Dedicated Fleet Analysis</h2>
              <div className="flex items-center text-sm text-gray-500">
                <Clock size={16} className="mr-1" />
                <span>Last updated: April 9, 2025</span>
              </div>
            </div>
            
            {/* KPIs */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Fleet Dashboard</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard 
                  title="Current Utilization" 
                  value="4 trips/month" 
                  icon={Truck} 
                  color={colors.primary} 
                />
                <KPICard 
                  title="Target Utilization" 
                  value="8 trips/month" 
                  icon={TrendingUp} 
                  trendValue={100}
                  trendLabel="increase" 
                  color={colors.success} 
                />
                <KPICard 
                  title="Cost Per Trip (Current)" 
                  value="7,250 SAR" 
                  icon={DollarSign} 
                  trendValue={-50}
                  trendLabel="reduction potential" 
                  color={colors.warning} 
                />
                <KPICard 
                  title="Cost Per Trip (Target)" 
                  value="3,625 SAR" 
                  icon={DollarSign} 
                  trendValue={9.8}
                  trendLabel="below market rate" 
                  color={colors.success} 
                />
              </div>
            </section>

            {/* Fleet Analysis */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Fleet Optimization Analysis</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Utilization Impact on Trip Cost</h3>
                    <div className="flex items-center text-xs text-gray-500">
                      <TrendingUp size={14} className="mr-1" />
                      <span>Cost decreases with utilization</span>
                    </div>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { trips: 2, cost: 14500, market: 3300 },
                          { trips: 3, cost: 9667, market: 3300 },
                          { trips: 4, cost: 7250, market: 3300 },
                          { trips: 5, cost: 5800, market: 3300 },
                          { trips: 6, cost: 4833, market: 3300 },
                          { trips: 7, cost: 4143, market: 3300 },
                          { trips: 8, cost: 3625, market: 3300 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="trips" label={{ value: 'Trips Per Month', position: 'insideBottom', offset: -5 }} />
                        <YAxis label={{ value: 'Cost Per Trip (SAR)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value) => [`${value.toLocaleString()} SAR`, 'Cost per Trip']} />
                        <Line type="monotone" dataKey="cost" name="Cost Per Trip" stroke={colors.primary} activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="market" name="Market Rate" stroke={colors.accent} strokeDasharray="5 5" />
                        <Legend />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">At 8 trips/month, dedicated fleet cost is 3,625 SAR vs. one-way market rate of 3,300 SAR</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Cost Comparison</h3>
                    <div className="flex items-center text-xs text-gray-500">
                      <BarChart2 size={14} className="mr-1" />
                      <span>Cost breakdown by model</span>
                    </div>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: 'One-Way (Current)', base: 3300, detention: 1373, total: 4673 },
                          { name: 'One-Way (Optimized)', base: 3450, detention: 246, total: 3696 },
                          { name: 'Fleet (4 trips/mo)', base: 7250, detention: 0, total: 7250 },
                          { name: 'Fleet (8 trips/mo)', base: 3625, detention: 0, total: 3625 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="base" name="Base Cost" stackId="a" fill={colors.primary} />
                        <Bar dataKey="detention" name="Detention Cost" stackId="a" fill={colors.warning} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Fully optimized fleet eliminates detention costs and offers lowest total cost</p>
                </div>
              </div>
            </section>

            {/* Fleet Calculator */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Fleet Financial Analysis</h2>
              <FleetCalculator />
            </section>

            {/* Implementation Plan */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Implementation Strategy</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <PhaseCard
                  title="Phase 1: Pilot Program"
                  timeframe="0-3 months"
                  impact="Controlled implementation"
                  description="Test dedicated fleet model with limited resources"
                  objectives={[
                    "Deploy 2-3 trucks as pilot",
                    "Test route optimization",
                    "Establish performance metrics",
                    "Analyze actual vs. projected costs"
                  ]}
                  color={colors.accent}
                />
                <PhaseCard
                  title="Phase 2: Scaled Implementation"
                  timeframe="3-6 months"
                  impact="Expanded capacity"
                  description="Scale based on pilot results"
                  objectives={[
                    "Expand fleet based on pilot results",
                    "Implement driver training program",
                    "Deploy scheduling optimization tools",
                    "Implement performance incentives"
                  ]}
                  color={colors.yellow}
                />
                <PhaseCard
                  title="Phase 3: Full Optimization"
                  timeframe="6-12 months"
                  impact="Maximized efficiency"
                  description="Achieve and maintain target utilization"
                  objectives={[
                    "Complete transition to optimized model",
                    "Implement advanced analytics",
                    "Integrate with shipper systems",
                    "Establish long-term contracts"
                  ]}
                  color={colors.success}
                />
              </div>
            </section>

            {/* Recommendations */}
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">Conclusions & Recommendations</h2>
              <div className="bg-gray-50 rounded-lg shadow-md p-6 border-l-4" style={{ borderColor: colors.primary }}>
                <h3 className="text-lg font-bold mb-3">Key Findings</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li className="font-medium">
                    <span className="font-semibold">Utilization is Critical:</span> Fleet model is only profitable at 6+ trips per month. Current average of 4 trips leads to significantly higher costs.
                  </li>
                  <li className="font-medium">
                    <span className="font-semibold">Zero Detention Cost:</span> Dedicated fleet model eliminates detention costs entirely, which currently account for 29% of one-way trip costs.
                  </li>
                  <li className="font-medium">
                    <span className="font-semibold">Combined Approach:</span> Implement one-way optimizations first while testing dedicated fleet model with limited resources.
                  </li>
                  <li className="font-medium">
                    <span className="font-semibold">Decision Factors:</span> Fleet model decision should consider volume stability, backhaul opportunities, and customer service requirements.
                  </li>
                </ul>
                <div className="mt-4 bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="font-semibold mb-2">Recommended Approach</h4>
                  <ol className="list-decimal pl-5 space-y-1 text-sm">
                    <li><strong>Phase 1 (Immediate):</strong> Implement one-way optimization strategies while conducting a 3-month pilot with 2-3 dedicated trucks</li>
                    <li><strong>Phase 2 (3-6 months):</strong> Evaluate pilot results against optimized one-way model</li>
                    <li><strong>Phase 3 (6-12 months):</strong> Scale successful model based on data-driven decision</li>
                    <li><strong>Critical Success Factor:</strong> Achieving 8 trips per month utilization is essential for dedicated fleet viability</li>
                  </ol>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <p className="text-sm opacity-80">© 2025 Flex Logistics. Saudi-Kuwait Logistics Operations Analysis.</p>
            <FlexLogo />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;