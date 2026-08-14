/* Ce que Mat fait tourner pour lui-même. Ce sont ses vraies constructions :
   un chatbot de messagerie et un traitement de facture. C'est aussi la seule
   chose qu'il puisse dire honnêtement aujourd'hui — aucun client n'a encore
   commandé d'automatisation. */

const miennes = [
  {
    titre: "Un robot qui répond sur WhatsApp et Telegram",
    avant:
      "Je m'arrêtais dès qu'un message arrivait, même en plein travail, parce qu'un message qui attend une heure est un client qui appelle ailleurs.",
    apres:
      "Il répond aux questions courantes tout seul, à toute heure, et ne me passe que ce qui demande vraiment une décision de ma part.",
  },
  {
    titre: "Le traitement de mes factures",
    avant:
      "Je reprenais chaque facture à la main, une par une, pour en sortir le montant, la date et le fournisseur.",
    apres:
      "Elles sont lues et rangées à l'arrivée. Je ne ressaisis plus rien, et je retrouve n'importe laquelle en quelques secondes.",
  },
];

export function ChezMoi() {
  return (
    <section id="chez-moi" className="band">
      <div className="band-inner">
        <p className="band-label">Chez moi</p>
        <div className="band-col">
          <h2>Je m&apos;en sers d&apos;abord pour moi</h2>
          <p>
            Je ne vends pas une méthode que je n&apos;applique pas. Voilà ce
            qui tourne de mon côté, et ce que ça a remplacé.
          </p>

          <dl className="!mt-8">
            {miennes.map((a) => (
              <div
                key={a.titre}
                data-reveler
                className="border-t border-[var(--color-border)] py-5 first:border-t-0 first:pt-0"
              >
                <dt className="font-[family-name:var(--font-display)] text-[1.15rem] font-semibold">
                  {a.titre}
                </dt>
                <dd className="mt-3 grid gap-y-1 sm:grid-cols-[4.5rem_1fr] sm:gap-x-4 sm:gap-y-2">
                  <span className="text-[0.8125rem] text-[var(--color-text-muted)] sm:pt-1">
                    Avant
                  </span>
                  <span className="text-[var(--color-text-muted)]">
                    <span className="rature">{a.avant}</span>
                  </span>
                  <span className="apres-auto mt-2 text-[0.8125rem] text-[var(--color-action)] sm:mt-0 sm:pt-1">
                    Depuis
                  </span>
                  <span className="apres-auto text-[var(--color-text)]">
                    {a.apres}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
