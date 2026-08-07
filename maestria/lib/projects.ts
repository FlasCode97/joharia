export type ProjectCategory = "Agent IA" | "Site web" | "SaaS";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  summary: string;
  image: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    slug: "orchestre-agent",
    title: "Orchestre",
    category: "Agent IA",
    year: "2025",
    summary:
      "Agent autonome qui coordonne une équipe d'agents spécialisés pour automatiser le suivi de prospects.",
    image: "https://picsum.photos/seed/joharia-orchestre-agent/1830/1400",
    tags: ["LLM", "Orchestration", "Automatisation"],
  },
  {
    slug: "atelier-web",
    title: "Atelier",
    category: "Site web",
    year: "2025",
    summary:
      "Site vitrine éditorial pour un studio de design, avec motion scrub et galerie immersive au scroll.",
    image: "https://picsum.photos/seed/joharia-atelier-web/1830/1400",
    tags: ["Next.js", "GSAP", "Motion"],
  },
  {
    slug: "cadence-saas",
    title: "Cadence",
    category: "SaaS",
    year: "2024",
    summary:
      "Tableau de bord SaaS qui synchronise métriques produit et feedback client en temps réel.",
    image: "https://picsum.photos/seed/joharia-cadence-saas/1830/1400",
    tags: ["Dashboard", "Realtime", "Analytics"],
  },
  {
    slug: "signal-agent",
    title: "Signal",
    category: "Agent IA",
    year: "2024",
    summary:
      "Agent d'analyse qui détecte les signaux faibles dans les retours support et synthétise l'action.",
    image: "https://picsum.photos/seed/joharia-signal-agent/1830/1400",
    tags: ["NLP", "Veille", "Synthèse"],
  },
];
