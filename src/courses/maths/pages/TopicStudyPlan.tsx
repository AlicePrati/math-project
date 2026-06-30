import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { SECTION_MAP } from '../data/topics';
import { useTracker } from '../store/useTracker';
import { useExercises } from '../store/useExercises';
import { getStudyPlanForSection, hasSectionPlan } from '../data/studyPlans';
import type { StudyPlanTopic } from '../data/studyPlans/types';
import { api } from '../../../lib/api';

// ── Animated scenes per svgKey ──────────────────────────────────────────────

function AnimPropStatementVsQuestion() {
  const [idx, setIdx] = useState(0);
  const items = [
    { text: '"7 is odd"', is: true },
    { text: '"Close the door!"', is: false },
    { text: '"Rome is in Italy"', is: true },
    { text: '"What time is it?"', is: false },
    { text: '"2 + 2 = 5"', is: true },
  ];
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    timerRef.current = setInterval(() => setIdx(i => (i + 1) % items.length), 1400);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);
  const item = items[idx];
  return (
    <div className="flex flex-col items-center gap-2 py-3">
      <div className={`w-full max-w-xs rounded-xl border-2 px-4 py-3 text-center transition-all duration-500 ${item.is ? 'bg-green-50 dark:bg-green-900/30 border-green-400' : 'bg-red-50 dark:bg-red-900/30 border-red-400'}`}>
        <p className="text-sm font-mono text-gray-800 dark:text-gray-200">{item.text}</p>
        <p className={`text-xs font-bold mt-1 ${item.is ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
          {item.is ? '✓ proposition — has a truth value' : '✗ not a proposition'}
        </p>
      </div>
    </div>
  );
}

function AnimPropNegation() {
  const [pTrue, setPTrue] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    timerRef.current = setInterval(() => setPTrue(v => !v), 1500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);
  return (
    <div className="flex items-center justify-center gap-4 py-3">
      <div className={`flex flex-col items-center justify-center w-24 h-20 rounded-xl border-2 transition-all duration-500 ${pTrue ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-400' : 'bg-amber-50 dark:bg-amber-900/30 border-amber-400'}`}>
        <span className="text-3xl">{pTrue ? '🌧️' : '☀️'}</span>
        <span className={`text-xs font-bold mt-1 ${pTrue ? 'text-blue-700 dark:text-blue-300' : 'text-amber-700 dark:text-amber-300'}`}>P = {pTrue ? 'T' : 'F'}</span>
      </div>
      <span className="text-2xl font-bold text-gray-500 dark:text-gray-400">¬</span>
      <div className={`flex flex-col items-center justify-center w-24 h-20 rounded-xl border-2 transition-all duration-500 ${!pTrue ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-400' : 'bg-amber-50 dark:bg-amber-900/30 border-amber-400'}`}>
        <span className="text-3xl">{!pTrue ? '🌧️' : '☀️'}</span>
        <span className={`text-xs font-bold mt-1 ${!pTrue ? 'text-blue-700 dark:text-blue-300' : 'text-amber-700 dark:text-amber-300'}`}>¬P = {!pTrue ? 'T' : 'F'}</span>
      </div>
    </div>
  );
}

function AnimPropAnd() {
  const [tick, setTick] = useState(0);
  const states = [{p:true,q:true},{p:true,q:false},{p:false,q:true},{p:false,q:false}];
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    timerRef.current = setInterval(() => setTick(t => (t + 1) % states.length), 1400);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);
  const {p, q} = states[tick];
  const result = p && q;
  const key = (on: boolean, label: string) => (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 transition-all duration-400 ${on ? 'bg-green-50 dark:bg-green-900/30 border-green-400' : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600'}`}>
      <span className="text-lg">{on ? '🗝️' : '🔑'}</span>
      <span className={`text-xs font-bold ${on ? 'text-green-700 dark:text-green-300' : 'text-gray-400'}`}>{label} = {on ? 'T' : 'F'}</span>
    </div>
  );
  return (
    <div className="flex flex-col items-center gap-2 py-3">
      <div className="flex gap-2">{key(p,'P')}{key(q,'Q')}</div>
      <div className={`px-4 py-2 rounded-xl border-2 text-sm font-bold transition-all duration-500 ${result ? 'bg-green-100 dark:bg-green-900/40 border-green-400 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/40 border-red-400 text-red-800 dark:text-red-200'}`}>
        P ∧ Q = {result ? '✓ T' : '✗ F'} — {result ? 'door opens' : 'door stays locked'}
      </div>
    </div>
  );
}

function AnimPropOr() {
  const [tick, setTick] = useState(0);
  const states = [{p:true,q:false},{p:false,q:true},{p:true,q:true},{p:false,q:false}];
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    timerRef.current = setInterval(() => setTick(t => (t + 1) % states.length), 1400);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);
  const {p, q} = states[tick];
  const result = p || q;
  const sw = (on: boolean, label: string) => (
    <div className={`flex flex-col items-center justify-center w-20 h-16 rounded-xl border-2 transition-all duration-400 ${on ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-400' : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600'}`}>
      <span className="text-xl">{on ? '🔛' : '⬛'}</span>
      <span className={`text-xs font-bold ${on ? 'text-blue-700 dark:text-blue-300' : 'text-gray-400'}`}>{label}={on?'T':'F'}</span>
    </div>
  );
  return (
    <div className="flex flex-col items-center gap-2 py-3">
      <div className="flex items-center gap-3">{sw(p,'P')}<span className="text-lg font-bold text-gray-400">∨</span>{sw(q,'Q')}</div>
      <div className={`px-4 py-2 rounded-xl border-2 text-sm font-bold transition-all duration-500 ${result ? 'bg-amber-100 dark:bg-amber-900/40 border-amber-400 text-amber-800 dark:text-amber-200' : 'bg-gray-100 dark:bg-gray-800 border-gray-300 text-gray-500'}`}>
        {result ? '💡 light ON — P ∨ Q = T' : '🌑 light OFF — P ∨ Q = F'}
      </div>
    </div>
  );
}

function AnimPropCombo() {
  const [tick, setTick] = useState(0);
  const cases = [
    {t:true, a:true, vip:false, label:'Ticket ∧ Age ≥ 18 → ✓'},
    {t:true, a:false, vip:false, label:'Ticket but Age < 18 → ✗'},
    {t:false, a:false, vip:true, label:'VIP pass alone → ✓'},
    {t:false, a:false, vip:false, label:'Nothing → ✗'},
  ];
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    timerRef.current = setInterval(() => setTick(i => (i + 1) % cases.length), 1600);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);
  const c = cases[tick];
  const enter = (c.t && c.a) || c.vip;
  return (
    <div className="flex flex-col items-center gap-2 py-3">
      <div className="flex gap-2 text-xs">
        <span className={`px-2 py-1 rounded-lg border font-mono ${c.t ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-400 text-blue-800 dark:text-blue-200' : 'bg-gray-100 dark:bg-gray-800 border-gray-300 text-gray-400'}`}>Ticket={c.t?'T':'F'}</span>
        <span className={`px-2 py-1 rounded-lg border font-mono ${c.a ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-400 text-blue-800 dark:text-blue-200' : 'bg-gray-100 dark:bg-gray-800 border-gray-300 text-gray-400'}`}>Age≥18={c.a?'T':'F'}</span>
        <span className={`px-2 py-1 rounded-lg border font-mono ${c.vip ? 'bg-purple-100 dark:bg-purple-900/30 border-purple-400 text-purple-800 dark:text-purple-200' : 'bg-gray-100 dark:bg-gray-800 border-gray-300 text-gray-400'}`}>VIP={c.vip?'T':'F'}</span>
      </div>
      <div className={`px-4 py-2 rounded-xl border-2 text-sm font-bold transition-all duration-500 ${enter ? 'bg-green-100 dark:bg-green-900/40 border-green-400 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/40 border-red-400 text-red-800 dark:text-red-200'}`}>
        {c.label}
      </div>
    </div>
  );
}

const VISUALS: Record<string, () => React.ReactElement | null> = {
  prop_statement_vs_question: AnimPropStatementVsQuestion,
  prop_negation_rain: AnimPropNegation,
  prop_and_door: AnimPropAnd,
  prop_or_light: AnimPropOr,
  prop_combo_event: AnimPropCombo,

  // ── Rating 2+ — static SVGs wrapped as components ────────────────────────
  prop_truth_table_neg_or: () => (
    <svg viewBox="0 0 280 150" className="w-full max-w-xs mx-auto" aria-hidden="true">
      <rect x="8" y="8" width="264" height="134" rx="8" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1.5"/>
      <text x="46" y="28" fontSize="10" fill="#6b7280" fontWeight="700">P</text>
      <text x="96" y="28" fontSize="10" fill="#6b7280" fontWeight="700">Q</text>
      <text x="146" y="28" fontSize="10" fill="#6b7280" fontWeight="700">¬P</text>
      <text x="196" y="28" fontSize="10" fill="#6b7280" fontWeight="700">¬P ∨ Q</text>
      <line x1="16" y1="34" x2="264" y2="34" stroke="#e5e7eb" strokeWidth="1"/>
      {([
        {p:'T',q:'T',np:'F',r:'T',rc:'#16a34a',bg:'transparent'},
        {p:'T',q:'F',np:'F',r:'F',rc:'#dc2626',bg:'#fee2e2'},
        {p:'F',q:'T',np:'T',r:'T',rc:'#16a34a',bg:'transparent'},
        {p:'F',q:'F',np:'T',r:'T',rc:'#16a34a',bg:'transparent'},
      ] as const).map(({p,q,np,r,rc,bg},i)=>(
        <g key={i}>
          {bg !== 'transparent' && <rect x="16" y={42+i*24} width="248" height="22" rx="3" fill={bg}/>}
          <text x="46" y={57+i*24} fontSize="12" fill="#374151" fontFamily="monospace" textAnchor="middle">{p}</text>
          <text x="96" y={57+i*24} fontSize="12" fill="#374151" fontFamily="monospace" textAnchor="middle">{q}</text>
          <text x="146" y={57+i*24} fontSize="12" fill="#374151" fontFamily="monospace" textAnchor="middle">{np}</text>
          <text x="210" y={57+i*24} fontSize="13" fill={rc} fontWeight="700" fontFamily="monospace" textAnchor="middle">{r}</text>
        </g>
      ))}
      <text x="264" y="68" fontSize="8" fill="#dc2626" fontWeight="600" textAnchor="end">← only false row</text>
    </svg>
  ),
  prop_demorgan_or: () => (
    <svg viewBox="0 0 280 140" className="w-full max-w-xs mx-auto" aria-hidden="true">
      <rect x="80" y="10" width="120" height="120" rx="12" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2"/>
      <rect x="95" y="25" width="90" height="50" rx="6" fill="#fff" stroke="#94a3b8" strokeWidth="1.5"/>
      <text x="140" y="48" textAnchor="middle" fontSize="20">🥤</text>
      <text x="140" y="65" textAnchor="middle" fontSize="8" fill="#64748b">product</text>
      <rect x="100" y="86" width="36" height="22" rx="5" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1.5"/>
      <text x="118" y="101" textAnchor="middle" fontSize="14">🪙</text>
      <line x1="118" y1="83" x2="118" y2="78" stroke="#ef4444" strokeWidth="2"/>
      <line x1="112" y1="78" x2="124" y2="78" stroke="#ef4444" strokeWidth="2"/>
      <rect x="144" y="86" width="36" height="22" rx="5" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1.5"/>
      <text x="162" y="101" textAnchor="middle" fontSize="14">🪙</text>
      <line x1="162" y1="83" x2="162" y2="78" stroke="#ef4444" strokeWidth="2"/>
      <line x1="156" y1="78" x2="168" y2="78" stroke="#ef4444" strokeWidth="2"/>
      <text x="118" y="120" textAnchor="middle" fontSize="8" fill="#64748b">¬P (no €1)</text>
      <text x="162" y="120" textAnchor="middle" fontSize="8" fill="#64748b">¬Q (no €2)</text>
      <text x="20" y="58" fontSize="9" fill="#374151" fontWeight="600">¬(P ∨ Q)</text>
      <text x="20" y="72" fontSize="9" fill="#374151">accepts</text>
      <text x="20" y="84" fontSize="9" fill="#374151">neither</text>
      <text x="20" y="100" fontSize="11" fill="#374151">≡</text>
      <text x="20" y="114" fontSize="9" fill="#374151" fontWeight="600">¬P ∧ ¬Q</text>
    </svg>
  ),
  prop_tautology_excluded_middle: () => (
    <svg viewBox="0 0 280 130" className="w-full max-w-xs mx-auto" aria-hidden="true">
      <rect x="8" y="8" width="264" height="114" rx="10" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1.5"/>
      <rect x="18" y="20" width="80" height="80" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
      <text x="58" y="60" textAnchor="middle" fontSize="36">🌧️</text>
      <text x="58" y="90" textAnchor="middle" fontSize="9" fill="#1e40af" fontWeight="600">P = "raining"</text>
      <text x="58" y="103" textAnchor="middle" fontSize="9" fill="#1e40af">True</text>
      <text x="140" y="65" textAnchor="middle" fontSize="14" fill="#374151" fontWeight="700">P ∨ ¬P</text>
      <rect x="182" y="20" width="80" height="80" rx="8" fill="#fef3c7" stroke="#fcd34d" strokeWidth="1.5"/>
      <text x="222" y="60" textAnchor="middle" fontSize="36">☀️</text>
      <text x="222" y="90" textAnchor="middle" fontSize="9" fill="#92400e" fontWeight="600">¬P = "not raining"</text>
      <text x="222" y="103" textAnchor="middle" fontSize="9" fill="#92400e">True</text>
      <rect x="88" y="110" width="104" height="18" rx="5" fill="#dcfce7" stroke="#86efac" strokeWidth="1"/>
      <text x="140" y="123" textAnchor="middle" fontSize="9" fill="#166534" fontWeight="700">Always TRUE ✓</text>
    </svg>
  ),
  prop_demorgan_and: () => (
    <svg viewBox="0 0 280 140" className="w-full max-w-xs mx-auto" aria-hidden="true">
      <rect x="90" y="30" width="80" height="90" rx="8" fill="#92400e" stroke="#78350f" strokeWidth="2"/>
      <rect x="105" y="45" width="50" height="65" rx="4" fill="#b45309"/>
      <circle cx="147" cy="78" r="7" fill="#fbbf24"/>
      <rect x="10" y="35" width="66" height="24" rx="6" fill="#dcfce7" stroke="#86efac" strokeWidth="1.5"/>
      <text x="43" y="50" textAnchor="middle" fontSize="9" fill="#166534">🗝️ Key A (P)</text>
      <rect x="10" y="70" width="66" height="24" rx="6" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1.5"/>
      <text x="43" y="85" textAnchor="middle" fontSize="9" fill="#991b1b">🗝️ Key B (Q)</text>
      <line x1="33" y1="82" x2="43" y2="78" stroke="#ef4444" strokeWidth="2"/>
      <line x1="43" y1="72" x2="43" y2="88" stroke="#ef4444" strokeWidth="2"/>
      <rect x="204" y="52" width="68" height="36" rx="6" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1.5"/>
      <text x="238" y="67" textAnchor="middle" fontSize="9" fill="#991b1b" fontWeight="600">🔒 Stays locked</text>
      <text x="238" y="80" textAnchor="middle" fontSize="8" fill="#991b1b">¬Q is enough</text>
      <path d="M170 78 L204 70" stroke="#374151" strokeWidth="1.5" fill="none" strokeDasharray="4,3"/>
      <text x="140" y="132" textAnchor="middle" fontSize="9" fill="#4b5563">¬(P ∧ Q) ≡ ¬P ∨ ¬Q: block ONE key</text>
    </svg>
  ),
  prop_demorgan_nested: () => (
    <svg viewBox="0 0 280 150" className="w-full max-w-xs mx-auto" aria-hidden="true">
      <text x="140" y="14" textAnchor="middle" fontSize="9" fill="#374151" fontWeight="700">¬((A∧B) ∨ (C∧D))  ≡  (¬A∨¬B) ∧ (¬C∨¬D)</text>
      <rect x="8" y="22" width="122" height="52" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
      <text x="69" y="38" textAnchor="middle" fontSize="9" fill="#1e40af" fontWeight="600">Original</text>
      <text x="69" y="53" textAnchor="middle" fontSize="10" fill="#1e40af">(A ∧ B) ∨ (C ∧ D)</text>
      <text x="69" y="67" textAnchor="middle" fontSize="8" fill="#1e40af">AND inside OR</text>
      <text x="140" y="55" textAnchor="middle" fontSize="16" fill="#374151">¬</text>
      <path d="M130 55 L150 55" stroke="#374151" strokeWidth="1.5" fill="none"/>
      <rect x="150" y="22" width="122" height="52" rx="8" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5"/>
      <text x="211" y="38" textAnchor="middle" fontSize="9" fill="#9d174d" fontWeight="600">Negated</text>
      <text x="211" y="53" textAnchor="middle" fontSize="10" fill="#9d174d">(¬A ∨ ¬B) ∧ (¬C ∨ ¬D)</text>
      <text x="211" y="67" textAnchor="middle" fontSize="8" fill="#9d174d">OR inside AND</text>
      <line x1="8" y1="90" x2="272" y2="90" stroke="#e5e7eb" strokeWidth="1"/>
      <text x="60" y="106" textAnchor="middle" fontSize="8" fill="#6b7280">Step 1: De Morgan on ∨</text>
      <text x="60" y="118" textAnchor="middle" fontSize="8" fill="#374151" fontWeight="600">¬(A∧B) ∧ ¬(C∧D)</text>
      <text x="200" y="106" textAnchor="middle" fontSize="8" fill="#6b7280">Step 2: De Morgan on each ∧</text>
      <text x="200" y="118" textAnchor="middle" fontSize="8" fill="#374151" fontWeight="600">(¬A∨¬B) ∧ (¬C∨¬D)</text>
      <path d="M105 112 L150 112" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arrnest)" fill="none"/>
      <defs>
        <marker id="arrnest" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6" fill="none" stroke="#374151" strokeWidth="1.2"/>
        </marker>
      </defs>
    </svg>
  ),

  // ── Lesson 2 — Conditional, biconditional, De Morgan, compound negation ──
  prop_conditional_umbrella: () => (
    <svg viewBox="0 0 280 130" className="w-full max-w-xs mx-auto" aria-hidden="true">
      <rect x="8" y="8" width="264" height="114" rx="10" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1.5"/>
      <text x="140" y="26" textAnchor="middle" fontSize="10" fill="#374151" fontWeight="700">P → Q : "if it rains → I bring an umbrella"</text>
      <text x="58" y="55" textAnchor="middle" fontSize="30">☀️</text>
      <text x="58" y="80" textAnchor="middle" fontSize="9" fill="#1e40af" fontWeight="600">P = false</text>
      <text x="58" y="93" textAnchor="middle" fontSize="9" fill="#6b7280">not raining</text>
      <text x="120" y="65" textAnchor="middle" fontSize="18" fill="#374151">→</text>
      <text x="190" y="55" textAnchor="middle" fontSize="30">🌂</text>
      <text x="190" y="80" textAnchor="middle" fontSize="9" fill="#1e40af" fontWeight="600">Q = false</text>
      <text x="190" y="93" textAnchor="middle" fontSize="9" fill="#6b7280">no umbrella</text>
      <rect x="88" y="100" width="104" height="18" rx="5" fill="#dcfce7" stroke="#86efac" strokeWidth="1"/>
      <text x="140" y="113" textAnchor="middle" fontSize="9" fill="#166534" fontWeight="700">P false → P→Q is TRUE</text>
    </svg>
  ),
  prop_conditional_true_true: () => (
    <svg viewBox="0 0 280 130" className="w-full max-w-xs mx-auto" aria-hidden="true">
      <rect x="8" y="8" width="264" height="114" rx="10" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1.5"/>
      <text x="140" y="26" textAnchor="middle" fontSize="10" fill="#374151" fontWeight="700">P → Q : "over 18 → can vote"</text>
      <rect x="20" y="38" width="100" height="55" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
      <text x="70" y="60" textAnchor="middle" fontSize="22">🎂</text>
      <text x="70" y="80" textAnchor="middle" fontSize="9" fill="#1e40af" fontWeight="600">P = true</text>
      <text x="135" y="68" textAnchor="middle" fontSize="18" fill="#374151">→</text>
      <rect x="160" y="38" width="100" height="55" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
      <text x="210" y="60" textAnchor="middle" fontSize="22">🗳️</text>
      <text x="210" y="80" textAnchor="middle" fontSize="9" fill="#1e40af" fontWeight="600">Q = true</text>
      <rect x="70" y="100" width="140" height="18" rx="5" fill="#dcfce7" stroke="#86efac" strokeWidth="1"/>
      <text x="140" y="113" textAnchor="middle" fontSize="9" fill="#166534" fontWeight="700">true → true: P→Q is TRUE</text>
    </svg>
  ),
  prop_biconditional_parity: () => (
    <svg viewBox="0 0 280 130" className="w-full max-w-xs mx-auto" aria-hidden="true">
      <rect x="8" y="8" width="264" height="114" rx="10" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1.5"/>
      <text x="140" y="26" textAnchor="middle" fontSize="10" fill="#374151" fontWeight="700">P ↔ Q : number = 7</text>
      <rect x="20" y="38" width="105" height="55" rx="8" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1.5"/>
      <text x="72" y="60" textAnchor="middle" fontSize="11" fill="#991b1b" fontWeight="600">P: "is even"</text>
      <text x="72" y="78" textAnchor="middle" fontSize="10" fill="#991b1b">false</text>
      <text x="140" y="68" textAnchor="middle" fontSize="16" fill="#374151">↔</text>
      <rect x="155" y="38" width="105" height="55" rx="8" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1.5"/>
      <text x="207" y="60" textAnchor="middle" fontSize="11" fill="#991b1b" fontWeight="600">Q: "÷ by 2"</text>
      <text x="207" y="78" textAnchor="middle" fontSize="10" fill="#991b1b">false</text>
      <rect x="70" y="100" width="140" height="18" rx="5" fill="#dcfce7" stroke="#86efac" strokeWidth="1"/>
      <text x="140" y="113" textAnchor="middle" fontSize="9" fill="#166534" fontWeight="700">same value (F=F) → P↔Q is TRUE</text>
    </svg>
  ),
  prop_demorgan_ticket: () => (
    <svg viewBox="0 0 280 130" className="w-full max-w-xs mx-auto" aria-hidden="true">
      <rect x="8" y="8" width="264" height="114" rx="10" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1.5"/>
      <text x="140" y="24" textAnchor="middle" fontSize="10" fill="#374151" fontWeight="700">¬(P ∧ Q) ≡ ¬P ∨ ¬Q</text>
      <rect x="20" y="34" width="100" height="50" rx="8" fill="#dcfce7" stroke="#86efac" strokeWidth="1.5"/>
      <text x="70" y="55" textAnchor="middle" fontSize="20">🎫</text>
      <text x="70" y="75" textAnchor="middle" fontSize="9" fill="#166534" fontWeight="600">P = true</text>
      <rect x="160" y="34" width="100" height="50" rx="8" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1.5"/>
      <text x="210" y="55" textAnchor="middle" fontSize="20">🔞</text>
      <text x="210" y="75" textAnchor="middle" fontSize="9" fill="#991b1b" fontWeight="600">Q = false</text>
      <text x="140" y="64" textAnchor="middle" fontSize="14" fill="#374151">∧</text>
      <rect x="70" y="92" width="140" height="28" rx="6" fill="#dcfce7" stroke="#86efac" strokeWidth="1"/>
      <text x="140" y="106" textAnchor="middle" fontSize="9" fill="#166534" fontWeight="700">P∧Q false → ¬(P∧Q) is TRUE</text>
      <text x="140" y="117" textAnchor="middle" fontSize="7" fill="#16a34a">one requirement missing</text>
    </svg>
  ),
  prop_negation_and_wind: () => (
    <svg viewBox="0 0 280 130" className="w-full max-w-xs mx-auto" aria-hidden="true">
      <rect x="8" y="8" width="264" height="114" rx="10" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1.5"/>
      <text x="140" y="24" textAnchor="middle" fontSize="10" fill="#374151" fontWeight="700">¬P ∧ Q : "not raining AND windy"</text>
      <rect x="20" y="34" width="100" height="55" rx="8" fill="#fef3c7" stroke="#fcd34d" strokeWidth="1.5"/>
      <text x="70" y="56" textAnchor="middle" fontSize="22">☀️</text>
      <text x="70" y="76" textAnchor="middle" fontSize="9" fill="#92400e" fontWeight="600">¬P = true</text>
      <text x="70" y="86" textAnchor="middle" fontSize="7" fill="#92400e">(P=false)</text>
      <text x="135" y="68" textAnchor="middle" fontSize="16" fill="#374151">∧</text>
      <rect x="160" y="34" width="100" height="55" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
      <text x="210" y="56" textAnchor="middle" fontSize="22">🌬️</text>
      <text x="210" y="76" textAnchor="middle" fontSize="9" fill="#1e40af" fontWeight="600">Q = true</text>
      <rect x="70" y="96" width="140" height="18" rx="5" fill="#dcfce7" stroke="#86efac" strokeWidth="1"/>
      <text x="140" y="109" textAnchor="middle" fontSize="9" fill="#166534" fontWeight="700">true ∧ true → ¬P∧Q is TRUE</text>
    </svg>
  ),
};

// ── Animated scene: two propositions flickering ON / OFF ──────────────────
function ScenePropositionalLogic() {
  const [tick, setTick] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setTick(t => t + 1), 1200);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const pOn = tick % 3 !== 2;
  const qOn = tick % 4 !== 3;

  const box = (label: string, val: boolean) => (
    <div
      className={`flex flex-col items-center justify-center w-24 h-20 rounded-xl border-2 transition-all duration-500 ${
        val
          ? 'bg-green-100 dark:bg-green-900/40 border-green-400 dark:border-green-600'
          : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600'
      }`}
    >
      <span className="text-2xl">{val ? '💡' : '🔌'}</span>
      <span className={`text-xs font-mono font-bold mt-1 ${val ? 'text-green-700 dark:text-green-300' : 'text-gray-400 dark:text-gray-500'}`}>
        {label} = {val ? 'T' : 'F'}
      </span>
    </div>
  );

  return (
    <div className="flex items-center justify-center gap-4 py-3">
      {box('P', pOn)}
      <span className="text-xl font-bold text-gray-400 dark:text-gray-500">∧</span>
      {box('Q', qOn)}
      <span className="text-xl font-bold text-gray-400 dark:text-gray-500">=</span>
      <div
        className={`flex flex-col items-center justify-center w-24 h-20 rounded-xl border-2 transition-all duration-500 ${
          pOn && qOn
            ? 'bg-amber-100 dark:bg-amber-900/40 border-amber-400 dark:border-amber-600'
            : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600'
        }`}
      >
        <span className="text-2xl">{pOn && qOn ? '✅' : '❌'}</span>
        <span className={`text-xs font-mono font-bold mt-1 ${pOn && qOn ? 'text-amber-700 dark:text-amber-300' : 'text-gray-400 dark:text-gray-500'}`}>
          P∧Q = {pOn && qOn ? 'T' : 'F'}
        </span>
      </div>
    </div>
  );
}

function TopicScene({ sceneKey }: { sceneKey: string }) {
  if (sceneKey === 'scene_propositional_logic') return <ScenePropositionalLogic />;
  return null;
}

// ── Intro screen shown before the first exercise ───────────────────────────
const TOPIC_EMOJI: Record<string, string> = {
  propositional_logic: '⚡',
  implication: '➡️',
  quantifiers: '∀',
  sets: '⊆',
  proofs: '📐',
};

function TopicIntroScreen({ topic, onOpenLessons }: { topic: StudyPlanTopic; onOpenLessons: () => void }) {
  const emoji = TOPIC_EMOJI[topic.id] ?? '📖';
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 flex flex-col items-center text-center space-y-5">
      <span className="text-5xl">{emoji}</span>
      <div className="space-y-1">
        <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{topic.label}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {topic.exercises.length} question{topic.exercises.length !== 1 ? 's' : ''} — each teaches a concept, then checks it
        </p>
      </div>
      {topic.scene && (
        <div className="w-full">
          <TopicScene sceneKey={topic.scene} />
        </div>
      )}
      <button
        onClick={onOpenLessons}
        className="mt-2 px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-semibold text-sm transition-colors"
      >
        Lessons
      </button>
    </div>
  );
}

// ── Lesson picker: one button per exercise/lesson in the topic ────────────
function LessonsScreen({
  topic,
  isCompleted,
  onSelectLesson,
  onBack,
}: {
  topic: StudyPlanTopic;
  isCompleted: (id: string) => boolean;
  onSelectLesson: (index: number) => void;
  onBack: () => void;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{topic.label}</p>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {Array.from({ length: 5 }, (_, idx) => {
          const lessonExercises = topic.lessons?.[idx] ?? (idx === 0 ? topic.exercises : []);
          const available = lessonExercises.length > 0;
          const done = available && lessonExercises.every(e => isCompleted(e.id));
          return (
            <button
              key={idx}
              onClick={() => onSelectLesson(idx)}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border-2 font-semibold text-sm transition-all ${
                !available
                  ? 'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
                  : done
                  ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                  : 'border-gray-200 dark:border-gray-700 hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 text-gray-700 dark:text-gray-300'
              }`}
            >
              {done && <span>✓</span>}
              Lesson {idx + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Completion screen shown after all exercises are done ──────────────────
function TopicCompletionScreen({ topic, onBack, onRetry }: { topic: StudyPlanTopic; onBack: () => void; onRetry: () => void }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-green-300 dark:border-green-700 p-6 flex flex-col items-center text-center space-y-5">
      <span className="text-4xl">🎉</span>
      <div className="space-y-1">
        <p className="text-base font-bold text-green-700 dark:text-green-300">Topic complete!</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Concepts covered:</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {(topic.lessons ? topic.lessons.flat() : topic.exercises).map(e => e.title ? (
          <span
            key={e.id}
            className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 border border-green-300 dark:border-green-700"
          >
            {e.title.split('—')[0].split(':')[0].trim().slice(0, 60)}
          </span>
        ) : null)}
      </div>
      <div className="flex gap-3 mt-2">
        <button
          onClick={onRetry}
          className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold transition-colors"
        >
          ↺ Riprova
        </button>
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl bg-green-500 hover:bg-green-400 text-white text-sm font-semibold transition-colors"
        >
          Back to map
        </button>
      </div>
    </div>
  );
}

type QuestionSlide = {
  question: string;
  title?: string;
  svgKey?: string;
  options: string[];
  correct: number;
  explanation: string;
};

function QuestionCard({
  slide,
  isRetry,
  onCorrect,
  onWrong,
  onNext,
  onBack,
  onPrevQuestion,
  onNextQuestion,
}: {
  slide: QuestionSlide;
  isRetry: boolean;
  onCorrect: () => void;
  onWrong: () => void;
  onNext: () => void;
  onBack?: () => void;
  onPrevQuestion?: () => void;
  onNextQuestion?: () => void;
}) {
  const [optionOrder] = useState<number[]>(() =>
    slide.options.map((_, i) => i).sort(() => Math.random() - 0.5)
  );
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const isCorrect = answered && selected === slide.correct;

  function handleSelect(originalIdx: number) {
    if (answered) return;
    setSelected(originalIdx);
    if (originalIdx === slide.correct) onCorrect();
    else onWrong();
  }

  const firstPass = Boolean(slide.title) && !isRetry;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
      <div className="flex items-center justify-between">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Exit to lessons
          </button>
        ) : <span />}
        {isRetry && (
          <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
            Similar question — try again
          </p>
        )}
      </div>
      {(onPrevQuestion || onNextQuestion) && (
        <div className="flex items-center justify-between -mt-1">
          <button
            onClick={onPrevQuestion}
            disabled={!onPrevQuestion}
            className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Previous question
          </button>
          <button
            onClick={onNextQuestion}
            disabled={!onNextQuestion}
            className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next question
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
      {slide.svgKey && VISUALS[slide.svgKey] && (() => {
        const C = VISUALS[slide.svgKey!];
        return <C />;
      })()}
      {firstPass ? (
        <>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-snug">{slide.title}</p>
          <div className="border-t border-gray-200 dark:border-gray-700" />
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{slide.question}</p>
        </>
      ) : (
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-snug">{slide.question}</p>
      )}
      <div className="space-y-2">
        {optionOrder.map((originalIdx, displayPos) => {
          const opt = slide.options[originalIdx];
          const isCorrectOpt = originalIdx === slide.correct;
          const isSelectedOpt = selected === originalIdx;
          let cls = 'w-full text-left text-sm px-3 py-2.5 rounded-xl border-2 transition-all leading-relaxed font-medium ';
          if (!answered) {
            cls += 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20';
          } else if (isCorrect && isCorrectOpt) {
            cls += 'border-green-400 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200';
          } else if (!isCorrect && isSelectedOpt) {
            cls += 'border-red-400 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200';
          } else {
            cls += 'border-gray-100 dark:border-gray-800 text-gray-300 dark:text-gray-600';
          }
          return (
            <button key={originalIdx} disabled={answered} onClick={() => handleSelect(originalIdx)} className={cls}>
              <span className="font-mono text-xs mr-2 opacity-50">{String.fromCharCode(65 + displayPos)}.</span>
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className={`rounded-xl px-4 py-3 text-sm leading-relaxed border-2 ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border-green-300 dark:border-green-700' : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border-red-300 dark:border-red-700'}`}>
          <p className="font-semibold mb-1">{isCorrect ? '✓ Correct!' : '✗ Incorrect.'}</p>
          <p>{slide.explanation}</p>
        </div>
      )}

      {answered && isCorrect && (
        <button
          onClick={onNext}
          className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white text-sm font-semibold transition-colors"
        >
          Next →
        </button>
      )}

      {answered && !isCorrect && (
        <button
          onClick={onNext}
          className="w-full py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-white text-sm font-semibold transition-colors"
        >
          Try a similar question →
        </button>
      )}
    </div>
  );
}

function TopicExerciseFlow({
  topic,
  sectionId,
  isCompleted,
  onComplete,
  onResetTopic,
  onAllDone,
}: {
  topic: StudyPlanTopic;
  sectionId: string;
  isCompleted: (id: string) => boolean;
  onComplete: (id: string) => void;
  onResetTopic: (ids: string[]) => void;
  onAllDone: () => void;
}) {
  // All exercises across every lesson — used to decide when the whole topic is done.
  const allExercises = topic.lessons ? topic.lessons.flat() : topic.exercises;
  const allAlreadyDone = allExercises.length > 0 && allExercises.every(e => isCompleted(e.id));

  // 'intro' shown first, then 'lessons' (picker), then 'exercise', then 'done'
  const [flowPhase, setFlowPhase] = useState<'intro' | 'lessons' | 'exercise' | 'comingSoon' | 'done'>(
    allAlreadyDone ? 'done' : 'intro'
  );
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const [retryIndex, setRetryIndex] = useState(0);
  const [cardPhase, setCardPhase] = useState<'main' | 'retry'>('main');

  // Exercises for the lesson currently in progress.
  const exercises = topic.lessons?.[selectedLessonIndex] ?? (selectedLessonIndex === 0 ? topic.exercises : []);

  const currentExercise = exercises[stepIndex] ?? null;

  function selectLesson(idx: number) {
    const lessonExercises = topic.lessons?.[idx] ?? (idx === 0 ? topic.exercises : []);
    if (lessonExercises.length === 0) {
      setFlowPhase('comingSoon');
      return;
    }
    setSelectedLessonIndex(idx);
    setStepIndex(0);
    setRetryCount(0);
    setRetryIndex(0);
    setCardPhase('main');
    setFlowPhase('exercise');
  }

  function advance() {
    const next = stepIndex + 1;
    if (next >= exercises.length) {
      setFlowPhase(allExercises.every(e => isCompleted(e.id)) ? 'done' : 'lessons');
    } else {
      setStepIndex(next);
      setRetryCount(0);
      setRetryIndex(0);
      setCardPhase('main');
    }
  }

  function backToLessons() {
    setRetryCount(0);
    setRetryIndex(0);
    setCardPhase('main');
    setFlowPhase(allExercises.every(e => isCompleted(e.id)) ? 'done' : 'lessons');
  }

  // Free navigation between questions in the current lesson — works whether or not
  // the question has been answered yet.
  function goToPrevQuestion() {
    if (stepIndex === 0) return;
    setStepIndex(stepIndex - 1);
    setRetryCount(0);
    setRetryIndex(0);
    setCardPhase('main');
  }

  function goToNextQuestion() {
    if (stepIndex >= exercises.length - 1) return;
    setStepIndex(stepIndex + 1);
    setRetryCount(0);
    setRetryIndex(0);
    setCardPhase('main');
  }

  if (flowPhase === 'intro') {
    return <TopicIntroScreen topic={topic} onOpenLessons={() => setFlowPhase('lessons')} />;
  }

  if (flowPhase === 'lessons') {
    return (
      <LessonsScreen
        topic={topic}
        isCompleted={isCompleted}
        onSelectLesson={selectLesson}
        onBack={() => setFlowPhase('intro')}
      />
    );
  }

  if (flowPhase === 'comingSoon') {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 flex flex-col items-center text-center space-y-4">
        <span className="text-4xl">🚧</span>
        <p className="text-base font-bold text-gray-900 dark:text-gray-100">Coming soon</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">This lesson isn&apos;t ready yet — check back later.</p>
        <button
          onClick={() => setFlowPhase('lessons')}
          className="mt-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white text-sm font-semibold transition-colors"
        >
          ← Back to lessons
        </button>
      </div>
    );
  }

  if (flowPhase === 'done') {
    return (
      <TopicCompletionScreen
        topic={topic}
        onBack={onAllDone}
        onRetry={() => {
          onResetTopic(allExercises.map(e => e.id));
          setRetryCount(0);
          setRetryIndex(0);
          setCardPhase('main');
          setFlowPhase('intro');
        }}
      />
    );
  }

  if (!currentExercise) {
    return (
      <LessonsScreen
        topic={topic}
        isCompleted={isCompleted}
        onSelectLesson={selectLesson}
        onBack={() => setFlowPhase('intro')}
      />
    );
  }

  const retryPool = currentExercise.retry;

  const slide: QuestionSlide = cardPhase === 'retry'
    ? {
        question: retryPool[retryIndex % retryPool.length].question,
        svgKey: retryPool[retryIndex % retryPool.length].svgKey,
        options: retryPool[retryIndex % retryPool.length].options,
        correct: retryPool[retryIndex % retryPool.length].correct,
        explanation: retryPool[retryIndex % retryPool.length].explanation,
      }
    : {
        title: currentExercise.title,
        question: currentExercise.question,
        svgKey: currentExercise.svgKey,
        options: currentExercise.options,
        correct: currentExercise.correct,
        explanation: currentExercise.explanation,
      };

  function handleCorrect() {
    onComplete(currentExercise!.id);
    api.studyPlan.completeExercise(currentExercise!.id, sectionId).catch(() => {});
  }

  function handleWrong() {}

  function handleNext() {
    if (isCompleted(currentExercise!.id)) {
      advance();
    } else {
      const newCount = retryCount + 1;
      if (newCount >= 2) {
        onComplete(currentExercise!.id);
        api.studyPlan.completeExercise(currentExercise!.id, sectionId).catch(() => {});
        advance();
      } else {
        setRetryCount(newCount);
        setRetryIndex(i => i + 1);
        setCardPhase('retry');
      }
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{topic.label}</p>
        <p className="text-xs text-gray-400">{stepIndex + 1} / {exercises.length}</p>
      </div>
      <QuestionCard
        key={`${stepIndex}-${cardPhase}-${retryIndex}`}
        slide={slide}
        isRetry={cardPhase === 'retry'}
        onCorrect={handleCorrect}
        onWrong={handleWrong}
        onNext={handleNext}
        onBack={backToLessons}
        onPrevQuestion={stepIndex > 0 ? goToPrevQuestion : undefined}
        onNextQuestion={stepIndex < exercises.length - 1 ? goToNextQuestion : undefined}
      />
    </div>
  );
}

// Serpentine map: zig-zag, one node per row
function TopicMap({
  topics,
  isTopicDone,
  activeIndex,
  onSelect,
}: {
  topics: StudyPlanTopic[];
  isTopicDone: (topic: StudyPlanTopic) => boolean;
  activeIndex: number | null;
  onSelect: (index: number) => void;
}) {
  const firstLockedIndex = topics.findIndex((_, i) => i > 0 && !isTopicDone(topics[i - 1]));
  const unlockedUpTo = firstLockedIndex === -1 ? topics.length - 1 : firstLockedIndex - 1;

  // Build SVG path for the whole snake in one pass
  const NODE = 32;   // radius
  const W = 260;     // total width of SVG
  const STEP_Y = 90; // vertical distance between node centres
  const LEFT_X = NODE + 10;
  const RIGHT_X = W - NODE - 10;
  const totalH = (topics.length - 1) * STEP_Y + NODE * 2 + 20;

  const nodePositions = topics.map((_, idx) => ({
    cx: idx % 2 === 0 ? LEFT_X : RIGHT_X,
    cy: 10 + NODE + idx * STEP_Y,
  }));

  // Build curved connector path between consecutive nodes
  function connectorPath(from: { cx: number; cy: number }, to: { cx: number; cy: number }) {
    const midY = (from.cy + to.cy) / 2;
    return `M ${from.cx} ${from.cy + NODE} C ${from.cx} ${midY}, ${to.cx} ${midY}, ${to.cx} ${to.cy - NODE}`;
  }

  return (
    <div className="relative w-full" style={{ height: totalH }}>
      <svg
        viewBox={`0 0 ${W} ${totalH}`}
        className="absolute inset-0 w-full h-full"
        style={{ overflow: 'visible' }}
      >
        {/* Connector paths */}
        {topics.slice(0, -1).map((_, idx) => (
          <path
            key={idx}
            d={connectorPath(nodePositions[idx], nodePositions[idx + 1])}
            fill="none"
            stroke="#d1d5db"
            strokeWidth="3"
            strokeLinecap="round"
            markerEnd="url(#arrow)"
          />
        ))}

        {/* Arrowhead marker */}
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M1 1 L7 4 L1 7" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>

        {/* Nodes */}
        {topics.map((topic, idx) => {
          const { cx, cy } = nodePositions[idx];
          const done = isTopicDone(topic);
          const unlocked = idx <= unlockedUpTo;
          const active = activeIndex === idx;
          const isLeft = idx % 2 === 0;

          const fillColor = done ? '#22c55e' : active ? '#f59e0b' : unlocked ? '#ffffff' : '#f3f4f6';
          const strokeColor = done ? '#16a34a' : active ? '#d97706' : unlocked ? '#fbbf24' : '#e5e7eb';
          const textColor = done || active ? '#ffffff' : unlocked ? '#d97706' : '#d1d5db';

          return (
            <g key={topic.id} style={{ cursor: unlocked ? 'pointer' : 'not-allowed' }} onClick={() => unlocked && onSelect(idx)}>
              <circle cx={cx} cy={cy} r={NODE} fill={fillColor} stroke={strokeColor} strokeWidth="3.5" />
              {done ? (
                <path
                  d={`M ${cx - 10} ${cy} l 7 7 l 12 -12`}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <text x={cx} y={cy + 6} textAnchor="middle" fontSize="16" fontWeight="700" fill={textColor}>
                  {idx + 1}
                </text>
              )}
              {/* Label */}
              <text
                x={isLeft ? cx + NODE + 8 : cx - NODE - 8}
                y={cy + 5}
                textAnchor={isLeft ? 'start' : 'end'}
                fontSize="13"
                fontWeight="600"
                fill={unlocked ? '#374151' : '#d1d5db'}
              >
                {topic.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function TopicStudyPlan() {
  const { topicId: sectionId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { data } = useTracker();
  const { markComplete, resetTopic, isCompleted } = useExercises();

  const [searchParams] = useSearchParams();
  const [activeTopicIndex, setActiveTopicIndex] = useState<number | null>(null);
  const [remoteTopics, setRemoteTopics] = useState<StudyPlanTopic[] | null>(null);

  const section = sectionId ? SECTION_MAP[sectionId] : undefined;

  const sectionRating = section
    ? section.topics.map((t) => data.ratings[t.id] ?? 0).find((r) => r > 0) ?? 0
    : 0;

  const queryRating = Number(searchParams.get('rating'));
  const displayRating = (queryRating >= 1 && queryRating <= 5 ? queryRating : sectionRating > 0 ? sectionRating : 1) as 1 | 2 | 3 | 4 | 5;
  const plan = sectionId ? getStudyPlanForSection(sectionId, displayRating) : undefined;
  const hasAnyPlan = sectionId ? hasSectionPlan(sectionId) : false;

  useEffect(() => {
    if (!sectionId) return;
    setRemoteTopics(null);
    api.studyPlan.questions(sectionId, displayRating)
      .then((data) => {
        const entry = (data as { topics?: StudyPlanTopic[] }[])[0];
        if (entry?.topics) setRemoteTopics(entry.topics);
      })
      .catch(() => {});
  }, [sectionId, displayRating]);

  function isTopicDone(topic: StudyPlanTopic) {
    const all = topic.lessons ? topic.lessons.flat() : topic.exercises;
    return all.length > 0 && all.every(e => isCompleted(e.id));
  }

  if (!section) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Section not found.</p>
          <button onClick={() => navigate('/tracker')} className="text-amber-500 hover:text-amber-400 font-medium">
            ← Back to Tracker
          </button>
        </div>
      </div>
    );
  }

  const topics = remoteTopics ?? plan?.topics;
  const activeTopic = activeTopicIndex !== null && topics ? topics[activeTopicIndex] : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="sticky top-0 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button
            onClick={() => activeTopic ? setActiveTopicIndex(null) : navigate(-1)}
            className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {activeTopic ? 'Back to map' : 'Back'}
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
              {activeTopic ? activeTopic.label : section.label}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {activeTopic ? section.label : 'Study Plan'}
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {!hasAnyPlan && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-sm text-amber-700 dark:text-amber-300">
            No study plan available for this section yet.
          </div>
        )}

        {plan && (
          <>
            {/* MAP VIEW — shown when no topic is active */}
            {!activeTopic && topics && topics.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <TopicMap
                  topics={topics}
                  isTopicDone={isTopicDone}
                  activeIndex={null}
                  onSelect={(idx) => setActiveTopicIndex(idx)}
                />
              </div>
            )}

            {/* VIDEO LIST — shown only in map view */}
            {!activeTopic && plan.videos && plan.videos.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-red-500 dark:text-red-400 mb-3">
                  Watch to learn more
                </h3>
                <ul className="space-y-2">
                  {plan.videos.map((v, i) => (
                    <li key={i}>
                      <a
                        href={v.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 group"
                      >
                        <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-red-600 dark:text-red-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400 group-hover:underline leading-snug">
                          {v.title}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* EXERCISE VIEW — shown when a topic is active */}
            {activeTopic && (
              <TopicExerciseFlow
                key={activeTopic.id}
                topic={activeTopic}
                sectionId={sectionId ?? ''}
                isCompleted={isCompleted}
                onComplete={markComplete}
                onResetTopic={resetTopic}
                onAllDone={() => setActiveTopicIndex(null)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
