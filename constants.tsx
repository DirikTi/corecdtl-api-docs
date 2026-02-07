
import React from 'react';
import { DocSection } from './types';

export const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Docs', path: '/docs/intro' },
  { label: 'Benchmarks', path: '/benchmarks' },
  { label: 'Design & Internals', path: '/design-internals' },
];

export const DOC_SECTIONS = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Introduction', id: 'intro' },
      { label: 'Installation', id: 'install' },
      { label: 'Quick Start', id: 'quickstart' },
    ],
  },

  {
    title: 'Server Core',
    items: [
      {
        label: 'createServer()',
        id: 'server',
      },
      {
        label: 'Routing',
        id: 'routing',
        children: [
          { label: 'Router', id: 'routing-router' },
          { label: 'Middleware', id: 'routing-middleware' },
          { label: 'Endpoint', id: 'routing-endpoint' },
        ],
      },
    ],
  },

  {
    title: 'Execution Context',
    items: [
      {
        label: 'Context',
        id: 'context',
        children: [
          { label: 'API Context', id: 'context-api' },
          { label: 'Web Context', id: 'context-web' },
        ],
      },
    ],
  },

  {
    title: 'Data Flow',
    items: [
      /* { label: 'Chunker', id: 'chunker' },*/
      { label: 'Accumulator', id: 'accumulator' },
      { label: 'Content Encoding & Parser', id: 'content-encoding' },
      { label: 'Response', id: 'response' },
      // { label: 'Pipeline', id: 'pipeline' },
    ],
  },

  {
    title: 'Runtime Internals',
    items: [
      {
        label: 'Hypernode Runtime',
        id: 'hypernode',
        children: [
          { label: 'Parsers', id: 'hypernode-parsers' },
          { label: 'CPool', id: 'hypernode-cpool' },
        ],
      },
    ],
  },

  {
    title: 'Notes',
    items: [
      { label: 'Limitations', id: 'limitations' },
      { label: 'Future Plans', id: 'roadmap' },
    ],
  },
];



export const BENCHMARK_DATA = [
  {
    name: "CoreCDTL",
    rps: 33523,
    latencyAvg: 2.16,
    latencyP99: 3,
    latencyP999: 4,
    throughputMBps: 2.64,
  },
  {
    name: "Fastify",
    rps: 25352,
    latencyAvg: 3.27,
    latencyP99: 6,
    latencyP999: 8,
    throughputMBps: 4.61,
  },
  {
    name: "Express",
    rps: 12464,
    latencyAvg: 7.49,
    latencyP99: 10,
    latencyP999: 13,
    throughputMBps: 3.00,
  }
];
