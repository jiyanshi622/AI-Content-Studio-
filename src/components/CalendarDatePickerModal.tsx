import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  RotateCcw,
} from 'lucide-react';

interface CalendarDatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDate: (formattedDate: string) => void;
  currentValue?: string;
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const CalendarDatePickerModal: React.FC<CalendarDatePickerModalProps> = ({
  isOpen,
  onClose,
  onSelectDate,
  currentValue = '',
}) => {
  if (!isOpen) return null;

  // Reference year and month (Defaulting around September 2026 or current year)
  const initialDate = new Date();
  const [viewYear, setViewYear] = useState<number>(2026);
  const [viewMonth, setViewMonth] = useState<number>(8); // September is index 8

  // Selection mode: 'single' | 'range'
  const [isRangeMode, setIsRangeMode] = useState<boolean>(
    currentValue.includes('-') && !currentValue.startsWith('20') && currentValue.split('-').length > 2 ? false : currentValue.includes('to') || currentValue.includes('-')
  );

  // Selected dates: Date objects
  const [selectedStart, setSelectedStart] = useState<Date | null>(() => {
    // Try to parse existing date if possible
    if (currentValue) {
      // Check if format is DD-MM-YYYY
      const parts = currentValue.split('-');
      if (parts.length === 3 && parts[0].length <= 2 && parts[2].length === 4) {
        return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
      }
      const parsed = new Date(currentValue);
      if (!isNaN(parsed.getTime())) return parsed;
    }
    return new Date(2026, 8, 30); // Default to Sept 30, 2026 as in user's screenshot
  });

  const [selectedEnd, setSelectedEnd] = useState<Date | null>(null);

  // Format preference
  const [formatStyle, setFormatStyle] = useState<'standard' | 'formal' | 'dash'>(
    currentValue.includes('-') && currentValue.split('-')[0].length === 2 ? 'dash' : 'standard'
  );

  // Calculate days for the month view
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleDayClick = (dayNumber: number) => {
    const clickedDate = new Date(viewYear, viewMonth, dayNumber);

    if (!isRangeMode) {
      setSelectedStart(clickedDate);
      setSelectedEnd(null);
    } else {
      if (!selectedStart || (selectedStart && selectedEnd)) {
        setSelectedStart(clickedDate);
        setSelectedEnd(null);
      } else {
        if (clickedDate < selectedStart) {
          setSelectedEnd(selectedStart);
          setSelectedStart(clickedDate);
        } else {
          setSelectedEnd(clickedDate);
        }
      }
    }
  };

  const isDaySelected = (dayNumber: number) => {
    if (!selectedStart) return false;
    const current = new Date(viewYear, viewMonth, dayNumber);

    if (
      current.getFullYear() === selectedStart.getFullYear() &&
      current.getMonth() === selectedStart.getMonth() &&
      current.getDate() === selectedStart.getDate()
    ) {
      return true;
    }

    if (selectedEnd) {
      if (
        current.getFullYear() === selectedEnd.getFullYear() &&
        current.getMonth() === selectedEnd.getMonth() &&
        current.getDate() === selectedEnd.getDate()
      ) {
        return true;
      }
    }
    return false;
  };

  const isDayInRange = (dayNumber: number) => {
    if (!selectedStart || !selectedEnd) return false;
    const current = new Date(viewYear, viewMonth, dayNumber);
    return current > selectedStart && current < selectedEnd;
  };

  const formatDateOutput = (): string => {
    if (!selectedStart) return '';

    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

    if (!isRangeMode || !selectedEnd) {
      if (formatStyle === 'dash') {
        // DD-MM-YYYY (like 30-09-2026 in screenshot)
        return `${pad(selectedStart.getDate())}-${pad(selectedStart.getMonth() + 1)}-${selectedStart.getFullYear()}`;
      } else if (formatStyle === 'formal') {
        return `${MONTH_NAMES[selectedStart.getMonth()]} ${selectedStart.getDate()}, ${selectedStart.getFullYear()}`;
      } else {
        // e.g. Sep 30, 2026
        const shortMonth = MONTH_NAMES[selectedStart.getMonth()].slice(0, 3);
        return `${shortMonth} ${selectedStart.getDate()}, ${selectedStart.getFullYear()}`;
      }
    } else {
      // Range format
      if (selectedStart.getMonth() === selectedEnd.getMonth() && selectedStart.getFullYear() === selectedEnd.getFullYear()) {
        const shortMonth = MONTH_NAMES[selectedStart.getMonth()].slice(0, 3);
        return `${shortMonth} ${selectedStart.getDate()}-${selectedEnd.getDate()}, ${selectedStart.getFullYear()}`;
      } else {
        const m1 = MONTH_NAMES[selectedStart.getMonth()].slice(0, 3);
        const m2 = MONTH_NAMES[selectedEnd.getMonth()].slice(0, 3);
        return `${m1} ${selectedStart.getDate()} - ${m2} ${selectedEnd.getDate()}, ${selectedEnd.getFullYear()}`;
      }
    }
  };

  const handleApply = () => {
    const formatted = formatDateOutput();
    if (formatted) {
      onSelectDate(formatted);
    }
    onClose();
  };

  // Quick Preset Handlers
  const handleQuickPreset = (type: 'today' | 'tomorrow' | 'weekend' | 'fest_2day' | 'next_month') => {
    const today = new Date(2026, 8, 30); // Anchor near 2026 Sept
    if (type === 'today') {
      setSelectedStart(new Date(2026, 8, 30));
      setSelectedEnd(null);
      setViewYear(2026);
      setViewMonth(8);
      setIsRangeMode(false);
    } else if (type === 'tomorrow') {
      setSelectedStart(new Date(2026, 9, 1));
      setSelectedEnd(null);
      setViewYear(2026);
      setViewMonth(9);
      setIsRangeMode(false);
    } else if (type === 'weekend') {
      // Saturday & Sunday
      setSelectedStart(new Date(2026, 9, 3));
      setSelectedEnd(new Date(2026, 9, 4));
      setViewYear(2026);
      setViewMonth(9);
      setIsRangeMode(true);
    } else if (type === 'fest_2day') {
      setSelectedStart(new Date(2026, 3, 18)); // April 18-19, 2026
      setSelectedEnd(new Date(2026, 3, 19));
      setViewYear(2026);
      setViewMonth(3);
      setIsRangeMode(true);
    } else if (type === 'next_month') {
      setSelectedStart(new Date(2026, 9, 15));
      setSelectedEnd(null);
      setViewYear(2026);
      setViewMonth(9);
      setIsRangeMode(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-700/60 flex items-center justify-center text-indigo-400">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Select Event Date</h3>
              <p className="text-[11px] text-slate-400">Click a day on the calendar</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Toggle & Presets */}
        <div className="p-4 border-b border-slate-800/80 space-y-3 bg-slate-900/60">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Date Selection Mode:</span>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                type="button"
                onClick={() => setIsRangeMode(false)}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                  !isRangeMode
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Single Day
              </button>
              <button
                type="button"
                onClick={() => setIsRangeMode(true)}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                  isRangeMode
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Multi-Day Range
              </button>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-slate-500 font-medium">Quick:</span>
            <button
              type="button"
              onClick={() => handleQuickPreset('today')}
              className="px-2 py-0.5 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded transition-colors"
            >
              Sep 30, 2026
            </button>
            <button
              type="button"
              onClick={() => handleQuickPreset('tomorrow')}
              className="px-2 py-0.5 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded transition-colors"
            >
              Oct 01, 2026
            </button>
            <button
              type="button"
              onClick={() => handleQuickPreset('fest_2day')}
              className="px-2 py-0.5 text-[11px] font-medium text-indigo-300 hover:text-white bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-800/60 rounded transition-colors"
            >
              Fest Weekend (Apr 18-19)
            </button>
          </div>
        </div>

        {/* Calendar Grid View */}
        <div className="p-4 space-y-3">
          {/* Month & Year Navigation */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="text-xs font-bold text-white tracking-wide">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </div>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-slate-500">
            {DAYS_OF_WEEK.map((d) => (
              <div key={d} className="py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Day Cells */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {/* Previous Month's Trailing Days */}
            {Array.from({ length: firstDayOfMonth }).map((_, idx) => {
              const day = daysInPrevMonth - firstDayOfMonth + idx + 1;
              return (
                <div
                  key={`prev-${idx}`}
                  className="py-2 text-slate-700 select-none text-[11px]"
                >
                  {day}
                </div>
              );
            })}

            {/* Current Month's Days */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const selected = isDaySelected(day);
              const inRange = isDayInRange(day);

              return (
                <button
                  key={`curr-${day}`}
                  type="button"
                  onClick={() => handleDayClick(day)}
                  className={`py-2 rounded-lg font-medium text-xs transition-all relative ${
                    selected
                      ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
                      : inRange
                      ? 'bg-indigo-950 text-indigo-300 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Date Summary & Format options */}
        <div className="p-4 bg-slate-950/70 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Selected Date:</span>
            <span className="font-bold text-indigo-300 font-mono text-sm">
              {formatDateOutput() || 'No date selected'}
            </span>
          </div>

          {/* Format style toggle */}
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Format:</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setFormatStyle('dash')}
                className={`px-2 py-0.5 rounded border transition-colors ${
                  formatStyle === 'dash'
                    ? 'border-indigo-500 bg-indigo-950/60 text-indigo-300'
                    : 'border-slate-800 text-slate-400'
                }`}
              >
                DD-MM-YYYY
              </button>
              <button
                type="button"
                onClick={() => setFormatStyle('standard')}
                className={`px-2 py-0.5 rounded border transition-colors ${
                  formatStyle === 'standard'
                    ? 'border-indigo-500 bg-indigo-950/60 text-indigo-300'
                    : 'border-slate-800 text-slate-400'
                }`}
              >
                Month Day, Year
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-end gap-2 bg-slate-900">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-md transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Apply Selected Date</span>
          </button>
        </div>
      </div>
    </div>
  );
};
