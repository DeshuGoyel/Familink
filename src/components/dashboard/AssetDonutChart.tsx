import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function AssetDonutChart() {
  const data = [
    { name: 'Crypto', value: 45, color: '#F59E0B' },
    { name: 'NFTs', value: 20, color: '#EC4899' },
    { name: 'Documents', value: 25, color: '#4F5CFF' },
    { name: 'Other', value: 10, color: '#6B7280' },
  ];

  return (
    <div className="h-64 w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '12px' }}
            itemStyle={{ color: '#F9FAFB' }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <span className="block text-2xl font-bold text-text">12</span>
          <span className="text-xs text-muted">Total Assets</span>
        </div>
      </div>
    </div>
  );
}
