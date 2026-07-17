const LEVELS = ['Fair', 'Good', 'Very good', 'Excellent'];

export function conditionLevel(condition) {
  const i = LEVELS.findIndex((l) => l.toLowerCase() === String(condition || '').toLowerCase());
  return i > -1 ? i : 2;
}

export default function ConditionMeter({ condition }) {
  const level = conditionLevel(condition);
  return (
    <div className="condition-meter" data-level={level}>
      <div className="cm-track">{LEVELS.map((l) => <span key={l} className="cm-step"></span>)}</div>
      <div className="cm-labels">{LEVELS.map((l) => <span key={l}>{l}</span>)}</div>
      <p className="cm-current">Condition: <strong>{LEVELS[level]}</strong> — inspected in hand and graded honestly ahead of listing.</p>
    </div>
  );
}
