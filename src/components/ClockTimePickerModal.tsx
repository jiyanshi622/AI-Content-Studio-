import React, { useState } from 'react';
import { Clock as ClockIcon, X, Check, Sun, Moon } from 'lucide-react';

interface ClockTimePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTime: (formattedTime: string) => void;
  currentValue?: string;
}

const HOURS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const MINUTES = ['00', '15', '30', '45'];

export const ClockTimePickerModal: React.FC<ClockTimePickerModalProps> = ({
  isOpen,
  onClose,
  onSelectTime,
  currentValue = '',
}) => {
  if (!isOpen) return null;

  // Determine if current value is a range
  const [isRange, setIsRange] = useState<boolean>(
    currentValue.includes('-') || currentValue.includes('to') || true
  );

  // Start Time
  const [startHour, setStartHour] = useState<string>('9');
  const [startMinute, setStartMinute] = useState<string>('00');
  const [startPeriod, setStartPeriod] = useState<'AM' | 'PM'>('AM');

  // End Time
  const [endHour, setEndHour] = useState<string>('6');
  const [endMinute, setEndMinute] = useState<string>('00');
  const [endPeriod, setEndPeriod] = useState<'AM' | 'PM'>('PM');

  // Timezone / note
  const [timezoneNote, setTimezoneNote] = useState<string>('');

  const formatOutput = (): string => {
    const startStr = `${startHour}:${startMinute} ${startPeriod}`;
    if (!isRange) {
      return timezoneNote ? `${startStr} ${timezoneNote}` : startStr;
    }
    const endStr = `${endHour}:${endMinute} ${endPeriod}`;
    const full = `${startStr} - ${endStr}`;
    return timezoneNote ? `${full} ${timezoneNote}` : full;
  };

  const handleApply = () => {
    const formatted = formatOutput();
    onSelectTime(formatted);
    onClose();
  };

  // Quick preset apply
  const handleQuickPreset = (preset: {
    startH: string;
    startM: string;
    startP: 'AM' | 'PM';
    endH?: string;
    endM?: string;
    endP?: 'AM' | 'PM';
    isRange: boolean;
  }) => {
    setStartHour(preset.startH);
    setStartMinute(preset.startM);
    setStartPeriod(preset.startP);
    if (preset.isRange && preset.endH && preset.endM && preset.endP) {
      setIsRange(true);
      setEndHour(preset.endH);
      setEndMinute(preset.endM);
      setEndPeriod(preset.endP);
    } else {
      setIsRange(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-700/60 flex items-center justify-center text-indigo-400">
              <ClockIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Select Event Time</h3>
              <p className="text-[11px] text-slate-400">Choose start and end times or pick a preset</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-900/60 space-y-2">
          <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
            Common Event Schedules:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
            <button
              type="button"
              onClick={() =>
                handleQuickPreset({
                  startH: '9',
                  startM: '00',
                  startP: 'AM',
                  endH: '6',
                  endM: '00',
                  endP: 'PM',
                  isRange: true,
                })
              }
              className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-indigo-500 text-left hover:text-white text-slate-300 transition-colors"
            >
              <div className="font-semibold">9 AM - 6 PM</div>
              <div className="text-[10px] text-slate-500">Tech Fest / Full Day</div>
            </button>
            <button
              type="button"
              onClick={() =>
                handleQuickPreset({
                  startH: '10',
                  startM: '00',
                  startP: 'AM',
                  endH: '1',
                  endM: '00',
                  endP: 'PM',
                  isRange: true,
                })
              }
              className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-indigo-500 text-left hover:text-white text-slate-300 transition-colors"
            >
              <div className="font-semibold">10 AM - 1 PM</div>
              <div className="text-[10px] text-slate-500">Morning Session</div>
            </button>
            <button
              type="button"
              onClick={() =>
                handleQuickPreset({
                  startH: '2',
                  startM: '00',
                  startP: 'PM',
                  endH: '5',
                  endM: '00',
                  endP: 'PM',
                  isRange: true,
                })
              }
              className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-indigo-500 text-left hover:text-white text-slate-300 transition-colors"
            >
              <div className="font-semibold">2 PM - 5 PM</div>
              <div className="text-[10px] text-slate-500">Afternoon Workshop</div>
            </button>
            <button
              type="button"
              onClick={() =>
                handleQuickPreset({
                  startH: '6',
                  startM: '00',
                  startP: 'PM',
                  endH: '9',
                  endM: '30',
                  endP: 'PM',
                  isRange: true,
                })
              }
              className="p-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-indigo-500 text-left hover:text-white text-slate-300 transition-colors"
            >
              <div className="font-semibold">6 PM - 9:30 PM</div>
              <div className="text-[10px] text-slate-500">Evening / Cultural</div>
            </button>
          </div>
        </div>

        {/* Time Selectors Body */}
        <div className="p-4 space-y-4">
          {/* Mode Toggle */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Schedule Mode:</span>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                type="button"
                onClick={() => setIsRange(true)}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                  isRange ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Start & End Time
              </button>
              <button
                type="button"
                onClick={() => setIsRange(false)}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                  !isRange ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Single Kickoff Time
              </button>
            </div>
          </div>

          {/* Interactive Clock / Time Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Start Time Block */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span className="flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Start Time</span>
                </span>
                <span className="text-indigo-400 font-mono text-sm">
                  {startHour}:{startMinute} {startPeriod}
                </span>
              </div>

              {/* Hour selector */}
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block mb-1">
                  Hour:
                </span>
                <div className="grid grid-cols-6 gap-1">
                  {HOURS.map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setStartHour(h)}
                      className={`py-1 text-xs font-medium rounded transition-colors ${
                        startHour === h
                          ? 'bg-indigo-600 text-white font-bold'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>

              {/* Minute selector */}
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block mb-1">
                  Minute:
                </span>
                <div className="grid grid-cols-4 gap-1">
                  {MINUTES.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setStartMinute(m)}
                      className={`py-1 text-xs font-medium rounded transition-colors ${
                        startMinute === m
                          ? 'bg-indigo-600 text-white font-bold'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      :{m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Period AM/PM */}
              <div className="flex items-center gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setStartPeriod('AM')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${
                    startPeriod === 'AM'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  AM
                </button>
                <button
                  type="button"
                  onClick={() => setStartPeriod('PM')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${
                    startPeriod === 'PM'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  PM
                </button>
              </div>
            </div>

            {/* End Time Block (if Range) */}
            {isRange ? (
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span className="flex items-center gap-1">
                    <Moon className="w-3.5 h-3.5 text-indigo-400" />
                    <span>End Time</span>
                  </span>
                  <span className="text-indigo-400 font-mono text-sm">
                    {endHour}:{endMinute} {endPeriod}
                  </span>
                </div>

                {/* Hour selector */}
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block mb-1">
                    Hour:
                  </span>
                  <div className="grid grid-cols-6 gap-1">
                    {HOURS.map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setEndHour(h)}
                        className={`py-1 text-xs font-medium rounded transition-colors ${
                          endHour === h
                            ? 'bg-indigo-600 text-white font-bold'
                            : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Minute selector */}
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block mb-1">
                    Minute:
                  </span>
                  <div className="grid grid-cols-4 gap-1">
                    {MINUTES.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setEndMinute(m)}
                        className={`py-1 text-xs font-medium rounded transition-colors ${
                          endMinute === m
                            ? 'bg-indigo-600 text-white font-bold'
                            : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        :{m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Period AM/PM */}
                <div className="flex items-center gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={() => setEndPeriod('AM')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${
                      endPeriod === 'AM'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    onClick={() => setEndPeriod('PM')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded transition-colors ${
                      endPeriod === 'PM'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    PM
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-800 flex flex-col items-center justify-center p-6 text-center text-slate-500 text-xs">
                <ClockIcon className="w-8 h-8 text-slate-600 mb-2" />
                <span>Single Kickoff Time Mode</span>
                <button
                  type="button"
                  onClick={() => setIsRange(true)}
                  className="mt-2 text-indigo-400 hover:underline text-[11px]"
                >
                  + Add End Time
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Selected Time Preview Bar */}
        <div className="p-4 bg-slate-950/70 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs">
            <span className="text-slate-400">Result: </span>
            <span className="font-mono font-bold text-white text-sm ml-1">
              {formatOutput()}
            </span>
          </div>

          <div className="flex items-center gap-2">
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
              <span>Apply Selected Time</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
