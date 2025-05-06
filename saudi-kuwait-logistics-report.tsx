import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = {
  primary: '#ff9e00',
  secondary: '#a4a3a3',
  dark: '#2c3e50',
  light: '#f8f9fa',
  accent: '#3498db',
  warning: '#e74c3c',
  success: '#2ecc71',
  yellow: '#f39c12'
};

const JourneyOverview = () => {
  const drivingVsIdleData = [
    { name: 'Driving Time', value: 17.72, percentage: 14 },
    { name: 'Idle Time', value: 107.65, percentage: 86 }
  ];

  const journeyPhasesData = [
    { name: 'Origin', hours: 13.71, percentage: 10.2, color: COLORS.accent },
    { name: 'Transport', hours: 25.62, percentage: 19.1, color: COLORS.success },
    { name: 'Customs', hours: 78.38, percentage: 58.3, color: COLORS.warning },
    { name: 'Destination', hours: 16.77, percentage: 12.5, color: COLORS.yellow }
  ];

  return (
    <div className="p-4 mb-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Journey Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard value="125.37" label="Total Hours" />
        <StatCard value="5.22" label="Total Days" />
        <StatCard value="838.42" label="Total KM" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Driving vs. Idle Time</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <StatCard value="17.72" label="Driving Hours" color="text-green-600" />
            <StatCard value="107.65" label="Idle Hours" color="text-red-600" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={drivingVsIdleData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                >
                  <Cell key="driving" fill={COLORS.success} />
                  <Cell key="idle" fill={COLORS.warning} />
                </Pie>
                <Tooltip formatter={(value) => `${value} hours`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Journey Phases</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={journeyPhasesData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value, name, props) => [`${value} hours (${props.payload.percentage}%)`, name]} />
                <Bar dataKey="hours" name="Hours">
                  {journeyPhasesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const BottleneckAnalysis = () => {
  const bottleneckData = [
    { 
      id: 1, 
      name: 'Kuwait Customs', 
      hours: 55.43, 
      percentage: 44.22, 
      bestObserved: 24.97,
      issues: 'Limited hours: 8am-1pm (Sat-Thu), closed Friday',
      recommendations: 'Engage Kuwait authorities for extended hours, establish trusted shipper program',
      potentialSavings: 35.43,
      color: COLORS.warning
    },
    { 
      id: 2, 
      name: 'Saudi Return Customs', 
      hours: 15.21, 
      percentage: 11.31, 
      bestObserved: 3.27,
      issues: '2x longer than outbound despite 24/7 operation',
      recommendations: 'Harmonize outbound and return clearance procedures',
      potentialSavings: 8.00,
      color: COLORS.yellow
    },
    { 
      id: 3, 
      name: 'Truck Offloading', 
      hours: 16.77, 
      percentage: 12.47, 
      bestObserved: 6.78,
      issues: '47.35% time spent waiting outside working hours',
      recommendations: 'Target arrivals between 5-8am, standardize procedures',
      potentialSavings: 9.99,
      color: COLORS.accent
    },
  ];

  return (
    <div className="p-4 mb-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Major Bottlenecks</h2>
      
      <div className="h-80 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={bottleneckData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" label={{ value: 'Hours', position: 'insideBottom', offset: -5 }} />
            <YAxis type="category" dataKey="name" width={140} />
            <Tooltip formatter={(value, name, props) => [`${value} hours (${props.payload.percentage}%)`, name]} />
            <Legend />
            <Bar dataKey="hours" name="Current Hours" fill={COLORS.warning} />
            <Bar dataKey="bestObserved" name="Best Observed" fill={COLORS.success} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left">Bottleneck</th>
              <th className="py-3 px-4 text-left">Hours</th>
              <th className="py-3 px-4 text-left">% of Total</th>
              <th className="py-3 px-4 text-left">Key Issues</th>
              <th className="py-3 px-4 text-left">Recommendations</th>
              <th className="py-3 px-4 text-left">Potential Savings</th>
            </tr>
          </thead>
          <tbody>
            {bottleneckData.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="py-3 px-4 font-medium">{item.name}</td>
                <td className="py-3 px-4">{item.hours}</td>
                <td className="py-3 px-4">{item.percentage}%</td>
                <td className="py-3 px-4">{item.issues}</td>
                <td className="py-3 px-4">{item.recommendations}</td>
                <td className="py-3 px-4 font-medium text-green-600">{item.potentialSavings} hours</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const OffloadingAnalysis = () => {
  const offloadingFactorsData = [
    { name: 'Outside Hours Waiting', value: 7.94, percentage: 47.35 },
    { name: 'Actual Processing Time', value: 8.83, percentage: 52.65 }
  ];

  const arrivalWindowData = [
    { window: 'Early Morning (5-8am)', efficiency: 100, outsideHours: 0, totalTime: 7.09 },
    { window: 'Night (10pm-5am)', efficiency: 45.35, outsideHours: 11.70, totalTime: 21.41 },
    { window: 'Afternoon (12-5pm)', efficiency: 42.60, outsideHours: 13.00, totalTime: 22.65 }
  ];

  const arrivalDayData = [
    { day: 'Monday', efficiency: 80.48, outsideHours: 2.00, totalTime: 10.25 },
    { day: 'Sunday', efficiency: 56.70, outsideHours: 5.67, totalTime: 13.09 },
    { day: 'Tuesday', efficiency: 56.57, outsideHours: 8.00, totalTime: 18.42 },
    { day: 'Friday', efficiency: 22.33, outsideHours: 28.00, totalTime: 36.05 },
    { day: 'Thursday', efficiency: 17.08, outsideHours: 30.00, totalTime: 36.18 }
  ];

  return (
    <div className="p-4 mb-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Offloading Time Analysis</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Offloading Performance Factors</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <StatCard value="16.77" label="Total Offloading (hrs)" />
            <StatCard value="7.94" label="Outside Hours (hrs)" color="text-red-600" />
            <StatCard value="8.83" label="Actual Processing (hrs)" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={offloadingFactorsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
                >
                  <Cell key="outside" fill={COLORS.warning} />
                  <Cell key="processing" fill={COLORS.accent} />
                </Pie>
                <Tooltip formatter={(value) => `${value} hours`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-sm text-gray-700"><strong>Best Recorded Performance:</strong> 6.78 hours total offloading time</p>
          <p className="text-sm text-gray-700"><strong>Outside Hours Impact:</strong> 82.12% of excess time above standard</p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Arrival Window Analysis</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={arrivalWindowData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="window" />
                <YAxis yAxisId="left" orientation="left" label={{ value: 'Efficiency (%)', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" label={{ value: 'Hours', angle: 90, position: 'insideRight' }} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="efficiency" name="Efficiency (%)" fill={COLORS.success} />
                <Bar yAxisId="right" dataKey="outsideHours" name="Outside Hours" fill={COLORS.warning} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-sm text-gray-700"><strong>Key Insight:</strong> Early morning arrivals (5-8am) consistently achieve 100% efficiency with zero outside-hours waiting time</p>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Arrival Day Performance</h3>
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={arrivalDayData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis yAxisId="left" orientation="left" label={{ value: 'Efficiency (%)', angle: -90, position: 'insideLeft' }} />
            <YAxis yAxisId="right" orientation="right" label={{ value: 'Hours', angle: 90, position: 'insideRight' }} />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="efficiency" name="Efficiency (%)" fill={COLORS.accent} />
            <Bar yAxisId="right" dataKey="totalTime" name="Total Time (hrs)" fill={COLORS.primary} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="p-4 border-l-4 border-orange-500 bg-orange-50 rounded-r mb-6">
        <h4 className="font-bold text-lg text-gray-800 mb-2">Key Success Factors for Offloading</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Arrival Timing:</strong> Best performers arrive during Early Morning (5-8am)</li>
          <li><strong>Arrival Day:</strong> Best performers arrive on Monday, followed by Sunday</li>
          <li><strong>Process Efficiency:</strong> Best performers complete offloading in 6.78-7.38 hours</li>
          <li><strong>Weekend Impact:</strong> Thursday/Friday arrivals add up to 30 hours of waiting time</li>
        </ul>
      </div>
    </div>
  );
};

const ImplementationPlan = () => {
  const implementationPhases = [
    {
      id: 1,
      title: 'Phase 1: Scheduling Optimization',
      timeframe: '0-3 months',
      savings: 7.94,
      percentage: 13.6,
      objective: 'Eliminate waiting time outside consignee\'s working hours',
      activities: [
        'Develop arrival window scheduling tool',
        'Implement day-of-week controls',
        'Align driver scheduling',
        'Train dispatchers and planners'
      ],
      metrics: '0 hours outside hours waiting, 100% arrivals during 5-8am window',
      color: COLORS.accent
    },
    {
      id: 2,
      title: 'Phase 2: Process Optimization',
      timeframe: '3-6 months',
      savings: 15.02,
      percentage: 25.7,
      objective: 'Standardize and optimize internal processes',
      activities: [
        'Standardize offloading procedures',
        'Implement digital documentation system',
        'Enable parallel processing workflows',
        'Develop real-time performance monitoring'
      ],
      metrics: 'Reduce truck loading from 6.54 to 5.00 hours, documentation waiting from 5.28 to 3.00 hours',
      color: COLORS.yellow
    },
    {
      id: 3,
      title: 'Phase 3: External Engagement',
      timeframe: '6-12 months',
      savings: 35.43,
      percentage: 60.7,
      objective: 'Work with customs authorities to improve processing times',
      activities: [
        'Engage Kuwait customs authorities',
        'Develop trusted shipper program proposal',
        'Optimize Saudi customs return process',
        'Implement new customs procedures'
      ],
      metrics: 'Reduce Kuwait customs clearance from 55.43 to 20.00 hours, Saudi return customs from 15.21 to 7.21 hours',
      color: COLORS.success
    }
  ];

  const savingsData = [
    { name: 'Current Journey Time', hours: 134.47, color: COLORS.warning },
    { name: 'Target Journey Time', hours: 76.08, color: COLORS.success }
  ];

  const phaseSavingsData = implementationPhases.map(phase => ({
    name: `Phase ${phase.id}`,
    value: phase.savings,
    percentage: phase.percentage,
    color: phase.color
  }));

  return (
    <div className="p-4 mb-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Implementation Plan</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Total Potential Savings</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <StatCard value="58.39" label="Hours Saved" color="text-green-600" />
            <StatCard value="43.4%" label="Journey Time" color="text-green-600" />
            <StatCard value="95%" label="On-Time Delivery" color="text-green-600" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={savingsData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={140} />
                <Tooltip formatter={(value) => `${value} hours`} />
                <Bar dataKey="hours" name="Hours">
                  {savingsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Implementation Phases</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={phaseSavingsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                >
                  {phaseSavingsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name, props) => [`${value} hours (${props.payload.percentage}%)`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {implementationPhases.map((phase) => (
          <div key={phase.id} className="p-4 bg-white border rounded-lg shadow-sm" style={{ borderTopColor: phase.color, borderTopWidth: '4px' }}>
            <h3 className="text-lg font-bold mb-1">{phase.title}</h3>
            <p className="text-sm text-gray-500 mb-3">{phase.timeframe}</p>
            <p className="font-medium text-lg mb-3" style={{ color: phase.color }}>{phase.savings} hours savings ({phase.percentage}% of total)</p>
            <p className="mb-2"><strong>Primary Objective:</strong> {phase.objective}</p>
            <ul className="list-disc pl-5 mb-4 text-sm">
              {phase.activities.map((activity, index) => (
                <li key={index} className="mb-1">{activity}</li>
              ))}
            </ul>
            <p className="text-sm"><strong>Success Metrics:</strong> {phase.metrics}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatCard = ({ value, label, color = "text-orange-500" }) => (
  <div className="p-4 bg-white rounded shadow-sm text-center">
    <div className={`text-3xl font-bold mb-1 ${color}`}>{value}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Journey Overview' },
    { id: 'bottlenecks', label: 'Bottleneck Analysis' },
    { id: 'offloading', label: 'Offloading Analysis' },
    { id: 'implementation', label: 'Implementation Plan' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center">
            {/* Flex Logo */}
            <svg className="w-24 h-24 mr-4" viewBox="0 0 1350 554">
              <g>
                <path fill="#ff9e00" d="M911.05,314.51l-12.41,80.56c-.17.71-1.55.85-2.13.93-23.6,3.5-48.83,4.17-72.69,5.4s-48.98,2.78-73.31,2.98c-46.31.38-87.61-14.84-89.06-67.68,9.33-77.84,23.33-155.22,35.8-232.61,18.61-74.8,83.07-68.15,145.47-66.76,21.36.48,42.57.89,63.89,2.35,15.68,1.07,31.41,2.67,46.96,4.78l-12.35,81.51-127.48-.03c-29.31,2-25.34,25.56-29.22,47.88l122.99,5.94-13.02,80.37-124.2,4.43c-.63.5-.81,1.21-1.02,1.93-1.88,6.47-5,27.68-4.14,33.98.85,6.21,4.21,10.32,10.1,12.37,1.27.44,5.58,1.67,6.61,1.67h129.23Z"/>
                <polygon fill="#ff9e00" points="1087.88 36.71 1124.26 137.18 1192.27 36.71 1299.62 36.71 1295.96 42.81 1164.3 230.97 1239.02 400.78 1239.29 402.57 1131.65 402.57 1097.05 305.63 1095.44 306.99 1030.81 402.57 923.47 402.57 1055.85 211.24 1054.87 207.71 979.65 36.71 1087.88 36.71"/>
                <path fill="#ff9e00" d="M545.54,36.71l-.08,3.17-40.13,253.06c-.5,8.71.45,17.13,9.46,20.67,2,.79,7.2,2.08,9.16,2.08h112.08l-14.57,86.8-155.49.11c-43.41-2.19-68.13-26.19-64.13-70.65l46.71-295.24h96.99Z"/>
                <path fill="#ff9e00" d="M59.98,402.57l23.84-146.69c7.34-37.15,24.27-67.71,65.73-71.44l235.71.03-13.1,79.12-170.57.06c-13.63.98-23.63,7.64-25.52,21.78l-18.52,117.14H59.98Z"/>
                <path fill="#ff9e00" d="M410.11,36.71l-13.39,78.53-250.12.06c-13.77,1.22-27.28,4.02-40.18,8.9,1.85-17.51,5.58-35.14,13.47-50.97,7.72-15.49,19.62-26.62,36.04-32.54,3.33-1.2,11.79-3.98,14.95-3.98h239.23Z"/>
              </g>
            </svg>
            <div>
              <h1 className="text-2xl font-bold">Saudi-Kuwait Logistics Operations Analysis</h1>
              <p className="text-sm opacity-80">Report v2 Dated 8-04-2025</p>
            </div>
          </div>
          <div className="text-right text-sm">
            <p><span className="font-semibold">Project:</span> PGFLXC02– Process optimization</p>
            <p><span className="font-semibold">Lane Code:</span> DMM-KW1/LF/CB</p>
            <p><span className="font-semibold">Shipping Mode:</span> Land Freight / Crossborder</p>
            <p><span className="font-semibold">Project kickoff:</span> 22-11-2024</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Executive Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatCard value="125.37" label="Total Journey Time (Hours)" />
            <StatCard value="86%" label="Idle Time (%)" color="text-red-600" />
            <StatCard value="58.39" label="Hours Potential Savings" color="text-green-600" />
          </div>
          <p className="mb-4">This comprehensive analysis of the Saudi-Kuwait logistics operations reveals potential time savings of 58.39 hours (43.4%) per shipment through targeted optimization. Our data shows a significant imbalance with only 14% of journey time spent driving while 86% is idle time, highlighting major efficiency opportunities.</p>
          <p className="mb-4">Kuwait Customs represents the critical bottleneck, consuming 55.43 hours (44.22% of total journey time) due to restricted operational hours (5 hours/day, 6 days/week). Secondary delays occur at truck offloading (16.77 hours) and Saudi return customs (15.21 hours).</p>
          <p>Our three-phase implementation strategy addresses these inefficiencies to resolve lane aggregation challenges, improve service reliability, and enable delivery within P&G's budgetary requirements while complying with SLA commitments.</p>
        </div>

        <div className="mb-8">
          <div className="flex overflow-x-auto border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-6 py-3 font-medium text-sm focus:outline-none ${
                  activeTab === tab.id 
                    ? 'border-b-2 border-orange-500 text-orange-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'overview' && <JourneyOverview />}
        {activeTab === 'bottlenecks' && <BottleneckAnalysis />}
        {activeTab === 'offloading' && <OffloadingAnalysis />}
        {activeTab === 'implementation' && <ImplementationPlan />}

        <div className="bg-gray-50 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Conclusion & Recommendations</h2>
          <p className="mb-4">This comprehensive analysis of the Saudi-Kuwait logistics operations reveals significant inefficiencies with idle time accounting for 86% of the total journey time. By implementing our three-phase optimization strategy, we can achieve a 43.4% reduction in total journey time, dramatically improving service reliability and addressing the current lane aggregation challenges.</p>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">Key Recommendations</h3>
          <ol className="list-decimal pl-5 space-y-2 mb-6">
            <li><strong>Immediate Scheduling Changes:</strong> Target all arrivals between 5-8am at the Kuwait warehouse and implement day-of-week controls to avoid Thursday/Friday arrivals.</li>
            <li><strong>Process Standardization:</strong> Document and replicate best practices from high-performing shipments, implement electronic documentation, and enable parallel processing workflows.</li>
            <li><strong>Customs Authority Engagement:</strong> Begin formal discussions with Kuwait customs for extended hours and develop trusted shipper status proposals for both Saudi and Kuwait authorities.</li>
            <li><strong>Performance Monitoring:</strong> Implement real-time tracking of touchpoint performance with standardized KPIs to measure improvement against baselines.</li>
            <li><strong>Documentation Optimization:</strong> Pre-file customs documents and implement digital documentation systems to reduce waiting times.</li>
          </ol>
          
          <div className="p-4 border-l-4 border-orange-500 bg-orange-50 rounded-r mb-6">
            <h4 className="font-bold text-lg text-gray-800 mb-2">SLA Compliance Benefits</h4>
            <p className="mb-2">The optimized journey will stay within all P&G's SLA free time allowances:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Loading & Documentation:</strong> Optimized to 8.00 hours (within 24-hour free time)</li>
              <li><strong>Border Processing:</strong> Reduced to 38.00 hours (within 48-hour free time)</li>
              <li><strong>Offloading:</strong> Standardized to 6.78 hours (within 24-hour free time)</li>
            </ul>
            <p className="mt-2">This will eliminate demurrage/detention charges and enable service delivery within budgetary requirements.</p>
          </div>
          
          <p>By executing these recommendations, we can transform this challenging lane into a reliable, efficient logistics corridor that meets P&G's service expectations while staying within budgetary requirements. The improvements will eliminate demurrage charges, avoid premium spot rates, and create a lane that drivers prefer, thus solving the current aggregation challenges.</p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b border-orange-200 pb-2">What's Next: Commercial Opportunities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg p-4 shadow-sm border-t-4 border-orange-500">
              <h3 className="text-xl font-semibold mb-3 text-gray-700">Financial Impact</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <StatCard value="$774,251" label="Annual Cost Savings" color="text-green-600" />
                <StatCard value="68+" label="Additional Shipments Possible" color="text-blue-600" />
              </div>
              <p className="text-sm">Implementing our recommendations will generate significant financial benefits based on 156 annual shipments with an hourly operating cost of $85 per truck. The 43.4% efficiency improvement creates capacity for 68 additional shipments annually using the same resources.</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm border-t-4 border-orange-500">
              <h3 className="text-xl font-semibold mb-3 text-gray-700">Service Expansion Opportunities</h3>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li>Extended chemical logistics program for P&G's additional product lines</li>
                <li>Potential expansion to neighboring GCC countries (Bahrain, Qatar)</li>
                <li>Value-added warehousing services at both origin and destination</li>
                <li>Customs brokerage service package as a separate billable service</li>
              </ul>
              <p className="text-sm">Success with this lane can create opportunities for expanded service offerings and broader regional coverage.</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-700">Proposed Next Steps</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                <h4 className="font-semibold text-gray-800 mb-1">1. Validation Workshop</h4>
                <p className="text-sm">Schedule 3-hour workshop with P&G stakeholders to validate findings and secure agreement on implementation approach.</p>
                <p className="text-xs font-medium text-blue-600 mt-2">Proposed Date: 15-04-2025</p>
              </div>
              <div className="p-3 border-l-4 border-green-500 bg-green-50">
                <h4 className="font-semibold text-gray-800 mb-1">2. Phase 1 Implementation</h4>
                <p className="text-sm">Begin immediate scheduling optimization with dedicated project team and weekly progress reviews.</p>
                <p className="text-xs font-medium text-green-600 mt-2">Kickoff: 22-04-2025</p>
              </div>
              <div className="p-3 border-l-4 border-purple-500 bg-purple-50">
                <h4 className="font-semibold text-gray-800 mb-1">3. Service Agreement Update</h4>
                <p className="text-sm">Revise commercial agreement to reflect new efficiency baselines and volume commitments.</p>
                <p className="text-xs font-medium text-purple-600 mt-2">Target: 30-04-2025</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-r">
            <h4 className="font-bold text-lg text-gray-800 mb-2">Additional Value Proposition</h4>
            <p className="mb-3">Beyond the immediate operational improvements, this optimization enables:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Carbon Footprint Reduction:</strong> Fewer excess idle hours means reduced emissions and fuel consumption</li>
              <li><strong>Enhanced Supply Chain Visibility:</strong> Real-time tracking and standardized KPIs improve planning</li>
              <li><strong>Driver Satisfaction & Retention:</strong> More predictable schedules and less wasteful waiting time</li>
              <li><strong>Scalable Model:</strong> Approach can be replicated to other challenging lanes in P&G's network</li>
            </ul>
            <p className="mt-3 font-medium text-green-800">We recommend scheduling a strategic planning session with P&G's supply chain leadership to discuss expanding this optimization approach to other lanes in their network.</p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-80">© 2025 Flex Logistics. Saudi-Kuwait Logistics Operations Analysis.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;