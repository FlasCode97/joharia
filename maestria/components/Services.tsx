export function Services() {
  return (
    <section id="ce-que-je-fais" className="band">
      <div className="band-inner">
        <p className="band-label">Ce que je résous</p>

        <div className="band-col">
          <h2>
            Le problème n&apos;est pas votre travail. C&apos;est tout ce
            qu&apos;il y a autour.
          </h2>

          <h3>Être trouvé quand on vous cherche</h3>
          <p>
            Une page : votre nom, ce que vous faites, où vous êtes, vos horaires,
            votre numéro. Elle s&apos;ouvre vite depuis un téléphone, même avec du
            réseau moyen — c&apos;est la première chose que je vérifie avant de
            livrer. Je l&apos;héberge, vous n&apos;avez pas d&apos;abonnement pour
            ça.
          </p>

          <h3>Les tâches que vous refaites chaque semaine</h3>
          <p>
            Recopier un devis, relancer ceux qui n&apos;ont pas répondu, ressortir
            un document, renvoyer les mêmes informations à chaque nouveau client.
            Une machine fait ça correctement, à condition que quelqu&apos;un
            prenne le temps de le décrire une fois. C&apos;est ce que je fais.
          </p>
        </div>
      </div>

      {/* L'abonnement est l'offre principale : il sort de la colonne courante
          et prend un encart pleine largeur pour peser plus lourd à l'œil. */}
      <div className="border-t border-[var(--color-border)] bg-[var(--color-surface-raised)]">
        <div className="band-inner">
          <p className="band-label">L&apos;abonnement</p>
          <div className="band-col">
            <h3 className="!mt-0">Ne plus y penser du tout</h3>
            <p>
              Un site vieillit. Les horaires changent, la carte change, vous
              faites une offre pour le carnaval, vous recrutez. Sans personne
              pour s&apos;en occuper, la page reste bloquée sur l&apos;année
              dernière, et ça se voit.
            </p>
            <p>
              L&apos;abonnement, c&apos;est ça : chaque mois je regarde ce qui a
              bougé, je mets à jour, je publie. Vous m&apos;envoyez un vocal
              WhatsApp entre deux clients, je m&apos;occupe du reste. Pas de
              réunion, pas de compte-rendu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
