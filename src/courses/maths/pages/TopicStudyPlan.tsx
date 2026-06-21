import { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { SECTION_MAP } from '../data/topics';
import { useTracker } from '../store/useTracker';
import { useExercises } from '../store/useExercises';
import { getStudyPlanForSection, hasSectionPlan } from '../data/studyPlans';
import type { StudyPlanTopic } from '../data/studyPlans/types';

const VISUALS: Record<string, React.ReactNode> = {
  // ── Rating 1 — Propositional Logic ──────────────────────────────────────────
  prop_statement_vs_question: (
    <svg viewBox="0 0 280 130" className="w-full max-w-xs mx-auto" aria-hidden="true">
      <rect x="8" y="8" width="122" height="114" rx="10" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5"/>
      <text x="69" y="28" textAnchor="middle" fontSize="10" fill="#166534" fontWeight="700">PROPOSITION ✓</text>
      <rect x="18" y="36" width="102" height="22" rx="5" fill="#dcfce7" stroke="#86efac" strokeWidth="1"/>
      <text x="69" y="51" textAnchor="middle" fontSize="9" fill="#166534">"7 is odd"  → T or F</text>
      <rect x="18" y="64" width="102" height="22" rx="5" fill="#dcfce7" stroke="#86efac" strokeWidth="1"/>
      <text x="69" y="79" textAnchor="middle" fontSize="9" fill="#166534">"Rome is in Italy" → T</text>
      <rect x="18" y="92" width="102" height="22" rx="5" fill="#dcfce7" stroke="#86efac" strokeWidth="1"/>
      <text x="69" y="107" textAnchor="middle" fontSize="9" fill="#166534">"2+2=5"  → F</text>

      <rect x="150" y="8" width="122" height="114" rx="10" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5"/>
      <text x="211" y="28" textAnchor="middle" fontSize="10" fill="#991b1b" fontWeight="700">NOT A PROPOSITION ✗</text>
      <rect x="160" y="36" width="102" height="22" rx="5" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1"/>
      <text x="211" y="51" textAnchor="middle" fontSize="9" fill="#991b1b">"Close the door!"</text>
      <rect x="160" y="64" width="102" height="22" rx="5" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1"/>
      <text x="211" y="79" textAnchor="middle" fontSize="9" fill="#991b1b">"What time is it?"</text>
      <rect x="160" y="92" width="102" height="22" rx="5" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1"/>
      <text x="211" y="107" textAnchor="middle" fontSize="9" fill="#991b1b">"Maybe it will rain"</text>
    </svg>
  ),
  prop_negation_rain: (
    <svg viewBox="0 0 280 120" className="w-full max-w-xs mx-auto" aria-hidden="true">
      <rect x="8" y="8" width="100" height="104" rx="10" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5"/>
      <text x="58" y="26" textAnchor="middle" fontSize="10" fill="#1e40af" fontWeight="700">P = True</text>
      <text x="58" y="58" textAnchor="middle" fontSize="32">🌧️</text>
      <text x="58" y="88" textAnchor="middle" fontSize="9" fill="#1e40af">"It is raining"</text>
      <text x="58" y="103" textAnchor="middle" fontSize="9" fill="#1e40af">is TRUE</text>

      <text x="140" y="62" textAnchor="middle" fontSize="24" fill="#374151" fontWeight="700">¬</text>

      <rect x="172" y="8" width="100" height="104" rx="10" fill="#fef3c7" stroke="#fcd34d" strokeWidth="1.5"/>
      <text x="222" y="26" textAnchor="middle" fontSize="10" fill="#92400e" fontWeight="700">¬P = False</text>
      <text x="222" y="58" textAnchor="middle" fontSize="32">☀️</text>
      <text x="222" y="88" textAnchor="middle" fontSize="9" fill="#92400e">"NOT raining"</text>
      <text x="222" y="103" textAnchor="middle" fontSize="9" fill="#92400e">is FALSE</text>
    </svg>
  ),
  prop_and_door: (
    <svg viewBox="0 0 280 130" className="w-full max-w-xs mx-auto" aria-hidden="true">
      <rect x="100" y="30" width="80" height="90" rx="8" fill="#92400e" stroke="#78350f" strokeWidth="2"/>
      <rect x="115" y="45" width="50" height="65" rx="4" fill="#b45309"/>
      <circle cx="157" cy="78" r="7" fill="#fbbf24"/>
      <text x="140" y="125" textAnchor="middle" fontSize="9" fill="#4b5563">P ∧ Q: need BOTH keys</text>

      <rect x="10" y="35" width="72" height="28" rx="6" fill="#dcfce7" stroke="#86efac" strokeWidth="1.5"/>
      <text x="46" y="53" textAnchor="middle" fontSize="11">🗝️</text>
      <text x="80" y="50" fontSize="8" fill="#166534" fontWeight="600">Key A (P)</text>
      <path d="M82 49 Q100 49 110 60" stroke="#f59e0b" strokeWidth="2" fill="none" strokeDasharray="4,3"/>

      <rect x="10" y="78" width="72" height="28" rx="6" fill="#dcfce7" stroke="#86efac" strokeWidth="1.5"/>
      <text x="46" y="96" textAnchor="middle" fontSize="11">🗝️</text>
      <text x="80" y="93" fontSize="8" fill="#166534" fontWeight="600">Key B (Q)</text>
      <path d="M82 92 Q100 92 110 85" stroke="#f59e0b" strokeWidth="2" fill="none" strokeDasharray="4,3"/>

      <rect x="198" y="55" width="72" height="28" rx="6" fill="#dcfce7" stroke="#86efac" strokeWidth="1.5"/>
      <text x="234" y="68" textAnchor="middle" fontSize="9" fill="#166534" fontWeight="700">🔓 Opens</text>
      <text x="234" y="79" textAnchor="middle" fontSize="8" fill="#166534">only with A AND B</text>
      <path d="M180 78 L198 69" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arrd)"/>
      <defs>
        <marker id="arrd" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6" fill="none" stroke="#374151" strokeWidth="1.2"/>
        </marker>
      </defs>
    </svg>
  ),
  prop_or_light: (
    <svg viewBox="0 0 280 130" className="w-full max-w-xs mx-auto" aria-hidden="true">
      <text x="140" y="118" textAnchor="middle" fontSize="9" fill="#4b5563">P ∨ Q: ONE switch is enough</text>
      <circle cx="222" cy="58" r="26" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
      <text x="222" y="64" textAnchor="middle" fontSize="24">💡</text>
      <line x1="196" y1="58" x2="168" y2="58" stroke="#374151" strokeWidth="2.5"/>
      <line x1="168" y1="58" x2="140" y2="36" stroke="#374151" strokeWidth="2.5"/>
      <line x1="168" y1="58" x2="140" y2="80" stroke="#374151" strokeWidth="2.5"/>

      <rect x="50" y="22" width="86" height="28" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
      <text x="93" y="34" textAnchor="middle" fontSize="9" fill="#1e40af" fontWeight="600">Switch A (P)</text>
      <text x="93" y="45" textAnchor="middle" fontSize="8" fill="#1e40af">ON = True</text>
      <line x1="136" y1="36" x2="140" y2="36" stroke="#374151" strokeWidth="2.5"/>

      <rect x="50" y="66" width="86" height="28" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
      <text x="93" y="78" textAnchor="middle" fontSize="9" fill="#1e40af" fontWeight="600">Switch B (Q)</text>
      <text x="93" y="89" textAnchor="middle" fontSize="8" fill="#1e40af">ON = True</text>
      <line x1="136" y1="80" x2="140" y2="80" stroke="#374151" strokeWidth="2.5"/>
    </svg>
  ),
  prop_combo_event: (
    <svg viewBox="0 0 280 150" className="w-full max-w-xs mx-auto" aria-hidden="true">
      <text x="140" y="16" textAnchor="middle" fontSize="10" fill="#374151" fontWeight="700">Entry rule: (Ticket ∧ Age≥18) ∨ VIP pass</text>
      <rect x="8" y="26" width="118" height="50" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
      <text x="67" y="44" textAnchor="middle" fontSize="9" fill="#1e40af" fontWeight="600">Branch 1</text>
      <text x="67" y="57" textAnchor="middle" fontSize="9" fill="#1e40af">Ticket ∧ Age ≥ 18</text>
      <text x="67" y="70" textAnchor="middle" fontSize="9" fill="#1e40af">both must be TRUE</text>

      <rect x="154" y="26" width="118" height="50" rx="8" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5"/>
      <text x="213" y="44" textAnchor="middle" fontSize="9" fill="#9d174d" fontWeight="600">Branch 2</text>
      <text x="213" y="57" textAnchor="middle" fontSize="9" fill="#9d174d">VIP pass</text>
      <text x="213" y="70" textAnchor="middle" fontSize="9" fill="#9d174d">alone is enough</text>

      <text x="140" y="98" textAnchor="middle" fontSize="18" fill="#374151">∨</text>

      <rect x="80" y="112" width="120" height="30" rx="8" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5"/>
      <text x="140" y="132" textAnchor="middle" fontSize="11" fill="#166534" fontWeight="700">✓ Enter</text>

      <path d="M67 76 Q67 100 100 112" stroke="#374151" strokeWidth="1.5" fill="none" strokeDasharray="4,3"/>
      <path d="M213 76 Q213 100 180 112" stroke="#374151" strokeWidth="1.5" fill="none" strokeDasharray="4,3"/>
    </svg>
  ),

  // ── Rating 2 — Propositional Logic ──────────────────────────────────────────
  prop_truth_table_neg_or: (
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
  prop_demorgan_or: (
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
  prop_tautology_excluded_middle: (
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
  prop_demorgan_and: (
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
  prop_demorgan_nested: (
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

  // ── SVG generici mantenuti per futuri argomenti ───────────────────────────
  negation_traffic: (
    <svg viewBox="0 0 280 130" className="w-full max-w-xs mx-auto" aria-hidden="true">
      <rect x="30" y="10" width="80" height="110" rx="12" fill="#1f2937" stroke="#374151" strokeWidth="2"/>
      <circle cx="70" cy="40" r="22" fill="#ef4444"/>
      <circle cx="70" cy="75" r="22" fill="#1f2937" stroke="#4b5563" strokeWidth="1"/>
      <circle cx="70" cy="110" r="22" fill="#1f2937" stroke="#4b5563" strokeWidth="1"/>
      <text x="70" y="40" textAnchor="middle" dominantBaseline="middle" fontSize="16">🔴</text>
      <text x="70" y="130" textAnchor="middle" fontSize="9" fill="#9ca3af">P = "luce verde"</text>

      <text x="155" y="65" textAnchor="middle" fontSize="28" fill="#374151">¬</text>

      <rect x="170" y="10" width="80" height="110" rx="12" fill="#1f2937" stroke="#374151" strokeWidth="2"/>
      <circle cx="210" cy="40" r="22" fill="#1f2937" stroke="#4b5563" strokeWidth="1"/>
      <circle cx="210" cy="75" r="22" fill="#1f2937" stroke="#4b5563" strokeWidth="1"/>
      <circle cx="210" cy="110" r="22" fill="#22c55e"/>
      <text x="210" y="110" textAnchor="middle" dominantBaseline="middle" fontSize="16">🟢</text>
      <text x="210" y="130" textAnchor="middle" fontSize="9" fill="#9ca3af">¬P = "NON luce verde"</text>
    </svg>
  ),
  and_two_keys: (
    <svg viewBox="0 0 280 140" className="w-full max-w-xs mx-auto" aria-hidden="true">
      <rect x="90" y="50" width="100" height="70" rx="10" fill="#78350f" stroke="#92400e" strokeWidth="2"/>
      <circle cx="140" cy="85" r="18" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
      <rect x="133" y="83" width="14" height="24" rx="3" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5"/>
      <text x="140" y="90" textAnchor="middle" fontSize="16">🔒</text>
      <text x="40" y="55" fontSize="20">🗝️</text>
      <text x="40" y="72" fontSize="9" fill="#374151" fontWeight="600">Chiave A</text>
      <path d="M65 55 Q90 55 110 75" stroke="#f59e0b" strokeWidth="2" fill="none" strokeDasharray="4,3"/>
      <text x="195" y="55" fontSize="20">🗝️</text>
      <text x="195" y="72" fontSize="9" fill="#374151" fontWeight="600">Chiave B</text>
      <path d="M205 55 Q190 55 170 75" stroke="#f59e0b" strokeWidth="2" fill="none" strokeDasharray="4,3"/>
      <text x="140" y="135" textAnchor="middle" fontSize="9" fill="#4b5563">P ∧ Q: serve A <tspan fontWeight="700">E</tspan> B per aprire</text>
    </svg>
  ),
  or_switch: (
    <svg viewBox="0 0 280 140" className="w-full max-w-xs mx-auto" aria-hidden="true">
      <circle cx="220" cy="70" r="22" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
      <text x="220" y="70" textAnchor="middle" dominantBaseline="middle" fontSize="20">💡</text>
      <line x1="198" y1="70" x2="160" y2="70" stroke="#374151" strokeWidth="2.5"/>
      <line x1="160" y1="70" x2="130" y2="45" stroke="#374151" strokeWidth="2.5"/>
      <line x1="160" y1="70" x2="130" y2="95" stroke="#374151" strokeWidth="2.5"/>
      <rect x="70" y="30" width="55" height="30" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
      <text x="97" y="49" textAnchor="middle" fontSize="11" fill="#1e40af" fontWeight="600">Interrutt. A</text>
      <rect x="70" y="80" width="55" height="30" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
      <text x="97" y="99" textAnchor="middle" fontSize="11" fill="#1e40af" fontWeight="600">Interrutt. B</text>
      <line x1="70" y1="45" x2="130" y2="45" stroke="#374151" strokeWidth="2.5"/>
      <line x1="70" y1="95" x2="130" y2="95" stroke="#374151" strokeWidth="2.5"/>
      <text x="140" y="130" textAnchor="middle" fontSize="9" fill="#4b5563">P ∨ Q: basta A <tspan fontWeight="700">O</tspan> B per accendere</text>
    </svg>
  ),
  connectives_combo: (
    <svg viewBox="0 0 280 140" className="w-full max-w-xs mx-auto" aria-hidden="true">
      <rect x="10" y="10" width="260" height="120" rx="10" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1.5"/>
      <text x="140" y="32" textAnchor="middle" fontSize="11" fill="#374151" fontWeight="700">Regola ingresso evento:</text>
      <rect x="20" y="42" width="240" height="30" rx="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1"/>
      <text x="140" y="57" textAnchor="middle" fontSize="10" fill="#1e40af">(Biglietto ∧ Età≥18) ∨ VIP_pass</text>
      <text x="140" y="78" textAnchor="middle" fontSize="9" fill="#6b7280">→ se hai biglietto E hai 18 anni: entri</text>
      <text x="140" y="93" textAnchor="middle" fontSize="9" fill="#6b7280">→ oppure: se hai VIP pass entri comunque</text>
      <text x="140" y="108" textAnchor="middle" fontSize="9" fill="#6b7280">La parentesi prima! AND lega più forte di OR</text>
      <text x="140" y="123" textAnchor="middle" fontSize="9" fill="#9ca3af" fontStyle="italic">(come × lega più di + in aritmetica)</text>
    </svg>
  ),
  proposition_lightswitch: (
    <svg viewBox="0 0 280 130" className="w-full max-w-xs mx-auto" aria-hidden="true">
      <rect x="10" y="10" width="120" height="110" rx="16" fill="#f0fdf4" stroke="#86efac" strokeWidth="2"/>
      <rect x="40" y="30" width="60" height="70" rx="10" fill="#fff" stroke="#d1d5db" strokeWidth="1.5"/>
      <rect x="52" y="42" width="36" height="22" rx="6" fill="#22c55e"/>
      <circle cx="70" cy="53" r="8" fill="#fff"/>
      <text x="70" y="90" textAnchor="middle" fontSize="11" fill="#166534" fontWeight="700">Vero (T)</text>
      <text x="70" y="105" textAnchor="middle" fontSize="9" fill="#4b5563">luce accesa</text>

      <rect x="150" y="10" width="120" height="110" rx="16" fill="#fef2f2" stroke="#fca5a5" strokeWidth="2"/>
      <rect x="180" y="30" width="60" height="70" rx="10" fill="#fff" stroke="#d1d5db" strokeWidth="1.5"/>
      <rect x="192" y="66" width="36" height="22" rx="6" fill="#ef4444"/>
      <circle cx="210" cy="77" r="8" fill="#fff"/>
      <text x="210" y="90" textAnchor="middle" fontSize="11" fill="#991b1b" fontWeight="700">Falso (F)</text>
      <text x="210" y="105" textAnchor="middle" fontSize="9" fill="#4b5563">luce spenta</text>
    </svg>
  ),
  truth_table_and: (
    <svg viewBox="0 0 280 150" className="w-full max-w-xs mx-auto" aria-hidden="true">
      <rect x="10" y="10" width="260" height="130" rx="8" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1.5"/>
      <text x="55" y="32" fontSize="11" fill="#6b7280" fontWeight="700">P</text>
      <text x="120" y="32" fontSize="11" fill="#6b7280" fontWeight="700">Q</text>
      <text x="185" y="32" fontSize="11" fill="#6b7280" fontWeight="700">P ∧ Q</text>
      <line x1="20" y1="38" x2="265" y2="38" stroke="#e5e7eb" strokeWidth="1"/>
      {[
        {p:'T',q:'T',r:'T',rc:'#16a34a'},
        {p:'T',q:'F',r:'F',rc:'#dc2626'},
        {p:'F',q:'T',r:'F',rc:'#dc2626'},
        {p:'F',q:'F',r:'F',rc:'#dc2626'},
      ].map(({p,q,r,rc},i)=>(
        <g key={i}>
          <text x="55" y={57+i*24} fontSize="13" fill="#374151" fontFamily="monospace">{p}</text>
          <text x="120" y={57+i*24} fontSize="13" fill="#374151" fontFamily="monospace">{q}</text>
          <text x="188" y={57+i*24} fontSize="14" fill={rc} fontWeight="700" fontFamily="monospace">{r}</text>
        </g>
      ))}
      <rect x="170" y="44" width="80" height="22" rx="4" fill="#dcfce7" stroke="#86efac" strokeWidth="1"/>
      <text x="252" y="58" fontSize="9" fill="#16a34a" fontWeight="600">← solo T∧T=T</text>
    </svg>
  ),
  vending_machine: (
    <svg viewBox="0 0 280 150" className="w-full max-w-xs mx-auto" aria-hidden="true">
      <rect x="80" y="10" width="120" height="130" rx="12" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2"/>
      <rect x="95" y="25" width="90" height="55" rx="6" fill="#fff" stroke="#93c5fd" strokeWidth="1.5"/>
      <text x="140" y="48" textAnchor="middle" fontSize="20">🥤</text>
      <text x="140" y="68" textAnchor="middle" fontSize="9" fill="#1e40af">prodotto</text>
      <rect x="100" y="92" width="80" height="22" rx="6" fill="#fef3c7" stroke="#fcd34d" strokeWidth="1.5"/>
      <text x="140" y="107" textAnchor="middle" fontSize="10" fill="#92400e">inserisci moneta</text>
      <text x="20" y="55" fontSize="9" fill="#374151" fontWeight="600">P = moneta</text>
      <text x="20" y="70" fontSize="9" fill="#374151">inserita</text>
      <text x="185" y="55" fontSize="9" fill="#374151" fontWeight="600">Q = bevanda</text>
      <text x="185" y="70" fontSize="9" fill="#374151">erogata</text>
      <text x="140" y="148" textAnchor="middle" fontSize="9" fill="#6b7280">P → Q: solo falso se P=T e Q=F</text>
    </svg>
  ),
  group_chat: (
    <svg viewBox="0 0 280 140" className="w-full max-w-xs mx-auto" aria-hidden="true">
      <rect x="10" y="10" width="260" height="120" rx="12" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5"/>
      <circle cx="50" cy="45" r="18" fill="#fde68a" stroke="#f59e0b" strokeWidth="2"/>
      <circle cx="100" cy="45" r="18" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2"/>
      <circle cx="150" cy="45" r="18" fill="#fce7f3" stroke="#ec4899" strokeWidth="2"/>
      <circle cx="200" cy="45" r="18" fill="#d1fae5" stroke="#10b981" strokeWidth="2"/>
      <text x="50" y="50" textAnchor="middle" fontSize="14">😀</text>
      <text x="100" y="50" textAnchor="middle" fontSize="14">😊</text>
      <text x="150" y="50" textAnchor="middle" fontSize="14">🙂</text>
      <text x="200" y="50" textAnchor="middle" fontSize="14">😄</text>
      <rect x="20" y="78" width="240" height="22" rx="6" fill="#dcfce7" stroke="#86efac" strokeWidth="1"/>
      <text x="140" y="93" textAnchor="middle" fontSize="10" fill="#166534" fontWeight="600">∀x: tutti hanno letto il messaggio</text>
      <rect x="20" y="108" width="240" height="22" rx="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1"/>
      <text x="140" y="123" textAnchor="middle" fontSize="10" fill="#1e40af" fontWeight="600">∃x: almeno uno ha risposto</text>
    </svg>
  ),
  proof_chain: (
    <svg viewBox="0 0 280 130" className="w-full max-w-xs mx-auto" aria-hidden="true">
      <rect x="10" y="20" width="60" height="30" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5"/>
      <text x="40" y="39" textAnchor="middle" fontSize="10" fill="#1e40af" fontWeight="600">Ipotesi</text>
      <path d="M70 35 L100 35" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arr2)"/>
      <rect x="100" y="20" width="60" height="30" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5"/>
      <text x="130" y="39" textAnchor="middle" fontSize="10" fill="#92400e" fontWeight="600">Passo 1</text>
      <path d="M160 35 L190 35" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arr2)"/>
      <rect x="190" y="20" width="60" height="30" rx="6" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5"/>
      <text x="220" y="39" textAnchor="middle" fontSize="10" fill="#166534" fontWeight="600">Tesi ✓</text>
      <text x="40" y="80" textAnchor="middle" fontSize="9" fill="#6b7280">Assioma</text>
      <text x="130" y="80" textAnchor="middle" fontSize="9" fill="#6b7280">Teorema noto</text>
      <text x="220" y="80" textAnchor="middle" fontSize="9" fill="#6b7280">Dimostrato</text>
      <line x1="40" y1="50" x2="40" y2="68" stroke="#d1d5db" strokeWidth="1" strokeDasharray="3,2"/>
      <line x1="130" y1="50" x2="130" y2="68" stroke="#d1d5db" strokeWidth="1" strokeDasharray="3,2"/>
      <line x1="220" y1="50" x2="220" y2="68" stroke="#d1d5db" strokeWidth="1" strokeDasharray="3,2"/>
      <defs>
        <marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M1 1 L7 4 L1 7" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </marker>
      </defs>
    </svg>
  ),
  sets_numbers: (
    <svg viewBox="0 0 280 130" className="w-full max-w-xs mx-auto" aria-hidden="true">
      <rect x="10" y="15" width="260" height="90" rx="14" fill="#f0fdf4" stroke="#86efac" strokeWidth="2"/>
      <rect x="25" y="28" width="230" height="64" rx="10" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5"/>
      <rect x="42" y="38" width="180" height="44" rx="8" fill="#fef3c7" stroke="#fcd34d" strokeWidth="1.5"/>
      <rect x="60" y="47" width="130" height="26" rx="6" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="1.5"/>
      <rect x="78" y="52" width="80" height="16" rx="4" fill="#e0e7ff" stroke="#a5b4fc" strokeWidth="1.5"/>
      <text x="118" y="63" textAnchor="middle" fontSize="9" fill="#3730a3" fontWeight="700">ℕ</text>
      <text x="155" y="63" textAnchor="middle" fontSize="8" fill="#831843">ℤ</text>
      <text x="175" y="68" textAnchor="middle" fontSize="8" fill="#78350f">ℚ</text>
      <text x="228" y="68" textAnchor="middle" fontSize="8" fill="#166534">ℝ</text>
      <text x="140" y="115" textAnchor="middle" fontSize="9" fill="#4b5563">ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ  —  √2 ∈ ℝ ma √2 ∉ ℚ</text>
    </svg>
  ),
  quantifiers_all_some: (
    <svg viewBox="0 0 280 140" className="w-full max-w-xs mx-auto" aria-hidden="true">
      <ellipse cx="95" cy="70" rx="75" ry="55" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <ellipse cx="185" cy="70" rx="75" ry="55" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
      <ellipse cx="95" cy="70" rx="40" ry="30" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
      <text x="60" y="55" fontSize="11" fill="#92400e" fontWeight="600">∀x P(x)</text>
      <text x="50" y="72" fontSize="10" fill="#78350f">all elements</text>
      <text x="48" y="87" fontSize="10" fill="#78350f">satisfy P</text>
      <text x="155" y="55" fontSize="11" fill="#1e40af" fontWeight="600">∃x P(x)</text>
      <text x="152" y="72" fontSize="10" fill="#1e3a8a">at least one</text>
      <text x="155" y="87" fontSize="10" fill="#1e3a8a">satisfies P</text>
      <circle cx="185" cy="90" r="5" fill="#3b82f6" />
      <text x="195" y="94" fontSize="9" fill="#1e40af">one is enough</text>
    </svg>
  ),
  implication_arrow: (
    <svg viewBox="0 0 300 150" className="w-full max-w-xs mx-auto" aria-hidden="true">
      <rect x="10" y="10" width="280" height="130" rx="8" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1.5" />
      <text x="30" y="35" fontSize="11" fill="#6b7280" fontWeight="700">P</text>
      <text x="100" y="35" fontSize="11" fill="#6b7280" fontWeight="700">Q</text>
      <text x="170" y="35" fontSize="11" fill="#6b7280" fontWeight="700">P → Q</text>
      <line x1="20" y1="42" x2="280" y2="42" stroke="#e5e7eb" strokeWidth="1" />
      {[
        { p: 'T', q: 'T', r: 'T', rc: '#16a34a' },
        { p: 'T', q: 'F', r: 'F', rc: '#dc2626' },
        { p: 'F', q: 'T', r: 'T', rc: '#16a34a' },
        { p: 'F', q: 'F', r: 'T', rc: '#16a34a' },
      ].map(({ p, q, r, rc }, i) => (
        <g key={i}>
          <text x="30" y={62 + i * 24} fontSize="13" fill="#374151" fontFamily="monospace">{p}</text>
          <text x="100" y={62 + i * 24} fontSize="13" fill="#374151" fontFamily="monospace">{q}</text>
          <text x="175" y={62 + i * 24} fontSize="14" fill={rc} fontWeight="700" fontFamily="monospace">{r}</text>
        </g>
      ))}
      <rect x="155" y="73" width="100" height="22" rx="4" fill="#fee2e2" stroke="#fca5a5" strokeWidth="1" />
      <text x="260" y="87" fontSize="9" fill="#dc2626" fontWeight="600">← only false case</text>
    </svg>
  ),
  sets_venn: (
    <svg viewBox="0 0 300 150" className="w-full max-w-xs mx-auto" aria-hidden="true">
      <ellipse cx="95" cy="75" rx="70" ry="50" fill="#dbeafe" fillOpacity="0.7" stroke="#3b82f6" strokeWidth="2" />
      <ellipse cx="185" cy="75" rx="70" ry="50" fill="#fce7f3" fillOpacity="0.7" stroke="#ec4899" strokeWidth="2" />
      <text x="52" y="72" fontSize="12" fill="#1e40af" fontWeight="700">A</text>
      <text x="230" y="72" fontSize="12" fill="#9d174d" fontWeight="700">B</text>
      <text x="128" y="65" fontSize="9" fill="#4b5563" fontWeight="600">A∩B</text>
      <text x="20" y="120" fontSize="9" fill="#1e40af">A only: A\B</text>
      <text x="190" y="120" fontSize="9" fill="#9d174d">B only: B\A</text>
      <text x="100" y="135" fontSize="9" fill="#374151">A∪B = everything shown</text>
    </svg>
  ),
  number_line: (
    <svg viewBox="0 0 300 130" className="w-full max-w-xs mx-auto" aria-hidden="true">
      <rect x="10" y="15" width="280" height="55" rx="12" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
      <rect x="25" y="25" width="250" height="35" rx="9" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" />
      <rect x="45" y="33" width="200" height="20" rx="6" fill="#fef3c7" stroke="#fcd34d" strokeWidth="1.5" />
      <rect x="70" y="38" width="140" height="10" rx="4" fill="#fce7f3" stroke="#f9a8d4" strokeWidth="1.5" />
      <text x="75" y="47" fontSize="8" fill="#831843" fontWeight="700">N</text>
      <text x="48" y="52" fontSize="8" fill="#78350f" fontWeight="700">Z</text>
      <text x="27" y="57" fontSize="8" fill="#1e40af" fontWeight="700">Q</text>
      <text x="12" y="62" fontSize="8" fill="#166534" fontWeight="700">R</text>
      <text x="60" y="90" fontSize="9" fill="#4b5563">N ⊂ Z ⊂ Q ⊂ R</text>
      <text x="30" y="108" fontSize="8" fill="#6b7280">√2, π ∈ R but ∉ Q (irrational)</text>
    </svg>
  ),
};

type QuestionSlide = {
  question: string;
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
}: {
  slide: QuestionSlide;
  isRetry: boolean;
  onCorrect: () => void;
  onWrong: () => void;
  onNext: () => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const isCorrect = answered && selected === slide.correct;

  function handleSelect(i: number) {
    if (answered) return;
    setSelected(i);
    if (i === slide.correct) onCorrect();
    else onWrong();
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
      {isRetry && (
        <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
          Similar question — try again
        </p>
      )}
      {slide.svgKey && VISUALS[slide.svgKey] && (
        <div>{VISUALS[slide.svgKey]}</div>
      )}
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{slide.question}</p>
      <div className="space-y-2">
        {slide.options.map((opt, i) => {
          const isCorrectOpt = i === slide.correct;
          const isSelectedOpt = selected === i;
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
            <button key={i} disabled={answered} onClick={() => handleSelect(i)} className={cls}>
              <span className="font-mono text-xs mr-2 opacity-50">{String.fromCharCode(65 + i)}.</span>
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
  isCompleted,
  onComplete,
  onAllDone,
}: {
  topic: StudyPlanTopic;
  isCompleted: (id: string) => boolean;
  onComplete: (id: string) => void;
  onAllDone: () => void;
}) {
  const exercises = topic.exercises;

  const initialStep = () => {
    const first = exercises.findIndex(e => !isCompleted(e.id));
    return first === -1 ? exercises.length : first;
  };

  const [stepIndex, setStepIndex] = useState(initialStep);
  // retryCount: how many wrong answers on the current exercise (resets per exercise)
  const [retryCount, setRetryCount] = useState(0);
  // retryIndex: which retry question to show next (never resets, cycles through pool)
  const [retryIndex, setRetryIndex] = useState(0);
  // phase: 'main' | 'retry' | 'advance' — what we're currently showing
  const [phase, setPhase] = useState<'main' | 'retry'>('main');

  const currentExercise = exercises[stepIndex] ?? null;

  function advance() {
    const next = stepIndex + 1;
    setStepIndex(next);
    setRetryCount(0);
    setPhase('main');
  }

  if (!currentExercise) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-green-300 dark:border-green-700 p-6 text-center space-y-2">
        <p className="text-2xl">🎉</p>
        <p className="text-sm font-semibold text-green-700 dark:text-green-300">Topic completed!</p>
        <button
          onClick={onAllDone}
          className="mt-2 px-4 py-2 rounded-xl bg-green-500 hover:bg-green-400 text-white text-sm font-semibold transition-colors"
        >
          Back to map
        </button>
      </div>
    );
  }

  const retryPool = currentExercise.retry;

  const slide: QuestionSlide = phase === 'retry'
    ? {
        question: retryPool[retryIndex % retryPool.length].question,
        svgKey: retryPool[retryIndex % retryPool.length].svgKey,
        options: retryPool[retryIndex % retryPool.length].options,
        correct: retryPool[retryIndex % retryPool.length].correct,
        explanation: retryPool[retryIndex % retryPool.length].explanation,
      }
    : {
        question: currentExercise.question,
        svgKey: currentExercise.svgKey,
        options: currentExercise.options,
        correct: currentExercise.correct,
        explanation: currentExercise.explanation,
      };

  function handleCorrect() {
    onComplete(currentExercise.id);
  }

  // called when user clicks the wrong-answer button ("Try a similar question →")
  function handleWrong() {}

  function handleNext() {
    if (isCompleted(currentExercise.id)) {
      // correct answer was given — just advance
      advance();
    } else {
      // wrong answer — check retry budget
      const newCount = retryCount + 1;
      if (newCount >= 2) {
        // used up 2 retries: mark done and advance
        onComplete(currentExercise.id);
        advance();
      } else {
        setRetryCount(newCount);
        setRetryIndex(i => i + 1);
        setPhase('retry');
      }
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{topic.label}</p>
        <p className="text-xs text-gray-400">{Math.min(stepIndex + 1, exercises.length)} / {exercises.length}</p>
      </div>
      <QuestionCard
        key={`${stepIndex}-${phase}-${retryIndex}`}
        slide={slide}
        isRetry={phase === 'retry'}
        onCorrect={handleCorrect}
        onWrong={handleWrong}
        onNext={handleNext}
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
  const { markComplete, isCompleted } = useExercises();

  const [searchParams] = useSearchParams();
  const [activeTopicIndex, setActiveTopicIndex] = useState<number | null>(null);

  const section = sectionId ? SECTION_MAP[sectionId] : undefined;

  const sectionRating = section
    ? section.topics.map((t) => data.ratings[t.id] ?? 0).find((r) => r > 0) ?? 0
    : 0;

  const queryRating = Number(searchParams.get('rating'));
  const displayRating = (queryRating >= 1 && queryRating <= 5 ? queryRating : sectionRating > 0 ? sectionRating : 1) as 1 | 2 | 3 | 4 | 5;
  const plan = sectionId ? getStudyPlanForSection(sectionId, displayRating) : undefined;
  const hasAnyPlan = sectionId ? hasSectionPlan(sectionId) : false;

  function isTopicDone(topic: StudyPlanTopic) {
    return topic.exercises.length > 0 && topic.exercises.every(e => isCompleted(e.id));
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

  const activeTopic = activeTopicIndex !== null && plan?.topics ? plan.topics[activeTopicIndex] : null;

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
            {!activeTopic && plan.topics && plan.topics.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <TopicMap
                  topics={plan.topics}
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
                isCompleted={isCompleted}
                onComplete={markComplete}
                onAllDone={() => setActiveTopicIndex(null)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
