import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Rent', value: 35.35, amount: 2600, color: '#36B37E' },
  { name: 'Food', value: 12.73, amount: 944, color: '#FFE380' },
  { name: 'Utilities', value: 10.53, amount: 780, color: '#FFA07A' },
  { name: 'Bills', value: 10.45, amount: 774, color: '#FF8F73' },
  { name: 'Shopping', value: 8.67, amount: 642, color: '#79E2F2' },
  { name: 'Transportation', value: 8.48, amount: 628, color: '#79F2C0' },
  { name: 'Insurance', value: 7.58, amount: 561, color: '#C0B6F2' },
  { name: 'Health Care', value: 6.22, amount: 460, color: '#998DD9' },
  { name: 'Clothing', value: 5.95, amount: 441, color: '#B3D4FF' },
  { name: 'Others', value: 12.73, amount: 943, color: '#DFE1E6' }
];

export default function FirstChart() {
  return (
    <div className="bg-white p-4 sm:p-6 w-full max-w-6xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Total Expenses</h2>
          <p className="text-sm text-gray-500">Jul 1 - Nov 30</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
            Pie & Breakdown
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        {/* Chart */}
        <div className="flex justify-center w-full lg:w-1/2">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto aspect-square">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="#fff"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value}%`, name]}
                  contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                  itemStyle={{ color: '#374151' }}
                />
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  iconType="circle"
                  wrapperStyle={{ paddingTop: 16 }}
                  formatter={(value) => (
                    <span className="text-xs text-gray-700">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Breakdown */}
        <div className="w-full lg:w-1/2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-1.5 rounded-full inline-block"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span className="text-sm text-gray-700 font-medium">{item.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-gray-800">₵{item.amount}</span>
                  <span className="text-xs text-gray-500">{item.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
