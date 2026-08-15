"use client";

import { useEffect, useRef, useState } from "react";
import { whatsappAutomatisation } from "@/lib/site";

/* Valeurs de départ. Elles sont aussi celles rendues côté serveur : sans
   JavaScript, le visiteur lit un calcul complet et cohérent, seuls les
   curseurs ne bougent pas. */
const DEVIS_DEFAUT = 6;
const MINUTES_DEFAUT = 25;
const TAUX_DEFAUT = 35;

/** Formatage déterministe : `Intl` peut différer entre Node et le navigateur
 *  (espace fine insécable), ce qui casse l'hydratation. On sépare à la main. */
function nombreFr(n: number) {
  const entier = Math.round(n);
  return String(entier).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/** Le calculateur ne chiffre pas le problème à la place du visiteur : il lui
 *  fait chiffrer le sien. C'est aussi la seule automatisation qu'on peut
 *  montrer sur une page — une machine qui calcule à sa place. */
export function CalculTemps() {
  const [devis, setDevis] = useState(DEVIS_DEFAUT);
  const [minutes, setMinutes] = useState(MINUTES_DEFAUT);
  const [taux, setTaux] = useState(TAUX_DEFAUT);

  const heuresParAn = (devis * 52 * minutes) / 60;
  const euros = heuresParAn * taux;
  const joursDeTravail = heuresParAn / 7;

  /* Le total compte de 0 à sa valeur, une seule fois, à l'entrée à l'écran.
     `progression` vaut 1 tant que le compte n'a pas démarré : la valeur est
     donc déjà juste au rendu serveur et sans JavaScript. */
  const { ref: refTotal, progression } = useCompteurUnique();
  const heuresAffichees = heuresParAn * progression;

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-7">
        <Curseur
          id="devis-semaine"
          label="Devis ou factures que vous faites par semaine"
          valeur={devis}
          min={1}
          max={30}
          pas={1}
          suffixe={devis > 1 ? "par semaine" : "par semaine"}
          onChange={setDevis}
        />
        <Curseur
          id="minutes-devis"
          label="Temps pour en préparer un"
          valeur={minutes}
          min={5}
          max={90}
          pas={5}
          suffixe="minutes"
          onChange={setMinutes}
        />
      </div>

      {/* Sortie. Rendu typographique, pas un widget : même serif, même encre
          que le reste de la page. `tabular-nums` fige la largeur des chiffres
          pour qu'aucun caractère ne pousse la ligne pendant qu'on glisse. */}
      <div
        aria-live="polite"
        className="mt-10 border-t border-[var(--color-border)] pt-8"
      >
        <p className="text-[0.8125rem] text-[var(--color-text-muted)]">
          Ce que ça vous prend dans l&apos;année
        </p>

        <p
          ref={refTotal}
          className="mt-2 font-[family-name:var(--font-display)] text-[clamp(2.75rem,11vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.03em] tabular-nums"
        >
          {nombreFr(heuresAffichees)}&nbsp;heures
        </p>

        <p className="mt-3 text-[var(--color-text-muted)]">
          Soit à peu près {nombreFr(joursDeTravail)} journées de travail, ou{" "}
          <span className="tabular-nums text-[var(--color-text)]">
            {nombreFr(euros)}&nbsp;€
          </span>{" "}
          si votre heure vaut{" "}
          <label htmlFor="taux-horaire" className="sr-only">
            Votre taux horaire en euros
          </label>
          <input
            id="taux-horaire"
            type="number"
            inputMode="numeric"
            min={10}
            max={200}
            step={5}
            value={taux}
            onChange={(e) =>
              setTaux(Math.max(10, Math.min(200, Number(e.target.value) || 0)))
            }
            className="mx-1 w-[4.5rem] border-b border-[var(--color-border-strong)] bg-transparent px-1 py-0.5 text-center tabular-nums text-[var(--color-text)] focus:border-[var(--color-action)] focus:outline-none"
          />
          €.
        </p>

        <p className="mt-6 text-[0.9375rem] text-[var(--color-text-muted)]">
          Ce temps-là ne disparaît pas tout seul. Il se déplace : soit vous le
          passez, soit une machine le passe à votre place.
        </p>

        <p className="mt-8 text-[0.9375rem] text-[var(--color-text-muted)]">
          Dites-moi ce que vous refaites tous les jours.
        </p>
        <p className="mt-4">
          <a
            href={whatsappAutomatisation}
            target="_blank"
            rel="noopener noreferrer"
            className="gem"
          >
            Écrire sur WhatsApp
          </a>
        </p>
      </div>
    </div>
  );
}

/** Compte de 0 à 1 en 800 ms, en ease-out, la première fois que l'élément
 *  entre à l'écran. Retourne 1 d'emblée si le compte n'a pas lieu d'être
 *  (rendu serveur, pas de JS, mouvement réduit, pas d'IntersectionObserver),
 *  de sorte que le chiffre juste est toujours celui affiché par défaut. */
function useCompteurUnique() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progression, setProgression] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const observateur = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        observateur.disconnect();

        const debut = performance.now();
        const DUREE = 800;
        const avancer = (maintenant: number) => {
          const t = Math.min(1, (maintenant - debut) / DUREE);
          setProgression(1 - Math.pow(1 - t, 3)); // ease-out cubique
          if (t < 1) raf = requestAnimationFrame(avancer);
        };
        setProgression(0);
        raf = requestAnimationFrame(avancer);
      },
      { threshold: 0.6 }
    );

    observateur.observe(el);
    return () => {
      observateur.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return { ref, progression };
}

function Curseur({
  id,
  label,
  valeur,
  min,
  max,
  pas,
  suffixe,
  onChange,
}: {
  id: string;
  label: string;
  valeur: number;
  min: number;
  max: number;
  pas: number;
  suffixe: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
      >
        <span className="text-[0.9375rem] text-[var(--color-text)]">
          {label}
        </span>
        <span className="font-[family-name:var(--font-display)] text-[1.35rem] font-semibold tabular-nums">
          {valeur}
          <span className="ml-1.5 font-[family-name:var(--font-body)] text-[0.8125rem] font-normal text-[var(--color-text-muted)]">
            {suffixe}
          </span>
        </span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={pas}
        value={valeur}
        onChange={(e) => onChange(Number(e.target.value))}
        className="curseur mt-3"
      />
    </div>
  );
}
