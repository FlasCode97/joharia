/* SVG inline, animé en CSS seule. Aucun JavaScript, aucune dépendance,
   aucun canvas : ~2 Ko contre 211 Ko compressés pour la scène Three.js
   qu'il remplace.

   Ce qu'il montre, de gauche à droite : un message WhatsApp entre, la ligne
   se remplit, un devis sort, une relance est programmée. C'est le seul
   endroit du site où l'automatisation se montre au lieu de se décrire.

   En `prefers-reduced-motion: reduce`, tout est peint à l'état final et
   immobile (voir globals.css) — la chaîne reste lisible, rien ne bouge. */

const NOEUDS = [
  { x: 30, libelle: "Message reçu" },
  { x: 130, libelle: "Lu et compris" },
  { x: 230, libelle: "Devis envoyé" },
  { x: 330, libelle: "Relance prévue" },
];

export function ChaineAutomatisation() {
  return (
    <svg
      viewBox="0 0 360 200"
      className="chaine h-auto w-full max-w-[26rem]"
      role="img"
      aria-label="Un message reçu déclenche la lecture, l'envoi d'un devis, puis une relance programmée."
    >
      {/* Piste complète, en fond : la chaîne existe même avant l'impulsion */}
      <line
        x1={NOEUDS[0].x}
        y1="70"
        x2={NOEUDS[3].x}
        y2="70"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.22"
      />

      {/* Le trait qui se remplit */}
      <line
        className="chaine-trait"
        x1={NOEUDS[0].x}
        y1="70"
        x2={NOEUDS[3].x}
        y2="70"
        stroke="var(--color-action-inverse)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {NOEUDS.map((n, i) => (
        <g key={n.libelle} className={`chaine-noeud chaine-noeud-${i + 1}`}>
          <circle
            cx={n.x}
            cy="70"
            r="5.5"
            fill="var(--color-surface-inverse)"
            stroke="var(--color-action-inverse)"
            strokeWidth="1.5"
          />
          <circle
            className="chaine-pastille"
            cx={n.x}
            cy="70"
            r="2.5"
            fill="var(--color-action-inverse)"
          />
          <text
            x={n.x}
            y="97"
            textAnchor={i === 0 ? "start" : i === 3 ? "end" : "middle"}
            fill="currentColor"
            fontSize="10"
            opacity="0.75"
          >
            {n.libelle}
          </text>
        </g>
      ))}
    </svg>
  );
}
