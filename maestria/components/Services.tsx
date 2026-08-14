import { tarifs } from "@/lib/site";

/** Page sites web : ce que contient un site, et l'abonnement de mise à jour.
 *  L'abonnement vaut aussi pour l'automatisation — c'est la même logique de
 *  surveillance, il est donc mentionné des deux côtés. */
export function Services() {
  return (
    <section id="ce-que-je-fais" className="band">
      <div className="band-inner">
        <p className="band-label">Ce que vous obtenez</p>

        <div className="band-col">
          <h2>Être trouvé quand on vous cherche</h2>
          <p>
            Une page : votre nom, ce que vous faites, où vous êtes, vos
            horaires, vos prix, votre numéro. Elle s&apos;ouvre vite depuis un
            téléphone, même avec du réseau moyen : c&apos;est la première chose
            que je vérifie avant de livrer.
          </p>
          <p>
            Je l&apos;héberge. Vous n&apos;avez pas d&apos;abonnement mensuel
            obligatoire pour la garder en ligne.
          </p>
        </div>
      </div>

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
              Chaque mois je regarde ce qui a bougé, je mets à jour, je publie.
              Vous m&apos;envoyez un vocal WhatsApp entre deux clients, je
              m&apos;occupe du reste. Pas de réunion, pas de compte-rendu.
            </p>
            <p className="!text-[var(--color-text)]">
              {tarifs.mensuel} € par mois, sans engagement de durée. C&apos;est
              le même abonnement qui couvre la surveillance d&apos;une
              automatisation, si vous avez les deux.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
