
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BENCHMARK_DATA } from '../constants';

const Benchmarks: React.FC = () => {
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
      <div className="space-y-6 mb-16">
        <h1 className="text-5xl font-extrabold text-slate-100 tracking-tight">Real-World HTTP Engine Benchmarks</h1>
        <p className="text-xl text-slate-400 max-w-5xl leading-relaxed">
    Benchmarks were conducted using <span className="text-slate-200">autocannon</span> under sustained concurrent load. Focus is placed on latency distribution, tail behavior (p99+), and scheduler stability rather than peak throughput artifacts.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-20">
        <div className="p-8 border border-slate-800 bg-slate-900/20 space-y-8">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-100 uppercase tracking-tight">Requests Per Second (Avg)</h3>
            <p className="text-sm text-slate-500">Maximum throughput on a single core connection handling 1KB payloads.</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BENCHMARK_DATA} layout="vertical" margin={{ left: 60, right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 700 }} 
                />
                <Tooltip 
                  cursor={{ fill: '#0F172A' }} 
                  contentStyle={{ backgroundColor: '#020408', border: '1px solid #1E293B' }}
                />
                <Bar dataKey="rps" radius={[0, 4, 4, 0]}>
                  {BENCHMARK_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === 'CoreCDTL' ? '#22D3EE' : '#334155'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-8 border border-slate-800 bg-slate-900/20 space-y-8">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-100 uppercase tracking-tight">Tail Latency (P99)</h3>
            <p className="text-sm text-slate-500">99th percentile latency under sustained concurrency.</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BENCHMARK_DATA} layout="vertical" margin={{ left: 60, right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 700 }} 
                />
                <Tooltip 
                  cursor={{ fill: '#0F172A' }} 
                  contentStyle={{ backgroundColor: '#020408', border: '1px solid #1E293B' }}
                />
                <Bar dataKey="latencyP99" radius={[0, 4, 4, 0]}>
                  {BENCHMARK_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === 'CoreCDTL' ? '#22D3EE' : '#334155'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div>
        <div className="p-8 border border-slate-800 bg-slate-900/20 space-y-8">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-100 uppercase tracking-tight">Latency Tail (P99.9)</h3>
            <p className="text-sm text-slate-500">Worst-case response behavior. Lower = more deterministic.</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BENCHMARK_DATA} layout="vertical" margin={{ left: 60, right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 700 }} 
                />
                <Tooltip 
                  cursor={{ fill: '#0F172A' }} 
                  contentStyle={{ backgroundColor: '#020408', border: '1px solid #1E293B' }}
                />
                <Bar dataKey="latencyP999" radius={[0, 4, 4, 0]}>
                  {BENCHMARK_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === 'CoreCDTL' ? '#22D3EE' : '#334155'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-slate-100">Raw Comparison Data</h2>
        <div className="overflow-x-auto border border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/50 border-b border-slate-800 text-[10px] uppercase tracking-widest font-bold text-slate-500">
              <tr>
                <th className="px-5 py-4"></th>
                <th className="px-5 py-4">RPS</th>
                <th className="px-5 py-4">Avg Latency</th>
                <th className="px-5 py-4">P99</th>
                <th className="px-5 py-4">P99.9</th>
                <th className="px-5 py-4">Throughput</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-slate-400">
              {BENCHMARK_DATA.map((row) => (
                <tr key={row.name} className={row.name === 'CoreCDTL' ? 'bg-cyan-500/5' : ''}>
                  <td className="px-5 py-4 font-bold text-slate-200">{row.name}</td>
                  <td className="px-5 py-4 font-bold text-slate-200">{row.rps.toLocaleString()}</td>
                  <td className="px-5 py-4 mono">{row.latencyAvg} ms</td>
                  <td className="px-5 py-4 mono">{row.latencyP99} ms</td>
                  <td className="px-5 py-4 mono">{row.latencyP999} ms</td>
                  <td className="px-5 py-4 mono">{row.throughputMBps.toFixed(2)} MB/s</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 text-xs text-slate-500 border-t border-slate-800 pt-4">
            Test Configuration: 100 connections · 15s duration · HTTP/1.1 · 1KB payload · Single process
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benchmarks;
