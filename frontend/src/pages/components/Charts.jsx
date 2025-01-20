import React from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts'

const COLORS = {
  electronics: '#4F46E5',
  fashion: '#10B981',
  home: '#F59E0B'
}

export const SalesTrends = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      {Object.keys(COLORS).map(key => (
        <Line
          key={key}
          type="monotone"
          dataKey={key}
          stroke={COLORS[key]}
          strokeWidth={2}
          dot={{ r: 4 }}
          name={key.charAt(0).toUpperCase() + key.slice(1)}
        />
      ))}
    </LineChart>
  </ResponsiveContainer>
)

export const TopProducts = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} layout="vertical">
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" />
      <YAxis dataKey="name" type="category" width={150} />
      <Tooltip />
      <Bar dataKey="revenue" fill="#4F46E5" />
    </BarChart>
  </ResponsiveContainer>
)

// Add more chart components as needed

export default {
  SalesTrends,
  TopProducts
} 