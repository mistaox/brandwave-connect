import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface AudienceInsightsProps {
  data: any[];
}

export const AudienceInsights = ({ data }: AudienceInsightsProps) => {
  const [metric, setMetric] = useState("age");

  const demographicData = {
    age: [
      { name: '18-24', value: 30 },
      { name: '25-34', value: 40 },
      { name: '35-44', value: 20 },
      { name: '45+', value: 10 },
    ],
    gender: [
      { name: 'Male', value: 45 },
      { name: 'Female', value: 52 },
      { name: 'Other', value: 3 },
    ],
    location: [
      { name: 'North America', value: 40 },
      { name: 'Europe', value: 30 },
      { name: 'Asia', value: 20 },
      { name: 'Other', value: 10 },
    ],
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Audience Demographics</CardTitle>
        <Select value={metric} onValueChange={setMetric}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="age">Age Distribution</SelectItem>
            <SelectItem value="gender">Gender Distribution</SelectItem>
            <SelectItem value="location">Geographic Distribution</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={demographicData[metric as keyof typeof demographicData]}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {demographicData[metric as keyof typeof demographicData].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};