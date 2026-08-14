import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { site, legal, mailtoUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales, Johària",
  description:
    "Éditeur, hébergeur et traitement des données personnelles du site Johària.",
  // Une page légale n'a pas vocation à être référencée.
  robots: { index: false, follow: true },
};

/** Mentions légales conformes au droit français.
 *
 *  Base : article 6-III de la LCEN pour l'identification de l'éditeur et de
 *  l'hébergeur, article R123-237 du code de commerce pour l'immatriculation,
 *  et RGPD pour le traitement des données.
 *
 *  Le site ne dépose aucun cookie et n'utilise aucun outil de mesure
 *  d'audience, ce qui le dispense de bandeau de consentement. Le seul
 *  stockage est une préférence d'affichage, décrite plus bas.
 */
export default function MentionsLegales() {
  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-[var(--color-surface)] focus:px-4 focus:py-2 focus:text-[var(--color-text)]"
      >
        Aller au contenu
      </a>

      <div className="relative w-full overflow-x-hidden">
        <Navigation page="aucune" />

        <main id="contenu">
          <section className="band border-t-0">
            <div className="band-inner">
              <p className="band-label">Informations légales</p>
              <div className="band-col">
                <h1 className="font-[family-name:var(--font-display)] text-[clamp(1.875rem,4.5vw,2.875rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
                  Mentions légales
                </h1>
                <p>
                  Page mise à jour le {legal.miseAJour}. Pour toute question,
                  écrivez à{" "}
                  <a href={mailtoUrl} className="link tap">
                    {site.email}
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>

          <Bloc titre="Éditeur du site" etiquette="Qui publie">
            <Ligne terme="Éditeur">{legal.editeur}</Ligne>
            <Ligne terme="Statut">{legal.statut}</Ligne>
            <Ligne terme="Adresse">{legal.adresse}</Ligne>
            <Ligne terme="Téléphone">{site.telephoneAffiche}</Ligne>
            <Ligne terme="Courriel">
              <a href={mailtoUrl} className="link tap">
                {site.email}
              </a>
            </Ligne>
            <Ligne terme="SIRET">{legal.siret}</Ligne>
            <Ligne terme="Immatriculation">{legal.registre}</Ligne>
            <Ligne terme="TVA">{legal.tva}</Ligne>
            <Ligne terme="Responsable de la publication">
              {legal.editeur}
            </Ligne>
          </Bloc>

          <Bloc titre="Hébergement" etiquette="Où c'est hébergé" alterne>
            <Ligne terme="Hébergeur">{legal.hebergeur}</Ligne>
            <p className="!mt-5 text-[0.9375rem]">
              L&apos;hébergeur assure le stockage et la mise à disposition du
              site. Il n&apos;intervient pas sur le contenu publié.
            </p>
          </Bloc>

          <Bloc titre="Données personnelles" etiquette="Vos données">
            <p className="!mt-0">
              Ce site ne comporte aucun formulaire. Il ne collecte donc aucune
              donnée personnelle par lui-même, et n&apos;en conserve aucune sur
              un serveur.
            </p>
            <p>
              Quand vous cliquez sur un bouton WhatsApp, vous quittez ce site et
              ouvrez une conversation dans l&apos;application WhatsApp, éditée
              par Meta. Les échanges qui suivent relèvent de la politique de
              confidentialité de Meta, et le message est envoyé depuis votre
              propre numéro. Il en va de même pour les liens de courriel, qui
              ouvrent votre logiciel de messagerie.
            </p>
            <p>
              Les messages que vous m&apos;adressez sont conservés le temps de
              répondre et de suivre la relation commerciale, puis effacés. Vous
              disposez d&apos;un droit d&apos;accès, de rectification,
              d&apos;effacement, de limitation et d&apos;opposition sur les
              données vous concernant. Pour l&apos;exercer, écrivez à{" "}
              <a href={mailtoUrl} className="link tap">
                {site.email}
              </a>
              . Si la réponse ne vous satisfait pas, vous pouvez saisir la CNIL
              sur{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="link tap"
              >
                cnil.fr
              </a>
              .
            </p>
          </Bloc>

          <Bloc titre="Cookies et stockage" etiquette="Cookies" alterne>
            <p className="!mt-0">
              Ce site ne dépose aucun cookie et n&apos;utilise aucun outil de
              mesure d&apos;audience ni de publicité. C&apos;est la raison pour
              laquelle aucune fenêtre de consentement ne vous est présentée.
            </p>
            <p>
              Une seule information est enregistrée dans votre navigateur : le
              fait que vous ayez fermé le bandeau sur les factures
              électroniques, pour ne pas vous le réafficher. Cette information
              reste sur votre appareil, ne m&apos;est jamais transmise, et
              disparaît si vous videz les données du site.
            </p>
          </Bloc>

          <Bloc titre="Propriété intellectuelle" etiquette="Contenus">
            <p className="!mt-0">
              Les textes, les visuels et le code de ce site sont la propriété de
              son éditeur, sauf mention contraire. Les captures présentées dans
              la page des réalisations montrent des sites livrés à leurs
              propriétaires respectifs, qui en restent titulaires.
            </p>
            <p>
              Les montants affichés dans la démonstration de devis sont des
              exemples destinés à illustrer un fonctionnement. Ils ne
              constituent ni un tarif, ni une offre commerciale, ni un
              engagement de prix envers qui que ce soit.
            </p>
            <p>
              Les prix d&apos;installation et d&apos;abonnement indiqués sur ce
              site sont donnés à titre indicatif et hors taxes. Le prix
              applicable est celui de la proposition écrite qui vous est
              adressée avant tout engagement.
            </p>
          </Bloc>

          <Bloc titre="Informations sur la facturation électronique" etiquette="Réforme" alterne>
            <p className="!mt-0">
              Les informations relatives à la réforme de la facturation
              électronique sont données à titre informatif, à jour au{" "}
              {legal.miseAJour}, et ne constituent pas un conseil juridique ou
              fiscal. Seuls les textes officiels font foi. Pour votre situation
              particulière, rapprochez-vous de votre expert-comptable ou du
              service des impôts des entreprises.
            </p>
            <p className="!mt-6">
              <Link href="/" className="link tap">
                Revenir à l&apos;accueil
              </Link>
            </p>
          </Bloc>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}

function Bloc({
  titre,
  etiquette,
  alterne,
  children,
}: {
  titre: string;
  etiquette: string;
  alterne?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={
        alterne
          ? "border-t border-[var(--color-border)] bg-[var(--color-surface-raised)]"
          : "border-t border-[var(--color-border)]"
      }
    >
      <div className="band-inner">
        <p className="band-label">{etiquette}</p>
        <div className="band-col">
          <h2 className="!mt-0 font-[family-name:var(--font-display)] text-[1.35rem] font-semibold leading-tight">
            {titre}
          </h2>
          {children}
        </div>
      </div>
    </section>
  );
}

function Ligne({
  terme,
  children,
}: {
  terme: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-x-4 gap-y-1 border-t border-[var(--color-border)] py-3 first-of-type:border-t-0 sm:grid-cols-[13rem_1fr]">
      <span className="text-[0.9375rem] text-[var(--color-text-muted)]">
        {terme}
      </span>
      <span className="text-[var(--color-text)]">{children}</span>
    </div>
  );
}
