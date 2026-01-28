import Image from "next/image";

type imageProp = {
  value: {
    alt: string;
    caption: string;
    asset?: {
      url?: string;
    };
  };
};

export default function PortableImage({ value }: imageProp) {
  // Extract image URL from Sanity asset or use placeholder
  const imageUrl = value?.asset?.url || "/logo.png";

  return (
    <figure className="my-10">
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt={value.alt || "Image"}
          fill
          className="object-cover"
        />
      </div>
      {value.caption && (
        <figcaption className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}
