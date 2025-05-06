import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

// Define colors for consistent use throughout the dashboard
const COLORS = {
  primary: '#ff9e00',
  secondary: '#a4a3a3',
  dark: '#2c3e50',
  light: '#f8f9fa',
  accent: '#3498db',
  warning: '#e74c3c',
  success: '#2ecc71',
  yellow: '#f39c12',
  purple: '#9b59b6'
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Data for journey overview
  const drivingVsIdleData = [
    { name: 'Driving', value: 17.72, percentage: 14 },
    { name: 'Idle', value: 107.65, percentage: 86 }
  ];

  // Data for journey phases
  const journeyPhasesData = [
    { name: 'Origin', hours: 13.71, percentage: 10.2, color: COLORS.accent },
    { name: 'Transport', hours: 25.62, percentage: 19.1, color: COLORS.success },
    { name: 'Customs', hours: 78.38, percentage: 58.3, color: COLORS.warning },
    { name: 'Destination', hours: 16.77, percentage: 12.5, color: COLORS.yellow }
  ];

  // Data for bottlenecks
  const bottlenecksData = [
    { 
      name: 'Kuwait Customs', 
      hours: 55.43, 
      percentage: 44.22, 
      best: 24.97, 
      target: 20.00, 
      color: COLORS.warning 
    },
    { 
      name: 'Saudi Return', 
      hours: 15.21, 
      percentage: 11.31, 
      best: 3.27, 
      target: 7.21, 
      color: COLORS.yellow 
    },
    { 
      name: 'Offloading', 
      hours: 16.77, 
      percentage: 12.47, 
      best: 6.78, 
      target: 6.78, 
      color: COLORS.accent 
    },
    { 
      name: 'Loading', 
      hours: 6.54, 
      percentage: 5.22, 
      best: 3.00, 
      target: 5.00, 
      color: COLORS.primary 
    },
    { 
      name: 'Documentation', 
      hours: 5.28, 
      percentage: 4.21, 
      best: 3.20, 
      target: 3.00, 
      color: COLORS.secondary 
    }
  ];

  // Data for optimization phases
  const optimizationData = [
    { 
      phase: 'Phase 1: Scheduling', 
      timeframe: '0-3 months', 
      savings: 7.94, 
      percentage: 13.6,
      description: 'Eliminate waiting time outside consignee\'s working hours',
      actions: [
        'Target arrivals between 5-8am at warehouse',
        'Implement day-of-week controls',
        'Develop scheduling tool for optimal departures'
      ],
      color: COLORS.accent
    },
    { 
      phase: 'Phase 2: Process', 
      timeframe: '3-6 months', 
      savings: 15.02, 
      percentage: 25.7,
      description: 'Standardize and optimize internal processes',
      actions: [
        'Standardize offloading procedures',
        'Implement digital documentation system',
        'Enable parallel processing workflows'
      ],
      color: COLORS.yellow
    },
    { 
      phase: 'Phase 3: External', 
      timeframe: '6-12 months', 
      savings: 35.43, 
      percentage: 60.7,
      description: 'Work with customs authorities to improve processing times',
      actions: [
        'Engage Kuwait customs for extended hours',
        'Establish trusted shipper program',
        'Harmonize Saudi customs return procedures'
      ],
      color: COLORS.success
    }
  ];

  // Data for arrival window analysis
  const arrivalWindowData = [
    { window: 'Early Morning (5-8am)', efficiency: 100, outsideHours: 0, totalTime: 7.09 },
    { window: 'Night (10pm-5am)', efficiency: 45.35, outsideHours: 11.70, totalTime: 21.41 },
    { window: 'Afternoon (12-5pm)', efficiency: 42.60, outsideHours: 13.00, totalTime: 22.65 }
  ];

  // Data for arrival day analysis
  const arrivalDayData = [
    { day: 'Monday', efficiency: 80.48, outsideHours: 2.00, totalTime: 10.25 },
    { day: 'Sunday', efficiency: 56.70, outsideHours: 5.67, totalTime: 13.09 },
    { day: 'Tuesday', efficiency: 56.57, outsideHours: 8.00, totalTime: 18.42 },
    { day: 'Friday', efficiency: 22.33, outsideHours: 28.00, totalTime: 36.05 },
    { day: 'Thursday', efficiency: 17.08, outsideHours: 30.00, totalTime: 36.18 }
  ];

  // Data for business impact
  const businessImpactData = {
    financialSavings: {
      hoursPerShipment: 58.39,
      annualShipments: 156,
      totalHoursSaved: 9108.84,
      costPerHour: 85,
      annualSavings: 774251.40
    },
    capacityIncrease: {
      currentCycleTime: 5.60,
      targetCycleTime: 3.17,
      percentageImprovement: 43.4,
      additionalShipments: 68
    },
    serviceLevel: {
      currentOnTimeDelivery: "63%",
      targetOnTimeDelivery: "95%"
    }
  };

  // For touchpoint analysis
  const touchpointsData = [
    { id: 0, name: "Arrival Accuracy", phase: "Planning", hours: 1.20, percentage: 0.89, best: 0.23 },
    { id: 1, name: "Waiting outside Plant", phase: "Origin", hours: 1.89, percentage: 1.51, best: 0.12 },
    { id: 2, name: "Truck Loading Time", phase: "Origin", hours: 6.54, percentage: 5.22, best: 3.00 },
    { id: 3, name: "Documentation waiting", phase: "Origin", hours: 5.28, percentage: 4.21, best: 3.20 },
    { id: 4, name: "Transit to Saudi Customs", phase: "Transport", hours: 11.05, percentage: 8.82, best: 6.16 },
    { id: 5, name: "Saudi custom clearance", phase: "Customs", hours: 7.21, percentage: 5.75, best: 3.28 },
    { id: 6, name: "Kuwait custom clearance", phase: "Customs", hours: 55.43, percentage: 44.22, best: 24.97 },
    { id: 7, name: "Transit to warehouse", phase: "Transport", hours: 2.37, percentage: 1.89, best: 1.67 },
    { id: 8, name: "Waiting outside working hours", phase: "Destination", hours: 7.94, percentage: 6.33, best: 0.00 },
    { id: 9, name: "Actual offloading time", phase: "Destination", hours: 8.83, percentage: 7.04, best: 6.18 },
    { id: 10, name: "Transit to KW customs", phase: "Transport", hours: 3.10, percentage: 2.47, best: 1.77 },
    { id: 11, name: "KW custom clearance", phase: "Customs", hours: 0.53, percentage: 0.42, best: 0.13 },
    { id: 12, name: "SA custom clearance", phase: "Customs", hours: 15.21, percentage: 11.31, best: 3.27 },
    { id: 13, name: "Return to transporter yard", phase: "Transport", hours: 9.10, percentage: 6.77, best: null }
  ];

  // Driving vs Idle breakdown
  const idleTimeBreakdown = [
    { category: "Kuwait Customs", hours: 55.43, percentage: 50.9 },
    { category: "SA Return", hours: 15.21, percentage: 14.0 },
    { category: "Offloading", hours: 16.77, percentage: 15.4 },
    { category: "Other idle time", hours: 21.45, percentage: 19.7 }
  ];

  // Calculate the journey time before and after optimization
  const currentJourneyTime = 125.37;
  const optimizedJourneyTime = currentJourneyTime - optimizationData.reduce((acc, curr) => acc + curr.savings, 0);
  
  const journeyComparisonData = [
    { name: 'Current Journey Time', hours: currentJourneyTime },
    { name: 'Optimized Journey Time', hours: optimizedJourneyTime }
  ];

  // Environmental impact data
  const environmentalImpactData = {
    co2eReduction: "24.7%",
    metricTonsSaved: 670.4,
    litersOfDieselSaved: 250155
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Saudi-Kuwait Logistics Operations Analysis</h1>
            <p className="text-gray-300">April 2025 | Project: PGFLXC02 | Lane: DMM-KW1/LF/CB</p>
          </div>
          <div className="mt-4 md:mt-0 bg-white text-blue-700 px-4 py-2 rounded-md font-semibold">
            Interactive Dashboard
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap mb-6 bg-white rounded-lg shadow-md">
        <button 
          className={`px-6 py-3 font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`px-6 py-3 font-medium ${activeTab === 'bottlenecks' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('bottlenecks')}
        >
          Bottlenecks
        </button>
        <button 
          className={`px-6 py-3 font-medium ${activeTab === 'optimization' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('optimization')}
        >
          Optimization Strategy
        </button>
        <button 
          className={`px-6 py-3 font-medium ${activeTab === 'impact' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('impact')}
        >
          Business Impact
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">Journey Overview</h2>
            <p className="text-gray-600 mb-4">
              The Saudi-Kuwait logistics corridor spans 838.42 kilometers round-trip but faces severe operational 
              inefficiencies with only 14% of time spent driving. This analysis is based on data from November 2024 to January 2025.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg border-t-4 border-orange-500 shadow-sm text-center">
                <p className="text-3xl font-bold text-orange-500">125.37</p>
                <p className="text-sm text-gray-500">Total Hours</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-t-4 border-red-500 shadow-sm text-center">
                <p className="text-3xl font-bold text-red-500">107.65</p>
                <p className="text-sm text-gray-500">Idle Hours (86%)</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-t-4 border-green-500 shadow-sm text-center">
                <p className="text-3xl font-bold text-green-500">17.72</p>
                <p className="text-sm text-gray-500">Driving Hours (14%)</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-t-4 border-blue-500 shadow-sm text-center">
                <p className="text-3xl font-bold text-blue-500">838.42</p>
                <p className="text-sm text-gray-500">Total KM</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Driving vs. Idle Time</h3>
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
                        label={({name, percentage}) => `${name}: ${percentage}%`}
                      >
                        {drivingVsIdleData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? COLORS.success : COLORS.warning} />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip formatter={(value) => `${value.toFixed(2)} hours`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-orange-800">Idle Time Breakdown</h4>
                  <div className="mt-2">
                    {idleTimeBreakdown.map((item, index) => (
                      <div key={index} className="mb-2">
                        <div className="flex justify-between text-sm">
                          <span>{item.category}</span>
                          <span className="font-medium">{item.hours} hrs ({item.percentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-orange-500 h-2 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Journey Phases</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={journeyPhasesData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                      <Tooltip 
                        formatter={(value, name, props) => [
                          `${value.toFixed(2)} hours (${props.payload.percentage}%)`,
                          'Time'
                        ]}
                      />
                      <Legend />
                      <Bar dataKey="hours" name="Hours">
                        {journeyPhasesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-800">Key Insight</h4>
                  <p className="text-sm mt-1">
                    <span className="font-medium">Customs processing accounts for 58.3% of total journey time</span>, representing 
                    the most significant optimization opportunity. Kuwait customs (55.43 hours) is the primary bottleneck due to 
                    limited operational hours (8am-1pm, Sat-Thu, closed Friday).
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Arrival Window Analysis</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={arrivalWindowData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="window" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="efficiency" name="Efficiency (%)" fill={COLORS.success} />
                    <Bar yAxisId="right" dataKey="outsideHours" name="Outside Hours" fill={COLORS.warning} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <p className="text-sm">
                  <span className="font-medium">Early morning arrivals (5-8am)</span> achieve 100% efficiency with zero 
                  outside-hours waiting time, while night arrivals have only 45.35% efficiency with 11.7 hours of waiting time.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Arrival Day Analysis</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={arrivalDayData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="efficiency" name="Efficiency (%)" fill={COLORS.accent} />
                    <Bar yAxisId="right" dataKey="outsideHours" name="Outside Hours" fill={COLORS.warning} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm">
                  <span className="font-medium">Monday arrivals</span> show the highest efficiency (80.48%) with minimal 
                  outside hours waiting (2.00 hours), while <span className="font-medium">Thursday/Friday arrivals</span> have 
                  the worst performance with 28-30 hours of waiting time.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottlenecks Tab */}
      {activeTab === 'bottlenecks' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">Critical Bottlenecks</h2>
            <p className="text-gray-600 mb-6">
              Three major bottlenecks account for 67% of total journey time. Each bottleneck has been analyzed to 
              identify root causes and potential optimization opportunities.
            </p>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={bottlenecksData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="hours" name="Current Hours" fill={COLORS.warning} />
                  <Bar dataKey="best" name="Best Observed" fill={COLORS.accent} />
                  <Bar dataKey="target" name="Target Hours" fill={COLORS.success} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-red-500">
              <h3 className="text-lg font-semibold mb-2">Kuwait Customs</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Current Time:</span>
                <span className="font-bold text-red-500">55.43 hours</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">% of Journey:</span>
                <span className="font-medium">44.22%</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Best Observed:</span>
                <span className="font-medium text-blue-600">24.97 hours</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Target:</span>
                <span className="font-medium text-green-600">20.00 hours</span>
              </div>
              <h4 className="font-medium mb-1">Key Issues:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 mb-4">
                <li>Limited hours: 8am-1pm (Sat-Thu), closed Friday</li>
                <li>Only 30 hrs/week vs 168 hrs for 24/7 facilities</li>
                <li>Return clearance at same facility: 0.53 hrs (100x faster)</li>
                <li>Weekend impact adds up to 30+ hours waiting time</li>
              </ul>
              <h4 className="font-medium mb-1">Recommendations:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Engage Kuwait authorities for extended processing hours</li>
                <li>Establish trusted shipper program</li>
                <li>Develop dedicated lanes for regular chemical shipments</li>
              </ul>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-yellow-500">
              <h3 className="text-lg font-semibold mb-2">Offloading Process</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Current Time:</span>
                <span className="font-bold text-yellow-500">16.77 hours</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">% of Journey:</span>
                <span className="font-medium">12.47%</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Best Observed:</span>
                <span className="font-medium text-blue-600">6.78 hours</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Target:</span>
                <span className="font-medium text-green-600">6.78 hours</span>
              </div>
              <h4 className="font-medium mb-1">Key Issues:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 mb-4">
                <li>Misaligned arrivals with warehouse hours (5am-4pm)</li>
                <li>47.35% of time spent waiting outside working hours</li>
                <li>Early morning arrivals (5-8am) have zero waiting time</li>
                <li>Weekend arrivals experience up to 30 hours waiting</li>
              </ul>
              <h4 className="font-medium mb-1">Recommendations:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Target arrivals between 5-8am to eliminate waiting</li>
                <li>Standardize offloading procedures across all shipments</li>
                <li>Avoid Thursday/Friday arrivals to eliminate weekend impact</li>
              </ul>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold mb-2">Saudi Return Customs</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Current Time:</span>
                <span className="font-bold text-blue-500">15.21 hours</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">% of Journey:</span>
                <span className="font-medium">11.31%</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Best Observed:</span>
                <span className="font-medium text-blue-600">3.27 hours</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Target:</span>
                <span className="font-medium text-green-600">7.21 hours</span>
              </div>
              <h4 className="font-medium mb-1">Key Issues:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 mb-4">
                <li>2x longer than outbound (7.21 hrs) despite 24/7 operation</li>
                <li>High variability (10.4-21.8 hrs) in processing times</li>
                <li>Different inspection protocols for returning vehicles</li>
                <li>Return processing deprioritized vs. inbound shipments</li>
              </ul>
              <h4 className="font-medium mb-1">Recommendations:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Harmonize outbound and return clearance procedures</li>
                <li>Develop expedited processing for empty return vehicles</li>
                <li>Align return processing time with outbound clearance</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">All Touchpoint Analysis</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 text-left">Touchpoint</th>
                    <th className="py-2 px-4 text-left">Phase</th>
                    <th className="py-2 px-4 text-left">Hours</th>
                    <th className="py-2 px-4 text-left">% of Total</th>
                    <th className="py-2 px-4 text-left">Best Observed</th>
                    <th className="py-2 px-4 text-left">Improvement Potential</th>
                  </tr>
                </thead>
                <tbody>
                  {touchpointsData
                    .sort((a, b) => b.hours - a.hours)
                    .map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                        <td className="py-2 px-4">{item.name}</td>
                        <td className="py-2 px-4">{item.phase}</td>
                        <td className="py-2 px-4 font-medium">{item.hours.toFixed(2)}</td>
                        <td className="py-2 px-4">{item.percentage.toFixed(2)}%</td>
                        <td className="py-2 px-4">{item.best ? item.best.toFixed(2) : 'N/A'}</td>
                        <td className="py-2 px-4">
                          {item.best ? (
                            <div>
                              <span className="text-green-600 font-medium">
                                {((item.hours - item.best) / item.hours * 100).toFixed(1)}%
                              </span>
                              <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                                <div 
                                  className="bg-green-500 h-1 rounded-full" 
                                  style={{ width: `${((item.hours - item.best) / item.hours * 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          ) : 'N/A'}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Optimization Strategy Tab */}
      {activeTab === 'optimization' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">Optimization Strategy</h2>
            <p className="text-gray-600 mb-6">
              Our three-phase optimization strategy will deliver 58.39 hours in time savings (43.4% reduction). 
              Each phase builds on the previous one to systematically address all identified bottlenecks.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Savings by Phase</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={optimizationData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="savings"
                        label={({name, percentage}) => `${percentage}%`}
                        nameKey="phase"
                      >
                        {optimizationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip formatter={(value) => `${value.toFixed(2)} hours`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Journey Time Reduction</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={journeyComparisonData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" width={160} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="hours" name="Hours">
                        {journeyComparisonData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={index === 0 ? COLORS.warning : COLORS.success} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center mt-2">
                  <span className="font-medium text-green-600 text-lg">
                    {((currentJourneyTime - optimizedJourneyTime) / currentJourneyTime * 100).toFixed(1)}% Reduction
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {optimizationData.map((phase, index) => (
              <div 
                key={index} 
                className="bg-white p-5 rounded-lg shadow-md"
                style={{ borderTop: `4px solid ${phase.color}` }}
              >
                <h3 className="text-lg font-semibold mb-2">{phase.phase}</h3>
                <p className="text-sm text-gray-500 mb-2">{phase.timeframe}</p>
                <div className="mb-3">
                  <span className="text-lg font-medium" style={{ color: phase.color }}>
                    {phase.savings.toFixed(2)} hours ({phase.percentage}%)
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Primary Objective:</strong> {phase.description}
                </p>
                <h4 className="font-medium mb-1">Key Activities:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {phase.actions.map((action, idx) => (
                    <li key={idx}>{action}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Implementation Timeline</h3>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-blue-200 text-blue-800">
                    Phase 1: Scheduling
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    0-3 Months
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                <div style={{ width: "25%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
              </div>
              
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-yellow-200 text-yellow-800">
                    Phase 2: Process
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-yellow-600">
                    3-6 Months
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-yellow-200">
                <div style={{ width: "25%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"></div>
              </div>
              
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-green-200 text-green-800">
                    Phase 3: External
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-green-600">
                    6-12 Months
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                <div style={{ width: "50%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Business Impact Tab */}
      {activeTab === 'impact' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">Business Impact</h2>
            <p className="text-gray-600 mb-6">
              Implementation of our three-phase optimization strategy will deliver substantial financial and 
              operational benefits, with a strong return on investment and rapid payback period.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-800 mb-3">Financial Savings</h3>
                <div className="text-center mb-4">
                  <p className="text-3xl font-bold text-green-600">
                    ${businessImpactData.financialSavings.annualSavings.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">Annual Savings</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hours per Shipment</span>
                    <span className="font-medium">{businessImpactData.financialSavings.hoursPerShipment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Shipments</span>
                    <span className="font-medium">{businessImpactData.financialSavings.annualShipments}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Hours Saved</span>
                    <span className="font-medium">{businessImpactData.financialSavings.totalHoursSaved.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cost per Hour</span>
                    <span className="font-medium">${businessImpactData.financialSavings.costPerHour}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-800 mb-3">Capacity Increase</h3>
                <div className="text-center mb-4">
                  <p className="text-3xl font-bold text-blue-600">
                    {businessImpactData.capacityIncrease.additionalShipments}
                  </p>
                  <p className="text-sm text-gray-500">Additional Shipments Possible</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Cycle Time</span>
                    <span className="font-medium">{businessImpactData.capacityIncrease.currentCycleTime} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Target Cycle Time</span>
                    <span className="font-medium">{businessImpactData.capacityIncrease.targetCycleTime} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Improvement</span>
                    <span className="font-medium">{businessImpactData.capacityIncrease.percentageImprovement}%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-800 mb-3">Service Level Improvements</h3>
                <div className="text-center mb-4">
                  <p className="text-3xl font-bold text-green-600">
                    {businessImpactData.serviceLevel.targetOnTimeDelivery}
                  </p>
                  <p className="text-sm text-gray-500">On-Time Delivery Target</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current On-Time Delivery</span>
                    <span className="font-medium">{businessImpactData.serviceLevel.currentOnTimeDelivery}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Improvement</span>
                    <span className="font-medium">32 percentage points</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Predictability</span>
                    <span className="font-medium text-red-500">Low</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Target Predictability</span>
                    <span className="font-medium text-green-500">High</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-800 mb-3">SLA Compliance</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-2 px-4 text-left">Process</th>
                        <th className="py-2 px-4 text-left">Current</th>
                        <th className="py-2 px-4 text-left">Optimized</th>
                        <th className="py-2 px-4 text-left">Free Time</th>
                        <th className="py-2 px-4 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-4">Loading & Documentation</td>
                        <td className="py-2 px-4">11.82 hrs</td>
                        <td className="py-2 px-4">8.00 hrs</td>
                        <td className="py-2 px-4">24 hrs</td>
                        <td className="py-2 px-4">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Compliant</span>
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="py-2 px-4">Border Processing</td>
                        <td className="py-2 px-4">78.38 hrs</td>
                        <td className="py-2 px-4">38.00 hrs</td>
                        <td className="py-2 px-4">48 hrs</td>
                        <td className="py-2 px-4">
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Borderline</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4">Offloading</td>
                        <td className="py-2 px-4">16.77 hrs</td>
                        <td className="py-2 px-4">6.78 hrs</td>
                        <td className="py-2 px-4">24 hrs</td>
                        <td className="py-2 px-4">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Compliant</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 bg-blue-50 p-3 rounded-lg text-sm">
                  <p>The optimized process stays within all SLA free time windows, eliminating demurrage charges and premium rate requirements.</p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-800 mb-3">Environmental Impact</h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-600">{environmentalImpactData.co2eReduction}</p>
                    <p className="text-xs text-gray-600">CO2e Reduction Per Trip</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-600">{environmentalImpactData.metricTonsSaved.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">Metric Tons CO2e Saved Annually</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-600">{environmentalImpactData.litersOfDieselSaved.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">Liters of Diesel Saved Annually</p>
                  </div>
                </div>
                <h4 className="font-medium mb-2">Additional Sustainability Benefits:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  <li>Reduced air pollution (NOx, particulate matter)</li>
                  <li>Noise reduction in border areas and urban environments</li>
                  <li>Resource conservation (fossil fuels)</li>
                  <li>Approximately $300,000 in annual fuel cost savings</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-medium text-gray-800 mb-3">Qualitative Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-blue-800 mb-1">Driver Satisfaction</p>
                  <p className="text-xs text-gray-600">Improved retention and availability</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-blue-800 mb-1">Reduced Stress</p>
                  <p className="text-xs text-gray-600">Lower planning team workload</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-blue-800 mb-1">Enhanced Reputation</p>
                  <p className="text-xs text-gray-600">Improved customer satisfaction</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-blue-800 mb-1">Better Relationships</p>
                  <p className="text-xs text-gray-600">Stronger ties with customs authorities</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-blue-800 mb-1">Competitive Advantage</p>
                  <p className="text-xs text-gray-600">In Kuwait chemical logistics market</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-6 text-center text-sm text-gray-500">
        <p>© 2025 Flex Logistics. Saudi-Kuwait Logistics Operations Analysis.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
