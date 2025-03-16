// Templates de base pour guider la génération
const TITLE_TEMPLATES = [
  "Chaude et disponible à {ville}",
  "{nom}, {age} ans, prête à t'accueillir",
  "Moments torrides à {ville} avec {nom}",
  "{nom}, {age} ans, pour des plaisirs sans limite",
  "Envie de sensations fortes à {ville}? {nom} t'attend",
  "Coquine de {age} ans sur {ville}",
  "Femme insatiable à {ville}: {nom}, {age} ans",
  "Rencontre chaude avec {nom} à {ville}",
  "Sexy {nom}, {age} ans, cherche mâle à {ville}",
  "{nom} pour moments intenses à {ville}",
  "Femme libérée à {ville} cherche sexe",
  "Sans tabou à {ville}: {nom}, {age} ans",
  "Chaude comme la braise: {nom}, {age} ans, {ville}",
  "{nom} de {ville}: experte en plaisir à {age} ans",
  "Rencontre érotique à {ville} avec {nom}",
  "Pour nuit torride à {ville}: {nom}, {age} ans",
  "Plan sexe avec {nom} à {ville}",
  "Coquine {nom} disponible maintenant à {ville}",
  "Lèvres gourmandes: {nom}, {age} ans, {ville}",
  "Ton fantasme à {ville}: {nom}, {age} ans",
  "Délices interdits avec {nom} à {ville}",
  "Ardente {nom} pour tes désirs à {ville}",
  "À dévorer sans modération: {nom}, {age} ans",
  "Sexe intense avec {nom} à {ville}",
  "Sensations brûlantes: {nom}, {age} ans",
  "Libertine {nom} t'attend à {ville}",
  "Femme sauvage à {ville}: {nom}, {age} ans",
  "Corps de rêve à {ville}: {nom}, {age} ans",
  "Femme affamée de sexe: {nom}, {age} ans",
  "Bombe sexuelle de {ville}: {nom}, {age} ans",
  "Escale sensuelle à {ville} avec {nom}",
  "Liaison discrète avec {nom} à {ville}",
  "Aventure érotique avec {nom}, {age} ans",
  "Pour assouvir tes pulsions à {ville}: {nom}",
  "Un corps fait pour le plaisir: {nom}, {age} ans",
  "Nymphomane à {ville} cherche partenaire de jeu",
  "Hot {nom} de {ville} pour moments chauds",
  "Maîtresse de la volupté à {ville}: {nom}",
  "Envie de jouir? {nom}, {age} ans, à {ville}",
  "L'art du plaisir charnel: {nom}, {age} ans",
];

const DESCRIPTION_INTROS = [
  `Salut beau mâle, c'est {nom}, {age} ans, je t'attends à {ville}.`,
  `{nom}, {age} ans, à {ville}, cherche des moments torrides.`,
  `Je suis {nom}, {age} ans, et j'ai très envie de te rencontrer à {ville}.`,
  `Disponible à {ville}, {nom}, {age} ans, pour réaliser tes fantasmes.`,
  `Femme chaude de {age} ans, {nom}, brûlante de désir à {ville}.`,
  `{nom}, {age} ans, habitante de {ville}, en manque de sexe.`,
  `Je m'appelle {nom}, j'ai {age} ans et je vis à {ville}, prête à tout pour te satisfaire.`,
  `Sensuelle {nom}, {age} ans, de {ville}, cherche homme bien monté.`,
  `Féline et coquine, {nom}, {age} ans, t'attend impatiemment à {ville}.`,
  `Chaude comme la braise, {nom}, {age} ans, à {ville}, cherche à s'amuser.`,
  `Salut, ici {nom}, {age} ans, femme libérée vivant à {ville}.`,
  `Bonjour homme viril, je suis {nom}, {age} ans, de {ville}, et je suis en chaleur.`,
  `{nom}, {age} ans, nympho assumée de {ville}, cherche à combler ses désirs.`,
  `Je m'appelle {nom}, j'ai {age} ans, et mon corps brûlant t'attend à {ville}.`,
  `Femme sulfureuse de {age} ans, {nom}, vivant à {ville}, désireuse de sensations.`,
  `{nom} de {ville}, {age} ans, féline affamée prête à rugir sous tes caresses.`,
  `Femme de {age} ans à {ville}, {nom}, cherche à assouvir sa soif de sexe.`,
  `{nom}, {age} printemps et toutes mes courbes t'attendent à {ville}.`,
  `Belle {nom}, {age} ans, corps excitant disponible à {ville} pour toi.`,
  `Coucou bel étalon, c'est {nom} de {ville}, {age} ans et très coquine.`,
];

const PERSONALITY_TRAITS = [
  "Je suis une femme sensuelle et audacieuse",
  "Je suis coquine et sans tabou",
  "Je suis douce mais très aventureuse au lit",
  "Je suis expérimentée et j'aime prendre l'initiative",
  "Je suis joueuse et pleine de surprises coquines",
  "Je suis passionnée et débordante d'énergie pour des marathons sexuels",
  "Je suis spontanée et j'adore les imprévus",
  "Je suis curieuse et toujours prête à découvrir de nouvelles pratiques",
  "Je suis attentionnée et à l'écoute de tes envies les plus secrètes",
  "Je suis charmante et j'ai le sens de l'humour, même nue",
  "Je suis mystérieuse et pleine de surprises sous les draps",
  "Je suis une vraie tigresse au lit",
  "Je suis insatiable et toujours en demande",
  "Je suis chaude et humide en permanence",
  "Je suis délicieuse et experte en plaisirs variés",
  "Je suis gourmande de nouvelles sensations",
  "Je suis une femme de caractère qui aime dominer au lit",
  "Je suis soumise et prête à réaliser tes fantasmes",
  "Je suis fougueuse et passionnée dans l'intimité",
  "Je suis sensible aux caresses et très réactive",
  "Je suis une femme libérée qui assume ses désirs",
  "Je suis aguicheuse et j'aime séduire",
  "Je suis épicurienne et j'adore les plaisirs charnels",
  "Je suis directe et je n'ai pas peur de dire ce que je veux",
  "Je suis tactile et j'aime sentir la chaleur d'un corps contre le mien",
  "Je suis flexible et ouverte à tous types d'expériences",
  "Je suis délicate avec ma bouche mais sauvage avec mon corps",
  "Je suis naturelle et sans complexe",
  "Je suis une femme qui aime faire plaisir autant que recevoir",
  "Je suis expressive et vocale pendant l'amour",
];

const INTERESTS = [
  "J'adore les jeux de rôle et les tenues sexy",
  "Je suis ouverte à toutes les expériences, même les plus extrêmes",
  "J'aime les massages sensuels qui finissent bien",
  "Je suis experte en moments de détente très particuliers",
  "J'apprécie les rencontres discrètes et intenses",
  "Je suis douée pour te faire oublier tous tes soucis",
  "J'aime prendre mon temps pour explorer ton corps",
  "Je raffole des longues sessions de plaisir",
  "J'adore les soirées qui commencent par un verre et finissent au lit",
  "Je suis passionnée par les plaisirs charnels",
  "J'aime les rencontres nocturnes pleines de surprises",
  "Je suis fan des préliminaires qui durent",
  "J'apprécie l'art de la séduction dans toutes ses nuances",
  "Je collectionne les moments intenses et mémorables",
  "J'adore sentir un homme prendre le contrôle",
  "J'ai un faible pour les hommes qui savent utiliser leur langue",
  "Je pratique l'art de la fellation avec passion",
  "J'excelle dans les caresses intimes prolongées",
  "Je suis attirée par les situations imprévues et spontanées",
  "J'apprécie la lingerie fine et les accessoires coquins",
  "Je suis adepte du sexe sans tabou ni limite",
  "J'aime explorer tous les recoins du plaisir",
  "Je suis passionnée par les jeux de domination et soumission",
  "J'adore les moments où l'on se découvre mutuellement",
  "Je raffole des positions insolites et acrobatiques",
  "J'aime sentir le désir monter progressivement",
  "Je suis une experte en caresses intimes et sensuelles",
  "J'adore quand les préliminaires s'éternisent",
  "J'apprécie les mots crus pendant l'acte",
  "Je suis fan des baisers profonds et passionnés",
  "J'ai un faible pour les étreintes torrides",
  "J'aime sentir un homme perdre le contrôle à cause de moi",
  "Je raffole des ébats intenses et sauvages",
  "Je suis fascinée par l'exploration de nouveaux territoires du plaisir",
  "J'adore les situations où le désir est à son comble",
];

const RELATIONSHIP_GOALS = [
  "Je cherche des rencontres intenses sans prise de tête",
  "Je veux partager des moments de plaisir sans engagement",
  "Je suis disponible pour des rendez-vous discrets et passionnés",
  "Je propose des moments d'évasion loin de la routine",
  "Je suis là pour réaliser tes désirs les plus secrets",
  "Je recherche une connexion physique puissante",
  "Je souhaite vivre des instants magiques de sexe intense",
  "Je suis en quête de complicité et de partage charnel",
  "J'aspire à des rencontres qui sortent de l'ordinaire",
  "Je désire créer des souvenirs inoubliables avec toi",
  "Je veux explorer une relation basée sur le plaisir partagé",
  "Je cherche un partenaire de jeu coquin et inventif",
  "Je suis prête à t'accueillir pour des moments torrides",
  "Je désire un homme qui saura me combler physiquement",
  "Je suis à la recherche d'aventures chaudes et intenses",
  "Je cherche un homme pour des plans réguliers sans attache",
  "Je souhaite une relation où le plaisir est la priorité",
  "Je veux un partenaire pour explorer mes fantasmes les plus fous",
  "Je suis à la recherche d'un homme qui saura me faire vibrer",
  "Je désire des moments volés et intenses loin de la routine",
  "Je cherche un partenaire qui comprend mes besoins physiques",
  "Je suis ouverte à des relations passagères mais intenses",
  "Je veux quelqu'un pour assouvir mes pulsions sans tabou",
  "Je recherche une relation basée uniquement sur le plaisir",
  "Je suis disponible pour des hommes qui savent ce qu'ils veulent",
  "Je cherche à vivre des expériences sexuelles variées",
  "Je veux explorer mes limites avec un partenaire entreprenant",
  "Je suis prête à m'offrir entièrement pour des moments de pure extase",
  "Je désire construire un jardin secret de sensualité avec toi",
  "Je cherche un complice pour des rencontres torrides et sans lendemain",
];

const QUALITIES_SOUGHT = [
  "J'apprécie les hommes virils et endurants",
  "Je suis attirée par les hommes qui savent ce qu'ils veulent",
  "Je recherche quelqu'un d'expérimenté et imaginatif",
  "J'aime les hommes qui prennent l'initiative au lit",
  "Je suis sensible aux hommes qui connaissent le corps féminin",
  "J'admire les hommes passionnés et fougueux",
  "Je recherche un homme bien membré et endurant",
  "J'apprécie les hommes qui me font sentir désirée",
  "Je suis attirée par les hommes qui savent varier les plaisirs",
  "J'aime les hommes qui me font perdre le contrôle",
  "Je recherche un homme au physique agréable et endurant",
  "J'admire les hommes qui savent utiliser leur langue",
  "Je suis sensible aux hommes qui prennent leur temps",
  "J'apprécie les hommes dominants mais attentionnés",
  "Je recherche quelqu'un qui aime donner autant que recevoir",
  "J'aime les hommes entreprenants et à l'aise avec leur corps",
  "Je suis attirée par les hommes qui savent parler pendant l'acte",
  "Je recherche un partenaire avec de l'endurance",
  "J'apprécie les hommes qui sont à l'écoute de mes réactions",
  "Je suis sensible aux hommes qui savent être doux et sauvages",
  "Je préfère les hommes directs qui n'ont pas peur d'exprimer leurs désirs",
  "J'aime les hommes qui me traitent comme une déesse au lit",
  "Je recherche quelqu'un qui n'est pas pressé et sait prendre son temps",
  "J'adore les hommes qui me surprennent avec leur imagination",
  "Je suis attirée par les hommes qui ont de l'expérience",
  "J'apprécie les hommes qui savent être sensuel avant d'être sexuel",
  "Je recherche un homme qui peut tenir plusieurs rounds",
  "Je suis sensible aux hommes qui savent créer une ambiance érotique",
  "J'aime les hommes qui sont propres et soignés",
  "Je suis attirée par les hommes qui apprécient mon corps tel qu'il est",
];

const LIFE_PHILOSOPHIES = [
  "Je crois que la vie est faite pour prendre du plaisir chaque jour",
  "Pour moi, le sexe est essentiel à l'épanouissement",
  "Je pense que la communication des désirs est la clé d'une bonne relation",
  "J'estime que l'exploration de nos fantasmes est libératrice",
  "Je suis convaincue que le plaisir demande de l'audace",
  "Je crois en la force des corps qui se découvrent",
  "Pour moi, la vie est trop courte pour se refuser des plaisirs",
  "Je pense qu'il faut profiter de chaque occasion pour jouir",
  "J'ai appris que le bonheur se trouve dans l'extase partagée",
  "Je crois que chaque rencontre peut être excitante",
  "Pour moi, la liberté sexuelle est non négociable",
  "Je pense que l'intensité du désir grandit dans l'expérimentation",
  "J'estime que la confiance permet les plus beaux abandons",
  "Je suis persuadée que les plaisirs nous rendent plus vivants",
  "Je crois que le corps est fait pour être célébré et adoré",
  "Pour moi, le désir est le plus beau des langages",
  "Je pense que la sexualité est une forme d'art à explorer",
  "Je crois en l'importance de se libérer des tabous",
  "J'ai compris que la vraie connexion passe par le corps",
  "Je suis certaine que nos instincts sont là pour être écoutés",
  "Pour moi, le plaisir est une priorité dans la vie",
  "Je pense que le jeu de la séduction est une danse délicieuse",
  "J'ai découvert que nos désirs révèlent notre vraie nature",
  "Je crois en la puissance de l'attraction physique immédiate",
  "Pour moi, le sexe est une forme de méditation en mouvement",
  "Je pense que les meilleures relations sont celles sans attente",
  "J'ai appris que la spontanéité mène aux meilleures expériences",
  "Je suis persuadée que l'orgasme est la plus belle des libérations",
  "Je crois que nos fantasmes méritent d'être réalisés",
  "Pour moi, l'érotisme est présent dans chaque instant de la vie",
];

// Exporter les constantes
module.exports = {
  TITLE_TEMPLATES,
  DESCRIPTION_INTROS,
  PERSONALITY_TRAITS,
  INTERESTS,
  RELATIONSHIP_GOALS,
  QUALITIES_SOUGHT,
  LIFE_PHILOSOPHIES,
};
