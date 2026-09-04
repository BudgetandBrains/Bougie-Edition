import { useCallback, useEffect, useState } from 'react';
import { RefreshCw, Check } from 'lucide-react';

/* ============================================================
   Bougie Edition — built-in, self-contained CAPTCHA
   No external service, keys or backend. Presents a small
   randomised arithmetic challenge; calls onVerify(bool) as the
   answer changes so a form can gate its submit on a human.
   Swap for reCAPTCHA/hCaptcha later if a backend is added.
   ============================================================ */
function makeChallenge() {
  const a = Math.floor(Math.random() * 8) + 2;
  const b = Math.floor(Math.random() * 8) + 2;
  return { a, b, answer: a + b };
}

export default function Captcha({ onVerify }) {
  const [challenge, setChallenge] = useState(makeChallenge);
  const [value, setValue] = useState('');
  const verified = value !== '' && parseInt(value, 10) === challenge.answer;

  useEffect(() => { onVerify && onVerify(verified); }, [verified, onVerify]);

  const refresh = useCallback(() => { setChallenge(makeChallenge()); setValue(''); }, []);

  return (
    <div className="captcha" data-verified={verified ? '1' : undefined}>
      <label className="captcha-label" htmlFor="captcha-input">Quick check — you're human, right?</label>
      <div className="captcha-row">
        <span className="captcha-q" aria-hidden="true">{challenge.a} + {challenge.b} =</span>
        <input
          id="captcha-input"
          className="captcha-input"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          aria-label={`What is ${challenge.a} plus ${challenge.b}?`}
          value={value}
          onChange={(e) => setValue(e.target.value.replace(/[^0-9]/g, ''))}
          placeholder="?"
        />
        {verified
          ? <span className="captcha-ok" aria-label="Verified"><Check size={16} /></span>
          : <button type="button" className="captcha-refresh" onClick={refresh} aria-label="New challenge"><RefreshCw size={15} /></button>}
      </div>
    </div>
  );
}
