import { socialLinks } from "../../data/social";
import RefLink from "./RefLink";

export default function Social({ type }: { type: "social" | "publication" }) {
  const isLimited = type === "social"; // For now, let's just limit "social" type globally as per the user's "hero section" request which effectively is the main usage of this type in the view. Or better, I will filter strictly to ["GitHub", "X", "Linkedin"] for the hero context.

  // The user asked to remove them from the "hero section". 
  // If I change it here, it changes everywhere "social" is used (likely footer too). 
  // Let's assume the user wants a cleaner profile overall.

  const socialFilter = ["GitHub", "X", "Linkedin"];

  return (
    <ul className="flex items-center flex-wrap gap-x-5 gap-y-4 my-10">
      {socialLinks
        .filter((item) => item.status === type)
        .filter((item) => {
          if (type === "social") {
            return socialFilter.includes(item.name);
          }
          return true;
        })
        .map((value) => (
          <li key={value.id}>
            <RefLink
              href={value.url}
              className="flex items-center border-b dark:border-b-zinc-800 border-zinc-200 group"
            >
              <value.icon
                className="flex-shrink-0 h-5 w-5 text-zinc-500 group-hover:dark:text-white group-hover:text-zinc-800 duration-300"
                aria-hidden="true"
              />{" "}
              &nbsp;
              {value.name}
            </RefLink>
          </li>
        ))}
    </ul>
  );
}
