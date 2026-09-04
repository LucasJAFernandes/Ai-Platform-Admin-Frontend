'use client';

import { useState } from 'react';
import { format, subDays } from 'date-fns';
import { CalendarRange } from 'lucide-react';
import { Button } from '@/components/atoms/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/atoms/popover';

export interface DateRange {
  from: Date;
  to: Date;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
}

const PRESETS = [
  { label: '7 days', days: 7 },
  { label: '15 days', days: 15 },
  { label: '30 days', days: 30 },
];

function toInputValue(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

function formatRange(from: Date, to: Date): string {
  const today = toInputValue(new Date());
  const toStr = toInputValue(to);
  const fromFmt = format(from, 'MMM d, yyyy');
  const toFmt = toStr === today ? 'Today' : format(to, 'MMM d, yyyy');
  return `${fromFmt} – ${toFmt}`;
}

export function DateRangePicker({
  value,
  onChange,
  className,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [fromInput, setFromInput] = useState(toInputValue(value.from));
  const [toInput, setToInput] = useState(toInputValue(value.to));

  function applyCustom() {
    const from = new Date(fromInput + 'T00:00:00');
    const to = new Date(toInput + 'T23:59:59');
    if (!isNaN(from.getTime()) && !isNaN(to.getTime()) && from <= to) {
      onChange({ from, to });
      setOpen(false);
      setShowCustom(false);
    }
  }

  function applyPreset(days: number) {
    const to = new Date();
    const from = subDays(to, days);
    setFromInput(toInputValue(from));
    setToInput(toInputValue(to));
    onChange({ from, to });
    setOpen(false);
    setShowCustom(false);
  }

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setShowCustom(false);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          className={`gap-2 bg-zinc-200 border-white/10 text-gray-900 hover:bg-zinc-400 hover:text-white font-normal ${className ?? ''}`}
        >
          <CalendarRange className="h-4 w-4 text-gray-900" />
          <span>{formatRange(value.from, value.to)}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-56 p-0 overflow-hidden rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl"
      >
        {!showCustom ? (
          <div className="p-3 space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 px-0.5">
              Time Period
            </p>
            <div className="flex gap-1.5">
              {PRESETS.map((p) => (
                <button
                  key={p.days}
                  onClick={() => applyPreset(p.days)}
                  className="flex-1 text-xs font-medium py-1.5 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowCustom(true)}
              className="w-full text-sm font-medium py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              Custom range
            </button>
          </div>
        ) : (
          <div className="p-3 space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                From
              </label>
              <input
                type="date"
                value={fromInput}
                max={toInput}
                onChange={(e) => setFromInput(e.target.value)}
                className="w-full text-sm bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 [color-scheme:light] dark:[color-scheme:dark]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400">
                To
              </label>
              <input
                type="date"
                value={toInput}
                min={fromInput}
                max={toInputValue(new Date())}
                onChange={(e) => setToInput(e.target.value)}
                className="w-full text-sm bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 [color-scheme:light] dark:[color-scheme:dark]"
              />
            </div>
            <button
              onClick={applyCustom}
              className="w-full text-sm font-medium py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              Apply
            </button>
            <button
              onClick={() => setShowCustom(false)}
              className="w-full text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              ← Back
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export function dateRangeToPeriodDays(range: DateRange): number {
  const ms = range.to.getTime() - range.from.getTime();
  return Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

export function defaultDateRange(days = 30): DateRange {
  const to = new Date();
  const from = subDays(to, days);
  return { from, to };
}
