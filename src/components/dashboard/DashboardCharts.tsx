import React from "react";
import {
  LineChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const balanceData = [
  { name: "Jan", Balance: 1200 },
  { name: "Feb", Balance: 1350 },
  { name: "Mar", Balance: 1250 },
  { name: "Apr", Balance: 1400 },
  { name: "May", Balance: 1600 },
];

const incomeExpenseData = [
  {
    name: "Jan",
    Income: 8400,
    Expense: 7200,
  },
  {
    name: "Feb",
    Income: 6500,
    Expense: 7100,
  },
  {
    name: "Mar",
    Income: 8800,
    Expense: 6900,
  },
  {
    name: "Apr",
    Income: 7900,
    Expense: 7300,
  },
  {
    name: "May",
    Income: 8100,
    Expense: 7000,
  },
];

export default function DashboardCharts() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      {/* Balance Area Chart */}
      <div className="bg-white rounded-2xl shadow p-4 w-full lg:w-1/2">
        <h2 className="text-lg font-semibold mb-4">Account - Balance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={balanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Balance"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.3}
              dot={{ r: 6, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
              activeDot={{ r: 8, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
              name="Balance"
            />
            <Line
              type="monotone"
              dataKey="Balance"
              stroke="#1d4ed8"
              strokeWidth={3}
              dot={false}
              name="Balance Line"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Income-Expense Bar Chart */}
      <div className="bg-white rounded-2xl shadow p-4 w-full lg:w-1/2">
        <h2 className="text-lg font-semibold mb-4">Income - Expense</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={incomeExpenseData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Income" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Expense" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
