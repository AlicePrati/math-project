import type { Question } from './types';

const VF = ['Vero', 'Falso'];
const V = 0;
const F = 1;

export const tfQuestions: Question[] = [

  // ── logica_proposizioni ──────────────────────────────────────
  { id: 'tf_prop_01', topicId: 'logica_proposizioni', type: 'tf', difficulty: 1, question: 'Una proposizione logica può essere sia vera che falsa contemporaneamente.', options: VF, correct: F, explanation: 'Una proposizione ha un unico valore di verità: o è vera o è falsa, mai entrambe (principio di non contraddizione).' },
  { id: 'tf_prop_02', topicId: 'logica_proposizioni', type: 'tf', difficulty: 2, question: 'L\'implicazione P → Q è vera quando P è falsa, qualunque sia il valore di Q.', options: VF, correct: V, explanation: 'P → Q è falsa solo quando P è vera e Q è falsa. Se P è falsa, l\'implicazione è vera indipendentemente da Q (ex falso quodlibet).' },
  { id: 'tf_prop_03', topicId: 'logica_proposizioni', type: 'tf', difficulty: 3, question: '¬(P ∧ Q) è equivalente a ¬P ∧ ¬Q.', options: VF, correct: F, explanation: 'Per De Morgan: ¬(P ∧ Q) = ¬P ∨ ¬Q, non ¬P ∧ ¬Q.' },
  { id: 'tf_prop_04', topicId: 'logica_proposizioni', type: 'tf', difficulty: 4, question: 'P ↔ Q è vera se e solo se P e Q hanno lo stesso valore di verità.', options: VF, correct: V, explanation: 'La doppia implicazione è vera quando entrambe sono vere o entrambe false.' },
  { id: 'tf_prop_05', topicId: 'logica_proposizioni', type: 'tf', difficulty: 5, question: 'P ∨ ¬P è una contraddizione.', options: VF, correct: F, explanation: 'P ∨ ¬P è una tautologia (principio del terzo escluso): è sempre vera.' },

  // ── logica_quantificatori ────────────────────────────────────
  { id: 'tf_quant_01', topicId: 'logica_quantificatori', type: 'tf', difficulty: 1, question: '∀x ∈ ℝ, x² ≥ 0 è un enunciato vero.', options: VF, correct: V, explanation: 'Il quadrato di qualsiasi numero reale è sempre non negativo.' },
  { id: 'tf_quant_02', topicId: 'logica_quantificatori', type: 'tf', difficulty: 2, question: 'La negazione di ∀x P(x) è ∀x ¬P(x).', options: VF, correct: F, explanation: 'La negazione di ∀x P(x) è ∃x ¬P(x): si inverte il quantificatore e si nega il predicato.' },
  { id: 'tf_quant_03', topicId: 'logica_quantificatori', type: 'tf', difficulty: 3, question: '∀x ∃y: y > x è equivalente a ∃y ∀x: y > x in ℝ.', options: VF, correct: F, explanation: 'Sono diversi: il primo è vero (y=x+1 funziona per ogni x), il secondo è falso (non esiste un reale più grande di tutti).' },
  { id: 'tf_quant_04', topicId: 'logica_quantificatori', type: 'tf', difficulty: 4, question: 'La definizione ε-δ di limite usa il quantificatore ∀ prima di ∃.', options: VF, correct: V, explanation: '∀ε>0, ∃δ>0: l\'ordine ∀ε poi ∃δ è essenziale — δ può dipendere da ε.' },
  { id: 'tf_quant_05', topicId: 'logica_quantificatori', type: 'tf', difficulty: 5, question: 'Scambiare l\'ordine dei quantificatori ∀ e ∃ non cambia il significato dell\'enunciato.', options: VF, correct: F, explanation: 'L\'ordine è fondamentale: ∀x∃y P(x,y) e ∃y∀x P(x,y) hanno significati completamente diversi.' },

  // ── implicazione ─────────────────────────────────────────────
  { id: 'tf_impl_01', topicId: 'implicazione', type: 'tf', difficulty: 1, question: 'Il contronominale di P → Q è ¬Q → ¬P.', options: VF, correct: V, explanation: 'Il contronominale è ¬Q → ¬P ed è logicamente equivalente a P → Q.' },
  { id: 'tf_impl_02', topicId: 'implicazione', type: 'tf', difficulty: 2, question: 'La conversa di P → Q (cioè Q → P) è equivalente a P → Q.', options: VF, correct: F, explanation: 'La conversa Q → P non è equivalente a P → Q. Solo il contronominale ¬Q → ¬P lo è.' },
  { id: 'tf_impl_03', topicId: 'implicazione', type: 'tf', difficulty: 3, question: '"P è sufficiente per Q" significa P → Q.', options: VF, correct: V, explanation: 'Condizione sufficiente: se P allora Q, cioè P → Q.' },
  { id: 'tf_impl_04', topicId: 'implicazione', type: 'tf', difficulty: 4, question: '"P è necessaria per Q" significa P → Q.', options: VF, correct: F, explanation: '"P necessaria per Q" significa Q → P: senza P non può esserci Q.' },
  { id: 'tf_impl_05', topicId: 'implicazione', type: 'tf', difficulty: 5, question: 'Se f è derivabile in x₀, allora f è continua in x₀.', options: VF, correct: V, explanation: 'La derivabilità implica la continuità. Il viceversa è falso: |x| è continua ma non derivabile in 0.' },

  // ── dimostrazione ─────────────────────────────────────────────
  { id: 'tf_dim_01', topicId: 'dimostrazione', type: 'tf', difficulty: 1, question: 'Nella dimostrazione per induzione il caso base è obbligatorio.', options: VF, correct: V, explanation: 'Senza il caso base l\'induzione non funziona: il passo induttivo da solo non basta.' },
  { id: 'tf_dim_02', topicId: 'dimostrazione', type: 'tf', difficulty: 2, question: 'Nella dimostrazione per assurdo si assume la negazione della tesi.', options: VF, correct: V, explanation: 'Si assume ¬tesi e si arriva a una contraddizione, provando che la tesi deve essere vera.' },
  { id: 'tf_dim_03', topicId: 'dimostrazione', type: 'tf', difficulty: 3, question: 'Il passo induttivo dell\'induzione assume P(n) vera per tutti gli n.', options: VF, correct: F, explanation: 'Si assume P(n) vera per un fissato n (ipotesi induttiva) e si dimostra P(n+1), non per tutti gli n simultaneamente.' },
  { id: 'tf_dim_04', topicId: 'dimostrazione', type: 'tf', difficulty: 4, question: '√2 è irrazionale si dimostra per assurdo.', options: VF, correct: V, explanation: 'Si assume √2 = p/q ridotta ai minimi termini e si arriva alla contraddizione che sia p che q sono pari.' },
  { id: 'tf_dim_05', topicId: 'dimostrazione', type: 'tf', difficulty: 5, question: 'L\'induzione forte è equivalente all\'induzione ordinaria.', options: VF, correct: V, explanation: 'Le due forme di induzione sono logicamente equivalenti, ma quella forte è più comoda quando P(n) dipende da più valori precedenti.' },

  // ── insiemi_operazioni ────────────────────────────────────────
  { id: 'tf_ins_01', topicId: 'insiemi_operazioni', type: 'tf', difficulty: 1, question: 'A ∩ B = B ∩ A per qualsiasi coppia di insiemi A e B.', options: VF, correct: V, explanation: "L'intersezione è commutativa: gli elementi comuni ad A e B sono gli stessi di quelli comuni a B e A." },
  { id: 'tf_ins_02', topicId: 'insiemi_operazioni', type: 'tf', difficulty: 2, question: 'A \\ B = B \\ A per qualsiasi coppia di insiemi A e B.', options: VF, correct: F, explanation: 'La differenza insiemistica non è commutativa: A \\ B contiene elementi di A non in B, mentre B \\ A contiene elementi di B non in A.' },
  { id: 'tf_ins_03', topicId: 'insiemi_operazioni', type: 'tf', difficulty: 3, question: '(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ (legge di De Morgan).', options: VF, correct: V, explanation: 'Prima legge di De Morgan per gli insiemi: il complementare di un\'unione è l\'intersezione dei complementari.' },
  { id: 'tf_ins_04', topicId: 'insiemi_operazioni', type: 'tf', difficulty: 4, question: 'Un insieme con n elementi ha n² sottoinsiemi.', options: VF, correct: F, explanation: 'Un insieme con n elementi ha 2ⁿ sottoinsiemi, non n².' },
  { id: 'tf_ins_05', topicId: 'insiemi_operazioni', type: 'tf', difficulty: 5, question: '|A × B| = |A| · |B| per insiemi finiti A e B.', options: VF, correct: V, explanation: 'Il prodotto cartesiano forma tutte le coppie ordinate (a,b), quindi la cardinalità è il prodotto delle cardinalità.' },

  // ── insiemi_numerici ──────────────────────────────────────────
  { id: 'tf_num_01', topicId: 'insiemi_numerici', type: 'tf', difficulty: 1, question: 'Ogni numero intero è anche un numero razionale.', options: VF, correct: V, explanation: 'ℤ ⊂ ℚ: ogni intero n può essere scritto come n/1, quindi è razionale.' },
  { id: 'tf_num_02', topicId: 'insiemi_numerici', type: 'tf', difficulty: 2, question: '√2 è un numero razionale.', options: VF, correct: F, explanation: '√2 è irrazionale: non può essere scritto come rapporto di due interi. Appartiene a ℝ \\ ℚ.' },
  { id: 'tf_num_03', topicId: 'insiemi_numerici', type: 'tf', difficulty: 3, question: 'ℚ è denso in ℝ: tra due reali distinti esiste sempre un razionale.', options: VF, correct: V, explanation: 'Questa è la proprietà di densità di ℚ in ℝ.' },
  { id: 'tf_num_04', topicId: 'insiemi_numerici', type: 'tf', difficulty: 4, question: 'ℝ e ℚ hanno la stessa cardinalità.', options: VF, correct: F, explanation: '|ℚ| = ℵ₀ (numerabile), mentre |ℝ| = 2^ℵ₀ > ℵ₀. ℝ è non numerabile (argomento diagonale di Cantor).' },
  { id: 'tf_num_05', topicId: 'insiemi_numerici', type: 'tf', difficulty: 5, question: 'ℚ non è completo: esiste un sottoinsieme di ℚ limitato superiormente senza supremo in ℚ.', options: VF, correct: V, explanation: 'Es: {x ∈ ℚ : x² < 2} ha supremo √2 ∉ ℚ. In ℝ invece ogni tale insieme ha il sup.' },

  // ── intervalli_intorni ────────────────────────────────────────
  { id: 'tf_int_01', topicId: 'intervalli_intorni', type: 'tf', difficulty: 1, question: "L'intervallo (a, b) include gli estremi a e b.", options: VF, correct: F, explanation: "(a,b) è l'intervallo aperto: esclude a e b. L'intervallo chiuso [a,b] include gli estremi." },
  { id: 'tf_int_02', topicId: 'intervalli_intorni', type: 'tf', difficulty: 2, question: 'L\'intorno di raggio ε del punto a è l\'insieme {x : |x − a| < ε}.', options: VF, correct: V, explanation: 'Definizione di intorno aperto: tutti i punti a distanza strettamente minore di ε da a.' },
  { id: 'tf_int_03', topicId: 'intervalli_intorni', type: 'tf', difficulty: 3, question: "L'intorno bucato di a include il punto a stesso.", options: VF, correct: F, explanation: "L'intorno bucato è I*(a,ε) = {x : 0 < |x−a| < ε}: esclude esplicitamente il punto a." },
  { id: 'tf_int_04', topicId: 'intervalli_intorni', type: 'tf', difficulty: 4, question: 'Ogni punto di (a,b) è un punto interno dell\'insieme (a,b).', options: VF, correct: V, explanation: 'Un intervallo aperto è un insieme aperto: ogni suo punto ha un intorno contenuto nell\'insieme.' },
  { id: 'tf_int_05', topicId: 'intervalli_intorni', type: 'tf', difficulty: 5, question: 'Un insieme A è chiuso se e solo se il suo complementare è aperto.', options: VF, correct: V, explanation: 'Questa è la definizione topologica di insieme chiuso.' },

  // ── valore_assoluto ───────────────────────────────────────────
  { id: 'tf_val_01', topicId: 'valore_assoluto', type: 'tf', difficulty: 1, question: '|x| ≥ 0 per ogni x ∈ ℝ.', options: VF, correct: V, explanation: 'Il valore assoluto è sempre non negativo per definizione.' },
  { id: 'tf_val_02', topicId: 'valore_assoluto', type: 'tf', difficulty: 2, question: '|a + b| = |a| + |b| per ogni a, b ∈ ℝ.', options: VF, correct: F, explanation: 'Vale solo la disuguaglianza triangolare |a+b| ≤ |a|+|b|. L\'uguaglianza vale solo se a e b hanno lo stesso segno.' },
  { id: 'tf_val_03', topicId: 'valore_assoluto', type: 'tf', difficulty: 3, question: '|x − 3| < 2 equivale a 1 < x < 5.', options: VF, correct: V, explanation: '|x−3| < 2 ⟺ −2 < x−3 < 2 ⟺ 1 < x < 5.' },
  { id: 'tf_val_04', topicId: 'valore_assoluto', type: 'tf', difficulty: 4, question: 'La disuguaglianza triangolare inversa afferma: ||a| − |b|| ≤ |a − b|.', options: VF, correct: V, explanation: 'È una conseguenza della disuguaglianza triangolare standard.' },
  { id: 'tf_val_05', topicId: 'valore_assoluto', type: 'tf', difficulty: 5, question: 'Se |f(x) − L| ≤ 3|x − a|, allora scegliendo δ = ε/3 si ottiene |f(x)−L| < ε per |x−a| < δ.', options: VF, correct: V, explanation: '3|x−a| < 3δ = 3·(ε/3) = ε. È la tecnica base delle dimostrazioni ε-δ.' },

  // ── funzioni_base ─────────────────────────────────────────────
  { id: 'tf_fun_01', topicId: 'funzioni_base', type: 'tf', difficulty: 1, question: 'Il dominio naturale di f(x) = √x è [0, +∞).', options: VF, correct: V, explanation: 'La radice quadrata è definita solo per argomenti ≥ 0.' },
  { id: 'tf_fun_02', topicId: 'funzioni_base', type: 'tf', difficulty: 2, question: "L'immagine di f(x) = x² su ℝ è ℝ.", options: VF, correct: F, explanation: "L'immagine di x² è [0,+∞): il quadrato è sempre non negativo." },
  { id: 'tf_fun_03', topicId: 'funzioni_base', type: 'tf', difficulty: 3, question: 'Codominio e immagine di una funzione coincidono sempre.', options: VF, correct: F, explanation: "L'immagine è sottoinsieme del codominio. Coincidono solo se f è suriettiva." },
  { id: 'tf_fun_04', topicId: 'funzioni_base', type: 'tf', difficulty: 4, question: 'Il dominio naturale di f(x) = ln(x² − 1) è (−∞, −1) ∪ (1, +∞).', options: VF, correct: V, explanation: 'ln richiede argomento > 0: x²−1 > 0 ⟺ |x| > 1.' },
  { id: 'tf_fun_05', topicId: 'funzioni_base', type: 'tf', difficulty: 5, question: 'f(x) = x³ ha immagine ℝ.', options: VF, correct: V, explanation: 'x³ è continua, strettamente crescente, e tende a ±∞: raggiunge ogni valore reale.' },

  // ── iniettivita ───────────────────────────────────────────────
  { id: 'tf_ini_01', topicId: 'iniettivita', type: 'tf', difficulty: 1, question: 'Una funzione iniettiva non può assumere lo stesso valore due volte.', options: VF, correct: V, explanation: 'Definizione di iniettività: x₁ ≠ x₂ ⟹ f(x₁) ≠ f(x₂).' },
  { id: 'tf_ini_02', topicId: 'iniettivita', type: 'tf', difficulty: 2, question: 'f(x) = x² è iniettiva su ℝ.', options: VF, correct: F, explanation: 'f(2) = f(−2) = 4, quindi non è iniettiva su ℝ. Lo è invece su [0,+∞).' },
  { id: 'tf_ini_03', topicId: 'iniettivita', type: 'tf', difficulty: 3, question: 'Ogni funzione strettamente monotona è iniettiva.', options: VF, correct: V, explanation: 'Se f è strettamente crescente o decrescente, valori diversi danno immagini diverse.' },
  { id: 'tf_ini_04', topicId: 'iniettivita', type: 'tf', difficulty: 4, question: 'Una funzione biettiva ha sempre una funzione inversa.', options: VF, correct: V, explanation: 'Biettiva = iniettiva + suriettiva ⟺ esiste f⁻¹ ben definita su tutto il codominio.' },
  { id: 'tf_ini_05', topicId: 'iniettivita', type: 'tf', difficulty: 5, question: 'f: ℝ → ℝ, f(x) = 2x + 1 è biettiva.', options: VF, correct: V, explanation: 'È strettamente crescente (iniettiva) e per ogni y esiste x=(y−1)/2 (suriettiva).' },

  // ── composta_inversa ──────────────────────────────────────────
  { id: 'tf_comp_01', topicId: 'composta_inversa', type: 'tf', difficulty: 1, question: '(f ∘ g)(x) = f(g(x)).', options: VF, correct: V, explanation: 'Definizione di funzione composta: prima si applica g, poi f al risultato.' },
  { id: 'tf_comp_02', topicId: 'composta_inversa', type: 'tf', difficulty: 2, question: 'In generale f ∘ g = g ∘ f.', options: VF, correct: F, explanation: 'La composizione non è commutativa: (f∘g)(x) e (g∘f)(x) sono in generale diverse.' },
  { id: 'tf_comp_03', topicId: 'composta_inversa', type: 'tf', difficulty: 3, question: 'Il grafico di f⁻¹ è la riflessione del grafico di f rispetto alla retta y = x.', options: VF, correct: V, explanation: '(a,b) ∈ grafico f ⟺ (b,a) ∈ grafico f⁻¹, e (b,a) è la riflessione di (a,b) rispetto a y=x.' },
  { id: 'tf_comp_04', topicId: 'composta_inversa', type: 'tf', difficulty: 4, question: '(g ∘ f)⁻¹ = g⁻¹ ∘ f⁻¹.', options: VF, correct: F, explanation: '(g∘f)⁻¹ = f⁻¹ ∘ g⁻¹: l\'ordine si inverte.' },
  { id: 'tf_comp_05', topicId: 'composta_inversa', type: 'tf', difficulty: 5, question: 'f(f⁻¹(x)) = x per ogni x nel codominio di f.', options: VF, correct: V, explanation: 'Per definizione di funzione inversa: f ∘ f⁻¹ = identità sul codominio.' },

  // ── exp_log ───────────────────────────────────────────────────
  { id: 'tf_exp_01', topicId: 'exp_log', type: 'tf', difficulty: 1, question: 'ln(a · b) = ln(a) + ln(b) per a, b > 0.', options: VF, correct: V, explanation: 'Proprietà fondamentale del logaritmo: il log di un prodotto è la somma dei log.' },
  { id: 'tf_exp_02', topicId: 'exp_log', type: 'tf', difficulty: 2, question: 'ln(a + b) = ln(a) + ln(b).', options: VF, correct: F, explanation: 'Non esiste una formula per ln(a+b). La proprietà vale solo per il prodotto: ln(a·b) = ln a + ln b.' },
  { id: 'tf_exp_03', topicId: 'exp_log', type: 'tf', difficulty: 3, question: 'eˣ > 0 per ogni x ∈ ℝ.', options: VF, correct: V, explanation: 'La funzione esponenziale è sempre strettamente positiva su tutto ℝ.' },
  { id: 'tf_exp_04', topicId: 'exp_log', type: 'tf', difficulty: 4, question: 'lim_{x→0} (eˣ − 1)/x = 1.', options: VF, correct: V, explanation: 'Limite notevole fondamentale, equivalente alla derivata di eˣ in 0.' },
  { id: 'tf_exp_05', topicId: 'exp_log', type: 'tf', difficulty: 5, question: 'eˣ cresce più velocemente di xⁿ per qualsiasi n per x → +∞.', options: VF, correct: V, explanation: 'Gerarchia degli infiniti: xⁿ ≪ eˣ per x → +∞, cioè lim xⁿ/eˣ = 0.' },

  // ── trigonometria ─────────────────────────────────────────────
  { id: 'tf_trig_01', topicId: 'trigonometria', type: 'tf', difficulty: 1, question: 'sin²(x) + cos²(x) = 1 per ogni x ∈ ℝ.', options: VF, correct: V, explanation: 'Identità di Pitagora trigonometrica, valida per tutti i valori reali.' },
  { id: 'tf_trig_02', topicId: 'trigonometria', type: 'tf', difficulty: 2, question: 'sin(π) = 1.', options: VF, correct: F, explanation: 'sin(π) = 0. È sin(π/2) = 1.' },
  { id: 'tf_trig_03', topicId: 'trigonometria', type: 'tf', difficulty: 3, question: 'lim_{x→0} sin(x)/x = 1.', options: VF, correct: V, explanation: 'Limite notevole fondamentale.' },
  { id: 'tf_trig_04', topicId: 'trigonometria', type: 'tf', difficulty: 4, question: 'Il dominio di arcsin(x) è ℝ.', options: VF, correct: F, explanation: 'Il dominio di arcsin è [−1, 1], perché sin assume valori solo in quell\'intervallo.' },
  { id: 'tf_trig_05', topicId: 'trigonometria', type: 'tf', difficulty: 5, question: 'sin(2x) = 2 sin(x) cos(x).', options: VF, correct: V, explanation: 'Formula del seno dell\'angolo doppio, ricavabile dalla formula di addizione.' },

  // ── estremo_sup ───────────────────────────────────────────────
  { id: 'tf_esup_01', topicId: 'estremo_sup', type: 'tf', difficulty: 1, question: 'Il supremo di un insieme A appartiene sempre ad A.', options: VF, correct: F, explanation: 'Il sup può non appartenere ad A: sup(0,1) = 1 ma 1 ∉ (0,1).' },
  { id: 'tf_esup_02', topicId: 'estremo_sup', type: 'tf', difficulty: 2, question: 'Se A ha massimo, allora max A = sup A.', options: VF, correct: V, explanation: 'Il massimo è il più grande elemento di A, che è anche il più piccolo dei maggioranti.' },
  { id: 'tf_esup_03', topicId: 'estremo_sup', type: 'tf', difficulty: 3, question: 'Ogni sottoinsieme non vuoto di ℝ limitato superiormente ha supremo in ℝ.', options: VF, correct: V, explanation: 'Questo è l\'assioma di completezza di ℝ (proprietà dell\'estremo superiore).' },
  { id: 'tf_esup_04', topicId: 'estremo_sup', type: 'tf', difficulty: 4, question: 'sup A è sempre un maggiorante di A.', options: VF, correct: V, explanation: 'Per definizione il sup è il più piccolo dei maggioranti, quindi in particolare è un maggiorante.' },
  { id: 'tf_esup_05', topicId: 'estremo_sup', type: 'tf', difficulty: 5, question: 'In ℚ, l\'insieme {x ∈ ℚ : x² < 2} ha supremo in ℚ.', options: VF, correct: F, explanation: 'Il sup sarebbe √2, ma √2 ∉ ℚ. Questo dimostra che ℚ non è completo.' },

  // ── principio_induzione ────────────────────────────────────────
  { id: 'tf_ind_01', topicId: 'principio_induzione', type: 'tf', difficulty: 1, question: 'Nel principio di induzione, il caso base verifica P(1) (o P(0)).', options: VF, correct: V, explanation: 'Il caso base è il primo passo: dimostrare che P vale per il valore iniziale.' },
  { id: 'tf_ind_02', topicId: 'principio_induzione', type: 'tf', difficulty: 2, question: '1 + 2 + … + n = n(n+1)/2 per ogni n ∈ ℕ.', options: VF, correct: V, explanation: 'Formula di Gauss, dimostrabile per induzione.' },
  { id: 'tf_ind_03', topicId: 'principio_induzione', type: 'tf', difficulty: 3, question: 'Il passo induttivo assume P(n) vera per tutti gli n e dimostra P(n+1).', options: VF, correct: F, explanation: 'Si assume P(n) vera per un fissato n (ipotesi induttiva), non per tutti.' },
  { id: 'tf_ind_04', topicId: 'principio_induzione', type: 'tf', difficulty: 4, question: 'n! > 2ⁿ per ogni n ≥ 4.', options: VF, correct: V, explanation: 'Caso base n=4: 24 > 16 ✓. Il passo usa (n+1)! = (n+1)·n! > (n+1)·2ⁿ > 2·2ⁿ = 2^(n+1).' },
  { id: 'tf_ind_05', topicId: 'principio_induzione', type: 'tf', difficulty: 5, question: "L'induzione forte è più potente dell'induzione ordinaria.", options: VF, correct: F, explanation: 'Sono equivalenti: qualsiasi risultato dimostrabile con una si può dimostrare con l\'altra.' },

  // ── completezza_r ──────────────────────────────────────────────
  { id: 'tf_cr_01', topicId: 'completezza_r', type: 'tf', difficulty: 1, question: 'ℝ è completo: ogni successione di Cauchy in ℝ converge in ℝ.', options: VF, correct: V, explanation: 'Questa è la proprietà di completezza di ℝ.' },
  { id: 'tf_cr_02', topicId: 'completezza_r', type: 'tf', difficulty: 2, question: 'ℚ è completo.', options: VF, correct: F, explanation: 'ℚ non è completo: la successione 1, 1.4, 1.41, 1.414,… è di Cauchy in ℚ ma converge a √2 ∉ ℚ.' },
  { id: 'tf_cr_03', topicId: 'completezza_r', type: 'tf', difficulty: 3, question: 'Ogni successione monotona e limitata in ℝ converge.', options: VF, correct: V, explanation: 'Conseguenza della completezza di ℝ.' },
  { id: 'tf_cr_04', topicId: 'completezza_r', type: 'tf', difficulty: 4, question: 'Ogni successione di Cauchy in ℝ è limitata.', options: VF, correct: V, explanation: 'Ogni successione di Cauchy è limitata (proprietà generale).' },
  { id: 'tf_cr_05', topicId: 'completezza_r', type: 'tf', difficulty: 5, question: 'Essere un campo ordinato è sufficiente per essere completo.', options: VF, correct: F, explanation: 'Anche ℚ è un campo ordinato ma non è completo. La completezza è una proprietà aggiuntiva.' },

  // ── limite_successione ─────────────────────────────────────────
  { id: 'tf_ls_01', topicId: 'limite_successione', type: 'tf', difficulty: 1, question: 'lim_{n→∞} 1/n = 0.', options: VF, correct: V, explanation: 'Per ogni ε>0, basta scegliere N > 1/ε: per n>N si ha |1/n| < ε.' },
  { id: 'tf_ls_02', topicId: 'limite_successione', type: 'tf', difficulty: 2, question: 'Ogni successione limitata converge.', options: VF, correct: F, explanation: '(-1)ⁿ è limitata ma non converge: oscilla tra 1 e -1.' },
  { id: 'tf_ls_03', topicId: 'limite_successione', type: 'tf', difficulty: 3, question: 'Se aₙ → L allora |aₙ| → |L|.', options: VF, correct: V, explanation: 'Per la continuità del valore assoluto: |aₙ − L| ≥ ||aₙ| − |L||, quindi se il primo → 0 anche il secondo → 0.' },
  { id: 'tf_ls_04', topicId: 'limite_successione', type: 'tf', difficulty: 4, question: 'Se aₙ ≤ bₙ per ogni n e aₙ → L, bₙ → M, allora L ≤ M.', options: VF, correct: V, explanation: 'Il limite preserva le disuguaglianze (non strette).' },
  { id: 'tf_ls_05', topicId: 'limite_successione', type: 'tf', difficulty: 5, question: 'lim_{n→∞} (1 + 1/n)ⁿ = e.', options: VF, correct: V, explanation: 'È una delle definizioni fondamentali del numero di Eulero e.' },

  // ── successioni_monotone ───────────────────────────────────────
  { id: 'tf_sm_01', topicId: 'successioni_monotone', type: 'tf', difficulty: 1, question: 'Una successione crescente è necessariamente limitata.', options: VF, correct: F, explanation: 'aₙ = n è crescente ma non limitata superiormente.' },
  { id: 'tf_sm_02', topicId: 'successioni_monotone', type: 'tf', difficulty: 2, question: 'Una successione crescente e limitata superiormente converge.', options: VF, correct: V, explanation: 'Teorema fondamentale sulle successioni monotone: il limite è il sup dell\'insieme dei valori.' },
  { id: 'tf_sm_03', topicId: 'successioni_monotone', type: 'tf', difficulty: 3, question: 'aₙ = n/(n+1) è crescente.', options: VF, correct: V, explanation: 'aₙ₊₁ − aₙ = 1/((n+1)(n+2)) > 0 per ogni n.' },
  { id: 'tf_sm_04', topicId: 'successioni_monotone', type: 'tf', difficulty: 4, question: 'Se aₙ → L e aₙ₊₁ = f(aₙ), allora L = f(L) (equazione del punto fisso).', options: VF, correct: V, explanation: 'Passando al limite nell\'equazione di ricorrenza si ottiene la condizione L = f(L).' },
  { id: 'tf_sm_05', topicId: 'successioni_monotone', type: 'tf', difficulty: 5, question: 'Una successione decrescente e limitata inferiormente converge al suo infimo.', options: VF, correct: V, explanation: 'Duale del teorema per successioni crescenti: converge e il limite è l\'inf.' },

  // ── cauchy_successione ─────────────────────────────────────────
  { id: 'tf_cau_01', topicId: 'cauchy_successione', type: 'tf', difficulty: 1, question: 'Ogni successione convergente è di Cauchy.', options: VF, correct: V, explanation: 'Se aₙ → L, allora |aₙ − aₘ| ≤ |aₙ−L| + |L−aₘ| → 0.' },
  { id: 'tf_cau_02', topicId: 'cauchy_successione', type: 'tf', difficulty: 2, question: 'In ℝ, ogni successione di Cauchy converge.', options: VF, correct: V, explanation: 'Questo è il criterio di Cauchy, equivalente alla completezza di ℝ.' },
  { id: 'tf_cau_03', topicId: 'cauchy_successione', type: 'tf', difficulty: 3, question: 'Ogni successione di Cauchy è limitata.', options: VF, correct: V, explanation: 'Da un certo N in poi i termini stanno in un intorno di aₙ, quindi la successione è limitata.' },
  { id: 'tf_cau_04', topicId: 'cauchy_successione', type: 'tf', difficulty: 4, question: 'In ℚ, ogni successione di Cauchy converge in ℚ.', options: VF, correct: F, explanation: 'ℚ non è completo: esistono successioni di Cauchy in ℚ che convergono a irrazionali.' },
  { id: 'tf_cau_05', topicId: 'cauchy_successione', type: 'tf', difficulty: 5, question: 'aₙ = (-1)ⁿ è una successione di Cauchy.', options: VF, correct: F, explanation: '|a_{n+1} − aₙ| = 2 per ogni n, quindi non può essere di Cauchy.' },

  // ── numero_eulero ──────────────────────────────────────────────
  { id: 'tf_eu_01', topicId: 'numero_eulero', type: 'tf', difficulty: 1, question: 'e ≈ 2.718 è un numero irrazionale.', options: VF, correct: V, explanation: 'e è irrazionale (e anche trascendente).' },
  { id: 'tf_eu_02', topicId: 'numero_eulero', type: 'tf', difficulty: 2, question: 'e = lim_{n→∞} (1 + 1/n)ⁿ.', options: VF, correct: V, explanation: 'È una delle definizioni fondamentali di e.' },
  { id: 'tf_eu_03', topicId: 'numero_eulero', type: 'tf', difficulty: 3, question: 'La successione (1 + 1/n)ⁿ è decrescente.', options: VF, correct: F, explanation: 'È strettamente crescente e converge a e.' },
  { id: 'tf_eu_04', topicId: 'numero_eulero', type: 'tf', difficulty: 4, question: 'lim_{x→0} (eˣ − 1)/x = 1.', options: VF, correct: V, explanation: 'Limite notevole fondamentale: è la derivata di eˣ calcolata in 0.' },
  { id: 'tf_eu_05', topicId: 'numero_eulero', type: 'tf', difficulty: 5, question: 'e = ∑_{n=0}^∞ 1/n! = 1 + 1 + 1/2 + 1/6 + …', options: VF, correct: V, explanation: 'È lo sviluppo in serie di Taylor di eˣ valutato in x=1.' },

  // ── limite_eps_delta ───────────────────────────────────────────
  { id: 'tf_eps_01', topicId: 'limite_eps_delta', type: 'tf', difficulty: 1, question: 'Nella definizione ε-δ di limite, δ può dipendere da ε.', options: VF, correct: V, explanation: 'δ è scelto in funzione di ε: per ogni ε>0 si trova un δ>0 che funziona.' },
  { id: 'tf_eps_02', topicId: 'limite_eps_delta', type: 'tf', difficulty: 2, question: 'Nella definizione di lim_{x→a} f(x) = L, si richiede che f sia definita in a.', options: VF, correct: F, explanation: 'La condizione 0 < |x−a| < δ esclude x=a: il limite studia il comportamento vicino ad a, non in a.' },
  { id: 'tf_eps_03', topicId: 'limite_eps_delta', type: 'tf', difficulty: 3, question: 'Per dimostrare lim_{x→2} 3x = 6, si può scegliere δ = ε/3.', options: VF, correct: V, explanation: '|3x − 6| = 3|x−2| < 3δ = ε se δ = ε/3.' },
  { id: 'tf_eps_04', topicId: 'limite_eps_delta', type: 'tf', difficulty: 4, question: 'Il limite di una funzione in un punto è unico (se esiste).', options: VF, correct: V, explanation: 'Il limite è unico per definizione: se esistessero L₁ ≠ L₂ si arriverebbe a una contraddizione.' },
  { id: 'tf_eps_05', topicId: 'limite_eps_delta', type: 'tf', difficulty: 5, question: 'Se lim_{x→a} f(x) = L e lim_{x→a} g(x) = M, allora lim_{x→a} f(x)·g(x) = L·M.', options: VF, correct: V, explanation: 'Algebra dei limiti: il limite del prodotto è il prodotto dei limiti (se entrambi esistono e sono finiti).' },

  // ── algebra_limiti ─────────────────────────────────────────────
  { id: 'tf_alg_01', topicId: 'algebra_limiti', type: 'tf', difficulty: 1, question: '0/0 è una forma indeterminata.', options: VF, correct: V, explanation: '0/0 non ha un valore definito: il risultato dipende dalle funzioni specifiche.' },
  { id: 'tf_alg_02', topicId: 'algebra_limiti', type: 'tf', difficulty: 2, question: 'lim_{x→3} (x²−9)/(x−3) = 0.', options: VF, correct: F, explanation: 'Si fattorizza: (x²−9)/(x−3) = (x+3) per x≠3. Il limite è 3+3 = 6.' },
  { id: 'tf_alg_03', topicId: 'algebra_limiti', type: 'tf', difficulty: 3, question: 'Se lim f(x) = +∞ e lim g(x) = +∞, allora lim (f−g) = 0.', options: VF, correct: F, explanation: '∞−∞ è una forma indeterminata: il risultato dipende dalla velocità di crescita.' },
  { id: 'tf_alg_04', topicId: 'algebra_limiti', type: 'tf', difficulty: 4, question: 'lim_{x→+∞} (3x²+2x)/(x²−1) = 3.', options: VF, correct: V, explanation: 'Dividendo per x²: (3+2/x)/(1−1/x²) → 3/1 = 3.' },
  { id: 'tf_alg_05', topicId: 'algebra_limiti', type: 'tf', difficulty: 5, question: 'lim_{x→0} x·sin(1/x) = 0.', options: VF, correct: V, explanation: '|x·sin(1/x)| ≤ |x| → 0: teorema del confronto con ±|x|.' },

  // ── forme_indeterminate ────────────────────────────────────────
  { id: 'tf_fi_01', topicId: 'forme_indeterminate', type: 'tf', difficulty: 1, question: '∞ + ∞ è una forma indeterminata.', options: VF, correct: F, explanation: '∞ + ∞ = +∞, non è indeterminata. Le forme indeterminate includono ∞−∞, 0·∞, 0/0, ecc.' },
  { id: 'tf_fi_02', topicId: 'forme_indeterminate', type: 'tf', difficulty: 2, question: '1^∞ è una forma indeterminata.', options: VF, correct: V, explanation: 'Il limite dipende dalla velocità con cui la base tende a 1 e l\'esponente a ∞. Es: (1+1/n)ⁿ → e.' },
  { id: 'tf_fi_03', topicId: 'forme_indeterminate', type: 'tf', difficulty: 3, question: 'Per risolvere lim xˣ per x→0⁺ (forma 0⁰), si scrive xˣ = e^(x ln x).', options: VF, correct: V, explanation: 'La forma 0⁰ si risolve esponenziando: xˣ = e^(x ln x) e poi si calcola lim x ln x = 0.' },
  { id: 'tf_fi_04', topicId: 'forme_indeterminate', type: 'tf', difficulty: 4, question: 'De L\'Hôpital si applica anche alla forma ∞−∞.', options: VF, correct: F, explanation: 'De L\'Hôpital si applica solo a 0/0 e ∞/∞. Per ∞−∞ si deve prima ricondurre a una di queste forme.' },
  { id: 'tf_fi_05', topicId: 'forme_indeterminate', type: 'tf', difficulty: 5, question: 'Se lim f/g non esiste, allora lim (f+g) non esiste.', options: VF, correct: F, explanation: 'Falso in generale. Es: f(x)=sin x, g(x)=−sin x: lim f/g non esiste ma lim(f+g)=0.' },

  // ── limiti_notevoli ────────────────────────────────────────────
  { id: 'tf_ln_01', topicId: 'limiti_notevoli', type: 'tf', difficulty: 1, question: 'lim_{x→0} sin(x)/x = 1.', options: VF, correct: V, explanation: 'Limite notevole fondamentale.' },
  { id: 'tf_ln_02', topicId: 'limiti_notevoli', type: 'tf', difficulty: 2, question: 'lim_{x→0} (1−cos x)/x = 0.', options: VF, correct: V, explanation: '(1−cos x)/x ~ x/2 per x→0, quindi il limite è 0. (Non confondere con (1−cos x)/x²  = 1/2.)' },
  { id: 'tf_ln_03', topicId: 'limiti_notevoli', type: 'tf', difficulty: 3, question: 'lim_{x→0} (1−cos x)/x² = 1/2.', options: VF, correct: V, explanation: 'Limite notevole: 1−cos x ~ x²/2 per x→0.' },
  { id: 'tf_ln_04', topicId: 'limiti_notevoli', type: 'tf', difficulty: 4, question: 'sin x ~ x e 1−cos x ~ x²/2 sono equivalenze asintotiche valide solo per x→0.', options: VF, correct: V, explanation: 'Le equivalenze asintotiche degli sviluppi di Taylor valgono in un intorno di 0.' },
  { id: 'tf_ln_05', topicId: 'limiti_notevoli', type: 'tf', difficulty: 5, question: 'lim_{x→0} (eˣ − 1 − x)/x² = 1/2.', options: VF, correct: V, explanation: 'Dal Taylor: eˣ = 1 + x + x²/2 + …, quindi (eˣ−1−x)/x² → 1/2.' },

  // ── confronto_infiniti ─────────────────────────────────────────
  { id: 'tf_ci_01', topicId: 'confronto_infiniti', type: 'tf', difficulty: 1, question: 'ln x cresce più lentamente di x per x → +∞.', options: VF, correct: V, explanation: 'lim ln x / x = 0: la potenza x domina il logaritmo.' },
  { id: 'tf_ci_02', topicId: 'confronto_infiniti', type: 'tf', difficulty: 2, question: 'sin x ~ x per x→0 significa lim_{x→0} sin(x)/x = 1.', options: VF, correct: V, explanation: 'Due funzioni sono asintoticamente equivalenti se il loro rapporto tende a 1.' },
  { id: 'tf_ci_03', topicId: 'confronto_infiniti', type: 'tf', difficulty: 3, question: 'Se α ~ β si può sempre sostituire α con β in una somma.', options: VF, correct: F, explanation: 'Gli equivalenti si usano solo nei prodotti/quozienti, mai nelle somme: (sin x − x)/x³ ≠ (x−x)/x³ = 0.' },
  { id: 'tf_ci_04', topicId: 'confronto_infiniti', type: 'tf', difficulty: 4, question: 'eˣ cresce più velocemente di xⁿ per qualsiasi n ∈ ℕ per x → +∞.', options: VF, correct: V, explanation: 'lim xⁿ/eˣ = 0 per ogni n: l\'esponenziale domina qualsiasi potenza.' },
  { id: 'tf_ci_05', topicId: 'confronto_infiniti', type: 'tf', difficulty: 5, question: '1−cos x è un infinitesimo di ordine 2 rispetto a x per x→0.', options: VF, correct: V, explanation: 'lim (1−cos x)/x² = 1/2 ≠ 0, quindi l\'ordine rispetto a x è esattamente 2.' },

  // ── continuita_def ─────────────────────────────────────────────
  { id: 'tf_cont_01', topicId: 'continuita_def', type: 'tf', difficulty: 1, question: 'Se f è derivabile in x₀, allora f è continua in x₀.', options: VF, correct: V, explanation: 'La derivabilità è una condizione più forte della continuità.' },
  { id: 'tf_cont_02', topicId: 'continuita_def', type: 'tf', difficulty: 2, question: 'f(x) = |x| è continua in x = 0.', options: VF, correct: V, explanation: 'lim_{x→0} |x| = 0 = f(0): tutte le condizioni di continuità sono soddisfatte.' },
  { id: 'tf_cont_03', topicId: 'continuita_def', type: 'tf', difficulty: 3, question: 'Una funzione continua su [a,b] è uniformemente continua su [a,b].', options: VF, correct: V, explanation: 'Teorema di Heine-Cantor: continuità su compatto implica continuità uniforme.' },
  { id: 'tf_cont_04', topicId: 'continuita_def', type: 'tf', difficulty: 4, question: 'f(x) = 1/x è uniformemente continua su (0,1).', options: VF, correct: F, explanation: '1/x non è uniformemente continua su (0,1): per x vicino a 0 piccole variazioni di x producono grandi variazioni di f.' },
  { id: 'tf_cont_05', topicId: 'continuita_def', type: 'tf', difficulty: 5, question: 'La continuità in ogni punto implica la continuità uniforme.', options: VF, correct: F, explanation: 'Falso in generale: serve che il dominio sia compatto (chiuso e limitato).' },

  // ── bolzano ────────────────────────────────────────────────────
  { id: 'tf_bol_01', topicId: 'bolzano', type: 'tf', difficulty: 1, question: 'Il teorema degli zeri richiede che f sia continua su [a,b].', options: VF, correct: V, explanation: 'La continuità è l\'ipotesi fondamentale del teorema.' },
  { id: 'tf_bol_02', topicId: 'bolzano', type: 'tf', difficulty: 2, question: 'Se f(a)·f(b) < 0 e f è continua, lo zero in (a,b) è unico.', options: VF, correct: F, explanation: 'Bolzano garantisce almeno uno zero, ma potrebbero esserci più zeri.' },
  { id: 'tf_bol_03', topicId: 'bolzano', type: 'tf', difficulty: 3, question: 'Ogni polinomio di grado dispari ha almeno una radice reale.', options: VF, correct: V, explanation: 'Un polinomio di grado dispari tende a +∞ e −∞ per x→±∞: per Bolzano ha almeno uno zero.' },
  { id: 'tf_bol_04', topicId: 'bolzano', type: 'tf', difficulty: 4, question: 'f: [0,1] → [0,1] continua ha sempre un punto fisso.', options: VF, correct: V, explanation: 'g(x) = f(x)−x: g(0) ≥ 0 e g(1) ≤ 0, per Bolzano ∃x₀: g(x₀) = 0, cioè f(x₀) = x₀.' },
  { id: 'tf_bol_05', topicId: 'bolzano', type: 'tf', difficulty: 5, question: 'Il teorema dei valori intermedi generalizza il teorema degli zeri di Bolzano.', options: VF, correct: V, explanation: 'TVI dice che f assume tutti i valori tra f(a) e f(b); Bolzano è il caso speciale in cui 0 è tra f(a) e f(b).' },

  // ── weierstrass ────────────────────────────────────────────────
  { id: 'tf_wei_01', topicId: 'weierstrass', type: 'tf', difficulty: 1, question: 'Una funzione continua su [a,b] raggiunge il suo massimo e minimo assoluti.', options: VF, correct: V, explanation: 'Teorema di Weierstrass.' },
  { id: 'tf_wei_02', topicId: 'weierstrass', type: 'tf', difficulty: 2, question: 'f(x) = 1/x su (0,1] ha massimo assoluto.', options: VF, correct: F, explanation: 'f(x) = 1/x → +∞ per x→0⁺: non è limitata superiormente su (0,1], quindi non ha massimo.' },
  { id: 'tf_wei_03', topicId: 'weierstrass', type: 'tf', difficulty: 3, question: 'Weierstrass si applica anche a intervalli aperti come (a,b).', options: VF, correct: F, explanation: 'Serve un intervallo chiuso e limitato: su (a,b) aperto il teorema può fallire.' },
  { id: 'tf_wei_04', topicId: 'weierstrass', type: 'tf', difficulty: 4, question: "L'immagine di una funzione continua su [a,b] è un intervallo chiuso [m,M].", options: VF, correct: V, explanation: 'Combinando Weierstrass (raggiunge m e M) con TVI (assume tutti i valori intermedi).' },
  { id: 'tf_wei_05', topicId: 'weierstrass', type: 'tf', difficulty: 5, question: 'Weierstrass vale per f continua su ℝ.', options: VF, correct: F, explanation: 'ℝ non è compatto. f(x) = x è continua su ℝ ma non ha né massimo né minimo.' },

  // ── discontinuita ──────────────────────────────────────────────
  { id: 'tf_disc_01', topicId: 'discontinuita', type: 'tf', difficulty: 1, question: 'Una discontinuità eliminabile si chiama così perché si può riparare ridefinendo f nel punto.', options: VF, correct: V, explanation: 'Esiste il limite finito L: si ridefinisce f(x₀) = L e la funzione diventa continua.' },
  { id: 'tf_disc_02', topicId: 'discontinuita', type: 'tf', difficulty: 2, question: 'Una discontinuità di prima specie (salto) ha entrambi i limiti laterali finiti ma diversi.', options: VF, correct: V, explanation: 'Definizione di discontinuità di prima specie.' },
  { id: 'tf_disc_03', topicId: 'discontinuita', type: 'tf', difficulty: 3, question: 'f(x) = sin(1/x) ha una discontinuità eliminabile in x = 0.', options: VF, correct: F, explanation: 'Il limite per x→0 non esiste (oscillazione): è una discontinuità di seconda specie.' },
  { id: 'tf_disc_04', topicId: 'discontinuita', type: 'tf', difficulty: 4, question: 'Una funzione con un asintoto verticale in x₀ ha una discontinuità di seconda specie.', options: VF, correct: V, explanation: 'Se f(x) → ±∞ per x→x₀, almeno uno dei limiti laterali non è finito: discontinuità di seconda specie.' },
  { id: 'tf_disc_05', topicId: 'discontinuita', type: 'tf', difficulty: 5, question: 'La funzione parte intera ⌊x⌋ ha discontinuità di prima specie in ogni intero.', options: VF, correct: V, explanation: 'In ogni intero n: lim da sinistra = n−1, lim da destra = n: salto di 1.' },

  // ── derivata_def ───────────────────────────────────────────────
  { id: 'tf_der_01', topicId: 'derivata_def', type: 'tf', difficulty: 1, question: 'La derivata di f in x₀ è il limite del rapporto incrementale per h→0.', options: VF, correct: V, explanation: "f'(x₀) = lim_{h→0} [f(x₀+h)−f(x₀)]/h per definizione." },
  { id: 'tf_der_02', topicId: 'derivata_def', type: 'tf', difficulty: 2, question: 'Se f è continua in x₀ allora f è derivabile in x₀.', options: VF, correct: F, explanation: 'La continuità è necessaria ma non sufficiente: |x| è continua in 0 ma non derivabile.' },
  { id: 'tf_der_03', topicId: 'derivata_def', type: 'tf', difficulty: 3, question: "La derivata f'(x₀) rappresenta geometricamente la pendenza della retta tangente al grafico in x₀.", options: VF, correct: V, explanation: "Interpretazione geometrica della derivata." },
  { id: 'tf_der_04', topicId: 'derivata_def', type: 'tf', difficulty: 4, question: 'f(x) = |x| è derivabile in x = 0.', options: VF, correct: F, explanation: 'Il limite destro del rapporto incrementale è 1, quello sinistro è -1: la derivata non esiste.' },
  { id: 'tf_der_05', topicId: 'derivata_def', type: 'tf', difficulty: 5, question: "f(x) = x²·sin(1/x) per x≠0 e f(0)=0 è derivabile in 0 con f'(0) = 0.", options: VF, correct: V, explanation: "f'(0) = lim_{h→0} h·sin(1/h) = 0 per il teorema del confronto: |h·sin(1/h)| ≤ |h| → 0." },

  // ── regole_derivazione ─────────────────────────────────────────
  { id: 'tf_reg_01', topicId: 'regole_derivazione', type: 'tf', difficulty: 1, question: "La derivata di xⁿ è n·xⁿ⁻¹.", options: VF, correct: V, explanation: 'Regola della potenza.' },
  { id: 'tf_reg_02', topicId: 'regole_derivazione', type: 'tf', difficulty: 2, question: "(f·g)' = f'·g'.", options: VF, correct: F, explanation: "La regola del prodotto è (f·g)' = f'·g + f·g', non f'·g'." },
  { id: 'tf_reg_03', topicId: 'regole_derivazione', type: 'tf', difficulty: 3, question: "La derivata di ln|x| è 1/x per x ≠ 0.", options: VF, correct: V, explanation: 'Vale sia per x>0 che per x<0.' },
  { id: 'tf_reg_04', topicId: 'regole_derivazione', type: 'tf', difficulty: 4, question: "La derivata di eˣ è eˣ.", options: VF, correct: V, explanation: 'La funzione esponenziale è uguale alla sua derivata.' },
  { id: 'tf_reg_05', topicId: 'regole_derivazione', type: 'tf', difficulty: 5, question: "La derivata di arctan(x) è 1/(1+x²).", options: VF, correct: V, explanation: 'Si ricava dalla formula della derivata della funzione inversa.' },

  // ── chain_rule ─────────────────────────────────────────────────
  { id: 'tf_chain_01', topicId: 'chain_rule', type: 'tf', difficulty: 1, question: "La derivata di f(g(x)) è f'(g(x))·g'(x).", options: VF, correct: V, explanation: 'Regola della catena.' },
  { id: 'tf_chain_02', topicId: 'chain_rule', type: 'tf', difficulty: 2, question: "La derivata di sin(x²) è cos(x²).", options: VF, correct: F, explanation: 'Si applica la chain rule: d/dx[sin(x²)] = cos(x²)·2x = 2x·cos(x²).' },
  { id: 'tf_chain_03', topicId: 'chain_rule', type: 'tf', difficulty: 3, question: "La derivata di e^(sin x) è e^(sin x)·cos x.", options: VF, correct: V, explanation: 'Chain rule: d/dx[e^u] = e^u·u\' con u = sin x, u\' = cos x.' },
  { id: 'tf_chain_04', topicId: 'chain_rule', type: 'tf', difficulty: 4, question: "La derivata di ln(cos x) è −tan x.", options: VF, correct: V, explanation: "d/dx[ln(cos x)] = (−sin x)/cos x = −tan x." },
  { id: 'tf_chain_05', topicId: 'chain_rule', type: 'tf', difficulty: 5, question: 'La chain rule si applica anche alla derivazione implicita.', options: VF, correct: V, explanation: 'Derivando implicitamente F(x,y)=0, si usa la chain rule sulla y vista come funzione di x.' },

  // ── teoremi_derivate ───────────────────────────────────────────
  { id: 'tf_tder_01', topicId: 'teoremi_derivate', type: 'tf', difficulty: 1, question: "Il teorema di Fermat afferma che se f ha un estremo locale in x₀ e f è derivabile in x₀, allora f'(x₀) = 0.", options: VF, correct: V, explanation: 'Condizione necessaria per un estremo locale.' },
  { id: 'tf_tder_02', topicId: 'teoremi_derivate', type: 'tf', difficulty: 2, question: "Se f'(x₀) = 0 allora x₀ è un estremo locale.", options: VF, correct: F, explanation: "f'(0)=0 per f(x)=x³, ma 0 non è un estremo bensì un flesso." },
  { id: 'tf_tder_03', topicId: 'teoremi_derivate', type: 'tf', difficulty: 3, question: 'Il teorema di Rolle richiede f(a) = f(b).', options: VF, correct: V, explanation: "Le tre ipotesi di Rolle sono: continuità su [a,b], derivabilità su (a,b), e f(a)=f(b)." },
  { id: 'tf_tder_04', topicId: 'teoremi_derivate', type: 'tf', difficulty: 4, question: "Il teorema di Lagrange garantisce c ∈ (a,b) tale che f'(c) = (f(b)−f(a))/(b−a).", options: VF, correct: V, explanation: 'Teorema del valor medio: esiste un punto dove la pendenza puntuale eguaglia quella media.' },
  { id: 'tf_tder_05', topicId: 'teoremi_derivate', type: 'tf', difficulty: 5, question: "Se f'(x) = 0 per ogni x ∈ (a,b), allora f è costante su [a,b].", options: VF, correct: V, explanation: 'Corollario di Lagrange: pendenza nulla ovunque implica funzione costante.' },

  // ── de_lhopital ────────────────────────────────────────────────
  { id: 'tf_hop_01', topicId: 'de_lhopital', type: 'tf', difficulty: 1, question: "La regola di De L'Hôpital si applica alla forma 0/0.", options: VF, correct: V, explanation: "De L'Hôpital si applica a 0/0 e ∞/∞." },
  { id: 'tf_hop_02', topicId: 'de_lhopital', type: 'tf', difficulty: 2, question: "De L'Hôpital si applica alla forma 0·∞ direttamente.", options: VF, correct: F, explanation: '0·∞ deve essere riscritta come 0/(1/∞) o ∞/(1/0) per ricondurla a 0/0 o ∞/∞.' },
  { id: 'tf_hop_03', topicId: 'de_lhopital', type: 'tf', difficulty: 3, question: "Se lim f'/g' non esiste, allora lim f/g non esiste.", options: VF, correct: F, explanation: "Se lim f'/g' non esiste, De L'Hôpital non si applica, ma lim f/g potrebbe comunque esistere." },
  { id: 'tf_hop_04', topicId: 'de_lhopital', type: 'tf', difficulty: 4, question: "lim_{x→0} (sin x)/x = 1 si può dimostrare con De L'Hôpital.", options: VF, correct: V, explanation: "Forma 0/0: lim sin'(x)/1' = lim cos x = 1." },
  { id: 'tf_hop_05', topicId: 'de_lhopital', type: 'tf', difficulty: 5, question: "De L'Hôpital può essere applicato più volte di seguito.", options: VF, correct: V, explanation: 'Se dopo una applicazione la forma rimane indeterminata, si può ripetere.' },

  // ── monotonia ──────────────────────────────────────────────────
  { id: 'tf_mon_01', topicId: 'monotonia', type: 'tf', difficulty: 1, question: "Se f'(x) > 0 su (a,b) allora f è crescente su [a,b].", options: VF, correct: V, explanation: 'Criterio della derivata prima per la monotonia.' },
  { id: 'tf_mon_02', topicId: 'monotonia', type: 'tf', difficulty: 2, question: "Se f è crescente su [a,b] allora f'(x) > 0 per ogni x ∈ (a,b).", options: VF, correct: F, explanation: "f(x) = x³ è crescente su ℝ ma f'(0) = 0." },
  { id: 'tf_mon_03', topicId: 'monotonia', type: 'tf', difficulty: 3, question: "f(x) = x³−3x è decrescente su (−1,1).", options: VF, correct: V, explanation: "f'(x) = 3x²−3 = 3(x²−1) < 0 per x ∈ (−1,1)." },
  { id: 'tf_mon_04', topicId: 'monotonia', type: 'tf', difficulty: 4, question: "f'(x₀) = 0 è necessario ma non sufficiente per un estremo locale.", options: VF, correct: V, explanation: "f'(0)=0 per f(x)=x³, ma 0 è un flesso, non un estremo." },
  { id: 'tf_mon_05', topicId: 'monotonia', type: 'tf', difficulty: 5, question: "f(x) = x + sin x è strettamente crescente su ℝ nonostante f'(nπ) = 0.", options: VF, correct: V, explanation: "f'(x) = 1 + cos x ≥ 0 e si annulla solo in punti isolati, quindi f è strettamente crescente." },

  // ── massimi_minimi ─────────────────────────────────────────────
  { id: 'tf_mm_01', topicId: 'massimi_minimi', type: 'tf', difficulty: 1, question: "Se f''(x₀) > 0 e f'(x₀) = 0, allora x₀ è un minimo locale.", options: VF, correct: V, explanation: 'Criterio della derivata seconda.' },
  { id: 'tf_mm_02', topicId: 'massimi_minimi', type: 'tf', difficulty: 2, question: "Se f''(x₀) = 0 e f'(x₀) = 0, allora x₀ è un flesso.", options: VF, correct: F, explanation: "f(x)=x⁴ ha f'(0)=0 e f''(0)=0, ma 0 è un minimo (non un flesso)." },
  { id: 'tf_mm_03', topicId: 'massimi_minimi', type: 'tf', difficulty: 3, question: "Per trovare il massimo assoluto di f su [a,b], bisogna confrontare i valori critici interni con f(a) e f(b).", options: VF, correct: V, explanation: 'Il massimo assoluto è il più grande tra i valori nei punti critici e agli estremi.' },
  { id: 'tf_mm_04', topicId: 'massimi_minimi', type: 'tf', difficulty: 4, question: "Ogni massimo locale è anche un massimo globale.", options: VF, correct: F, explanation: 'Un massimo locale è solo il più grande in un intorno: potrebbero esserci valori maggiori altrove.' },
  { id: 'tf_mm_05', topicId: 'massimi_minimi', type: 'tf', difficulty: 5, question: "f(x) = x·e^(−x) ha un massimo in x = 1.", options: VF, correct: V, explanation: "f'(x) = e^(−x)(1−x): cambia segno da + a − in x=1, quindi x=1 è un massimo." },

  // ── concavita ──────────────────────────────────────────────────
  { id: 'tf_con_01', topicId: 'concavita', type: 'tf', difficulty: 1, question: "f''(x) > 0 su (a,b) significa che f è convessa (concava verso l'alto) su (a,b).", options: VF, correct: V, explanation: 'Criterio della derivata seconda per la convessità.' },
  { id: 'tf_con_02', topicId: 'concavita', type: 'tf', difficulty: 2, question: "Se f''(x₀) = 0 allora x₀ è un punto di flesso.", options: VF, correct: F, explanation: "f''(x₀)=0 è necessario ma non sufficiente: per f(x)=x⁴, f''(0)=0 ma 0 non è un flesso." },
  { id: 'tf_con_03', topicId: 'concavita', type: 'tf', difficulty: 3, question: "f(x) = x³ ha un flesso in x = 0.", options: VF, correct: V, explanation: "f''(x) = 6x cambia segno in 0: concava per x<0, convessa per x>0." },
  { id: 'tf_con_04', topicId: 'concavita', type: 'tf', difficulty: 4, question: "Per una funzione convessa vale f((a+b)/2) ≤ (f(a)+f(b))/2.", options: VF, correct: V, explanation: 'Disuguaglianza di Jensen per funzioni convesse.' },
  { id: 'tf_con_05', topicId: 'concavita', type: 'tf', difficulty: 5, question: "eˣ è una funzione convessa su ℝ.", options: VF, correct: V, explanation: "(eˣ)'' = eˣ > 0 ovunque." },

  // ── asintoti ───────────────────────────────────────────────────
  { id: 'tf_asi_01', topicId: 'asintoti', type: 'tf', difficulty: 1, question: "Se lim_{x→a} f(x) = ±∞, allora x = a è un asintoto verticale.", options: VF, correct: V, explanation: 'Definizione di asintoto verticale.' },
  { id: 'tf_asi_02', topicId: 'asintoti', type: 'tf', difficulty: 2, question: "Se lim_{x→+∞} f(x) = L finito, allora y = L è un asintoto orizzontale.", options: VF, correct: V, explanation: 'Definizione di asintoto orizzontale.' },
  { id: 'tf_asi_03', topicId: 'asintoti', type: 'tf', difficulty: 3, question: "f(x) = 1/x ha asintoto verticale in x = 0 e asintoto orizzontale y = 0.", options: VF, correct: V, explanation: 'Entrambi i limiti caratteristici esistono.' },
  { id: 'tf_asi_04', topicId: 'asintoti', type: 'tf', difficulty: 4, question: "Per trovare l'asintoto obliquo y = mx+q, si calcola m = lim f(x)/x e poi q = lim(f(x)−mx).", options: VF, correct: V, explanation: 'Metodo standard per gli asintoti obliqui.' },
  { id: 'tf_asi_05', topicId: 'asintoti', type: 'tf', difficulty: 5, question: "f(x) = eˣ + x ha asintoto obliquo y = x per x → −∞.", options: VF, correct: V, explanation: 'Per x→−∞: eˣ→0, quindi f(x) ~ x. m=1, q=0, asintoto y=x.' },

  // ── taylor_peano ───────────────────────────────────────────────
  { id: 'tf_tay_01', topicId: 'taylor_peano', type: 'tf', difficulty: 1, question: "Lo sviluppo di MacLaurin di eˣ all'ordine 2 è 1 + x + x²/2.", options: VF, correct: V, explanation: 'eˣ = 1 + x + x²/2! + … = 1 + x + x²/2 + o(x²).' },
  { id: 'tf_tay_02', topicId: 'taylor_peano', type: 'tf', difficulty: 2, question: "Lo sviluppo di MacLaurin di sin(x) contiene solo potenze dispari.", options: VF, correct: V, explanation: 'sin(x) = x − x³/6 + x⁵/120 − …: solo potenze dispari perché sin è dispari.' },
  { id: 'tf_tay_03', topicId: 'taylor_peano', type: 'tf', difficulty: 3, question: "Il coefficiente di xᵏ nello sviluppo di Taylor è f⁽ᵏ⁾(x₀)/k!.", options: VF, correct: V, explanation: 'Formula dei coefficienti di Taylor.' },
  { id: 'tf_tay_04', topicId: 'taylor_peano', type: 'tf', difficulty: 4, question: "o(xⁿ) significa che il termine è esattamente zero.", options: VF, correct: F, explanation: "o(xⁿ) significa che il termine diviso per xⁿ tende a 0: è trascurabile rispetto a xⁿ, non necessariamente zero." },
  { id: 'tf_tay_05', topicId: 'taylor_peano', type: 'tf', difficulty: 5, question: "Lo sviluppo di ln(1+x) all'ordine 4 è x − x²/2 + x³/3 − x⁴/4.", options: VF, correct: V, explanation: 'Sviluppo di MacLaurin del logaritmo naturale.' },

  // ── taylor_notevoli ────────────────────────────────────────────
  { id: 'tf_mac_01', topicId: 'taylor_notevoli', type: 'tf', difficulty: 1, question: "cos(x) = 1 − x²/2 + x⁴/24 + o(x⁴).", options: VF, correct: V, explanation: 'MacLaurin di cos(x) all\'ordine 4.' },
  { id: 'tf_mac_02', topicId: 'taylor_notevoli', type: 'tf', difficulty: 2, question: "Lo sviluppo di cos(x) contiene solo potenze pari.", options: VF, correct: V, explanation: 'cos è una funzione pari: f(−x)=f(x), quindi solo potenze pari.' },
  { id: 'tf_mac_03', topicId: 'taylor_notevoli', type: 'tf', difficulty: 3, question: "arctan(x) = x − x³/3 + x⁵/5 − … per |x| ≤ 1.", options: VF, correct: V, explanation: 'Serie di Leibniz per arctan, convergente per |x|≤1.' },
  { id: 'tf_mac_04', topicId: 'taylor_notevoli', type: 'tf', difficulty: 4, question: "ln(1+x) converge per tutti i valori reali di x.", options: VF, correct: F, explanation: 'Converge solo per −1 < x ≤ 1.' },
  { id: 'tf_mac_05', topicId: 'taylor_notevoli', type: 'tf', difficulty: 5, question: "(1+x)^α = 1 + αx + α(α−1)x²/2 + … per |x| < 1.", options: VF, correct: V, explanation: 'Binomio generalizzato di Newton, valido per qualsiasi α reale e |x|<1.' },

  // ── taylor_limiti ──────────────────────────────────────────────
  { id: 'tf_tli_01', topicId: 'taylor_limiti', type: 'tf', difficulty: 1, question: "Taylor è utile per calcolare limiti in forma 0/0.", options: VF, correct: V, explanation: 'Si sviluppano numeratore e denominatore e si semplifica.' },
  { id: 'tf_tli_02', topicId: 'taylor_limiti', type: 'tf', difficulty: 2, question: "lim_{x→0} (eˣ−1)/x = 1 si ricava da Taylor: eˣ = 1+x+o(x).", options: VF, correct: V, explanation: '(eˣ−1)/x = (x+o(x))/x = 1+o(1) → 1.' },
  { id: 'tf_tli_03', topicId: 'taylor_limiti', type: 'tf', difficulty: 3, question: "Per calcolare lim (sin x − x)/x³, basta sviluppare sin x all'ordine 1.", options: VF, correct: F, explanation: "Serve l'ordine 3: sin x = x − x³/6 + o(x³), quindi (sin x − x)/x³ → −1/6." },
  { id: 'tf_tli_04', topicId: 'taylor_limiti', type: 'tf', difficulty: 4, question: "lim_{x→0} (1−cos x)/x² = 1/2.", options: VF, correct: V, explanation: 'cos x = 1 − x²/2 + o(x²), quindi (1−cos x)/x² → 1/2.' },
  { id: 'tf_tli_05', topicId: 'taylor_limiti', type: 'tf', difficulty: 5, question: "Taylor è sempre più efficiente di De L'Hôpital.", options: VF, correct: F, explanation: "Dipende dal caso. A volte De L'Hôpital è più semplice; per forme 0/0 con sviluppi noti, Taylor spesso è più rapido." },

  // ── integrale_def ──────────────────────────────────────────────
  { id: 'tf_rie_01', topicId: 'integrale_def', type: 'tf', difficulty: 1, question: "L'integrale definito ∫ₐᵇ f(x)dx rappresenta sempre un'area positiva.", options: VF, correct: F, explanation: "L'integrale è un'area con segno: è negativo dove f < 0." },
  { id: 'tf_rie_02', topicId: 'integrale_def', type: 'tf', difficulty: 2, question: "Ogni funzione continua su [a,b] è integrabile secondo Riemann.", options: VF, correct: V, explanation: 'Le funzioni continue sono integrabili su intervalli chiusi e limitati.' },
  { id: 'tf_rie_03', topicId: 'integrale_def', type: 'tf', difficulty: 3, question: "∫ₐᵃ f(x)dx = 0 per qualsiasi funzione f.", options: VF, correct: V, explanation: "Integrare su un intervallo di lunghezza zero dà sempre 0." },
  { id: 'tf_rie_04', topicId: 'integrale_def', type: 'tf', difficulty: 4, question: "La funzione di Dirichlet (1 sui razionali, 0 sugli irrazionali) è integrabile secondo Riemann.", options: VF, correct: F, explanation: 'Le somme superiore e inferiore non coincidono: s=0 e S=1 per ogni partizione.' },
  { id: 'tf_rie_05', topicId: 'integrale_def', type: 'tf', difficulty: 5, question: "Ogni funzione monotona e limitata su [a,b] è integrabile secondo Riemann.", options: VF, correct: V, explanation: 'Le funzioni monotone hanno al più discontinuità di prima specie, che non impedisce l\'integrabilità.' },

  // ── torricelli ─────────────────────────────────────────────────
  { id: 'tf_tor_01', topicId: 'torricelli', type: 'tf', difficulty: 1, question: "Se F'(x) = f(x), allora ∫ₐᵇ f(x)dx = F(b) − F(a).", options: VF, correct: V, explanation: 'Teorema fondamentale del calcolo (Torricelli-Barrow).' },
  { id: 'tf_tor_02', topicId: 'torricelli', type: 'tf', difficulty: 2, question: "∫₀² x²dx = 8/3.", options: VF, correct: V, explanation: '[x³/3]₀² = 8/3 − 0 = 8/3.' },
  { id: 'tf_tor_03', topicId: 'torricelli', type: 'tf', difficulty: 3, question: "Se F(x) = ∫₀ˣ sin(t²)dt, allora F'(x) = sin(x²).", options: VF, correct: V, explanation: 'Prima parte del TFC: la derivata della funzione integrale è l\'integrando valutato in x.' },
  { id: 'tf_tor_04', topicId: 'torricelli', type: 'tf', difficulty: 4, question: "d/dx[∫₀^(x²) eᵗdt] = 2x·e^(x²).", options: VF, correct: V, explanation: "Chain rule: F'(x²)·2x = e^(x²)·2x." },
  { id: 'tf_tor_05', topicId: 'torricelli', type: 'tf', difficulty: 5, question: "∫₋₁¹ |x|dx = 1.", options: VF, correct: V, explanation: "∫₋₁⁰(−x)dx + ∫₀¹ x dx = 1/2 + 1/2 = 1." },

  // ── proprieta_integrali ────────────────────────────────────────
  { id: 'tf_pri_01', topicId: 'proprieta_integrali', type: 'tf', difficulty: 1, question: "∫ₐᵇ(f+g)dx = ∫ₐᵇf dx + ∫ₐᵇg dx (linearità).", options: VF, correct: V, explanation: "L'integrale è un operatore lineare." },
  { id: 'tf_pri_02', topicId: 'proprieta_integrali', type: 'tf', difficulty: 2, question: "Se f ≥ 0 su [a,b], allora ∫ₐᵇ f(x)dx ≥ 0.", options: VF, correct: V, explanation: 'Monotonia dell\'integrale.' },
  { id: 'tf_pri_03', topicId: 'proprieta_integrali', type: 'tf', difficulty: 3, question: "|∫ₐᵇ f(x)dx| ≤ ∫ₐᵇ |f(x)|dx.", options: VF, correct: V, explanation: 'Disuguaglianza triangolare per gli integrali.' },
  { id: 'tf_pri_04', topicId: 'proprieta_integrali', type: 'tf', difficulty: 4, question: "∫ₐᵇ f(x)dx = ∫ₐᶜ f(x)dx + ∫ᶜᵇ f(x)dx per qualsiasi c.", options: VF, correct: V, explanation: 'Additività dell\'integrale rispetto all\'intervallo, valida per qualsiasi c (anche fuori da [a,b]).' },
  { id: 'tf_pri_05', topicId: 'proprieta_integrali', type: 'tf', difficulty: 5, question: "∫ₐᵇ f(x)g(x)dx = (∫ₐᵇf dx)·(∫ₐᵇg dx).", options: VF, correct: F, explanation: "L'integrale del prodotto NON è uguale al prodotto degli integrali." },

  // ── int_immediate ──────────────────────────────────────────────
  { id: 'tf_imm_01', topicId: 'int_immediate', type: 'tf', difficulty: 1, question: "∫ eˣ dx = eˣ + C.", options: VF, correct: V, explanation: 'La funzione esponenziale è uguale alla sua primitiva.' },
  { id: 'tf_imm_02', topicId: 'int_immediate', type: 'tf', difficulty: 2, question: "∫ cos(x) dx = −sin(x) + C.", options: VF, correct: F, explanation: '∫ cos(x)dx = sin(x) + C. È ∫ sin(x)dx = −cos(x) + C.' },
  { id: 'tf_imm_03', topicId: 'int_immediate', type: 'tf', difficulty: 3, question: "∫ 1/x dx = ln|x| + C.", options: VF, correct: V, explanation: 'Il valore assoluto è necessario per coprire anche x < 0.' },
  { id: 'tf_imm_04', topicId: 'int_immediate', type: 'tf', difficulty: 4, question: "∫ 1/(1+x²) dx = arctan(x) + C.", options: VF, correct: V, explanation: 'Primitiva fondamentale.' },
  { id: 'tf_imm_05', topicId: 'int_immediate', type: 'tf', difficulty: 5, question: "∫ x/(x²+1) dx = (1/2)ln(x²+1) + C.", options: VF, correct: V, explanation: 'Forma f\'/f: la derivata di x²+1 è 2x, quindi ∫x/(x²+1)dx = (1/2)∫2x/(x²+1)dx = (1/2)ln(x²+1)+C.' },

  // ── int_sostituzione ───────────────────────────────────────────
  { id: 'tf_sub_01', topicId: 'int_sostituzione', type: 'tf', difficulty: 1, question: "Per calcolare ∫ 2x·cos(x²)dx si usa la sostituzione u = x².", options: VF, correct: V, explanation: "u=x², du=2x dx: l'integrale diventa ∫cos(u)du = sin(u)+C = sin(x²)+C." },
  { id: 'tf_sub_02', topicId: 'int_sostituzione', type: 'tf', difficulty: 2, question: "Negli integrali definiti con sostituzione, gli estremi di integrazione NON devono essere cambiati.", options: VF, correct: F, explanation: 'Gli estremi si devono trasformare secondo la sostituzione: se u=g(x), i nuovi estremi sono g(a) e g(b).' },
  { id: 'tf_sub_03', topicId: 'int_sostituzione', type: 'tf', difficulty: 3, question: "Per ∫ √(1−x²) dx si usa x = sin θ.", options: VF, correct: V, explanation: 'Sostituzione trigonometrica standard per √(1−x²).' },
  { id: 'tf_sub_04', topicId: 'int_sostituzione', type: 'tf', difficulty: 4, question: "∫₀¹ x·e^(x²) dx = (e−1)/2.", options: VF, correct: V, explanation: 'u=x², du=2x dx: ∫₀¹ x·e^(x²)dx = (1/2)∫₀¹ eᵘ du = (1/2)(e−1).' },
  { id: 'tf_sub_05', topicId: 'int_sostituzione', type: 'tf', difficulty: 5, question: "La sostituzione di Weierstrass t = tan(x/2) trasforma le funzioni razionali in sin e cos in funzioni razionali in t.", options: VF, correct: V, explanation: 'Con t=tan(x/2): sin x=2t/(1+t²), cos x=(1−t²)/(1+t²), dx=2/(1+t²)dt.' },

  // ── int_parti ──────────────────────────────────────────────────
  { id: 'tf_par_01', topicId: 'int_parti', type: 'tf', difficulty: 1, question: "La formula di integrazione per parti è ∫f·g' dx = f·g − ∫f'·g dx.", options: VF, correct: V, explanation: 'Formula di integrazione per parti.' },
  { id: 'tf_par_02', topicId: 'int_parti', type: 'tf', difficulty: 2, question: "∫ x·eˣ dx = x·eˣ − eˣ + C.", options: VF, correct: V, explanation: 'Per parti con f=x, g\'=eˣ: x·eˣ − ∫eˣdx = x·eˣ − eˣ + C.' },
  { id: 'tf_par_03', topicId: 'int_parti', type: 'tf', difficulty: 3, question: "∫ ln(x) dx = x·ln(x) + C.", options: VF, correct: F, explanation: '∫ ln(x)dx = x·ln(x) − x + C.' },
  { id: 'tf_par_04', topicId: 'int_parti', type: 'tf', difficulty: 4, question: "Per ∫ eˣ·sin(x) dx occorre applicare la formula per parti due volte.", options: VF, correct: V, explanation: 'Si ottiene un\'equazione in I che si risolve, dando I = eˣ(sin x − cos x)/2 + C.' },
  { id: 'tf_par_05', topicId: 'int_parti', type: 'tf', difficulty: 5, question: "La regola LIATE suggerisce di scegliere come f il logaritmo prima dell\'esponenziale.", options: VF, correct: V, explanation: 'LIATE: Logaritmo > Inversa trigo > Algebrica > Trigonometrica > Esponenziale.' },

  // ── razionali_fratte ───────────────────────────────────────────
  { id: 'tf_raz_01', topicId: 'razionali_fratte', type: 'tf', difficulty: 1, question: "Per integrare P(x)/Q(x) con grado P ≥ grado Q, si deve prima dividere.", options: VF, correct: V, explanation: 'La divisione riduce il grado del numeratore prima di applicare le frazioni parziali.' },
  { id: 'tf_raz_02', topicId: 'razionali_fratte', type: 'tf', difficulty: 2, question: "1/(x²−1) = 1/(2(x−1)) − 1/(2(x+1)).", options: VF, correct: V, explanation: '1/((x−1)(x+1)) = A/(x−1)+B/(x+1): A=1/2, B=−1/2.' },
  { id: 'tf_raz_03', topicId: 'razionali_fratte', type: 'tf', difficulty: 3, question: "A una radice reale doppia (x−a)² corrisponde nella decomposizione un solo termine A/(x−a)².", options: VF, correct: F, explanation: 'Servono due termini: A/(x−a) + B/(x−a)².' },
  { id: 'tf_raz_04', topicId: 'razionali_fratte', type: 'tf', difficulty: 4, question: "∫ 1/(x²+1) dx = arctan(x) + C.", options: VF, correct: V, explanation: 'x²+1 è irriducibile su ℝ e il suo integrale è arctan.' },
  { id: 'tf_raz_05', topicId: 'razionali_fratte', type: 'tf', difficulty: 5, question: "A un fattore quadratico irriducibile (x²+bx+c) corrisponde un termine (Ax+B)/(x²+bx+c).", options: VF, correct: V, explanation: 'Per fattori quadratici irriducibili la forma della frazione parziale ha numeratore lineare.' },

  // ── improprio_illimitato ───────────────────────────────────────
  { id: 'tf_imp_01', topicId: 'improprio_illimitato', type: 'tf', difficulty: 1, question: "∫₁^∞ 1/x² dx converge.", options: VF, correct: V, explanation: '∫₁^R 1/x² dx = [−1/x]₁^R = 1 − 1/R → 1.' },
  { id: 'tf_imp_02', topicId: 'improprio_illimitato', type: 'tf', difficulty: 2, question: "∫₁^∞ 1/x dx converge.", options: VF, correct: F, explanation: '∫₁^R 1/x dx = ln R → +∞. Diverge.' },
  { id: 'tf_imp_03', topicId: 'improprio_illimitato', type: 'tf', difficulty: 3, question: "∫₁^∞ 1/xᵅ dx converge se e solo se α > 1.", options: VF, correct: V, explanation: 'Criterio fondamentale: per α>1 converge a 1/(α−1), per α≤1 diverge.' },
  { id: 'tf_imp_04', topicId: 'improprio_illimitato', type: 'tf', difficulty: 4, question: "∫₀^∞ e^(−x) dx = 1.", options: VF, correct: V, explanation: '[−e^(−x)]₀^∞ = 0 − (−1) = 1.' },
  { id: 'tf_imp_05', topicId: 'improprio_illimitato', type: 'tf', difficulty: 5, question: "∫₋∞^∞ e^(−x²) dx = √π.", options: VF, correct: V, explanation: 'Integrale di Gauss: si dimostra passando in coordinate polari.' },

  // ── improprio_funzione ─────────────────────────────────────────
  { id: 'tf_impf_01', topicId: 'improprio_funzione', type: 'tf', difficulty: 1, question: "∫₀¹ 1/√x dx converge.", options: VF, correct: V, explanation: '∫_ε¹ x^(−1/2)dx = [2√x]_ε¹ = 2 − 2√ε → 2.' },
  { id: 'tf_impf_02', topicId: 'improprio_funzione', type: 'tf', difficulty: 2, question: "∫₀¹ 1/xᵅ dx converge se e solo se α < 1.", options: VF, correct: V, explanation: 'Duale del caso illimitato: converge per α<1, diverge per α≥1.' },
  { id: 'tf_impf_03', topicId: 'improprio_funzione', type: 'tf', difficulty: 3, question: "∫₀¹ ln(x) dx converge e vale −1.", options: VF, correct: V, explanation: '[x·ln x − x]₀¹ = (0−1) − (lim_{x→0⁺} x ln x − x) = −1 − 0 = −1.' },
  { id: 'tf_impf_04', topicId: 'improprio_funzione', type: 'tf', difficulty: 4, question: "Se f ha una singolarità in c ∈ (a,b), ∫ₐᵇ f dx converge solo se convergono separatamente ∫ₐᶜ e ∫ᶜᵇ.", options: VF, correct: V, explanation: 'Entrambi i troncamenti devono convergere indipendentemente.' },
  { id: 'tf_impf_05', topicId: 'improprio_funzione', type: 'tf', difficulty: 5, question: "∫₋₁¹ 1/x dx converge (valore principale di Cauchy).", options: VF, correct: F, explanation: "L'integrale improprio standard diverge perché ∫₋₁⁰ 1/x dx = −∞. Il valore principale di Cauchy darebbe 0, ma non è l'integrale improprio." },

  // ── criteri_conv ───────────────────────────────────────────────
  { id: 'tf_cri_01', topicId: 'criteri_conv', type: 'tf', difficulty: 1, question: "Se 0 ≤ f(x) ≤ g(x) e ∫g converge, allora ∫f converge.", options: VF, correct: V, explanation: 'Criterio del confronto per integrali impropri.' },
  { id: 'tf_cri_02', topicId: 'criteri_conv', type: 'tf', difficulty: 2, question: "Se f(x) ~ g(x) per x → +∞ e g > 0, allora ∫f e ∫g hanno lo stesso comportamento.", options: VF, correct: V, explanation: 'Criterio asintotico: se lim f/g = L ∈ (0,∞) le convergenze coincidono.' },
  { id: 'tf_cri_03', topicId: 'criteri_conv', type: 'tf', difficulty: 3, question: "∫₁^∞ sin²(x)/x² dx converge.", options: VF, correct: V, explanation: '0 ≤ sin²x/x² ≤ 1/x² e ∫₁^∞1/x²dx=1 converge.' },
  { id: 'tf_cri_04', topicId: 'criteri_conv', type: 'tf', difficulty: 4, question: "∫₁^∞ 1/(x·ln x) dx diverge.", options: VF, correct: V, explanation: '∫₁^R dx/(x ln x) = [ln(ln x)]₁^R → +∞.' },
  { id: 'tf_cri_05', topicId: 'criteri_conv', type: 'tf', difficulty: 5, question: "∫₀^∞ sin(x)/x dx converge assolutamente.", options: VF, correct: F, explanation: 'Converge condizionatamente (valore π/2) ma NON assolutamente: ∫|sin x|/x dx = +∞.' },

  // ── ode_separabili ─────────────────────────────────────────────
  { id: 'tf_odes_01', topicId: 'ode_separabili', type: 'tf', difficulty: 1, question: "Un'ODE a variabili separabili ha la forma y' = f(x)·g(y).", options: VF, correct: V, explanation: 'Forma standard delle ODE separabili.' },
  { id: 'tf_odes_02', topicId: 'ode_separabili', type: 'tf', difficulty: 2, question: "y' = y ha come soluzione y = eˣ + C.", options: VF, correct: F, explanation: "Separando: dy/y = dx → ln|y| = x + C → y = Aeˣ. La costante è moltiplicativa, non additiva." },
  { id: 'tf_odes_03', topicId: 'ode_separabili', type: 'tf', difficulty: 3, question: "Se g(y₀) = 0, allora y ≡ y₀ è una soluzione singolare dell'ODE y' = f(x)·g(y).", options: VF, correct: V, explanation: 'Se g(y₀)=0, y costante uguale a y₀ soddisfa y\'=0=f(x)·0.' },
  { id: 'tf_odes_04', topicId: 'ode_separabili', type: 'tf', difficulty: 4, question: "y' = y², y(0) = 1 ha soluzione globale su tutto ℝ.", options: VF, correct: F, explanation: 'La soluzione è y = 1/(1−x), che esplode in x = 1: esiste solo per x < 1.' },
  { id: 'tf_odes_05', topicId: 'ode_separabili', type: 'tf', difficulty: 5, question: "L'equazione di Bernoulli y' + p(x)y = q(x)yⁿ si riduce a una lineare con z = y^(1−n).", options: VF, correct: V, explanation: 'Sostituzione standard per le equazioni di Bernoulli.' },

  // ── ode_lineari_1 ──────────────────────────────────────────────
  { id: 'tf_odel1_01', topicId: 'ode_lineari_1', type: 'tf', difficulty: 1, question: "Un'ODE lineare del primo ordine ha la forma y' + p(x)y = q(x).", options: VF, correct: V, explanation: 'Forma standard delle ODE lineari del primo ordine.' },
  { id: 'tf_odel1_02', topicId: 'ode_lineari_1', type: 'tf', difficulty: 2, question: "Il fattore integrante per y' + p(x)y = q(x) è μ(x) = e^(∫p(x)dx).", options: VF, correct: V, explanation: "Moltiplicando per μ si ottiene (μy)' = μq, facilmente integrabile." },
  { id: 'tf_odel1_03', topicId: 'ode_lineari_1', type: 'tf', difficulty: 3, question: "La soluzione generale di y' + p(x)y = 0 è y = Ce^(−∫p dx).", options: VF, correct: V, explanation: 'Soluzione dell\'omogenea associata.' },
  { id: 'tf_odel1_04', topicId: 'ode_lineari_1', type: 'tf', difficulty: 4, question: "La soluzione generale è la somma della soluzione dell'omogenea e di una soluzione particolare.", options: VF, correct: V, explanation: 'Principio di sovrapposizione per ODE lineari.' },
  { id: 'tf_odel1_05', topicId: 'ode_lineari_1', type: 'tf', difficulty: 5, question: "y' + y = eˣ ha come soluzione particolare y_P = xeˣ/2.", options: VF, correct: F, explanation: 'y_P = eˣ/2: sostituendo, eˣ/2 + eˣ/2 = eˣ ✓. Non c\'è risonanza poiché la soluzione dell\'omogenea è e^(−x).' },

  // ── ode_lineari_2 ──────────────────────────────────────────────
  { id: 'tf_odel2_01', topicId: 'ode_lineari_2', type: 'tf', difficulty: 1, question: "Per risolvere y'' + ay' + by = 0 si cerca soluzione del tipo y = eˡˣ.", options: VF, correct: V, explanation: "Sostituendo si ottiene l'equazione caratteristica λ²+aλ+b=0." },
  { id: 'tf_odel2_02', topicId: 'ode_lineari_2', type: 'tf', difficulty: 2, question: "Se l'equazione caratteristica ha radici complesse α±iβ, la soluzione è y = e^(αx)(C₁cos βx + C₂sin βx).", options: VF, correct: V, explanation: 'Forma della soluzione reale per radici complesse coniugate.' },
  { id: 'tf_odel2_03', topicId: 'ode_lineari_2', type: 'tf', difficulty: 3, question: "Se l'equazione caratteristica ha radice doppia λ, la soluzione è y = (C₁ + C₂x)eˡˣ.", options: VF, correct: V, explanation: 'Caso della radice reale doppia.' },
  { id: 'tf_odel2_04', topicId: 'ode_lineari_2', type: 'tf', difficulty: 4, question: "Nella risonanza, se il termine forzante appartiene alla soluzione omogenea, si moltiplica y_P per x.", options: VF, correct: V, explanation: 'Regola della risonanza per ODE lineari.' },
  { id: 'tf_odel2_05', topicId: 'ode_lineari_2', type: 'tf', difficulty: 5, question: "y'' + 4y = sin(2x) è un caso di risonanza.", options: VF, correct: V, explanation: "L'omogenea ha soluzione C₁cos(2x)+C₂sin(2x): sin(2x) è nella soluzione omogenea → risonanza." },

  // ── cauchy_problema ────────────────────────────────────────────
  { id: 'tf_caup_01', topicId: 'cauchy_problema', type: 'tf', difficulty: 1, question: "Il problema di Cauchy specifica sia l'ODE che la condizione iniziale y(x₀) = y₀.", options: VF, correct: V, explanation: 'Il problema di Cauchy determina una soluzione unica (in condizioni di regolarità).' },
  { id: 'tf_caup_02', topicId: 'cauchy_problema', type: 'tf', difficulty: 2, question: "Il teorema di Picard garantisce l'esistenza e unicità della soluzione se f è continua e Lipschitz in y.", options: VF, correct: V, explanation: 'Ipotesi del teorema di Cauchy-Lipschitz (Picard).' },
  { id: 'tf_caup_03', topicId: 'cauchy_problema', type: 'tf', difficulty: 3, question: "y' = √y, y(0) = 0 ha un'unica soluzione.", options: VF, correct: F, explanation: '∂f/∂y = 1/(2√y) non è Lipschitz in y=0: esistono infinite soluzioni.' },
  { id: 'tf_caup_04', topicId: 'cauchy_problema', type: 'tf', difficulty: 4, question: "La condizione iniziale y(x₀) = y₀ seleziona univocamente la costante C nella soluzione generale.", options: VF, correct: V, explanation: 'Sostituendo x=x₀ e y=y₀ nella soluzione generale si determina C.' },
  { id: 'tf_caup_05', topicId: 'cauchy_problema', type: 'tf', difficulty: 5, question: "Il metodo delle successive approssimazioni di Picard converge alla soluzione del problema di Cauchy.", options: VF, correct: V, explanation: 'Sotto le ipotesi del teorema di Picard, le iterate convergono uniformemente alla soluzione.' },
];
