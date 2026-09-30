import { useState } from 'react';

const LEVELS = ['Fair', 'Good', 'Very good', 'Excellent'];
const DEFS = {
  Fair: 'Visible, honest wear from regular use — priced to reflect it.',
  Good: 'Noticeable wear but structurally sound and ready to be enjoyed as-is.',
  'Very good': 'Light, even wear with no major flaws — gently used and well kept.',
  Excellent: 'Minimal signs of wear; close to pristine and often barely carried.'
};

export function conditionLevel(condition) {
  const i = LEVELS.findIndex((l) => l.toLowerCase() === String(condition || '').toLowerCase());
  return i > -1 ? i : 2;
}

export default function ConditionMeter({ condition }) {
  const level = conditionLevel(condition);
  const [explore, setExplore] = useState(null); // index the user is hovering / tapping
  const shown = explore != null ? explore : level;

  return (
    <div className="condition-meter" data-level={level}>
      <div className="cm-track">{LEVELS.map((l) => <span key={l} className="cm-step"></span>)}</div>
      <div className="cm-labels">
        {LEVELS.map((l, i) => (
          <button
            key={l}
            type="button"
            className={'cm-lbl' + (i === level ? ' is-grade' : '') + (i === shown ? ' on' : '')}
            onMouseEnter={() => setExplore(i)}
            onMouseLeave={() => setExplore(null)}
            onFocus={() => setExplore(i)}
            onBlur={() => setExplore(null)}
            onClick={() => setExplore((cur) => (cur === i ? null : i))}
            aria-label={`${l}: ${DEFS[l]}`}
          >
            {l}
          </button>
        ))}
      </div>
      <p className="cm-current">
        <strong>{LEVELS[shown]}</strong> — {DEFS[LEVELS[shown]]}
        {shown === level ? ' This piece’s grade, inspected in hand.' : ''}
      </p>
    </div>
  );
}
