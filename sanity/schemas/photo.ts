import { defineField, defineType } from "sanity";
import { BiImage } from "react-icons/bi";

export default defineType({
  name: "photo",
  title: "Photos",
  type: "document",
  icon: BiImage,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
        metadata: ["lqip", "palette"],
      },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Important for SEO and accessibility",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers will be displayed first",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
}); 