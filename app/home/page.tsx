"use server";

import { AppProperty } from "@/types/appTypes";

import HomePageClient from "./pageClient";

export default async function HomePage() {
  const property: AppProperty = {
    id: "c67ab8a7",
    slug: "appartement-cosy",
    title: "Appartement cosy",
    description:
      "Votre maison loin de chez vous. Que vous veniez de l'autre bout du monde, ou juste de quelques stations de RER, vous vous sentirez chez vous dans notre appartement.",
    cover:
      "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-1.jpg",
    location: "Ile de France - Paris 17e",
    price_per_night: 182,
    rating_avg: 5,
    ratings_count: 0,
    host: {
      id: 1,
      name: "Nathalie Jean",
      picture:
        "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-12.jpg",
    },
    pictures: [
      "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-1.jpg",
      "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-2.jpg",
      "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-3.jpg",
      "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-4.jpg",
      "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-5.jpg",
    ],
    equipments: [
      "Douche italienne",
      "Frigo",
      "Micro-Ondes",
      "WIFI",
      "Équipements de base",
    ],
    tags: ["Batignolle", "Montmartre"],
  };

  return <HomePageClient property={property} />;
}
