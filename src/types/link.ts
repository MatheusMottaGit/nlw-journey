export type LinksApiResponse = {
  links: Link[];
};

export type Link = {
  id: string;
  title: string;
  url: string;
};