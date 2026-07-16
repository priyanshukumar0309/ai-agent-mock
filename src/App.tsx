import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Network } from 'lucide-react';
import { ChatPane } from './components/ChatPane';
import { OrchestrationPane } from './components/OrchestrationPane';
import { DemoControls } from './components/DemoControls';
import { useDemoSequence } from './hooks/useDemoSequence';
import type { DemoScenario } from './data/types';

type MobileTab = 'chat' | 'orchestration';

function useIsDesktop(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(`(min-width: ${breakpoint}px)`).matches : true
  );

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    setIsDesktop(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [breakpoint]);

  return isDesktop;
}

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
  const [mobileTab, setMobileTab] = useState<MobileTab>('chat');
  const containerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

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
    <div className="h-dvh flex flex-col bg-snow-50 overflow-hidden">
      <div ref={containerRef} className="flex-1 flex min-h-0 relative flex-col md:flex-row">
        {/* Chat column */}
        <div
          className={`flex flex-col min-h-0 transition-all duration-200 ${
            isDesktop ? '' : mobileTab === 'chat' ? 'flex-1' : 'hidden'
          }`}
          style={isDesktop ? { width: `${chatWidth}%` } : undefined}
        >
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

        {/* Desktop resize handle */}
        {isDesktop && (
          <div
            className="absolute top-0 bottom-0 w-1 cursor-col-resize hover:bg-volvo-blue/50 transition-colors z-10"
            style={{ left: `${chatWidth}%` }}
            onMouseDown={handleMouseDown}
          />
        )}

        {/* Orchestration column */}
        <div
          className={`flex flex-col min-h-0 transition-all duration-200 ${
            isDesktop ? '' : mobileTab === 'orchestration' ? 'flex-1' : 'hidden'
          }`}
          style={isDesktop ? { width: `${orchestrationWidth}%` } : undefined}
        >
          <OrchestrationPane
            systemStatuses={systemStatuses}
            logEntries={logEntries}
            isRunning={isRunning}
          />
        </div>
      </div>

      {/* Mobile bottom tabs */}
      {!isDesktop && (
        <nav className="flex shrink-0 border-t border-snow-200 bg-white pb-[env(safe-area-inset-bottom)]">
          <button
            type="button"
            onClick={() => setMobileTab('chat')}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors ${
              mobileTab === 'chat' ? 'text-volvo-navy' : 'text-snow-400'
            }`}
          >
            <MessageSquare size={18} />
            Chat
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('orchestration')}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors relative ${
              mobileTab === 'orchestration' ? 'text-volvo-navy' : 'text-snow-400'
            }`}
          >
            <Network size={18} />
            Systems
            {isRunning && !isComplete && (
              <span className="absolute top-2 right-[28%] w-1.5 h-1.5 rounded-full bg-volvo-blue animate-fade-pulse" />
            )}
          </button>
        </nav>
      )}
    </div>
  );
}

export default App;
