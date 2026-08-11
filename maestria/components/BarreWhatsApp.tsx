"use client";

import { useEffect, useState } from "react";
import { whatsappUrl } from "@/lib/site";

/** Barre d'appel fixe, mobile uniquement.
 *
 *  Ce n'est pas un effet : aujourd'hui le bouton WhatsApp disparaît dès le
 *  premier scroll et ne revient qu'en bas de page. Entre les deux, le
 *  visiteur lit tout l'argumentaire sans jamais avoir de quoi répondre.
 *
 *  Elle s'efface quand la section contact arrive — à ce moment-là le vrai
 *  bouton est à l'écran, deux CTA superposés n'aideraient personne.
 */
export function BarreWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contact");
    let contactVisible = false;

    const observateur = contact
      ? new IntersectionObserver(
          ([e]) => {
            contactVisible = e.isIntersecting;
            majuscule();
          },
          { rootMargin: "0px 0px -25% 0px" }
        )
      : null;
    observateur?.observe(contact!);

    let tick = false;
    const majuscule = () => {
      setVisible(window.scrollY > 400 && !contactVisible);
    };
    const onScroll = () => {
      if (tick) return;
      tick = true;
      requestAnimationFrame(() => {
        majuscule();
        tick = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    majuscule();
    return () => {
      window.removeEventListener("scroll", onScroll);
      observateur?.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`barre-whatsapp md:hidden ${visible ? "" : "barre-whatsapp-cachee"}`}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visible ? 0 : -1}
        className="gem w-full"
      >
        Écrire sur WhatsApp
      </a>
    </div>
  );
}
