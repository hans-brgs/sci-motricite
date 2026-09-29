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
  // Intitulé complet, et forme courte pour le menu et le pied de page.
  titre: "Biomécanique et analyse de la marche chez le sénior",
  court: "Biomécanique & marche du sénior",
  formation: "DEUST APSL Séniors",
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
    {
      number: 5,
      dir: "ch5-equilibre-postural",
      label: "Chapitre 5 · L'équilibre postural",
      title: "Chapitre 5 — L'équilibre postural",
      tags: ["Biomécanique", "Équilibre"],
      source: "contenu/support-ecrit/support-ecrit-ch5-equilibre-postural.md",
      // Pas encore de quiz d'entraînement pour ce chapitre.
      lead: "Tomber pour avancer. Debout, le corps garde la projection de son centre de masse dans son polygone de sustentation ; en marchant, il la laisse en sortir à chaque pas, puis la rattrape. Ce chapitre montre comment ce rattrapage devient plus fragile avec l'âge, surtout en médio-latéral, et comment la personne âgée s'en protège.",
    },
  ],
  // Fiches de TD publiées (grammaire : `outils/format-fiche-td.md` du vault).
  // Déclarer, c'est publier ; l'ordre de la liste est l'ordre d'affichage.
  // `motDePasse` nomme la variable de `.env` qui porte le mot de passe des
  // réponses protégées de la fiche : un mot de passe par fiche, jamais écrit ici.
  // Les notes enseignant (`-enseignant.md`) et la banque d'examen
  // (`qcm-examen-*`) ne doivent JAMAIS être déclarées : la synchronisation les
  // refuse de toute façon.
  td: [
    { id: "tests-equilibre", source: "contenu/td/tests-equilibre.md", motDePasse: "TD_MDP_TESTS_EQUILIBRE" },
    { id: "defis-equilibre", source: "contenu/td/defis-equilibre.md", motDePasse: "TD_MDP_DEFIS_EQUILIBRE" },
  ],
};

/**
 * Les outils de la section Outils, par l'identifiant qu'une fiche de TD cite
 * sur une ligne `Outil : <id>`. Un identifiant absent d'ici est une erreur.
 */
export const OUTILS = {
  "centre-de-masse": {
    titre: "Atelier centre de masse",
    href: "/outils/centre-de-masse",
    resume: "Pointer la photo, calculer le centre de masse, vérifier sa projection dans le polygone de sustentation.",
  },
  berg: {
    titre: "Échelle de Berg",
    href: "/outils/berg",
    resume: "Coter les 14 épreuves, obtenir le score sur 56 et le situer face aux valeurs de référence.",
  },
  tug: {
    titre: "Timed Up and Go",
    href: "/outils/tug",
    resume: "Chronométrer le test, enregistrer le temps et le situer face aux valeurs de référence.",
  },
};

/** Chemins absolus des fichiers de chapitre, dans l'ordre du cours. */
export function fichiersDeChapitre() {
  return COURSE.chapters.map((chapter) => path.join(VAULT, chapter.source));
}
