import job from "./job";
import profile from "./profile";
import project from "./project";
import post from "./post";
import author from "./author";
import { youtube } from "./youtube";
import { table } from "./table";
import blockContent from "./blockContent";
import quiz from "./quiz";
import code from "./code";
import photo from "./photo";

export const schemaTypes = [
  profile,
  job,
  project,
  post,
  author,
  photo,

  // Reference types
  blockContent,
  youtube,
  table,
  quiz,
  code,
];
