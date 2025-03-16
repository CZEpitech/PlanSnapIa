const express = require("express");
const cors = require("cors");
// Set environment variable to suppress all warnings
process.env.NODE_NO_WARNINGS = "1";
// Disable all ONNX runtime logging
process.env.ONNX_RUNTIME_LOG_LEVEL = "3"; // Only show errors (0=verbose, 1=info, 2=warning, 3=error, 4=fatal)
const { pipeline } = require("@xenova/transformers");
const templates = require("./templates");
const dictionaries = require("./dictionaries");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Modèles IA
let textGenerator;
const MAX_RETRIES = 3;
const AI_MODEL = "Xenova/distilgpt2";

// Récupération des templates depuis le module externe
const {
  TITLE_TEMPLATES,
  DESCRIPTION_INTROS,
  PERSONALITY_TRAITS,
  INTERESTS,
  RELATIONSHIP_GOALS,
  QUALITIES_SOUGHT,
  LIFE_PHILOSOPHIES,
} = templates;

// Récupération des dictionnaires pour le remixage
const {
  SENSUALITY_SYNONYMS,
  BODY_SYNONYMS,
  ACTION_SYNONYMS,
  QUALITIES_SYNONYMS,
  INTENSIFIERS,
  SEXUAL_EXPRESSIONS,
  SUGGESTIVE_EMOJIS,
  GENERIC_REPLACEMENTS,
  SEXUAL_ATTRIBUTES,
  NAUGHTY_PHRASES,
} = dictionaries;

async function initializeModels() {
  try {
    console.log("Initialisation des modèles IA...");
    textGenerator = await pipeline("text-generation", AI_MODEL);
    console.log("Modèles IA chargés avec succès!");
  } catch (error) {
    console.error("Erreur lors du chargement des modèles:", error);
  }
}

// Fonction utilitaire pour obtenir un élément aléatoire d'un tableau
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Fonction utilitaire pour mélanger un tableau
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Fonction pour générer un prompt aléatoire pour l'IA
function generateRandomPrompt(nom, age, ville) {
  const prompts = [
    `Titre d'annonce sexuelle pour ${nom}, ${age} ans, de ${ville}: `,
    `${nom}, ${age} ans, cherche des plans coquins à ${ville}. Titre de l'annonce: `,
    `Créez un titre hot pour l'annonce de ${nom}, ${age} ans, de ${ville}: `,
    `Annonce coquine: ${nom}, ${age} ans, habite à ${ville}. Titre: `,
    `Une femme sexy nommée ${nom}, ${age} ans, vit à ${ville}. Titre érotique pour son annonce: `,
  ];
  return getRandomItem(prompts);
}

// Fonction pour générer une description aléatoire pour le prompt de l'IA
function generateRandomDescriptionPrompt(nom, age, ville) {
  const prompts = [
    `Description sexy pour le profil de rencontre de ${nom}, ${age} ans, qui habite à ${ville}: `,
    `Écrivez une description érotique pour ${nom}, une femme de ${age} ans vivant à ${ville}: `,
    `Profil de rencontre hot: ${nom}, ${age} ans, de ${ville}. Description sexuelle: `,
    `${nom} est une femme sensuelle de ${age} ans vivant à ${ville}. Voici sa description de profil coquin: `,
    `Description de profil sexualisée pour une femme de ${age} ans nommée ${nom} qui habite à ${ville}: `,
  ];
  return getRandomItem(prompts);
}

// Nouvelle fonction pour remixer une phrase en remplaçant des mots par leurs synonymes
function remixWords(text) {
  if (!text) return text;

  // Parcourir tous les dictionnaires de synonymes
  const dictionaries = [
    SENSUALITY_SYNONYMS,
    BODY_SYNONYMS,
    ACTION_SYNONYMS,
    QUALITIES_SYNONYMS,
  ];

  let remixed = text;

  // Pour chaque dictionnaire, chercher et remplacer les mots
  dictionaries.forEach((dictionary) => {
    Object.keys(dictionary).forEach((word) => {
      // Créer une regex pour trouver le mot (avec des limites de mot)
      const regex = new RegExp(`\\b${word}\\b`, "gi");

      // Probabilité de 50% de remplacer le mot s'il est trouvé
      if (regex.test(remixed) && Math.random() < 0.5) {
        const replacement = getRandomItem(dictionary[word]);
        remixed = remixed.replace(regex, replacement);
      }
    });
  });

  // Rechercher et remplacer les expressions génériques
  Object.keys(GENERIC_REPLACEMENTS).forEach((phrase) => {
    const regex = new RegExp(`\\b${phrase}\\b`, "gi");

    // Probabilité de 40% de remplacer l'expression
    if (regex.test(remixed) && Math.random() < 0.4) {
      const replacement = getRandomItem(GENERIC_REPLACEMENTS[phrase]);
      remixed = remixed.replace(regex, replacement);
    }
  });

  return remixed;
}

// Fonction pour ajouter des intensificateurs aléatoires dans le texte
function addIntensifiers(text) {
  if (!text) return text;

  // Diviser le texte en phrases
  const sentences = text.split(". ");

  // Parcourir chaque phrase avec une probabilité d'ajouter un intensificateur
  const enhancedSentences = sentences.map((sentence) => {
    // Probabilité de 30% d'ajouter un intensificateur
    if (Math.random() < 0.3 && sentence.length > 5) {
      // Trouver un bon endroit pour l'intensificateur (après "suis", "très", etc.)
      const triggers = [
        "suis",
        "très",
        "vraiment",
        "plutôt",
        "assez",
        "tellement",
        "toujours",
        "bien",
      ];

      for (const trigger of triggers) {
        const regex = new RegExp(`\\b${trigger}\\b `, "i");
        const match = sentence.match(regex);

        if (match) {
          const position = match.index + match[0].length;
          const intensifier = getRandomItem(INTENSIFIERS);
          return (
            sentence.slice(0, position) +
            intensifier +
            " " +
            sentence.slice(position)
          );
        }
      }

      // Si aucun déclencheur n'est trouvé, mais contient "Je suis"
      if (sentence.includes("Je suis") || sentence.includes("je suis")) {
        // Ajouter au début de la phrase après "Je suis"
        return sentence.replace(
          /(Je suis|je suis)/,
          `$1 ${getRandomItem(INTENSIFIERS)}`
        );
      }
    }

    return sentence;
  });

  return enhancedSentences.join(". ");
}

// Fonction pour ajouter des émojis suggestifs au texte
function addSuggestiveEmojis(text) {
  if (!text) return text;

  // Diviser le texte en phrases
  const sentences = text.split(". ");

  // Parcourir chaque phrase avec une probabilité d'ajouter un emoji
  const emojiSentences = sentences.map((sentence) => {
    // Probabilité de 25% d'ajouter un emoji à la fin d'une phrase
    if (Math.random() < 0.25 && sentence.length > 3) {
      return sentence + " " + getRandomItem(SUGGESTIVE_EMOJIS);
    }
    return sentence;
  });

  return emojiSentences.join(". ");
}

// Fonction pour remplacer des phrases banales par des expressions sexuelles
function replaceBanalPhrases(text) {
  if (!text) return text;

  // Phrases banales courantes à remplacer
  const banalPhrases = [
    "à votre service",
    "à votre disposition",
    "prête à vous rencontrer",
    "disponible pour vous",
    "je vous attends",
    "intéressée par vous",
    "je cherche quelqu'un",
    "prête à écouter",
    "j'aimerais découvrir",
    "je suis ouverte à",
    "j'aime partager",
    "je souhaite rencontrer",
    "je suis disponible",
    "j'espère te plaire",
    "je veux te connaître",
  ];

  let enhancedText = text;

  banalPhrases.forEach((phrase) => {
    const regex = new RegExp(`\\b${phrase}\\b`, "gi");

    // Probabilité de 60% de remplacer une phrase banale
    if (regex.test(enhancedText) && Math.random() < 0.6) {
      enhancedText = enhancedText.replace(
        regex,
        getRandomItem(SEXUAL_EXPRESSIONS)
      );
    }
  });

  return enhancedText;
}

// Fonction pour intégrer des attributs sexuels et des phrases coquines
function integrateNaughtyContent(text) {
  if (!text) return text;

  // Diviser le texte en phrases
  const sentences = text.split(". ");

  // Si le texte a au moins 3 phrases, insérer du contenu coquin à une position aléatoire
  if (sentences.length >= 3) {
    const insertPosition =
      Math.floor(Math.random() * (sentences.length - 1)) + 1;

    if (Math.random() < 0.4) {
      // Ajouter un attribut sexuel
      const naughtyAttribute = `J'ai une ${getRandomItem(
        SEXUAL_ATTRIBUTES
      )} qui t'attend`;
      sentences.splice(insertPosition, 0, naughtyAttribute);
    } else {
      // Ajouter une phrase coquine
      sentences.splice(insertPosition, 0, getRandomItem(NAUGHTY_PHRASES));
    }
  }

  return sentences.join(". ");
}

// Fonction principale pour remixer une annonce complète (deux niveaux de remixage)
function remixAnnonce(annonce) {
  if (!annonce) return annonce;

  // Premier niveau de remixage - Modifications subtiles
  let remixedTitle = remixWords(annonce.titre);
  let remixedDesc = remixWords(annonce.description);

  // Ajout d'intensificateurs pour renforcer le ton
  remixedDesc = addIntensifiers(remixedDesc);

  // Ajouter du contenu coquin
  remixedDesc = integrateNaughtyContent(remixedDesc);

  // Deuxième niveau de remixage - Modifications plus prononcées
  remixedTitle = remixWords(remixedTitle); // Deuxième passage pour plus de variabilité

  // Remplacer des phrases banales par des expressions plus sexuelles
  remixedDesc = replaceBanalPhrases(remixedDesc);

  // Ajouter des émojis suggestifs (uniquement dans la description)
  remixedDesc = addSuggestiveEmojis(remixedDesc);

  // Faire un dernier passage de remixage de mots pour plus de variabilité
  remixedDesc = remixWords(remixedDesc);

  // Remplacement définitif avec vérification qu'on n'a pas de texte vide
  const finalTitle = remixedTitle || annonce.titre;
  const finalDesc = remixedDesc || annonce.description;

  return {
    ...annonce,
    titre: finalTitle,
    description: finalDesc,
    remixed: true, // Indicateur que l'annonce a été remixée
  };
}

// Fonction pour générer une annonce de rencontre
async function generateProfilAnnonce(nom, age, ville) {
  try {
    // Approche 1: Utiliser l'IA pour générer un titre
    const titlePrompt = generateRandomPrompt(nom, age, ville);
    let titre = "";

    // Probabilité 80% d'utiliser un template vs 20% pour l'IA
    if (Math.random() > 0.8) {
      try {
        const titreResult = await textGenerator(titlePrompt, {
          max_new_tokens: 20,
          temperature: 0.9 + Math.random() * 0.3, // Randomiser la température (0.9-1.2)
          do_sample: true,
          top_k: 40 + Math.floor(Math.random() * 20), // Randomiser top_k (40-60)
          repetition_penalty: 1.1 + Math.random() * 0.4, // Randomiser la pénalité (1.1-1.5)
        });

        titre = titreResult[0].generated_text.replace(titlePrompt, "").trim();

        // Nettoyer le titre pour éviter les caractères indésirables et les titres incohérents
        if (
          titre.length < 5 ||
          /[^\w\s.,!?:;\-'"éèêëàâäôöùûüçÉÈÊËÀÂÄÔÖÙÛÜÇ]/.test(titre)
        ) {
          // Si le titre contient des caractères indésirables ou est trop court, utiliser un template
          titre = getRandomItem(TITLE_TEMPLATES)
            .replace("{nom}", nom)
            .replace("{age}", age)
            .replace("{ville}", ville);
        } else {
          // Limiter la longueur du titre et s'assurer qu'il ne se termine pas par des caractères étranges
          titre =
            titre.split(/[.!?]/)[0] ||
            titre.substring(0, Math.min(40, titre.length));
          titre = titre.trim();
        }
      } catch (error) {
        console.error("Erreur lors de la génération du titre par IA:", error);
        // Fallback sur un template si l'IA échoue
        titre = getRandomItem(TITLE_TEMPLATES)
          .replace("{nom}", nom)
          .replace("{age}", age)
          .replace("{ville}", ville);
      }
    } else {
      // Utiliser un template (80% des cas)
      titre = getRandomItem(TITLE_TEMPLATES)
        .replace("{nom}", nom)
        .replace("{age}", age)
        .replace("{ville}", ville);
    }

    // Construction de la description de manière plus aléatoire
    let descriptionParts = [];

    // Commencer par une introduction (toujours présente)
    const intro = getRandomItem(DESCRIPTION_INTROS)
      .replace("{nom}", nom)
      .replace("{age}", age)
      .replace("{ville}", ville);
    descriptionParts.push(intro);

    // Ajouter des éléments de façon aléatoire avec forte probabilité pour les éléments sexualisés
    const possibleElements = [
      { source: PERSONALITY_TRAITS, prob: 0.95 }, // Traits de personnalité sexualisés
      {
        source: INTERESTS,
        prob: 0.95,
        count: 1 + Math.floor(Math.random() * 3), // 1-3 intérêts sexuels
      },
      { source: RELATIONSHIP_GOALS, prob: 0.9 }, // Objectifs relationnels sexualisés
      { source: QUALITIES_SOUGHT, prob: 0.85 }, // Qualités recherchées chez les hommes
      { source: LIFE_PHILOSOPHIES, prob: 0.8 }, // Philosophies de vie sexuelles
    ];

    // Parcourir les éléments possibles et les ajouter selon leur probabilité
    for (const element of possibleElements) {
      if (Math.random() < element.prob) {
        if (element.count) {
          // Si nous devons ajouter plusieurs éléments de cette catégorie
          const shuffled = shuffleArray(element.source);
          for (let i = 0; i < Math.min(element.count, shuffled.length); i++) {
            descriptionParts.push(shuffled[i]);
          }
        } else {
          // Sinon, ajouter un élément unique
          descriptionParts.push(getRandomItem(element.source));
        }
      }
    }

    // Probabilité 30% d'utiliser l'IA pour compléter ou améliorer la description
    let iaCompletion = "";
    if (Math.random() < 0.3) {
      try {
        // Joindre les parties et créer un prompt pour l'IA
        const baseDesc = descriptionParts.join(". ") + ".";
        const descPrompt = generateRandomDescriptionPrompt(nom, age, ville);

        const completion = await textGenerator(baseDesc + " " + descPrompt, {
          max_new_tokens: 50,
          temperature: 0.9 + Math.random() * 0.3, // Randomiser la température (0.9-1.2)
          do_sample: true,
          top_k: 50,
          top_p: 0.94 + Math.random() * 0.05, // Randomiser top_p (0.94-0.99)
          repetition_penalty: 1.2,
        });

        iaCompletion = completion[0].generated_text
          .replace(baseDesc + " " + descPrompt, "")
          .trim();

        // Vérifier la qualité du texte généré
        if (iaCompletion.length > 10 && !iaCompletion.includes("")) {
          descriptionParts.push(iaCompletion);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la génération du complément par IA:",
          error
        );
      }
    }

    // Construire la description finale
    const description = descriptionParts
      .filter(Boolean) // Éliminer les éléments vides
      .join(". ")
      .replace(/\.\s*\./g, ".") // Éviter les doubles points
      .replace(/\.\s+\./g, ".")
      .replace(/\s+\./g, ".")
      .trim();

    // Créer l'annonce initiale
    const annonce = {
      titre,
      description,
      model: AI_MODEL, // Inclure le modèle utilisé dans la réponse
    };

    // Appliquer le double remixage pour rendre l'annonce plus aléatoire
    const remixedAnnonce = remixAnnonce(annonce);

    return remixedAnnonce;
  } catch (error) {
    console.error("Erreur lors de la génération:", error);
    throw error;
  }
}

// Route pour générer une annonce
app.post("/api/generer-annonce", async (req, res) => {
  try {
    const { nom, age, ville } = req.body;

    // Validation des entrées
    if (!nom || !age || !ville) {
      return res.status(400).json({
        success: false,
        message: "Les paramètres nom, age et ville sont requis",
        model: AI_MODEL,
      });
    }

    // Vérifier que les modèles sont chargés
    if (!textGenerator) {
      return res.status(503).json({
        success: false,
        message:
          "Les modèles IA sont en cours de chargement, veuillez réessayer dans quelques instants",
        model: AI_MODEL,
      });
    }

    // Générer l'annonce
    const annonce = await generateProfilAnnonce(nom, age, ville);

    res.json({
      success: true,
      annonce,
      model: AI_MODEL,
    });
  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la génération de l'annonce",
      model: AI_MODEL,
    });
  }
});

// Route d'accueil
app.get("/", (req, res) => {
  res.json({
    message: "API de génération d'annonces de rencontre par IA",
    usage: "POST /api/generer-annonce avec un JSON contenant nom, age et ville",
    model: AI_MODEL, // Inclure le modèle également ici
  });
});

// Démarrer le serveur
app.listen(PORT, async () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  // Initialiser les modèles au démarrage
  await initializeModels();
});
