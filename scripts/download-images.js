// Telecharge une fois pour toutes les photos Airbnb en local dans public/images/
// Pourquoi : Airbnb (muscache.com) bloque l'affichage de ses images depuis un autre
// site (protection anti-hotlink), ce qui causait les photos cassees sur le site.
// Une fois telechargees ici, elles sont servies directement par ton propre serveur
// et s'afficheront toujours, meme si les annonces Airbnb sont un jour supprimees.
//
// Utilisation : depuis le dossier "site", lance : node scripts/download-images.js

const fs = require("fs");
const path = require("path");
const https = require("https");

function muscache(hostingId, uuid) {
  return `https://a0.muscache.com/im/pictures/hosting/Hosting-${hostingId}/original/${uuid}.jpeg?im_w=1600`;
}

const manifest = [
  // chambre-atlas
  { url: muscache("1571803280030277558", "dc3d438e-f650-425d-b142-db214fdfa79e"), dest: "chambre-atlas/01.jpg" },
  { url: muscache("1571803280030277558", "be60b0ef-1c92-4293-981f-ec81742c6870"), dest: "chambre-atlas/02.jpg" },
  { url: muscache("1571803280030277558", "56c0d1b4-103f-4e54-8815-edd895fe53ea"), dest: "chambre-atlas/03.jpg" },
  { url: muscache("1571803280030277558", "c63fe7e3-f445-442b-a5b8-9b2868f82bb8"), dest: "chambre-atlas/04.jpg" },
  { url: muscache("1571803280030277558", "58652cdb-cd19-4d40-94fe-d946993335cd"), dest: "chambre-atlas/05.jpg" },

  // maison-boheme
  { url: muscache("1572336783870170028", "6c8bdfca-7fe0-41b2-ac6d-494edb66ad51"), dest: "maison-boheme/01.jpg" },
  { url: muscache("1572336783870170028", "1bf6e822-9e72-4ece-a757-2fd1625a4677"), dest: "maison-boheme/02.jpg" },
  { url: muscache("1572336783870170028", "b7c04fcf-de86-4ddd-9c3e-4719c4d1d4a6"), dest: "maison-boheme/03.jpg" },
  { url: muscache("1572336783870170028", "3fb8bc49-2ba5-42d4-a595-b42f230cbf65"), dest: "maison-boheme/04.jpg" },
  { url: muscache("1572336783870170028", "744ac462-0c0f-4b59-a361-1aa562741475"), dest: "maison-boheme/05.jpg" },
  { url: muscache("1572336783870170028", "517c1826-9414-4e8c-b8f9-8faf01177940"), dest: "maison-boheme/06.jpg" },
  { url: muscache("1572336783870170028", "53359ea3-3ae1-4edb-9d21-22058d2fe0b9"), dest: "maison-boheme/07.jpg" },
  { url: muscache("1572336783870170028", "14c8e38d-ff69-4609-a625-bed79f266cc0"), dest: "maison-boheme/08.jpg" },
  { url: muscache("1572336783870170028", "5694a495-ed29-4555-866a-26edb60c8ba0"), dest: "maison-boheme/09.jpg" },

  // maison-berbere
  { url: muscache("1684668083198835450", "383a8d68-5469-4f1e-bb32-7ad43c5d0dc7"), dest: "maison-berbere/01.jpg" },
  { url: muscache("1684668083198835450", "89462aa7-2ce8-44f0-84f9-c114864d1418"), dest: "maison-berbere/02.jpg" },
  { url: muscache("1684668083198835450", "42e6a272-4a1d-4f65-a1c4-b9def2ebe2be"), dest: "maison-berbere/03.jpg" },
  { url: muscache("1684668083198835450", "029e7b87-faba-4a8d-b879-da8995778cc1"), dest: "maison-berbere/04.jpg" },
  { url: muscache("1684668083198835450", "3ef69f12-821a-4f96-8c46-88e9422620e4"), dest: "maison-berbere/05.jpg" },
  { url: muscache("1684668083198835450", "09b089ed-7b8d-4c75-92d8-4b8655a8acfc"), dest: "maison-berbere/06.jpg" },
  { url: muscache("1684668083198835450", "8bddf1e8-1066-4189-9b29-86acc586c459"), dest: "maison-berbere/07.jpg" },
  { url: muscache("1684668083198835450", "76b1a375-f143-4a9b-9811-3f87bfc1084d"), dest: "maison-berbere/08.jpg" },

  // suite-atlas
  { url: muscache("1571860423248417815", "8df7e71d-803c-4dbc-a37c-31e330020a0d"), dest: "suite-atlas/01.jpg" },
  { url: muscache("1571860423248417815", "ff26fb73-a4cf-41fb-bb98-48f8e96900d7"), dest: "suite-atlas/02.jpg" },
  { url: muscache("1571860423248417815", "cc273eb4-2006-4519-8b7d-ff630320d797"), dest: "suite-atlas/03.jpg" },
  { url: muscache("1571860423248417815", "7670309c-bce7-45a8-8cfb-a0796a31d456"), dest: "suite-atlas/04.jpg" },
  { url: muscache("1571860423248417815", "d5c1eb46-b4c7-4133-8b17-0dd20ca61a10"), dest: "suite-atlas/05.jpg" },
  { url: muscache("1571860423248417815", "ff6716f7-27da-478b-950a-1964bed50dd3"), dest: "suite-atlas/06.jpg" },

  // van-vintage
  { url: muscache("1331900022629792503", "d52d35d8-dd28-4384-ad22-6a1a2fa310c7"), dest: "van-vintage/01.jpg" },
  { url: muscache("1331900022629792503", "1f7217e3-c874-46b6-8334-ffcd463b87ac"), dest: "van-vintage/02.jpg" },
  { url: muscache("1331900022629792503", "849ed095-9ffb-4051-8d9b-567688236900"), dest: "van-vintage/03.jpg" },
  { url: muscache("1331900022629792503", "2082c4b7-5ae7-4c66-8aa2-f71f8dc9bdf3"), dest: "van-vintage/04.jpg" },
  { url: muscache("1331900022629792503", "ca2a1190-e345-4fb1-b14a-6bec339cbf80"), dest: "van-vintage/05.jpg" },
];

const baseDir = path.join(__dirname, "..", "public", "images");

function download(url, dest, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 5) return reject(new Error("Trop de redirections"));
    const fullPath = path.join(baseDir, dest);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    const file = fs.createWriteStream(fullPath);
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close();
          fs.unlinkSync(fullPath);
          return resolve(download(res.headers.location, dest, redirects + 1));
        }
        if (res.statusCode !== 200) {
          file.close();
          return reject(new Error(`HTTP ${res.statusCode} pour ${url}`));
        }
        res.pipe(file);
        file.on("finish", () => file.close(() => resolve()));
      })
      .on("error", (err) => {
        file.close();
        reject(err);
      });
  });
}

async function main() {
  console.log(`Telechargement de ${manifest.length} photos vers public/images/ ...`);
  let ok = 0;
  let fail = 0;
  for (const item of manifest) {
    try {
      await download(item.url, item.dest);
      console.log(`OK   ${item.dest}`);
      ok++;
    } catch (err) {
      console.error(`ECHEC ${item.dest} : ${err.message}`);
      fail++;
    }
  }
  console.log(`\nTermine : ${ok} reussies, ${fail} echouees.`);
  if (fail > 0) {
    console.log("Pour les photos en echec, relance simplement le script (reseau instable parfois).");
  }
}

main();
