'use client';

import React from 'react';
import Box from '@mui/material/Box';
import { BarChart, lineElementClasses } from '@mui/x-charts';
import { Button } from '@/components/atoms/button';
import { Columns3Cog } from 'lucide-react';

interface GraphItem {
  module?: string;
  subscriptions?: number;
}

interface EditGraph {
  title: string;
  barColor: string;
  chartHeight: number;
  showLegend: boolean;
}

interface Props {
  title?: string;
  graphData?: GraphItem[] | null;
  editGraphData: EditGraph;
  onEdit: () => void;
  onDoubleClick: (item: GraphItem) => void;
}

export default function ModuleUsageCard({
  title = 'Module Usage',
  graphData,
  editGraphData,
  onEdit,
  onDoubleClick,
}: Props) {
  return (
    <div className="bg-zinc-200 relative p-3 rounded-xl dark:bg-zinc-800 shadow-sm hover:shadow-md mt-5 border border-gray-200 dark:border-zinc-700 hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1 w-4/6">
      <h3 className="font-bold text-zinc-700 dark:text-zinc-100">
        {editGraphData.title || title}
      </h3>
      <Button
        onClick={onEdit}
        className="absolute top-2 right-2 bg-white text-zinc-900 dark:text-zinc-500 dark:bg-zinc-900 hover:bg-white/70 dark:hover:bg-zinc-600 transition-colors"
        size="sm"
      >
        <Columns3Cog className="w-4 h-4" />
      </Button>

      <Box sx={{ width: '100%', height: editGraphData.chartHeight }}>
        <BarChart
          xAxis={[
            {
              colorMap: {
                type: 'piecewise',
                thresholds: [new Date(2021, 1, 1), new Date(2023, 1, 1)],
                colors: [editGraphData.barColor, 'red', editGraphData.barColor],
              },
              data: (graphData || []).map((item) => item?.module ?? null),
            },
          ]}
          height={editGraphData.chartHeight}
          borderRadius={10}
          series={[
            {
              data: (graphData || []).map(
                (item) => item?.subscriptions ?? null,
              ),
            },
          ]}
          yAxis={[
            {
              width: 50,
              tickMinStep: 1,
              valueFormatter: (value: number) => Math.floor(value).toString(),
            },
          ]}
          sx={{
            [`& .${lineElementClasses.root}`]: {
              display: editGraphData.showLegend ? 'block' : 'none',
            },
          }}
          margin={{ top: 10, bottom: 20, left: 40, right: 20 }}
        />
      </Box>

      <div className="w-full flex items-center justify-center p-2">
        <div className="bg-white/50 dark:bg-zinc-900 p-3 rounded-2xl w-full max-h-[11vh] overflow-y-auto">
          {!graphData || graphData.length === 0 ? (
            <div className="py-8 text-center text-gray-500 dark:text-gray-400">
              No Data
            </div>
          ) : (
            graphData.map((data, index) => (
              <div
                key={index}
                onDoubleClick={() => onDoubleClick(data)}
                className="flex cursor-pointer items-center justify-between gap-2 text-sm p-2 hover:bg-white/30 dark:hover:bg-black/30 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-blue-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {data.module}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
