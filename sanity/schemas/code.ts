import { defineType } from "sanity";
import { FaCode } from "react-icons/fa";

export default defineType({
  name: "code",
  title: "Code",
  type: "object",
  icon: FaCode,
  fields: [
    {
      name: "language",
      title: "Language",
      type: "string",
    },
    {
      name: "filename",
      title: "Filename",
      type: "string",
    },
    {
      name: "code",
      title: "Code",
      type: "text",
    },
  ],
  preview: {
    select: {
      language: "language",
      filename: "filename",
      code: "code",
    },
    prepare({ language, filename, code }) {
      return {
        title: filename || language || "Code snippet",
        subtitle: language || "No language specified",
        media: FaCode,
      };
    },
  },
}); 