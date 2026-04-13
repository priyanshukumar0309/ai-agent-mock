import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  Play,
  RotateCcw,
  Ban,
  Receipt,
  Truck,
  FileQuestion,
  Copy,
  Clock,
  Languages,
  FilePlus,
} from 'lucide-react';
import type { DemoScenario } from '../data/types';
import { scenarios } from '../data/scenarios';

interface Props {
  isRunning: boolean;
  isComplete: boolean;
  onStart: (scenario: DemoScenario) => void;
  onReset: () => void;
}

const scenarioIcons = [Clock, FileQuestion, FilePlus, Languages, Ban, Receipt, Truck, Copy];

export function DemoControls({ isRunning, isComplete, onStart, onReset }: Props) {
  const [highlightedIndex, setHighlightedIndex] = useState(() => {
    const saved = localStorage.getItem('highlightedScenarioIndex');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('highlightedScenarioIndex', highlightedIndex.toString());
  }, [highlightedIndex]);

  // Removed auto-reset - conversation should remain visible until user clicks a new scenario

  const handleReset = () => {
    if (isComplete && highlightedIndex < 3) {
      setHighlightedIndex(highlightedIndex + 1);
    }
    onReset();
  };

  const handleStartScenario = (scenario: DemoScenario) => {
    if (isComplete && highlightedIndex < 3) {
      setHighlightedIndex(highlightedIndex + 1);
    }
    onStart(scenario);
  };

  return (
    <div className="px-4 py-3 border-t border-snow-200 bg-snow-50">
      <AnimatePresence mode="wait">
        {isRunning && !isComplete ? (
          <motion.div
            key="running"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 px-3 py-2.5 bg-blue-50 border border-blue-200 rounded-lg"
          >
            <div className="w-2 h-2 rounded-full bg-volvo-blue animate-fade-pulse" />
            <span className="text-[11px] text-volvo-blue font-medium">Agent processing...</span>
            <button
              onClick={handleReset}
              className="ml-auto flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-snow-100 border border-snow-300 text-snow-500 text-[10px] rounded-md transition-colors"
            >
              <RotateCcw size={10} />
              Stop
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="scenarios"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 mb-3"
              >
                <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[11px] text-volvo-green font-medium">Demo Complete</span>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-snow-100 border border-snow-300 text-snow-600 text-xs font-medium rounded-lg transition-all duration-200"
                >
                  <RotateCcw size={12} />
                  Reset
                </button>
              </motion.div>
            )}
            <p className="text-[10px] text-snow-400 uppercase tracking-wider px-1 mb-2 font-medium">
              {isComplete ? 'Select the next scenario' : 'Select a scenario'}
            </p>
            <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-4">
              {scenarios.map((scenario, i) => {
                const Icon = scenarioIcons[i];
                const isHighlighted = i === highlightedIndex;
                return (
                  <motion.button
                    key={scenario.id}
                    onClick={() => handleStartScenario(scenario)}
                    className={`flex flex-col items-start gap-1.5 px-3 py-2.5 rounded-lg transition-all duration-200 group text-left relative ${
                      isHighlighted
                        ? 'bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-400 shadow-lg shadow-amber-200/50'
                        : 'bg-white hover:bg-blue-50 border border-snow-200 hover:border-volvo-blue/30'
                    }`}
                    animate={
                      isHighlighted
                        ? {
                            boxShadow: [
                              '0 0 0 0 rgba(251, 191, 36, 0)',
                              '0 0 0 4px rgba(251, 191, 36, 0.2)',
                              '0 0 0 0 rgba(251, 191, 36, 0)',
                            ],
                          }
                        : {}
                    }
                    transition={
                      isHighlighted
                        ? {
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }
                        : {}
                    }
                  >
                    {isHighlighted && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-500 border-2 border-white"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                    <div className="flex items-center gap-2 w-full">
                      <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                          isHighlighted
                            ? 'bg-amber-100'
                            : 'bg-volvo-navy/5 group-hover:bg-volvo-blue/10'
                        }`}
                      >
                        <Icon
                          size={12}
                          className={`transition-colors ${
                            isHighlighted
                              ? 'text-amber-600'
                              : 'text-volvo-navy/50 group-hover:text-volvo-blue'
                          }`}
                        />
                      </div>
                      <Play
                        size={10}
                        className={`transition-colors ml-auto ${
                          isHighlighted
                            ? 'text-amber-500'
                            : 'text-snow-300 group-hover:text-volvo-blue'
                        }`}
                      />
                    </div>
                    <div>
                      <p
                        className={`text-[11px] font-medium transition-colors leading-tight ${
                          isHighlighted
                            ? 'text-amber-800'
                            : 'text-snow-700 group-hover:text-volvo-blue'
                        }`}
                      >
                        {scenario.buttonLabel}
                      </p>
                      <p className="text-[9px] text-snow-400 leading-tight mt-0.5">
                        {scenario.description}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
