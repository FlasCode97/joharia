import { HeroCanvas } from "./HeroCanvas";
import { whatsappUrl, dylan } from "@/lib/site";

/** Le texte est rendu côté serveur : il est peint avant que la 3D soit
 *  seulement demandée. La scène n'est jamais derrière le texte — elle occupe
 *  sa propre colonne, ce qui garantit le contraste du titre en toutes
 *  circonstances (17,1:1). */
export function Hero() {
  return (
    <section className="on-dark relative bg-[var(--color-surface-inverse)] text-[var(--color-text-inverse)]">
      <div className="mx-auto grid max-w-[78rem] items-center gap-10 px-6 pb-16 pt-10 md:grid-cols-[1.05fr_0.95fr] md:gap-12 md:px-12 md:pb-28 md:pt-20">
        <div className="max-w-[36rem]">
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,7vw,4rem)] font-semibold leading-[1.03] tracking-[-0.025em] text-balance">
            Quelqu&apos;un vous a cherché hier soir.
            <br />
            <span className="text-[var(--color-action-inverse)]">
              Il ne vous a pas trouvé.
            </span>
          </h1>

          <p className="mt-6 max-w-[34rem] text-[1.0625rem] leading-relaxed text-[var(--color-text-inverse-muted)] text-pretty md:text-lg">
            Je fais des sites pour les commerces et les artisans de Guadeloupe,
            et j&apos;automatise les tâches qui vous prennent vos soirées. Un seul
            interlocuteur, pas d&apos;agence.
          </p>

          {/* Les deux offres, nommées et cliquables sans scroller. Sur
              mobile elles tiennent sur une ligne chacune, au-dessus du pli. */}
          <ul className="mt-7 flex flex-col gap-x-6 gap-y-2 sm:flex-row sm:flex-wrap">
            {[
              { label: "Un site qu'on trouve", href: "#ce-que-je-fais" },
              { label: "Des tâches qui se font seules", href: "#automatisation" },
            ].map((o) => (
              <li key={o.href}>
                <a
                  href={o.href}
                  className="tap group inline-flex items-baseline gap-2 text-[0.9375rem] text-[var(--color-text-inverse-muted)] transition-colors duration-150 hover:text-[var(--color-text-inverse)] active:opacity-70"
                >
                  <span
                    aria-hidden="true"
                    className="text-[var(--color-action-inverse)]"
                  >
                    ↓
                  </span>
                  <span className="underline-offset-4 group-hover:underline">
                    {o.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gem"
            >
              Écrire sur WhatsApp
            </a>
            <a
              href={dylan.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link tap text-[var(--color-action-inverse)] sm:ml-2"
            >
              Voir le site que j&apos;ai livré
            </a>
          </div>
        </div>

        {/* La pierre. Décorative : masquée aux lecteurs d'écran, absente sur
            petit écran où elle coûterait plus qu'elle ne montre. */}
        <div
          aria-hidden="true"
          className="relative hidden h-[26rem] w-full md:block"
        >
          <HeroCanvas />
        </div>
      </div>
    </section>
  );
}
