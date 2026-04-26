import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-4 w-full items-center m-4">
      <h1 className=" font-bold text-3xl text-mainRed">A propos</h1>
      <p className="text-sm font-normal text-black max-w-2xl mx-auto">
        Chez Kasa, nous croyons que chaque voyage mérite un lieu unique où se
        sentir bien.
      </p>
      <p className="text-sm font-normal text-black max-w-2xl mx-auto">
        Depuis notre création, nous mettons en relation des voyageurs en quête
        d&apos;authenticité avec hôtes passionnés qui aiment partager leur
        région et leurs bonnes adresses.
      </p>
      <Image
        src="/aboutLarge.png"
        alt="maison de campagne"
        width={2831}
        height={1593}
        priority
        className="w-auto lg:w-full h-112 sm:h-112 md:h-112 max-h-125 md:max-h-125 rounded-2xl object-cover mt-4 mb-4"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      />
      <div className="flex flex-col gap-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-start-1 row-start-1 md:self-end">
            <p className="font-bold text-lg text-mainRed mt-2 mb-2">
              Notre mission est simple :
            </p>
            <p className="text-black text-sm font-normal mt-2 mb-2">
              1. Offrir une plateforme fiable et simple d&apos;utilisation
            </p>
            <p className="text-black text-sm font-normal mt-2 mb-2">
              2. Proposer des hébergements variés et de qualité
            </p>
            <p className="text-black text-sm font-normal mt-2 mb-2">
              3. Favoriser des échanges humains et chaleureux entre hôtes et
              voyageurs
            </p>
          </div>
          <div className="col-start-1 row-start-3 md:row-start-2">
            <p className="font-bold text-lg text-mainRed">
              Que vous cherchiez un appartement cosy en centre-cille, une maison
              en bord de mer ou en chalter à la montagne, Kasa vous accompagne
              pour que chaque séjour devienne un souvenir inoubliable.
            </p>
          </div>
          <div className="col-start-1 row-start-2 md:col-start-2 md:row-start-1 md:row-span-2">
            <Image
              src="/aboutSmall.png"
              alt="maison de montagne"
              width={2670}
              height={1780}
              priority
              className="w-auto lg:w-full h-112 sm:h-112 md:h-112 max-h-125 md:max-h-125 rounded-2xl object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
