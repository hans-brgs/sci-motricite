/**
 * Configuration du cours — la seule partie à toucher pour ajouter un chapitre.
 *
 * Ce module est partagé par `sync-content.mjs`, qui publie les pages, et par
 * `encode-video.mjs`, qui publie les vidéos. Les deux ont besoin de savoir où
 * vit le vault et quels fichiers de chapitre en font partie ; deux copies de
 * cette liste divergeraient au premier chapitre ajouté.
 */
import path from "node:path";

export const VAULT = path.join(
  process.env.USERPROFILE || process.env.HOME || "",
  "OneDrive/Documents/Hans/Travail/Missions/Vacataire - UPVD/2026-2027",
  "Cours/teaching-vault/cours/biomecanique-marche-seniors"
);

/** Racine des médias du vault — figures, rendus Blender, animations. */
export const ASSETS = path.join(VAULT, "contenu/assets");

export const COURSE = {
  slug: "biomecanique-marche-seniors",
  chapters: [
    {
      number: 1,
      dir: "ch1-cinematique",
      label: "Chapitre 1 · Cinématique",
      title: "Chapitre 1 — Cinématique : décrire le mouvement",
      // Catégories affichées dans le bandeau de chaque section.
      tags: ["Biomécanique", "Cinématique"],
      source: "contenu/support-ecrit/support-ecrit-ch1-cinematique.md",
      // Quiz d'entraînement, publié. La banque d'examen ne doit JAMAIS être
      // référencée ici : tout ce que ce script lit part dans un dépôt public.
      quiz: "contenu/evaluation/quiz-ch1-cinematique.md",
      lead: "Décrire un mouvement sans encore en chercher les causes : trajectoire, distance, vitesse, accélération, angles articulaires. C'est le socle de vocabulaire sur lequel tout le reste du cours s'appuie.",
    },
    {
      number: 2,
      dir: "ch2-cinetique",
      label: "Chapitre 2 · Cinétique",
      title: "Chapitre 2 — Cinétique : les causes du mouvement",
      tags: ["Biomécanique", "Cinétique"],
      source: "contenu/support-ecrit/support-ecrit-ch2-cinetique.md",
      quiz: "contenu/evaluation/quiz-ch2-cinetique.md",
      lead: "Remonter des effets aux causes. Ce qu'est une force, comment on la décrit, et comment les trois lois de Newton relient les forces au mouvement qu'elles produisent.",
    },
    {
      number: 3,
      dir: "ch3-moment-de-force-et-levier",
      label: "Chapitre 3 · Moment de force et levier",
      title: "Chapitre 3 — Le moment de force et le levier : ce qui provoque la rotation",
      tags: ["Biomécanique", "Cinétique angulaire"],
      source: "contenu/support-ecrit/support-ecrit-ch3-moment-de-force-et-levier.md",
      quiz: "contenu/evaluation/quiz-ch3-moment-de-force-et-levier.md",
      lead: "Trouver la cause du mouvement angulaire. Le moment de force, le bras de levier et les trois classes de levier expliquent ce qui fait tourner un segment autour de son articulation — et ce que la position du coude coûte au muscle.",
    },
    {
      number: 4,
      dir: "ch4-forces-de-la-marche",
      label: "Chapitre 4 · Les forces de la marche",
      title: "Chapitre 4 — Les forces de la marche",
      tags: ["Biomécanique", "Marche"],
      source: "contenu/support-ecrit/support-ecrit-ch4-forces-de-la-marche.md",
      // Les fichiers `qcm-examen-*` voisins sont la banque d'examen : ils ne
      // doivent JAMAIS être nommés ici.
      quiz: "contenu/evaluation/quiz-ch4-forces-de-la-marche.md",
      lead: "Appliquer tous les outils à un seul cas : une personne qui marche. Trois forces, la réaction du sol et ses deux composantes, puis le frottement — jusqu'à ce qui décide qu'un pied glisse, et ce que change le pas court du sénior.",
    },
  ],
};

/** Chemins absolus des fichiers de chapitre, dans l'ordre du cours. */
export function fichiersDeChapitre() {
  return COURSE.chapters.map((chapter) => path.join(VAULT, chapter.source));
}
