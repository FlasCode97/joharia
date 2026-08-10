import { whatsappUrl, mailtoUrl, site, facturation } from "@/lib/site";

/** WhatsApp d'abord : c'est le canal réel en Guadeloupe. Pas de formulaire —
 *  un formulaire ajoute une étape et n'arrive nulle part tant qu'il n'y a pas
 *  de serveur pour le recevoir. */
export function Contact() {
  return (
    <section
      id="contact"
      className="on-dark band border-t-0 bg-[var(--color-surface-inverse)] text-[var(--color-text-inverse)]"
    >
      <div className="band-inner">
        <p className="band-label !text-[var(--color-text-inverse-muted)] md:!border-[var(--color-text-inverse)]">
          Contact
        </p>

        <div className="band-col">
          <h2>Écrivez-moi sur WhatsApp</h2>
          <p className="!text-[var(--color-text-inverse-muted)]">
            C&apos;est le plus simple. Décrivez votre activité en deux lignes, ou
            envoyez un vocal. Je réponds.
          </p>
          <p className="!text-[var(--color-text-inverse-muted)]">
            Que ce soit pour un site, pour une tâche qui vous mange vos soirées,
            ou juste pour savoir si vous êtes en règle pour les factures
            électroniques du {facturation.dateReception}.
          </p>

          <div className="!mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gem"
            >
              Écrire sur WhatsApp
            </a>
            <a
              href={mailtoUrl}
              className="link tap text-[var(--color-action-inverse)] sm:ml-2"
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
