import type { StudyPlan } from './types';

export const sectionPlans: StudyPlan[] = [

  // ══════════════════════════════════════════════
  // PREREQUISITI
  // ══════════════════════════════════════════════
  { topicId: 'prerequisiti', rating: 1, timeEstimate: '6–8 ore', priority: 'critical',
    label: 'Fondamenta mancanti',
    whatYouNeed: 'Rivedere dall\'inizio logica (∀∃, implicazione, contronominale), insiemi e operazioni su ℝ, funzioni (dominio, iniettività, composizione, inversa), valore assoluto, potenze, esponenziali, logaritmi e funzioni trigonometriche.',
    approach: [
      'Inizia dalla logica: capire ∀ e ∃, come si negano, e la differenza tra P→Q e la sua conversa',
      'Studia il valore assoluto con la definizione |x| = x se x≥0, -x se x<0, e risolvere |x-a|<b',
      'Ripassa le funzioni: dominio, codominio, immagine, iniettività/suriettività, funzione composta f∘g',
      'Ripasssa esponenziale e logaritmo: proprietà, grafico, regole di calcolo (ln(ab)=ln a+ln b, ecc.)',
      'Studia le funzioni trigonometriche: sin, cos, tan e i valori notevoli (0°, 30°, 45°, 60°, 90°)',
      'Fai 15–20 esercizi misti su disuguaglianze, valore assoluto e dominio di funzioni',
    ],
    keyPoints: [
      '¬(∀x P(x)) = ∃x ¬P(x); ¬(∃x P(x)) = ∀x ¬P(x)',
      'P→Q è falsa SOLO quando P è vera e Q è falsa',
      '|x| < r ⟺ -r < x < r; |x| > r ⟺ x < -r o x > r',
      'log_a(xy) = log_a x + log_a y; log_a(x^n) = n·log_a x',
      'sin²x + cos²x = 1; identità di addizione per sin e cos',
    ],
    commonMistakes: [
      'Confondere P→Q con Q→P (solo il contronominale ¬Q→¬P è equivalente)',
      'Dimenticare che log è definito solo per argomenti positivi',
      'Invertire le regole di negazione dei quantificatori',
      'Sbagliare il dominio di funzioni composte (verificare che l\'output del g sia nel dominio di f)',
    ],
    exercises: [
      'Negare: "Per ogni x reale, se x>1 allora x²>1"',
      'Risolvere |2x-3| ≤ 5 e disegnare la soluzione sulla retta',
      'Trovare il dominio di f(x) = ln(x²-4) / √(1-x)',
      'Calcolare sin(π/4 + π/6) usando le formule di addizione',
    ],
    nextStep: 'Una volta consolidate le basi, affronta i Numeri reali (sup, inf, induzione).' },

  { topicId: 'prerequisiti', rating: 2, timeEstimate: '3–4 ore', priority: 'high',
    label: 'Basi instabili',
    whatYouNeed: 'Conosci i concetti di base ma commetti errori su valore assoluto, disuguaglianze, funzioni composte o inverse. Ripassare i punti deboli in modo mirato.',
    approach: [
      'Identifica dove hai perso punti nel quiz: logica? valore assoluto? trigonometria?',
      'Rivedi il valore assoluto: casi da considerare e risoluzione di equazioni/disuguaglianze',
      'Ripassa la funzione composta e la funzione inversa: come trovarla e quando esiste',
      'Studia le identità trigonometriche fondamentali e i valori su tutto il cerchio goniometrico',
      'Fai 10 esercizi mirati sui punti deboli identificati',
    ],
    keyPoints: [
      'f∘g(x) = f(g(x)): prima si applica g, poi f',
      'f⁻¹ esiste ⟺ f è biettiva; (f⁻¹)\'(y) = 1/f\'(f⁻¹(y))',
      'aˣ e log_a x sono inverse l\'una dell\'altra: a^(log_a x) = x',
      'Il cerchio goniometrico: sin e cos in tutti e 4 i quadranti',
    ],
    commonMistakes: [
      'Applicare la composizione nell\'ordine sbagliato',
      'Dimenticare le condizioni di esistenza (dominio) quando si compongono funzioni',
      'Confondere tan con sin/cos nei calcoli trigonometrici',
    ],
    exercises: [
      'Trovare f⁻¹ di f(x) = 2eˣ - 1 e verificare che f(f⁻¹(y)) = y',
      'Risolvere: |x² - 3x| = x',
      'Dati f(x) = x² e g(x) = ln x, calcolare (f∘g)(x) e (g∘f)(x) e i loro domini',
    ],
    nextStep: 'Porta i prerequisiti a 3★ con un ripasso sistematico, poi potrai affrontare analisi con basi solide.' },

  { topicId: 'prerequisiti', rating: 3, timeEstimate: '1–2 ore', priority: 'medium',
    label: 'Discreto – qualche lacuna',
    whatYouNeed: 'Padronanza discreta, ma qualche incertezza su dimostrazioni (per assurdo, contronominale), su trasformazioni di funzioni o su formule trigonometriche meno comuni.',
    approach: [
      'Rivedi le tecniche di dimostrazione: diretta, per assurdo, per contronominale',
      'Ripassa le formule di addizione e duplicazione delle funzioni trigonometriche',
      'Esercitati su funzioni: grafico di f(|x|), |f(x)|, f(x+c), kf(x)',
      'Fai 5 esercizi misti di livello medio su tutto il capitolo',
    ],
    keyPoints: [
      'Dim. per assurdo: assumere ¬P e derivare contraddizione',
      'Dim. per induzione: base + passo induttivo (P(n)→P(n+1))',
      'sin(2x) = 2sin(x)cos(x); cos(2x) = cos²x - sin²x',
    ],
    commonMistakes: [
      'Nella dim. per assurdo, non identificare la contraddizione in modo esplicito',
      'Sbagliare il grafico di |f(x)| (riflettere la parte negativa, non modificare la positiva)',
    ],
    exercises: [
      'Dimostrare per assurdo che √2 è irrazionale',
      'Dimostrare per induzione: 1+2+…+n = n(n+1)/2',
      'Tracciare il grafico di f(x) = |sin x| e g(x) = sin|x|',
    ],
    nextStep: 'Con 3★ i prerequisiti sono sufficienti per la maggior parte di Analisi 1. Mira a 4★ prima dell\'esame.' },

  { topicId: 'prerequisiti', rating: 4, timeEstimate: '30 min', priority: 'low',
    label: 'Quasi pronta',
    whatYouNeed: 'Ottima padronanza. Solo un ripasso rapido degli aspetti più sottili: quantificatori annidati, formule di composizione avanzata, identità trigonometriche meno note.',
    approach: [
      'Rivedi gli enunciati formali con quantificatori annidati (∀ε>0, ∃δ>0: …)',
      'Verifica di saper usare fluentemente log e exp in calcoli di limiti',
      'Controlla la padronanza delle formule trigonometriche prodotto-somma',
    ],
    keyPoints: ['La definizione ε-δ di limite usa quantificatori annidati: devi leggerli fluidamente'],
    commonMistakes: ['Essere imprecisi sull\'ordine dei quantificatori in enunciati complessi'],
    exercises: ['Scrivi la negazione formale della definizione di limite lim_{x→a} f(x) = L'],
    nextStep: 'Argomento praticamente padroneggiato. Concentrati sugli argomenti di analisi.' },

  { topicId: 'prerequisiti', rating: 5, timeEstimate: '10 min', priority: 'low',
    label: 'Mantenimento',
    whatYouNeed: 'Padronanza completa. Usa questi strumenti come base per tutti gli altri argomenti.',
    approach: ['Sfoglia rapidamente le formule di exp, log e trig prima dell\'esame'],
    keyPoints: ['Nessun gap da colmare'],
    commonMistakes: [],
    exercises: ['Scrivi a memoria le 5 formule trigonometriche che usi più spesso in analisi'],
    nextStep: 'Mantieni e usa questa competenza come fondamento per tutto il corso.' },


  // ══════════════════════════════════════════════
  // NUMERI REALI
  // ══════════════════════════════════════════════
  { topicId: 'numeri_reali', rating: 1, timeEstimate: '4–5 ore', priority: 'critical',
    label: 'Partire da zero',
    whatYouNeed: 'Capire la struttura di ℝ: assioma di completezza, maggiorante/minorante, estremo superiore e inferiore, principio di induzione e uso del valore assoluto nelle disuguaglianze.',
    approach: [
      'Studia la gerarchia ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ e capisci perché ℝ è "completo" (senza buchi)',
      'Definisci maggiorante, minorante, sup e inf: non devono necessariamente appartenere all\'insieme',
      'Studia l\'assioma di completezza: ogni insieme non vuoto e superiormente limitato ha il sup in ℝ',
      'Studia il principio di induzione: base (n=1) e passo induttivo P(n)→P(n+1)',
      'Esercitati su disuguaglianze con valore assoluto: |x-a| < δ come "distanza da a inferiore a δ"',
    ],
    keyPoints: [
      'sup A = minimo dei maggioranti (può non stare in A); max A ∈ A',
      'ℝ è completo: ogni successione di Cauchy converge in ℝ',
      'Principio di induzione: verificare P(1) e P(n)⟹P(n+1) implica P(n) per ogni n∈ℕ',
      '|x-a| < δ ⟺ a-δ < x < a+δ (intorno di a di raggio δ)',
    ],
    commonMistakes: [
      'Confondere sup con max: il sup potrebbe non appartenere all\'insieme',
      'Nel principio di induzione, dimenticare di dimostrare il passo induttivo in modo rigoroso',
      'Confondere "superiormente limitato" con "finito"',
    ],
    exercises: [
      'Trovare sup e inf di A = {1/n : n∈ℕ} e stabilire se sono max/min',
      'Dimostrare per induzione: 1² + 2² + … + n² = n(n+1)(2n+1)/6',
      'Risolvere |x² - 4| < 3 trovando tutti gli x che soddisfano la disuguaglianza',
    ],
    nextStep: 'Una volta capita la struttura di ℝ, affrontare le successioni diventa naturale.' },

  { topicId: 'numeri_reali', rating: 2, timeEstimate: '2–3 ore', priority: 'high',
    label: 'Basi instabili',
    whatYouNeed: 'Hai le idee di base ma ti inceppi nel calcolare sup/inf di insiemi non banali, o nel dimostrare per induzione.',
    approach: [
      'Ripassa la definizione di sup tramite la caratterizzazione: s = sup A ⟺ (1) s è maggiorante, (2) ∀ε>0 ∃a∈A: a > s-ε',
      'Esercitati a trovare sup/inf di insiemi definiti da parametri o da equazioni',
      'Fai 3 dimostrazioni per induzione di complessità crescente',
    ],
    keyPoints: [
      'Caratterizzazione del sup: s = sup A ⟺ s ≥ a ∀a∈A e ∀ε>0 ∃a∈A: a > s-ε',
      'inf A = -sup(-A) dove -A = {-a : a∈A}',
    ],
    commonMistakes: [
      'Trovare un maggiorante senza verificare che sia il minimo dei maggioranti',
      'Dimenticare la proprietà di approssimazione del sup (punto 2 della caratterizzazione)',
    ],
    exercises: [
      'Dimostrare che sup{x∈ℚ : x²<2} = √2 usando la caratterizzazione',
      'Trovare sup e inf di {(-1)^n + 1/n : n∈ℕ}',
    ],
    nextStep: 'Consolida il concetto di sup/inf, tornerà fondamentale nelle successioni e negli integrali.' },

  { topicId: 'numeri_reali', rating: 3, timeEstimate: '1 ora', priority: 'medium',
    label: 'Discreto – da consolidare',
    whatYouNeed: 'Discreta comprensione, ma qualche incertezza su completezza di ℝ, numeri complessi o dimostrazioni più elaborate.',
    approach: [
      'Rivedi la dimostrazione del teorema di Bolzano-Weierstrass (ogni successione limitata ha estratta convergente)',
      'Se non conosci i numeri complessi: studia forma algebrica, modulo e argomento',
      'Fai 3–4 esercizi su sup/inf di insiemi parametrici',
    ],
    keyPoints: [
      'ℝ è il completamento di ℚ: ogni buco in ℚ è "tappato" da un irrazionale',
      'Numeri complessi: z = a+bi, |z| = √(a²+b²), z̄ = a-bi',
    ],
    commonMistakes: ['Usare la completezza di ℝ senza citarla esplicitamente nelle dimostrazioni'],
    exercises: ['Trovare sup, inf, max, min di {n/(n+1) : n∈ℕ} con dimostrazione'],
    nextStep: 'Argomento in buona forma. Approfondisci con qualche dimostrazione formale per arrivare a 4★.' },

  { topicId: 'numeri_reali', rating: 4, timeEstimate: '20 min', priority: 'low',
    label: 'Quasi pronta',
    whatYouNeed: 'Ottima padronanza. Ripassare solo le dimostrazioni chiave per l\'orale.',
    approach: ['Spiega a voce la definizione di sup e la sua caratterizzazione', 'Ripassa la densità di ℚ in ℝ'],
    keyPoints: ['Tra due reali qualsiasi esiste sempre un razionale (densità di ℚ)'],
    commonMistakes: ['Confondere "chiuso" con "limitato" in contesti di completezza'],
    exercises: ['Dimostrare che tra due reali a < b esiste un razionale'],
    nextStep: 'Argomento padroneggiato. Usalo come fondamento per successioni e serie.' },

  { topicId: 'numeri_reali', rating: 5, timeEstimate: '10 min', priority: 'low',
    label: 'Mantenimento',
    whatYouNeed: 'Padronanza completa.',
    approach: ['Ripasso veloce delle proprietà di completezza prima dell\'esame'],
    keyPoints: ['Nessun gap da colmare'],
    commonMistakes: [],
    exercises: ['Enuncia l\'assioma di completezza di ℝ e dai un esempio del perché ℚ non è completo'],
    nextStep: 'Mantieni questa competenza come fondamento per tutto il corso.' },


  // ══════════════════════════════════════════════
  // SUCCESSIONI
  // ══════════════════════════════════════════════
  { topicId: 'successioni', rating: 1, timeEstimate: '5–6 ore', priority: 'critical',
    label: 'Partire da zero',
    whatYouNeed: 'Capire cos\'è una successione, come si calcola il limite, cosa vuol dire convergere/divergere, e i principali teoremi (monotonia, carabinieri, Cauchy).',
    approach: [
      'Definisci successione come funzione a:ℕ→ℝ; scrivi i primi termini di esempi semplici',
      'Studia la definizione di limite di successione: aₙ→L ⟺ ∀ε>0 ∃N: n>N ⟹ |aₙ-L|<ε',
      'Impara i casi: convergente (L∈ℝ), divergente a +∞, divergente a -∞, indeterminata',
      'Studia il teorema delle successioni monotone: monotona + limitata ⟹ convergente',
      'Studia il numero e = lim(1+1/n)^n e il teorema dei carabinieri',
      'Fai 10 esercizi di calcolo di limiti di successioni (razionali, con radicali, con esponenziali)',
    ],
    keyPoints: [
      'aₙ→L ⟺ ∀ε>0 ∃N∈ℕ: n>N ⟹ |aₙ-L|<ε',
      'Monotona crescente + superiormente limitata ⟹ converge al sup',
      'bₙ ≤ aₙ ≤ cₙ e bₙ,cₙ→L ⟹ aₙ→L (carabinieri)',
      'e = lim_{n→∞}(1+1/n)^n ≈ 2,718',
    ],
    commonMistakes: [
      'Confondere il limite della successione con il valore del termine ennesimo',
      'Applicare i carabinieri senza verificare che le due successioni esterne abbiano lo stesso limite',
      'Dimenticare di verificare la monotonia prima di applicare il teorema',
    ],
    exercises: [
      'Calcolare lim_{n→∞} (3n² - 2n)/(n² + 5n)',
      'Dimostrare con la definizione ε-N che lim(2/n) = 0',
      'Studiare la successione aₙ = (1 + 2/n)^n e trovarne il limite',
      'Usare i carabinieri per mostrare che lim sin(n)/n = 0',
    ],
    nextStep: 'Con le successioni solide, i limiti di funzioni diventano molto più accessibili.' },

  { topicId: 'successioni', rating: 2, timeEstimate: '2–3 ore', priority: 'high',
    label: 'Basi instabili',
    whatYouNeed: 'Sai calcolare limiti semplici ma ti inceppi su forme indeterminate (∞-∞, ∞/∞, 0·∞), o sul teorema di Cauchy, o sulla stima del numero e.',
    approach: [
      'Ripassa le forme indeterminate per successioni: dividi per il termine dominante',
      'Studia la successione di Cauchy: {aₙ} è di Cauchy ⟺ ∀ε>0 ∃N: m,n>N ⟹ |aₙ-aₘ|<ε',
      'In ℝ: successione di Cauchy ⟺ convergente (criterio fondamentale)',
      'Fai 8 esercizi su limiti di successioni con forme indeterminate',
    ],
    keyPoints: [
      'Forma ∞/∞: dividere numeratore e denominatore per il termine di grado massimo',
      'Una successione convergente è sempre di Cauchy, e viceversa in ℝ',
      'lim n^(1/n) = 1; lim (ln n)/n = 0',
    ],
    commonMistakes: [
      'Non dividere per il termine dominante nelle forme ∞/∞',
      'Confondere successione limitata con successione convergente (limitata ≠ convergente)',
    ],
    exercises: [
      'Calcolare lim_{n→∞} (n³ - 2n)/(3n³ + n² - 1)',
      'Calcolare lim_{n→∞} (√(n²+n) - n)',
      'Dimostrare che aₙ = 1/n è di Cauchy usando la definizione',
    ],
    nextStep: 'Consolida i limiti di successioni; la stessa logica si applica ai limiti di funzioni.' },

  { topicId: 'successioni', rating: 3, timeEstimate: '1–2 ore', priority: 'medium',
    label: 'Discreto – da affinare',
    whatYouNeed: 'Buona padronanza dei limiti base, da approfondire su Cauchy, sottosuccessioni e dimostrazioni formali.',
    approach: [
      'Studia il teorema di Bolzano-Weierstrass: ogni successione limitata ha una sottosuccessione convergente',
      'Esercitati con limiti di successioni definite ricorsivamente (es. a₁=1, aₙ₊₁=√(2+aₙ))',
      'Fai 3 dimostrazioni formali usando la definizione ε-N',
    ],
    keyPoints: [
      'Sottosuccessione di aₙ: una sequenza aₙₖ con n₁<n₂<… che "estrae" termini da aₙ',
      'Se aₙ converge a L, ogni sottosuccessione converge a L',
    ],
    commonMistakes: ['Confondere la convergenza di una sottosuccessione con quella dell\'intera successione'],
    exercises: [
      'Data aₙ = (-1)^n, trovare due sottosuccessioni con limiti diversi e concludere sulla convergenza di aₙ',
      'Studiare aₙ definita da a₁=2, aₙ₊₁=(aₙ+6/aₙ)/2 (monotona? limitata? limite?)',
    ],
    nextStep: 'Argomento in buona forma. Approfondisci con le serie numeriche o i limiti di funzioni.' },

  { topicId: 'successioni', rating: 4, timeEstimate: '20 min', priority: 'low',
    label: 'Quasi pronta',
    whatYouNeed: 'Ottima padronanza. Ripassare le dimostrazioni dei teoremi principali per l\'orale.',
    approach: ['Spiega a voce la definizione di limite e il teorema delle successioni monotone'],
    keyPoints: ['Sai usare i criteri di convergenza in modo fluido'],
    commonMistakes: ['Essere imprecisi nella dimostrazione del teorema delle successioni monotone'],
    exercises: ['Dimostrare che se aₙ→L e bₙ→M allora aₙ+bₙ→L+M (teorema algebra dei limiti)'],
    nextStep: 'Argomento padroneggiato. Concentrati sui limiti di funzioni.' },

  { topicId: 'successioni', rating: 5, timeEstimate: '10 min', priority: 'low',
    label: 'Mantenimento',
    whatYouNeed: 'Padronanza completa.',
    approach: ['Ripasso veloce delle definizioni e dei teoremi principali'],
    keyPoints: ['Nessun gap da colmare'],
    commonMistakes: [],
    exercises: ['Enuncia e dimostra il teorema dei carabinieri per successioni'],
    nextStep: 'Mantieni questa competenza.' },


  // ══════════════════════════════════════════════
  // LIMITI
  // ══════════════════════════════════════════════
  { topicId: 'limiti', rating: 1, timeEstimate: '5–7 ore', priority: 'critical',
    label: 'Partire da zero',
    whatYouNeed: 'Capire la definizione ε-δ di limite, l\'algebra dei limiti, le principali forme indeterminate e come risolverle, i limiti notevoli e il confronto tra infiniti.',
    approach: [
      'Studia la definizione: lim_{x→a} f(x) = L ⟺ ∀ε>0 ∃δ>0: 0<|x-a|<δ ⟹ |f(x)-L|<ε',
      'Distingui limite destro e sinistro: il limite esiste ⟺ i due coincidono',
      'Studia l\'algebra dei limiti: somma, prodotto, quoziente (quando il denominatore → ≠ 0)',
      'Studia le forme indeterminate: 0/0, ∞/∞, ∞-∞, 0·∞, 1^∞, 0^0, ∞^0',
      'Impara i limiti notevoli: lim sin(x)/x = 1, lim (1+x)^(1/x) = e per x→0',
      'Studia la gerarchia degli infiniti: logaritmico < polinomiale < esponenziale',
      'Fai 15 esercizi di calcolo di limiti con tecniche diverse',
    ],
    keyPoints: [
      'lim_{x→0} sin(x)/x = 1; lim_{x→0} (1-cos x)/x² = 1/2',
      'lim_{x→0} (eˣ-1)/x = 1; lim_{x→0} ln(1+x)/x = 1',
      'Forma 0/0: raccogliere, razionalizzare, usare limiti notevoli o Taylor',
      'Forma ∞/∞: dividere per il termine dominante',
      'Infiniti: xᵅ ≪ eˣ; ln x ≪ xᵅ per ogni α>0',
    ],
    commonMistakes: [
      'Applicare l\'algebra dei limiti a forme indeterminate senza risolverle prima',
      'Dimenticare che lim sin(x)/x = 1 vale solo per x→0 (non per x→∞)',
      'Confondere lim_{x→a⁺} con lim_{x→a}',
    ],
    exercises: [
      'Calcolare lim_{x→0} (sin 3x)/(5x)',
      'Calcolare lim_{x→∞} x·ln(1+1/x)',
      'Calcolare lim_{x→0} (1-cos x)/x² senza Taylor',
      'Calcolare lim_{x→1} (x³-1)/(x²-1)',
      'Studiare lim_{x→0⁺} x^x',
    ],
    nextStep: 'Con i limiti padroneggiati, la continuità e le derivate diventano accessibili.' },

  { topicId: 'limiti', rating: 2, timeEstimate: '3–4 ore', priority: 'high',
    label: 'Basi instabili',
    whatYouNeed: 'Sai fare limiti semplici ma ti inceppi su forme indeterminate complesse, limiti all\'infinito o confronto tra infiniti.',
    approach: [
      'Ripassa le forme indeterminate una per una con tecniche specifiche',
      'Per ∞-∞: raccogliere o moltiplicare per il coniugato',
      'Per 1^∞: usare il limite notevole lim(1+α)^(1/α) = e',
      'Studia la notazione di Landau: f(x)=o(g(x)) per x→a significa f/g→0',
      'Fai 10 esercizi mirati sulle forme indeterminate che hai sbagliato',
    ],
    keyPoints: [
      'Per 1^∞: lim f(x)^g(x) = e^{lim g(x)·(f(x)-1)} quando f→1 e g→∞',
      'f(x) = o(g(x)) significa che f è trascurabile rispetto a g vicino ad a',
    ],
    commonMistakes: [
      'Non riconoscere la forma 1^∞ e non usare la tecnica corretta',
      'Sbagliare il segno nella razionalizzazione (√a-√b)(√a+√b) = a-b',
    ],
    exercises: [
      'Calcolare lim_{x→∞} (1+3/x)^(2x)',
      'Calcolare lim_{x→+∞} (√(x²+x) - x)',
      'Calcolare lim_{x→0} (tg x - sin x)/x³',
    ],
    nextStep: 'Con i limiti più solidi, studia la continuità che ne fa uso diretto.' },

  { topicId: 'limiti', rating: 3, timeEstimate: '1–2 ore', priority: 'medium',
    label: 'Discreto – da affinare',
    whatYouNeed: 'Buona padronanza, ma qualche incertezza su confronto asintotico, teorema del confronto o dimostrazione ε-δ.',
    approach: [
      'Studia il confronto asintotico: f ~ g per x→a significa f/g→1',
      'Esercitati con la tecnica degli asintotico-equivalenti per semplificare limiti',
      'Fai 2–3 dimostrazioni ε-δ di limiti semplici',
    ],
    keyPoints: [
      'f ~ g ⟹ lim(h·f) = lim(h·g) (si possono sostituire asintotico-equivalenti in prodotti/quozienti)',
      'sin x ~ x, eˣ-1 ~ x, ln(1+x) ~ x per x→0',
    ],
    commonMistakes: ['Sostituire asintotico-equivalenti in somme/differenze (non è lecito in generale)'],
    exercises: [
      'Calcolare lim_{x→0} (e^{x²}-1)/(1-cos x) usando gli asintotico-equivalenti',
      'Dimostrare con ε-δ che lim_{x→2} 3x = 6',
    ],
    nextStep: 'Argomento in buona forma. Approfondisci con i limiti legati alle derivate (L\'Hôpital, Taylor).' },

  { topicId: 'limiti', rating: 4, timeEstimate: '20 min', priority: 'low',
    label: 'Quasi pronta',
    whatYouNeed: 'Padronanza quasi completa. Ripassare i teoremi di unicità e limitatezza locale del limite.',
    approach: ['Rivedi la dimostrazione di unicità del limite', 'Esercitati con limiti parametrici (trovare il valore del parametro che rende il limite finito)'],
    keyPoints: ['Il limite, se esiste, è unico (dimostrazione per assurdo)'],
    commonMistakes: ['Essere imprecisi nella distinzione tra limite e valore della funzione in quel punto'],
    exercises: ['Trovare a∈ℝ tale che lim_{x→0} (sin(ax) + x·cos x)/x = 3'],
    nextStep: 'Argomento padroneggiato.' },

  { topicId: 'limiti', rating: 5, timeEstimate: '10 min', priority: 'low',
    label: 'Mantenimento',
    whatYouNeed: 'Padronanza completa.',
    approach: ['Ripasso veloce dei limiti notevoli e della gerarchia degli infiniti'],
    keyPoints: ['Nessun gap da colmare'],
    commonMistakes: [],
    exercises: ['Calcola 3 limiti di livello alto (forma 1^∞, confronto tra infiniti, ε-δ)'],
    nextStep: 'Mantieni e usa questa competenza in tutto il corso.' },


  // ══════════════════════════════════════════════
  // CONTINUITÀ
  // ══════════════════════════════════════════════
  { topicId: 'continuita', rating: 1, timeEstimate: '4–5 ore', priority: 'critical',
    label: 'Partire da zero',
    whatYouNeed: 'Capire la definizione di continuità, le discontinuità, e i grandi teoremi (Bolzano, Weierstrass, TVI).',
    approach: [
      'Definisci continuità in x₀: f è continua in x₀ ⟺ lim_{x→x₀} f(x) = f(x₀)',
      'Studia le discontinuità: eliminabile (il limite esiste ≠ f(x₀)), salto (limit. dx ≠ sinistra), essenziale (limite non esiste)',
      'Studia il teorema di Bolzano: f continua su [a,b], f(a)·f(b)<0 ⟹ ∃c∈(a,b): f(c)=0',
      'Studia il teorema di Weierstrass: f continua su [a,b] ⟹ f ha massimo e minimo assoluti',
      'Studia il teorema dei valori intermedi (TVI): f continua su [a,b] ⟹ f assume tutti i valori tra f(a) e f(b)',
      'Fai esercizi su classificazione delle discontinuità e applicazione dei teoremi',
    ],
    keyPoints: [
      'Continuità in x₀: lim_{x→x₀} f(x) = f(x₀) (il limite deve esistere, finito, e coincidere con f(x₀))',
      'Discontinuità eliminabile: lim esiste finito ≠ f(x₀)',
      'Discontinuità di salto: limite dx e sx esistono ma sono diversi',
      'Bolzano → esiste almeno uno zero; TVI → generalizzazione a qualsiasi valore intermedio',
    ],
    commonMistakes: [
      'Dimenticare di verificare che il limite sia uguale al valore della funzione (non solo che esista)',
      'Applicare Bolzano senza verificare che la funzione sia continua su tutto [a,b]',
      'Confondere discontinuità di salto con discontinuità essenziale',
    ],
    exercises: [
      'Classificare le discontinuità di f(x) = (x²-1)/(x-1)',
      'Usare Bolzano per dimostrare che x³ + x - 1 = 0 ha almeno una radice in (0,1)',
      'Trovare per quali valori di a la funzione a tratti è continua',
    ],
    nextStep: 'Con la continuità solida, le derivate diventano il passo naturale successivo.' },

  { topicId: 'continuita', rating: 2, timeEstimate: '2–3 ore', priority: 'high',
    label: 'Basi instabili',
    whatYouNeed: 'Hai le definizioni di base ma ti inceppi nella classificazione delle discontinuità o nell\'applicazione dei teoremi.',
    approach: [
      'Ripassa sistematicamente la classificazione: per ogni discontinuità, calcola limite dx, sx e valore',
      'Esercitati con funzioni a tratti: trovare il valore del parametro che rende la funzione continua',
      'Rivedi le ipotesi di Bolzano e Weierstrass: cosa succede se [a,b] è aperto?',
    ],
    keyPoints: [
      'f può avere infiniti massimi ma Weierstrass garantisce il massimo assoluto su [a,b] compatto',
      'Bolzano non dà l\'unicità dello zero, solo l\'esistenza',
    ],
    commonMistakes: ['Dimenticare che Weierstrass richiede [a,b] chiuso e limitato (compatto)'],
    exercises: [
      'Trovare a,b ∈ ℝ tali che f(x) = {ax+b se x≤1; x²-1 se x>1} sia continua',
      'Dimostrare che f(x) = xˣ - 2 ha una radice in (1,2) usando Bolzano',
    ],
    nextStep: 'Con la continuità consolidata, affronta le derivate con più sicurezza.' },

  { topicId: 'continuita', rating: 3, timeEstimate: '1 ora', priority: 'medium',
    label: 'Discreto – da affinare',
    whatYouNeed: 'Buona comprensione dei teoremi; qualche incertezza su dimostrazioni o applicazioni avanzate.',
    approach: [
      'Studia la dimostrazione del TVI (si usa la completezza di ℝ)',
      'Esercitati con la continuità uniforme (opzionale ma utile per capire la differenza)',
      'Fai 3 esercizi applicativi (trovare radici approssimate, valori del parametro)',
    ],
    keyPoints: ['La continuità uniforme è più forte della semplice continuità (non dipende dal punto)'],
    commonMistakes: ['Non verificare le ipotesi dei teoremi (compattezza, segno diverso) prima di applicarli'],
    exercises: ['Mostrare con un controesempio che Weierstrass non vale su intervalli aperti'],
    nextStep: 'Argomento in buona forma. Approfondisci con le derivate.' },

  { topicId: 'continuita', rating: 4, timeEstimate: '20 min', priority: 'low',
    label: 'Quasi pronta',
    whatYouNeed: 'Padronanza quasi completa. Ripassare le dimostrazioni dei teoremi per l\'orale.',
    approach: ['Spiega a voce la dimostrazione di Bolzano', 'Rivedi le applicazioni del TVI (es. punto fisso)'],
    keyPoints: ['Teorema del punto fisso: f:[0,1]→[0,1] continua ⟹ ∃x: f(x)=x (segue dal TVI)'],
    commonMistakes: [],
    exercises: ['Dimostrare il teorema del punto fisso usando il TVI'],
    nextStep: 'Argomento padroneggiato.' },

  { topicId: 'continuita', rating: 5, timeEstimate: '10 min', priority: 'low',
    label: 'Mantenimento',
    whatYouNeed: 'Padronanza completa.',
    approach: ['Ripasso veloce dei teoremi e delle loro ipotesi'],
    keyPoints: ['Nessun gap da colmare'],
    commonMistakes: [],
    exercises: ['Enuncia Bolzano, Weierstrass e TVI con le ipotesi complete'],
    nextStep: 'Mantieni.' },


  // ══════════════════════════════════════════════
  // DERIVATE
  // ══════════════════════════════════════════════
  { topicId: 'derivate', rating: 1, timeEstimate: '6–8 ore', priority: 'critical',
    label: 'Partire da zero',
    whatYouNeed: 'Capire la definizione di derivata come limite del rapporto incrementale, le regole di derivazione, i teoremi fondamentali (Rolle, Lagrange, L\'Hôpital) e le loro applicazioni.',
    approach: [
      'Studia la definizione: f\'(x₀) = lim_{h→0} [f(x₀+h)-f(x₀)]/h',
      'Memorizza le derivate fondamentali: xⁿ, eˣ, ln x, sin x, cos x, tg x',
      'Impara le regole: (f+g)\' = f\'+g\', (fg)\' = f\'g+fg\', (f/g)\' = (f\'g-fg\')/g²',
      'Studia la chain rule: (f∘g)\'(x) = f\'(g(x))·g\'(x)',
      'Studia il teorema di Rolle: f continua su [a,b], derivabile su (a,b), f(a)=f(b) ⟹ ∃c: f\'(c)=0',
      'Studia il teorema di Lagrange: f continua su [a,b], derivabile su (a,b) ⟹ ∃c: f\'(c)=(f(b)-f(a))/(b-a)',
      'Studia la regola di L\'Hôpital: per forme 0/0 o ∞/∞, lim f/g = lim f\'/g\' (se quest\'ultimo esiste)',
      'Fai 15 esercizi di derivazione usando le regole',
    ],
    keyPoints: [
      'Derivabilità in x₀ ⟹ continuità in x₀ (ma non viceversa)',
      '(f∘g)\'(x) = f\'(g(x))·g\'(x) — chain rule',
      'Lagrange: il coefficiente angolare della secante è uguale alla derivata in almeno un punto interno',
      'L\'Hôpital: applicare solo a forme indeterminate 0/0 o ∞/∞',
    ],
    commonMistakes: [
      'Confondere la chain rule con il prodotto: D[f(g(x))] ≠ f\'(x)·g\'(x)',
      'Applicare L\'Hôpital a forme che non sono 0/0 o ∞/∞',
      'Dimenticare le condizioni di Rolle (f(a)=f(b)) o Lagrange',
    ],
    exercises: [
      'Derivare f(x) = x²·eˣ, g(x) = ln(sin x), h(x) = (x+1)/(x²-1)',
      'Applicare Lagrange a f(x) = x³ su [0,2] e trovare il punto c',
      'Calcolare lim_{x→0} (eˣ-1-x)/x² usando L\'Hôpital',
      'Trovare i punti di non derivabilità di f(x) = |x²-1|',
    ],
    nextStep: 'Con le derivate solide, lo studio di funzione è a portata di mano.' },

  { topicId: 'derivate', rating: 2, timeEstimate: '3–4 ore', priority: 'high',
    label: 'Basi instabili',
    whatYouNeed: 'Sai derivare funzioni semplici ma ti inceppi su chain rule complessa, teoremi (Rolle, Cauchy) o applicazione di L\'Hôpital a forme non ovvie.',
    approach: [
      'Ripassa la chain rule con esempi sempre più complessi: f(g(h(x)))',
      'Studia la derivata della funzione inversa: (f⁻¹)\'(y) = 1/f\'(f⁻¹(y))',
      'Ripassa le condizioni e la dimostrazione di Rolle (semplice ma importante per l\'orale)',
      'Esercitati con L\'Hôpital su forme ∞-∞, 0·∞ (da ricondurre a 0/0 o ∞/∞)',
      'Fai 10 esercizi di livello medio su derivazione e limiti con L\'Hôpital',
    ],
    keyPoints: [
      'Derivata di arcsin: 1/√(1-x²); di arctan: 1/(1+x²)',
      'Il teorema di Cauchy generalizza Lagrange: f\'(c)/g\'(c) = (f(b)-f(a))/(g(b)-g(a))',
    ],
    commonMistakes: [
      'Sbagliare la derivata delle funzioni inverse trigonometriche',
      'Applicare L\'Hôpital più volte senza verificare che la forma sia ancora indeterminata',
    ],
    exercises: [
      'Derivare f(x) = arctan(ln x) e g(x) = (sin x)^x',
      'Calcolare lim_{x→0⁺} x·ln x usando L\'Hôpital',
      'Applicare Cauchy a f(x)=sin x e g(x)=cos x su [0, π/2]',
    ],
    nextStep: 'Consolida le derivate per affrontare lo studio di funzione in modo completo.' },

  { topicId: 'derivate', rating: 3, timeEstimate: '1–2 ore', priority: 'medium',
    label: 'Discreto – da affinare',
    whatYouNeed: 'Buona padronanza delle regole di derivazione; qualche incertezza su derivate di ordine superiore o sulla dimostrazione di Lagrange.',
    approach: [
      'Studia le derivate di ordine superiore: f\'\', f\'\'\' e il significato geometrico di f\'\'',
      'Ripassa la dimostrazione di Lagrange (usa Rolle come intermediario)',
      'Esercitati con 5 problemi di livello medio-alto (parametri, dimostrazioni con MVT)',
    ],
    keyPoints: [
      'f\'\'(x) > 0 ⟹ f convessa; f\'\'(x) < 0 ⟹ f concava',
      'Lagrange si dimostra applicando Rolle alla funzione ausiliaria g(x) = f(x) - [(f(b)-f(a))/(b-a)]·(x-a)',
    ],
    commonMistakes: ['Dimenticare il segno nella formula della derivata del quoziente'],
    exercises: [
      'Calcolare f^(n)(x) per f(x) = xeˣ (formula generale per n≥1)',
      'Usare Lagrange per dimostrare che |sin a - sin b| ≤ |a - b| per ogni a,b ∈ ℝ',
    ],
    nextStep: 'Con 3★ nelle derivate sei pronta per affrontare lo studio di funzione completo.' },

  { topicId: 'derivate', rating: 4, timeEstimate: '20 min', priority: 'low',
    label: 'Quasi pronta',
    whatYouNeed: 'Padronanza quasi completa. Ripassare le dimostrazioni dei teoremi e qualche tecnica avanzata.',
    approach: ['Spiega a voce la catena logica: Rolle → Lagrange → Cauchy → L\'Hôpital'],
    keyPoints: ['L\'Hôpital si dimostra usando il teorema di Cauchy'],
    commonMistakes: ['Non citare le ipotesi nel testo dei teoremi quando li usi'],
    exercises: ['Dimostrare che se f\'(x) = 0 per ogni x ∈ (a,b) allora f è costante su (a,b)'],
    nextStep: 'Argomento padroneggiato.' },

  { topicId: 'derivate', rating: 5, timeEstimate: '10 min', priority: 'low',
    label: 'Mantenimento',
    whatYouNeed: 'Padronanza completa.',
    approach: ['Ripasso veloce delle derivate fondamentali e dei teoremi'],
    keyPoints: ['Nessun gap da colmare'],
    commonMistakes: [],
    exercises: ['Deriva a memoria le 15 funzioni fondamentali e verifica'],
    nextStep: 'Mantieni.' },


  // ══════════════════════════════════════════════
  // STUDIO DI FUNZIONE
  // ══════════════════════════════════════════════
  { topicId: 'studio_funzione', rating: 1, timeEstimate: '5–6 ore', priority: 'critical',
    label: 'Partire da zero',
    whatYouNeed: 'Imparare lo schema completo di studio di funzione: monotonia, estremi, concavità, asintoti, grafico.',
    approach: [
      'Schema di studio: (1) dominio, (2) segno e intersezioni assi, (3) limiti agli estremi e asintoti, (4) derivata prima → monotonia e estremi, (5) derivata seconda → concavità e flessi',
      'Studia monotonia: f\'(x) > 0 ⟹ f crescente; f\'(x) < 0 ⟹ f decrescente',
      'Studia massimi/minimi: punto critico x₀ con f\'(x₀)=0; analisi del segno di f\' o criterio f\'\'',
      'Studia concavità: f\'\'(x) > 0 ⟹ convessa; flesso se f\'\' cambia segno',
      'Studia gli asintoti: verticali (lim = ±∞), orizzontali (lim per x→±∞), obliqui (m=lim f/x, q=lim(f-mx))',
      'Traccia il grafico qualitativo a partire dallo schema',
    ],
    keyPoints: [
      'Minimo locale in x₀: f\'(x₀)=0 e f\' cambia da - a + (o f\'\'(x₀)>0)',
      'Asintoto obliquo y=mx+q: m = lim_{x→±∞} f(x)/x, q = lim_{x→±∞} [f(x)-mx]',
      'Flesso in x₀: f\'\' cambia segno in x₀ (non basta f\'\'(x₀)=0)',
    ],
    commonMistakes: [
      'Confondere punto critico con estremo: f\'(x₀)=0 non implica che x₀ sia un estremo (potrebbe essere un flesso a tangente orizzontale)',
      'Cercare l\'asintoto obliquo solo per x→+∞ dimenticando x→-∞',
      'Dimenticare i punti di non derivabilità nell\'analisi degli estremi',
    ],
    exercises: [
      'Studiare f(x) = x³ - 3x² + 2 (dominio, monotonia, estremi, concavità, grafico)',
      'Trovare gli asintoti di f(x) = (x²+1)/(x-1)',
      'Studiare f(x) = xe^(-x²) (comportamento all\'infinito, massimi, flessi)',
    ],
    nextStep: 'Con lo studio di funzione padroneggiato, affrontare Taylor e integrali è molto più semplice.' },

  { topicId: 'studio_funzione', rating: 2, timeEstimate: '3–4 ore', priority: 'high',
    label: 'Basi instabili',
    whatYouNeed: 'Conosci lo schema ma ti inceppi su asintoti obliqui, flessi o su funzioni con casi particolari (valore assoluto, radicali).',
    approach: [
      'Ripassa il calcolo degli asintoti obliqui con 4–5 esempi',
      'Studia i flessi: f\'\'(x₀)=0 è necessario ma non sufficiente; verificare il cambio di segno',
      'Esercitati su funzioni con valore assoluto: studiare separatamente i rami',
      'Fai lo studio completo di 3 funzioni diverse',
    ],
    keyPoints: [
      'Asintoto obliquo esiste ⟺ m = lim f(x)/x è finito e ≠ 0',
      'f(x) = |g(x)|: risolvi g(x)=0 per trovare i punti angolosi',
    ],
    commonMistakes: [
      'Dimenticare di verificare il cambio di segno di f\'\' ai potenziali flessi',
      'Sbagliare il segno dell\'asintoto obliquo per x→-∞',
    ],
    exercises: [
      'Trovare tutti gli asintoti di f(x) = (x³+1)/(x²-1)',
      'Studiare f(x) = x + 2/x (asintoto obliquo, monotonia, flessi)',
    ],
    nextStep: 'Continua con esercizi completi di studio di funzione: è un argomento che migliora con la pratica.' },

  { topicId: 'studio_funzione', rating: 3, timeEstimate: '1–2 ore', priority: 'medium',
    label: 'Discreto – da affinare',
    whatYouNeed: 'Sai fare uno studio di funzione standard; da affinare su casi limite e grafici precisi.',
    approach: [
      'Esercitati su funzioni trascendenti: f(x) = x·ln x, f(x) = e^(-1/x²)',
      'Studia i punti di non derivabilità (angolosi, a tangente verticale) e come compaiono nel grafico',
      'Fai 2 studi di funzione completi con grafico accurato',
    ],
    keyPoints: ['Punto di flesso a tangente verticale: f\'(x₀) = ±∞ e f\' cambia segno'],
    commonMistakes: ['Non considerare il dominio nel dettaglio (es. punti rimossi, dominio non connesso)'],
    exercises: [
      'Studiare f(x) = ln(x² - 4) (definizione, asintoti, monotonia, grafico)',
      'Studiare f(x) = x^(2/3)(x-1)',
    ],
    nextStep: 'Argomento in buona forma. Approfondisci con funzioni più complesse.' },

  { topicId: 'studio_funzione', rating: 4, timeEstimate: '20 min', priority: 'low',
    label: 'Quasi pronta',
    whatYouNeed: 'Ottima padronanza. Ripassare casi particolari e velocizzare la procedura.',
    approach: ['Fai uno studio di funzione completo in meno di 20 minuti', 'Rivedi funzioni con parametri (trovare i valori del parametro per cui ha un minimo locale)'],
    keyPoints: ['Con derivata e studio di funzione fluidi, sei pronta per i problemi d\'esame tipici'],
    commonMistakes: [],
    exercises: ['Studiare f(x) = x^a · e^(-x) per a>0 parametrico'],
    nextStep: 'Argomento padroneggiato.' },

  { topicId: 'studio_funzione', rating: 5, timeEstimate: '10 min', priority: 'low',
    label: 'Mantenimento',
    whatYouNeed: 'Padronanza completa.',
    approach: ['Ripasso veloce dello schema di studio'],
    keyPoints: ['Nessun gap da colmare'],
    commonMistakes: [],
    exercises: ['Studia una funzione a scelta dall\'esame degli anni precedenti'],
    nextStep: 'Mantieni.' },


  // ══════════════════════════════════════════════
  // TAYLOR E MACLAURIN
  // ══════════════════════════════════════════════
  { topicId: 'taylor', rating: 1, timeEstimate: '4–5 ore', priority: 'critical',
    label: 'Partire da zero',
    whatYouNeed: 'Capire la formula di Taylor, il significato del resto, gli sviluppi notevoli di MacLaurin e come usarli per calcolare limiti.',
    approach: [
      'Studia la formula di Taylor con resto di Peano: f(x) = f(x₀) + f\'(x₀)(x-x₀) + … + f^(n)(x₀)/n!·(x-x₀)^n + o((x-x₀)^n)',
      'Memorizza gli sviluppi di MacLaurin fondamentali (intorno a x₀=0): eˣ, sin x, cos x, ln(1+x), (1+x)^α',
      'Studia il resto di Lagrange: R_n(x) = f^(n+1)(c)/(n+1)! · (x-x₀)^(n+1) per qualche c tra x₀ e x',
      'Impara a usare gli sviluppi per calcolare limiti in forma 0/0',
      'Impara a comporre sviluppi: eˢⁱⁿˣ = e^(x-x³/6+…)',
    ],
    keyPoints: [
      'eˣ = 1 + x + x²/2! + x³/3! + … + xⁿ/n! + o(xⁿ)',
      'sin x = x - x³/6 + x⁵/120 + … + o(xⁿ)',
      'cos x = 1 - x²/2 + x⁴/24 + … + o(xⁿ)',
      'ln(1+x) = x - x²/2 + x³/3 - … + o(xⁿ)',
      '(1+x)^α = 1 + αx + α(α-1)/2·x² + … + o(xⁿ)',
    ],
    commonMistakes: [
      'Fermarsi all\'ordine sbagliato (non abbastanza termini per la cancellazione)',
      'Confondere il resto di Peano o(xⁿ) con quello di Lagrange (che è esplicito)',
      'Dimenticare i fattoriali nei denominatori',
    ],
    exercises: [
      'Scrivere lo sviluppo di MacLaurin di eˣ al 4° ordine e calcolarne il valore in x=0.1',
      'Calcolare lim_{x→0} (eˣ - 1 - x - x²/2)/x³ usando Taylor',
      'Calcolare lim_{x→0} (sin x - x + x³/6)/x⁵',
      'Scrivere lo sviluppo di e^(sin x) al 3° ordine',
    ],
    nextStep: 'Con Taylor e MacLaurin, la maggior parte dei limiti complicati diventano calcolabili.' },

  { topicId: 'taylor', rating: 2, timeEstimate: '2–3 ore', priority: 'high',
    label: 'Basi instabili',
    whatYouNeed: 'Conosci gli sviluppi fondamentali ma commetti errori nell\'ordine, nella composizione o nell\'uso del resto di Lagrange.',
    approach: [
      'Ripassa tutti gli sviluppi notevoli e scrivili a memoria',
      'Esercitati a comporre sviluppi (es. sin(x²), cos(eˣ-1), ln(cos x))',
      'Studia come determinare l\'ordine necessario per risolvere un limite',
      'Studia il resto di Lagrange: maggiorazione dell\'errore nell\'approssimazione polinomiale',
    ],
    keyPoints: [
      'Per risolvere lim f(x)/g(x) con Taylor: espandi al minimo ordine che non si cancella',
      'Il resto di Lagrange è utile per stimare l\'errore di approssimazione (es. sin 0.1 ≈ 0.1)',
    ],
    commonMistakes: [
      'Sviluppare al primo ordine quando i termini del primo ordine si cancellano',
      'Comporre sviluppi senza tener conto dell\'ordine corretto',
    ],
    exercises: [
      'Calcolare lim_{x→0} [ln(1+x²) - x²]/(x⁴)',
      'Stimare l\'errore nell\'approssimazione sin(0.2) ≈ 0.2 usando il resto di Lagrange',
      'Sviluppare ln(cos x) al 4° ordine in x=0',
    ],
    nextStep: 'Con gli sviluppi di Taylor fluidi, i limiti e lo studio di funzione avanzato diventano più semplici.' },

  { topicId: 'taylor', rating: 3, timeEstimate: '1 ora', priority: 'medium',
    label: 'Discreto – da affinare',
    whatYouNeed: 'Buona padronanza degli sviluppi; qualche incertezza sulle applicazioni avanzate o sulla dimostrazione.',
    approach: [
      'Studia Taylor centrato in punti ≠ 0 (es. sviluppo di ln x intorno a x₀=1)',
      'Applica Taylor allo studio locale di una funzione (classificazione degli estremi)',
      'Fai 3 limiti complessi che richiedono Taylor al 4°-6° ordine',
    ],
    keyPoints: [
      'Se f\'(x₀)=0 e f\'\'(x₀)>0 (criterio del secondo ordine): minimo locale in x₀',
      'Se i primi k-1 derivate si annullano e f^(k)(x₀)≠0: se k pari → estremo; se k dispari → flesso',
    ],
    commonMistakes: ['Dimenticare di verificare l\'ordine del primo termine non nullo per classificare gli estremi'],
    exercises: [
      'Sviluppare f(x) = ln x intorno a x₀=1 al 3° ordine',
      'Classificare il punto critico x₀=0 di f(x) = x⁴ - x⁶ usando Taylor',
    ],
    nextStep: 'Argomento in buona forma. Approfondisci con le serie di potenze.' },

  { topicId: 'taylor', rating: 4, timeEstimate: '20 min', priority: 'low',
    label: 'Quasi pronta',
    whatYouNeed: 'Padronanza quasi completa. Ripassare le dimostrazioni e i casi limite.',
    approach: ['Spiega a voce come si dimostra la formula di Taylor con il resto di Peano (per induzione o L\'Hôpital ripetuto)'],
    keyPoints: ['Taylor con resto di Lagrange permette stime quantitative dell\'errore'],
    commonMistakes: [],
    exercises: ['Dimostrare che eˣ ≥ 1 + x per ogni x ∈ ℝ usando Taylor al primo ordine con resto'],
    nextStep: 'Argomento padroneggiato.' },

  { topicId: 'taylor', rating: 5, timeEstimate: '10 min', priority: 'low',
    label: 'Mantenimento',
    whatYouNeed: 'Padronanza completa.',
    approach: ['Ripasso veloce degli sviluppi notevoli'],
    keyPoints: ['Nessun gap da colmare'],
    commonMistakes: [],
    exercises: ['Scrivi a memoria i 5 sviluppi notevoli al 5° ordine'],
    nextStep: 'Mantieni.' },


  // ══════════════════════════════════════════════
  // INTEGRALE DI RIEMANN
  // ══════════════════════════════════════════════
  { topicId: 'integrale_riemann', rating: 1, timeEstimate: '5–6 ore', priority: 'critical',
    label: 'Partire da zero',
    whatYouNeed: 'Capire la definizione di integrale di Riemann, le proprietà, il teorema di Torricelli-Barrow e il collegamento con le primitive.',
    approach: [
      'Studia la definizione: ∫_a^b f(x)dx come limite delle somme di Riemann (sup e inf)',
      'Studia le proprietà: linearità, additività, monotonia, stima con max/min',
      'Studia il teorema della media: ∃c∈(a,b): ∫_a^b f = f(c)·(b-a)',
      'Studia il teorema fondamentale (Torricelli-Barrow): se F\'=f, allora ∫_a^b f = F(b)-F(a)',
      'Studia la funzione integrale F(x) = ∫_a^x f(t)dt e il fatto che F\'(x)=f(x)',
      'Impara le primitive delle funzioni fondamentali',
      'Fai 10 esercizi di calcolo di integrali definiti',
    ],
    keyPoints: [
      '∫_a^b f(x)dx = F(b)-F(a) dove F\'=f (Torricelli-Barrow)',
      'La funzione integrale F(x) = ∫_a^x f(t)dt è continua e differenziabile con F\'=f',
      'Linearità: ∫(αf+βg) = α∫f + β∫g',
      'Se f≥0 su [a,b], allora ∫_a^b f ≥ 0',
    ],
    commonMistakes: [
      'Confondere integrale indefinito (famiglia di primitive) con integrale definito (numero)',
      'Dimenticare la costante di integrazione nell\'integrale indefinito',
      'Sbagliare il segno: ∫_a^b f = -∫_b^a f',
    ],
    exercises: [
      'Calcolare ∫_0^1 (x²+2x) dx usando Torricelli-Barrow',
      'Calcolare d/dx[∫_0^(x²) sin t dt]',
      'Dimostrare che |∫_a^b f(x)dx| ≤ ∫_a^b |f(x)|dx',
      'Calcolare ∫_0^π sin x dx e interpretare geometricamente il risultato',
    ],
    nextStep: 'Con le basi dell\'integrale solide, le tecniche di integrazione diventano accessibili.' },

  { topicId: 'integrale_riemann', rating: 2, timeEstimate: '2–3 ore', priority: 'high',
    label: 'Basi instabili',
    whatYouNeed: 'Conosci Torricelli-Barrow ma ti inceppi sulla funzione integrale, sul teorema della media o sulla definizione formale.',
    approach: [
      'Ripassa la funzione integrale e la sua derivata: D[∫_a^(g(x)) f(t)dt] = f(g(x))·g\'(x)',
      'Studia il teorema della media integrale e il suo significato geometrico',
      'Fai esercizi sulle proprietà dell\'integrale definito',
    ],
    keyPoints: [
      'La funzione integrale F(x) = ∫_a^x f(t)dt ha la stessa regolarità di f, più uno',
      'Teorema della media: l\'integrale medio di f su [a,b] è uguale al valore di f in qualche punto c',
    ],
    commonMistakes: ['Dimenticare la chain rule nella derivazione della funzione integrale con estremo g(x)'],
    exercises: [
      'Calcolare d/dx[∫_x^(x²) e^(t²) dt]',
      'Applicare il teorema della media a f(x)=x² su [0,2] e trovare il punto c',
    ],
    nextStep: 'Con le basi consolidate, affronta le tecniche di integrazione.' },

  { topicId: 'integrale_riemann', rating: 3, timeEstimate: '1 ora', priority: 'medium',
    label: 'Discreto – da affinare',
    whatYouNeed: 'Buona padronanza; qualche incertezza sulla definizione formale di Riemann integrabile o su dimostrazioni.',
    approach: [
      'Studia il criterio di Riemann: f integrabile ⟺ ∀ε>0 ∃P: U(f,P)-L(f,P)<ε',
      'Ripassa la dimostrazione che f continua ⟹ integrabile',
      'Fai 3 esercizi su applicazioni dell\'integrale (area, valor medio)',
    ],
    keyPoints: ['Funzioni continue su [a,b] o monotone su [a,b] sono Riemann integrabili'],
    commonMistakes: ['Applicare Torricelli-Barrow a funzioni non continue (verificare sempre le ipotesi)'],
    exercises: ['Calcolare l\'area della regione delimitata da y=x² e y=x+2'],
    nextStep: 'Argomento in buona forma. Approfondisci con le tecniche di integrazione.' },

  { topicId: 'integrale_riemann', rating: 4, timeEstimate: '20 min', priority: 'low',
    label: 'Quasi pronta',
    whatYouNeed: 'Padronanza quasi completa. Ripassare le dimostrazioni per l\'orale.',
    approach: ['Spiega a voce la dimostrazione del teorema di Torricelli-Barrow'],
    keyPoints: ['La dimostrazione usa il teorema della media integrale'],
    commonMistakes: [],
    exercises: ['Dimostrare il primo teorema fondamentale del calcolo (F\'(x)=f(x))'],
    nextStep: 'Argomento padroneggiato.' },

  { topicId: 'integrale_riemann', rating: 5, timeEstimate: '10 min', priority: 'low',
    label: 'Mantenimento',
    whatYouNeed: 'Padronanza completa.',
    approach: ['Ripasso veloce della definizione e del teorema fondamentale'],
    keyPoints: ['Nessun gap da colmare'],
    commonMistakes: [],
    exercises: ['Enuncia e dimostra il teorema di Torricelli-Barrow'],
    nextStep: 'Mantieni.' },


  // ══════════════════════════════════════════════
  // TECNICHE DI INTEGRAZIONE
  // ══════════════════════════════════════════════
  { topicId: 'tecniche_int', rating: 1, timeEstimate: '5–6 ore', priority: 'critical',
    label: 'Partire da zero',
    whatYouNeed: 'Imparare le tecniche principali: integrali immediati, sostituzione, integrazione per parti, funzioni razionali fratte.',
    approach: [
      'Memorizza le primitive fondamentali: ∫xⁿ, ∫eˣ, ∫sin x, ∫cos x, ∫1/x, ∫1/(1+x²)',
      'Studia la sostituzione: ∫f(g(x))g\'(x)dx = ∫f(u)du con u=g(x)',
      'Studia l\'integrazione per parti: ∫uv\' = uv - ∫u\'v (scegliere u come la parte "più facile da derivare")',
      'Studia le funzioni razionali fratte: decomponi in frazioni parziali (A/(x-a) + B/(x-b))',
      'Fai 15 esercizi usando le diverse tecniche',
    ],
    keyPoints: [
      'Sostituzione: utile quando vedi f(g(x))·g\'(x)',
      'Per parti: LIATE – Logaritmi, Inverse trig, Algebriche, Trig, Esponenziali (ordine di priorità per u)',
      'Razionali fratte: se grado num ≥ grado den, fare la divisione prima',
    ],
    commonMistakes: [
      'Dimenticare il dx nella sostituzione (cambio di variabile completo)',
      'Sbagliare la scelta di u e v\' nell\'integrazione per parti',
      'Non cambiare gli estremi di integrazione nella sostituzione per integrali definiti',
    ],
    exercises: [
      'Calcolare ∫x·eˣ dx (per parti)',
      'Calcolare ∫sin²x dx (formula di duplicazione: sin²x = (1-cos 2x)/2)',
      'Calcolare ∫1/(x²-3x+2) dx (frazioni parziali)',
      'Calcolare ∫√(1-x²) dx (sostituzione trigonometrica x=sin t)',
      'Calcolare ∫x·ln x dx (per parti)',
    ],
    nextStep: 'Con le tecniche di integrazione padronanza, gli integrali impropri diventano accessibili.' },

  { topicId: 'tecniche_int', rating: 2, timeEstimate: '3–4 ore', priority: 'high',
    label: 'Basi instabili',
    whatYouNeed: 'Conosci le tecniche base ma ti inceppi su sostituzioni non ovvie, frazioni parziali con fattori ripetuti o integrali di radicali.',
    approach: [
      'Esercitati con sostituzioni trigonometriche: √(a²-x²) → x=a sin t; √(x²+a²) → x=a tan t',
      'Studia le frazioni parziali con fattori ripetuti: A/(x-a)² e con termini quadratici irriducibili',
      'Studia gli integrali di funzioni con radicali: sostituzione t=√(ax+b)',
      'Fai 8 esercizi mirati sui punti deboli',
    ],
    keyPoints: [
      'Fattore quadratico irriducibile ax²+bx+c: completare il quadrato e usare arctan',
      'Integrale ∫P(x)/[(x-a)^n·Q(x)] dx: decomposizione con A₁/(x-a)+…+Aₙ/(x-a)^n',
    ],
    commonMistakes: [
      'Nella sostituzione trigonometrica, dimenticare di riconvertire alla variabile originale',
      'Sbagliare la decomposizione in frazioni parziali per fattori quadratici',
    ],
    exercises: [
      'Calcolare ∫1/(x²+2x+5) dx',
      'Calcolare ∫√(4-x²) dx usando la sostituzione trigonometrica',
      'Calcolare ∫1/(x(x-1)²) dx (frazioni parziali con fattore ripetuto)',
    ],
    nextStep: 'Consolida le tecniche con esercizi variati: la pratica è fondamentale per l\'integrazione.' },

  { topicId: 'tecniche_int', rating: 3, timeEstimate: '1–2 ore', priority: 'medium',
    label: 'Discreto – da affinare',
    whatYouNeed: 'Buona padronanza delle tecniche principali; qualche incertezza su casi particolari o su integrali misti.',
    approach: [
      'Esercitati con integrali che richiedono combinazioni di tecniche',
      'Ripassa la riduzione ricorsiva: ∫sinⁿx usando la formula per parti ricorsiva',
      'Fai 4 integrali "difficili" che usano più tecniche in sequenza',
    ],
    keyPoints: [
      'Riconoscere quale tecnica usare è la competenza chiave (non la tecnica in sé)',
      'Per ∫R(sin x, cos x)dx: sostituzione universale t = tan(x/2)',
    ],
    commonMistakes: ['Applicare una tecnica complessa quando è disponibile un integrale immediato più semplice'],
    exercises: [
      'Calcolare ∫xe^x sin x dx (per parti due volte)',
      'Calcolare ∫sin⁴x dx usando le formule di riduzione',
    ],
    nextStep: 'Argomento in buona forma. Approfondisci con gli integrali impropri.' },

  { topicId: 'tecniche_int', rating: 4, timeEstimate: '20 min', priority: 'low',
    label: 'Quasi pronta',
    whatYouNeed: 'Padronanza quasi completa. Velocizzare e consolidare i casi particolari.',
    approach: ['Fai 3 integrali di alta difficoltà a tempo (20 minuti ciascuno)', 'Rivedi la sostituzione universale t=tan(x/2)'],
    keyPoints: ['Con le tecniche fluide, gli integrali degli esami tipici non presentano sorprese'],
    commonMistakes: [],
    exercises: ['Calcolare ∫1/(1+sin x) dx usando la sostituzione universale'],
    nextStep: 'Argomento padroneggiato.' },

  { topicId: 'tecniche_int', rating: 5, timeEstimate: '10 min', priority: 'low',
    label: 'Mantenimento',
    whatYouNeed: 'Padronanza completa.',
    approach: ['Ripasso veloce delle tecniche principali e dei loro casi d\'uso'],
    keyPoints: ['Nessun gap da colmare'],
    commonMistakes: [],
    exercises: ['Calcola 3 integrali di livello medio-alto a memoria'],
    nextStep: 'Mantieni.' },


  // ══════════════════════════════════════════════
  // INTEGRALI IMPROPRI
  // ══════════════════════════════════════════════
  { topicId: 'integrali_impropri', rating: 1, timeEstimate: '4–5 ore', priority: 'critical',
    label: 'Partire da zero',
    whatYouNeed: 'Capire la definizione di integrale improprio (su intervallo illimitato e di funzione illimitata), i criteri di convergenza e confronto.',
    approach: [
      'Definisci ∫_a^(+∞) f(x)dx = lim_{b→+∞} ∫_a^b f(x)dx (se il limite esiste finito: converge)',
      'Definisci ∫_a^b f(x)dx per f illimitata in b come lim_{c→b⁻} ∫_a^c f(x)dx',
      'Studia gli integrali fondamentali: ∫_1^∞ 1/xᵅ dx (converge ⟺ α>1) e ∫_0^1 1/xᵅ dx (converge ⟺ α<1)',
      'Studia il criterio del confronto: 0≤f≤g e ∫g converge ⟹ ∫f converge',
      'Studia il criterio del confronto asintotico: f~g ⟹ stessa natura',
      'Fai 10 esercizi su convergenza/divergenza e calcolo del valore',
    ],
    keyPoints: [
      '∫_1^∞ 1/xᵅ: converge se α>1 (valore 1/(α-1)), diverge se α≤1',
      '∫_0^1 1/xᵅ: converge se α<1 (valore 1/(1-α)), diverge se α≥1',
      '∫_0^∞ e^(-αx) dx = 1/α per α>0',
      'Se f~g in a (con g>0) e ∫g converge ⟹ ∫f converge',
    ],
    commonMistakes: [
      'Calcolare l\'integrale improprio senza scrivere il limite (applicare Torricelli-Barrow direttamente)',
      'Confondere i criteri per intervalli illimitati con quelli per funzioni illimitate',
      'Sbagliare il valore critico di α: per ∫_1^∞ 1/xᵅ si vuole α>1, non α<1',
    ],
    exercises: [
      'Stabilire la convergenza e calcolare ∫_0^∞ xe^(-x) dx',
      'Stabilire la convergenza di ∫_1^∞ 1/(x√(x+1)) dx usando il confronto asintotico',
      'Calcolare ∫_0^1 ln x dx (integrale improprio in x=0)',
      'Stabilire la convergenza di ∫_0^∞ sin x / x dx (Dirichlet, opzionale)',
    ],
    nextStep: 'Con gli integrali impropri, hai strumenti per le serie numeriche e l\'analisi avanzata.' },

  { topicId: 'integrali_impropri', rating: 2, timeEstimate: '2–3 ore', priority: 'high',
    label: 'Basi instabili',
    whatYouNeed: 'Conosci la definizione ma ti inceppi sui criteri di convergenza o sui casi limite (funzione illimitata + intervallo illimitato).',
    approach: [
      'Ripassa il criterio del confronto con esempi concretiche',
      'Studia il criterio del confronto asintotico con asintotici esatti',
      'Esercitati su integrali misti (illimitata su intervallo illimitato): spezzare opportunamente',
    ],
    keyPoints: [
      'Se f ≥ 0 e ∫g=+∞ con f~g: anche ∫f=+∞',
      'Attenzione a spezzare ∫_0^∞ f quando f è illimitata sia in 0 che tende a 0 all\'infinito',
    ],
    commonMistakes: ['Applicare il confronto asintotico senza verificare che i confrontati abbiano lo stesso segno'],
    exercises: [
      'Studiare la convergenza di ∫_0^∞ 1/(√x·(1+x)) dx',
      'Calcolare ∫_0^∞ e^(-x²) dx (Gaussiana: risultato = √π/2, dimostrabile con tecnica avanzata)',
    ],
    nextStep: 'Consolida i criteri di convergenza con esercizi variati.' },

  { topicId: 'integrali_impropri', rating: 3, timeEstimate: '1 ora', priority: 'medium',
    label: 'Discreto – da affinare',
    whatYouNeed: 'Buona padronanza; qualche incertezza su casi sottili (convergenza assoluta vs condizionata) o dimostrazioni.',
    approach: [
      'Studia la convergenza assoluta: ∫|f| < ∞ ⟹ ∫f converge (ma non viceversa)',
      'Esercitati con 3 integrali che richiedono più criteri combinati',
    ],
    keyPoints: ['La convergenza assoluta è più forte di quella semplice; utile per studiare serie di funzioni'],
    commonMistakes: ['Confondere "∫f converge" con "∫|f| converge"'],
    exercises: ['Trovare i valori di p per cui ∫_1^∞ (ln x)/xᵖ dx converge'],
    nextStep: 'Argomento in buona forma.' },

  { topicId: 'integrali_impropri', rating: 4, timeEstimate: '20 min', priority: 'low',
    label: 'Quasi pronta',
    whatYouNeed: 'Padronanza quasi completa. Ripassare i criteri e le loro dimostrazioni.',
    approach: ['Spiega a voce il criterio del confronto asintotico e quando si applica'],
    keyPoints: ['Sai distinguere rapidamente la natura di un integrale usando gli asintotico-equivalenti'],
    commonMistakes: [],
    exercises: ['Dimostrare che ∫_1^∞ 1/xᵅ converge ⟺ α>1'],
    nextStep: 'Argomento padroneggiato.' },

  { topicId: 'integrali_impropri', rating: 5, timeEstimate: '10 min', priority: 'low',
    label: 'Mantenimento',
    whatYouNeed: 'Padronanza completa.',
    approach: ['Ripasso veloce dei criteri e dei valori critici'],
    keyPoints: ['Nessun gap da colmare'],
    commonMistakes: [],
    exercises: ['Enuncia e applica tutti i criteri di convergenza per integrali impropri'],
    nextStep: 'Mantieni.' },


  // ══════════════════════════════════════════════
  // EQUAZIONI DIFFERENZIALI
  // ══════════════════════════════════════════════
  { topicId: 'edo', rating: 1, timeEstimate: '5–6 ore', priority: 'critical',
    label: 'Partire da zero',
    whatYouNeed: 'Capire cosa è un\'EDO, risolvere EDO a variabili separabili, lineari del primo ordine, lineari del secondo ordine a coefficienti costanti e il problema di Cauchy.',
    approach: [
      'Definisci EDO: equazione che coinvolge y(x) e le sue derivate; ordine = grado massimo della derivata',
      'EDO separabili: y\' = f(x)g(y) → separare dy/g(y) = f(x)dx e integrare ambo i membri',
      'EDO lineari del 1° ordine: y\' + p(x)y = q(x); soluzione con fattore integrante μ = e^(∫p dx)',
      'EDO lineari del 2° ordine omogenee: ay\'\'+ by\' + cy = 0; soluzione tramite equazione caratteristica ar²+br+c=0',
      'Caso r₁≠r₂ reali: y = C₁e^(r₁x)+C₂e^(r₂x); caso complessi α±iβ: y = e^(αx)(C₁cos βx + C₂sin βx)',
      'EDO non omogenee: y = omogenea + soluzione particolare (metodo dei coefficienti indeterminati)',
      'Problema di Cauchy: EDO + condizioni iniziali → soluzione unica',
    ],
    keyPoints: [
      'EDO separabile: ∫dy/g(y) = ∫f(x)dx + C',
      'Fattore integrante per y\'+p(x)y=q(x): μ(x)=e^(∫p(x)dx); soluzione: y = (1/μ)∫μq dx + C/μ',
      'Equazione caratteristica: ar²+br+c=0 — discriminante Δ=b²-4ac determina il tipo di soluzione',
      'Principio di sovrapposizione: se y₁, y₂ soluzioni dell\'omogenea, allora C₁y₁+C₂y₂ è soluzione',
    ],
    commonMistakes: [
      'Dividere per g(y) senza verificare i casi g(y)=0 (possibili soluzioni singolari)',
      'Dimenticare la costante arbitraria C nella soluzione generale',
      'Sbagliare la forma della soluzione particolare per EDO non omogenee (doppio membro con eˣ quando r è radice)',
    ],
    exercises: [
      'Risolvere y\' = xy (separabile)',
      'Risolvere y\' - 2y = eˣ (lineare del 1° ordine)',
      'Risolvere y\'\' - 3y\' + 2y = 0 (2° ordine omogenea)',
      'Risolvere y\'\' + y = sin x con y(0)=0, y\'(0)=1 (problema di Cauchy)',
      'Risolvere y\' = y - y² (Bernoulli/separabile)',
    ],
    nextStep: 'Con le EDO padronanza, hai completato i fondamenti dell\'Analisi 1.' },

  { topicId: 'edo', rating: 2, timeEstimate: '3–4 ore', priority: 'high',
    label: 'Basi instabili',
    whatYouNeed: 'Sai impostare le EDO semplici ma ti inceppi sul fattore integrante, sull\'equazione caratteristica complessa o sul metodo dei coefficienti indeterminati.',
    approach: [
      'Ripassa il fattore integrante con 3 esempi di EDO lineari del 1° ordine',
      'Studia i 3 casi dell\'equazione caratteristica: Δ>0, Δ=0, Δ<0',
      'Studia il metodo dei coefficienti indeterminati per termini forzanti polinomiali, esponenziali, sinusoidali',
      'Fai 6 esercizi su EDO del 2° ordine non omogenee',
    ],
    keyPoints: [
      'Caso Δ=0 (radice doppia r): y = (C₁+C₂x)e^(rx)',
      'Termine forzante eˣ·sin(βx): proporre soluzione y_p = eˣ(A sin βx + B cos βx); se risonanza, moltiplicare per x',
    ],
    commonMistakes: [
      'Dimenticare di risolvere prima l\'omogenea prima di cercare la soluzione particolare',
      'Non riconoscere la risonanza quando il termine forzante è soluzione dell\'omogenea',
    ],
    exercises: [
      'Risolvere y\'\' - 2y\' + y = eˣ (risonanza)',
      'Risolvere y\' + (1/x)y = cos x con fattore integrante',
      'Risolvere y\'\' + 4y = cos 2x (risonanza con termine trigonometrico)',
    ],
    nextStep: 'Consolida le EDO con esercizi vari: capire la struttura aiuta a risolvere qualunque caso.' },

  { topicId: 'edo', rating: 3, timeEstimate: '1–2 ore', priority: 'medium',
    label: 'Discreto – da affinare',
    whatYouNeed: 'Buona padronanza; qualche incertezza su problemi di Cauchy, principio di sovrapposizione o EDO di Bernoulli.',
    approach: [
      'Studia il teorema di Cauchy (esistenza e unicità): ipotesi di Lipschitz',
      'Studia il principio di sovrapposizione per EDO non omogenee',
      'Esercitati con EDO di Bernoulli: y\' + p(x)y = q(x)yⁿ → sostituzione z=y^(1-n)',
      'Fai 3 problemi di Cauchy completi',
    ],
    keyPoints: [
      'Principio di sovrapposizione: soluzione generale = omogenea + particolare',
      'Bernoulli si riconduce a lineare con la sostituzione z = y^(1-n)',
    ],
    commonMistakes: ['Nell\'applicare il principio di sovrapposizione, dimenticare di includere la soluzione dell\'omogenea'],
    exercises: [
      'Risolvere y\' = y(1-y) con y(0)=1/2 (logistica, separabile)',
      'Usare la sovrapposizione per risolvere y\'\' + y = eˣ + cos x',
    ],
    nextStep: 'Argomento in buona forma. Approfondisci con sistemi di EDO o serie di potenze (se nel programma).' },

  { topicId: 'edo', rating: 4, timeEstimate: '20 min', priority: 'low',
    label: 'Quasi pronta',
    whatYouNeed: 'Padronanza quasi completa. Ripassare le dimostrazioni chiave per l\'orale.',
    approach: ['Spiega a voce la struttura della soluzione generale di y\'\'+by\'+cy=0', 'Rivedi il teorema di Cauchy e le sue ipotesi'],
    keyPoints: ['Lo spazio delle soluzioni dell\'omogenea del 2° ordine è bidimensionale (2 gradi di libertà)'],
    commonMistakes: [],
    exercises: ['Dimostrare che se y₁, y₂ sono soluzioni dell\'omogenea, allora C₁y₁+C₂y₂ è soluzione'],
    nextStep: 'Argomento padroneggiato.' },

  { topicId: 'edo', rating: 5, timeEstimate: '10 min', priority: 'low',
    label: 'Mantenimento',
    whatYouNeed: 'Padronanza completa.',
    approach: ['Ripasso veloce dei tre tipi di EDO e dei metodi di soluzione'],
    keyPoints: ['Nessun gap da colmare'],
    commonMistakes: [],
    exercises: ['Risolvi a memoria un\'EDO separabile, una lineare del 1° ordine e una del 2° ordine'],
    nextStep: 'Hai completato il programma di Analisi 1. Ottimo lavoro!' },

];
