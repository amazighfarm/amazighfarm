function muscache(hostingId, uuid) {
  return `https://a0.muscache.com/im/pictures/hosting/Hosting-${hostingId}/original/${uuid}.jpeg?im_w=1600`;
}

const listings = [
  {
    slug: "chambre-atlas",
    title: "Chambre vue panoramique : Atlas, ferme, piscine",
    locationLabel: "Sur la ferme",
    shortDescription: "Chambre privee dans une maison partagee, vue jardin et piscine",
    type: "Chambre privee dans un gite a la ferme",
    guests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    bathType: "privee",
    rating: 5.0,
    reviews: 13,
    pricePerNight: 55,
    cleaningFee: 15,
    currency: "EUR",
    minNights: 1,
    airbnbUrl: "https://www.airbnb.fr/rooms/1571803280030277558",
    icalUrl: "",
    description: `Bienvenue dans notre chambre berbere boheme chic, au coeur d'une ferme de plus d'un hectare. Depuis le lit vous pouvez admirer le jardin paysage mediterraneen, sa piscine, la vaste oliveraie avec les montagnes de l'Atlas comme seule ligne d'horizon.

La chambre associe materiaux naturels, bois, artisanat local, tadelakt et teintes douces. Elle offre un lit confortable, une atmosphere chaleureuse et apaisante, ainsi qu'une salle de bain elegante.

La chambre est privee mais situee dans une maison partagee avec d'autres voyageurs. Il est possible de privatiser l'ensemble de la maison en nous contactant.

Le petit-dejeuner est inclus dans votre sejour. Vous profitez librement des deux piscines du domaine : la piscine principale pres de la cuisine d'ete, et une seconde piscine a debordement de 17x10 m nichee a l'oree de l'oliveraie.

La ferme fonctionne en grande partie en autonomie : electricite solaire et eau du puits, pour un sejour respectueux de l'environnement.`,
    amenities: [
      "Vue sur la montagne", "Vue sur le desert", "Piscine partagee", "Cuisine",
      "Wifi", "Espace de travail dedie", "Petit-dejeuner inclus",
      "Arrivee autonome (boite a cle)", "Electricite solaire", "Eau de puits",
    ],
    images: [
      muscache("1571803280030277558", "dc3d438e-f650-425d-b142-db214fdfa79e"),
      muscache("1571803280030277558", "be60b0ef-1c92-4293-981f-ec81742c6870"),
      muscache("1571803280030277558", "56c0d1b4-103f-4e54-8815-edd895fe53ea"),
      muscache("1571803280030277558", "c63fe7e3-f445-442b-a5b8-9b2868f82bb8"),
      muscache("1571803280030277558", "58652cdb-cd19-4d40-94fe-d946993335cd"),
    ],
  },
  {
    slug: "maison-boheme",
    title: "Maison boheme chic, piscine privee, vue Atlas",
    locationLabel: "Sur la ferme",
    shortDescription: "Maison entiere de 150 m2, 3 chambres, piscine privative",
    type: "Gite a la ferme (logement entier)",
    guests: 7,
    bedrooms: 3,
    beds: 5,
    baths: 2,
    bathType: "privees",
    rating: 5.0,
    reviews: 30,
    pricePerNight: 170,
    cleaningFee: 35,
    currency: "EUR",
    minNights: 2,
    airbnbUrl: "https://www.airbnb.fr/rooms/1572336783870170028",
    icalUrl: "",
    description: `Bienvenue dans notre maison berbere boheme, composee de trois chambres, au coeur d'une ferme de plus d'un hectare. Depuis ses interieurs de 150 m2, vous pouvez admirer le jardin paysage mediterraneen et sa piscine privative, la vaste oliveraie avec les montagnes de l'Atlas comme seule ligne d'horizon.

La maison associe materiaux naturels, artisanat local, bois, tadelakt et teintes douces. Spacieuse, elle abrite deux chambres (et leurs salles de bain) positionnees a chaque extremite garantissant tranquillite et intimite, et une troisieme chambre d'appoint avec un coin bureau face a l'Atlas.

Deux salons, un coin cheminee sous un plafond cathedrale en pierre locale, des espaces pour travailler, lire, flaner, ainsi que plusieurs lieux dedies aux repas selon les saisons. Le petit-dejeuner est inclus.

Vous profitez egalement d'une seconde piscine a debordement de 17x10 m, commune, nichee a l'oree de l'oliveraie.`,
    amenities: [
      "Piscine privee", "Vue sur la montagne", "Vue sur le desert", "Cuisine",
      "Wifi", "Espace de travail dedie", "Petit-dejeuner inclus", "2 salons",
      "Cheminee", "Arrivee autonome (boite a cle)", "Electricite solaire",
    ],
    images: [
      muscache("1572336783870170028", "6c8bdfca-7fe0-41b2-ac6d-494edb66ad51"),
      muscache("1572336783870170028", "1bf6e822-9e72-4ece-a757-2fd1625a4677"),
      muscache("1572336783870170028", "b7c04fcf-de86-4ddd-9c3e-4719c4d1d4a6"),
      muscache("1572336783870170028", "3fb8bc49-2ba5-42d4-a595-b42f230cbf65"),
      muscache("1572336783870170028", "744ac462-0c0f-4b59-a361-1aa562741475"),
      muscache("1572336783870170028", "517c1826-9414-4e8c-b8f9-8faf01177940"),
      muscache("1572336783870170028", "53359ea3-3ae1-4edb-9d21-22058d2fe0b9"),
      muscache("1572336783870170028", "14c8e38d-ff69-4609-a625-bed79f266cc0"),
      muscache("1572336783870170028", "5694a495-ed29-4555-866a-26edb60c8ba0"),
    ],
  },
  {
    slug: "maison-berbere",
    title: "Maison berbere, piscine privee, vue Atlas",
    locationLabel: "Annexe de la ferme · village voisin · piscine privee",
    shortDescription: "Maison traditionnelle en pise, 140 m2, piscine et jardin privatifs",
    type: "Logement entier",
    guests: 5,
    bedrooms: 2,
    beds: 3,
    baths: 2,
    bathType: "privees",
    rating: null,
    reviews: 0,
    pricePerNight: 140,
    cleaningFee: 30,
    currency: "EUR",
    minNights: 2,
    airbnbUrl: "https://www.airbnb.fr/rooms/1684668083198835450",
    icalUrl: "",
    description: `Cette maison est une annexe du domaine Amazigh Farm : elle se situe dans le village voisin, hors du terrain de la ferme, avec sa propre piscine privee.

Bienvenue dans notre maison berbere boheme, composee de deux chambres, au coeur d'un village berbere authentique. Maison traditionnelle de 140 m2 construite en pise avec piscine et jardin privatifs de 250 m2, terrasse-toit avec vue sur l'Atlas, piscine a debordement sans vis-a-vis. Equipee d'Internet et TV.

La maison associe materiaux naturels, artisanat local, bois, tadelakt et teintes douces. Le toit-terrasse offre une vue a 360 degres sur Marrakech, le village berbere et les montagnes de l'Atlas.

Spacieuse, la maison abrite deux chambres (et leurs salles de bain) positionnees a chaque extremite, garantissant tranquillite et intimite. Deux salons, un coin cheminee sous un plafond cathedrale en pierre locale, des espaces pour travailler, lire, flaner.

L'eau chaude est alimentee par l'electricite solaire et l'eau du puits.`,
    amenities: [
      "Piscine privee", "Cuisine", "Wifi", "Espace de travail dedie",
      "Stationnement gratuit sur place", "Terrasse sur le toit", "TV",
      "Arrivee autonome (boite a cle)", "Cafe a domicile", "Electricite solaire",
    ],
    images: [
      muscache("1684668083198835450", "383a8d68-5469-4f1e-bb32-7ad43c5d0dc7"),
      muscache("1684668083198835450", "89462aa7-2ce8-44f0-84f9-c114864d1418"),
      muscache("1684668083198835450", "42e6a272-4a1d-4f65-a1c4-b9def2ebe2be"),
      muscache("1684668083198835450", "029e7b87-faba-4a8d-b879-da8995778cc1"),
      muscache("1684668083198835450", "3ef69f12-821a-4f96-8c46-88e9422620e4"),
      muscache("1684668083198835450", "09b089ed-7b8d-4c75-92d8-4b8655a8acfc"),
      muscache("1684668083198835450", "8bddf1e8-1066-4189-9b29-86acc586c459"),
      muscache("1684668083198835450", "76b1a375-f143-4a9b-9811-3f87bfc1084d"),
    ],
  },
  {
    slug: "suite-atlas",
    title: "Suite vue panoramique : Atlas, ferme, piscine",
    locationLabel: "Sur la ferme",
    shortDescription: "Suite privee avec lit double + lit simple, vue jardin et piscine",
    type: "Chambre privee dans un gite a la ferme",
    guests: 3,
    bedrooms: 1,
    beds: 2,
    baths: 1,
    bathType: "privee",
    rating: 4.9,
    reviews: 10,
    pricePerNight: 65,
    cleaningFee: 15,
    currency: "EUR",
    minNights: 1,
    airbnbUrl: "https://www.airbnb.fr/rooms/1571860423248417815",
    icalUrl: "",
    description: `Bienvenue dans notre suite berbere boheme chic, au coeur d'une ferme de plus d'un hectare. Depuis le lit vous pouvez admirer le jardin paysage mediterraneen, sa piscine, la vaste oliveraie avec les montagnes de l'Atlas comme seule ligne d'horizon.

La suite associe materiaux naturels, bois, artisanat local, tadelakt et teintes douces. Elle offre un lit double confortable ainsi qu'un lit simple supplementaire, ideal pour un enfant ou un troisieme voyageur.

La chambre est privee mais situee dans une maison partagee avec d'autres voyageurs. Il est possible de privatiser l'ensemble de la maison en nous contactant.

Le petit-dejeuner est inclus dans votre sejour. Vous profitez librement des deux piscines du domaine.`,
    amenities: [
      "Vue sur la montagne", "Vue sur le desert", "Piscine partagee", "Cuisine",
      "Wifi", "Espace de travail dedie", "Petit-dejeuner inclus",
      "Arrivee autonome (boite a cle)", "Electricite solaire",
    ],
    images: [
      muscache("1571860423248417815", "8df7e71d-803c-4dbc-a37c-31e330020a0d"),
      muscache("1571860423248417815", "ff26fb73-a4cf-41fb-bb98-48f8e96900d7"),
      muscache("1571860423248417815", "cc273eb4-2006-4519-8b7d-ff630320d797"),
      muscache("1571860423248417815", "7670309c-bce7-45a8-8cfb-a0796a31d456"),
      muscache("1571860423248417815", "d5c1eb46-b4c7-4133-8b17-0dd20ca61a10"),
      muscache("1571860423248417815", "ff6716f7-27da-478b-950a-1964bed50dd3"),
    ],
  },
  {
    slug: "van-vintage",
    title: "Nuit insolite en van vintage - desert Agafay",
    locationLabel: "Sur la ferme",
    shortDescription: "Volkswagen T2 de 1976 restaure, face aux montagnes de l'Atlas",
    type: "Tiny house / experience insolite",
    guests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    bathType: "privee (exterieure)",
    rating: 4.92,
    reviews: 38,
    pricePerNight: 90,
    cleaningFee: 15,
    currency: "EUR",
    minNights: 1,
    airbnbUrl: "https://www.airbnb.fr/rooms/1331900022629792503",
    icalUrl: "",
    description: `Vivez une experience unique dans notre Volkswagen T2 de 1976, installe face aux montagnes de l'Atlas et du desert d'Agafay.

Ce lieu n'est pas un hebergement classique : c'est une experience privee et soigneusement pensee, destinee aux voyageurs en quete d'authenticite, d'esthetique et de calme, loin des circuits touristiques habituels.

Le van dispose d'un coin couchage confortable, agremente de tapis berberes, coussins et objets de decoration marocains chines avec attention. Une douche et des toilettes independantes sont a votre disposition sur le terrain, pour votre seul usage. Serviettes et gel douche fournis.

Acces a la piscine, electricite solaire, coin salon berbere avec brasero. Au coucher du soleil, l'atmosphere devient paisible et hors du temps.

Le van est situe dans un environnement naturel, soumis au vent et au sable : ces conditions font partie de l'experience.`,
    amenities: [
      "Vue sur le desert", "Vue sur la montagne", "Acces piscine", "Wifi",
      "Espace de travail dedie", "Stationnement gratuit sur place",
      "Douche et toilettes privees exterieures", "Brasero berbere", "Electricite solaire",
    ],
    images: [
      muscache("1331900022629792503", "d52d35d8-dd28-4384-ad22-6a1a2fa310c7"),
      muscache("1331900022629792503", "1f7217e3-c874-46b6-8334-ffcd463b87ac"),
      muscache("1331900022629792503", "849ed095-9ffb-4051-8d9b-567688236900"),
      muscache("1331900022629792503", "2082c4b7-5ae7-4c66-8aa2-f71f8dc9bdf3"),
      muscache("1331900022629792503", "ca2a1190-e345-4fb1-b14a-6bec339cbf80"),
    ],
  },
];

module.exports = listings;
