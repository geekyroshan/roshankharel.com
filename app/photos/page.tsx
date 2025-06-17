import { Slide } from "../animation/Slide";
import Image from "next/image";
import { Metadata } from "next";
import PageHeading from "@/app/components/shared/PageHeading";
import { photosQuery } from "@/lib/sanity.query";
import { sanityFetch } from "@/lib/sanity.client";
import EmptyState from "@/app/components/shared/EmptyState";
import { PhotoType } from "@/types";

export const metadata: Metadata = {
  title: "Photos | Roshan Kharel",
  metadataBase: new URL("https://geekyroshan.com/photos"),
  description: "Explore photos taken by Roshan Kharel",
  openGraph: {
    title: "Photos | Roshan Kharel",
    url: "https://geekyroshan.com/photos",
    description: "Explore photos taken by Roshan Kharel",
    images:
      "https://res.cloudinary.com/geekyroshan/image/upload/v1692635149/roshankharel/photos.png",
  },
};

export default async function Photos() {
  const photos = await sanityFetch<PhotoType[]>({
    query: photosQuery,
    tags: ["photo"],
  });

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-32 mt-20">
      <PageHeading
        title="Photos"
        description="A collection of my favorite moments"
      />
      
      {photos.length > 0 ? (
        <figure className="my-6">
          <Slide delay={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <div key={photo._id} className="relative overflow-hidden rounded-lg">
                <Image
                  src={photo.image.url}
                  alt={photo.image.alt || photo.title}
                  width={400}
                  height={photo.image.aspectRatio ? 400 / photo.image.aspectRatio : 400}
                  className="hover:scale-105 transition-transform duration-300 object-cover w-full"
                  placeholder={photo.image.lqip ? "blur" : "empty"}
                  blurDataURL={photo.image.lqip}
                />
                {photo.title && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3">
                    <h3 className="font-medium">{photo.title}</h3>
                    {photo.description && (
                      <p className="text-sm text-zinc-200">{photo.description}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </Slide>
        </figure>
      ) : (
        <EmptyState
          title="No photos found"
          message="Add photos in Sanity Studio to display them here."
        />
      )}
    </main>
  );
}
