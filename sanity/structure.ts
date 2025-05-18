import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('profile').title('Profile'),
      S.documentTypeListItem('job').title('Jobs'),
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('Post').title('Blog Posts'),
      S.documentTypeListItem('author').title('Author'),

      S.divider(),
      // Show remaining document types that don't have custom structures
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['profile', 'job', 'project', 'Post', 'author',].includes(item.getId()!),
      ),
    ])
