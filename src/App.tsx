import { useState, useRef, useEffect } from 'react';
import { ChatPane } from './components/ChatPane';
import { OrchestrationPane } from './components/OrchestrationPane';
import { DemoControls } from './components/DemoControls';
import { useDemoSequence } from './hooks/useDemoSequence';
import type { DemoScenario } from './data/types';

function App() {
  const {
    messages,
    logEntries,
    systemStatuses,
    isThinking,
    isRunning,
    isComplete,
    confirmationSent,
    startScenario,
    reset,
    sendConfirmation,
  } = useDemoSequence();

  const [orchestrationWidth, setOrchestrationWidth] = useState(30);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleStart = (scenario: DemoScenario) => {
    startScenario(scenario);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = ((containerRect.right - e.clientX) / containerRect.width) * 100;

      const clampedWidth = Math.max(30, Math.min(70, newWidth));
      setOrchestrationWidth(clampedWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const chatWidth = 100 - orchestrationWidth;

  return (
    <div className="h-screen flex flex-col bg-snow-50 overflow-hidden">
      <div ref={containerRef} className="flex-1 flex min-h-0 relative">
        <div className="flex flex-col transition-all duration-200" style={{ width: `${chatWidth}%` }}>
          <div className="flex-1 min-h-0">
            <ChatPane
              messages={messages}
              isThinking={isThinking}
              onConfirm={sendConfirmation}
              confirmationSent={confirmationSent}
            />
          </div>
          <DemoControls
            isRunning={isRunning}
            isComplete={isComplete}
            onStart={handleStart}
            onReset={reset}
          />
        </div>

        <div
          className="absolute top-0 bottom-0 w-1 cursor-col-resize hover:bg-volvo-blue/50 transition-colors z-10"
          style={{ left: `${chatWidth}%` }}
          onMouseDown={handleMouseDown}
        />

        <div className="flex flex-col min-h-0 transition-all duration-200" style={{ width: `${orchestrationWidth}%` }}>
          <OrchestrationPane
            systemStatuses={systemStatuses}
            logEntries={logEntries}
            isRunning={isRunning}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
