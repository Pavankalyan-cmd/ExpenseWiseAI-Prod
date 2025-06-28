import React, { useState, useEffect } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./charts.css";

const MyChart = ({ sortedtransactions }) => {
  const [data, setData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#9999FF",
  ];

  useEffect(() => {
    const formattedData = sortedtransactions.map((item) => ({
      date: item.Date,
      value: parseFloat(item.Amount),
    }));
    setData(formattedData);

    const Piedata = sortedtransactions
      .filter((transaction) => transaction.Type === "Expenses")
      .reduce((acc, transaction) => {
        const existingTag = acc.find((item) => item.Tag === transaction.Tag);
        if (existingTag) {
          existingTag.value += parseFloat(transaction.Amount);
        } else {
          acc.push({
            Tag: transaction.Tag,
            value: parseFloat(transaction.Amount),
          });
        }
        return acc;
      }, []);
    setPieData(Piedata);
  }, [sortedtransactions]);

  const maxValue = Math.max(...data.map((item) => item.value), 10000000);
  const getColor = (index) => colors[index % colors.length];

  return (
    <div className="container-fluid chartswrapper">
      <div className="chart1">
        <h2> Analytics</h2>
        <ResponsiveContainer
          style={{
            marginTop: "2%",
            padding: "0.5%",
          }}
        >
          <LineChart data={data}>
            <CartesianGrid
              vertical={false}
              horizontal={true}
              strokeDasharray="3"
              domain={[0, maxValue]}
            />
            <XAxis
              dataKey="date"
              type="category"
              stroke="#006BD6"
              strokeWidth={3}
            />
            <YAxis stroke="#006BD6" strokeWidth={3} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#ff0000"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="chart2">
        <h2> Spendings</h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="Tag"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(index)} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MyChart;
