
declare module '*/about.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetAbout: DocumentNode;
export const GetAllAbouts: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/ImageFragment.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const ImageFragment: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/member.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetAllMembers: DocumentNode;
export const GetMember: DocumentNode;
export const GetMemberByPasswordToken: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/news.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GetAllNews: DocumentNode;
export const GetNews: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/start.gql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const Start: DocumentNode;

  export default defaultDocument;
}
    