'use client';

import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import styles from './page.module.css';

type Panel = { id: string; label: string; count: number; content: ReactNode };

export default function ExhibitionBuildingTabs({ panels }: { panels: Panel[] }) {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case 'ArrowRight': next = (index + 1) % panels.length; break;
      case 'ArrowLeft': next = (index + panels.length - 1) % panels.length; break;
      case 'Home': next = 0; break;
      case 'End': next = panels.length - 1; break;
      default: return;
    }
    event.preventDefault();
    setSelected(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <>
      <div className={styles.tabs} role="tablist" aria-label="展示場所で絞り込む">
        {panels.map((panel, index) => (
          <button
            key={panel.id}
            ref={(element) => { tabRefs.current[index] = element; }}
            type="button"
            role="tab"
            id={`exhibition-tab-${panel.id}`}
            aria-controls={`exhibition-panel-${panel.id}`}
            aria-selected={selected === index}
            aria-label={`${panel.label}（${panel.count}団体）`}
            tabIndex={selected === index ? 0 : -1}
            className={styles.tab}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {panel.label}
            <span className={styles.tabCount} aria-hidden="true">{panel.count}</span>
          </button>
        ))}
      </div>
      {panels.map((panel, index) => (
        <div
          key={panel.id}
          role="tabpanel"
          id={`exhibition-panel-${panel.id}`}
          aria-labelledby={`exhibition-tab-${panel.id}`}
          hidden={selected !== index}
          tabIndex={0}
          className={styles.panel}
        >
          {panel.content}
        </div>
      ))}
    </>
  );
}
