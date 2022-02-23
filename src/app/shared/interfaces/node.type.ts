export type Node = {
  id: number;
  parent: number;
  title: string;
  created_at: string;
  updated_at: string;
};

export type DetailNode = Node & {
  translation: {
    id: number;
    node_id: number;
    locale: string;
    title: string;
    created_at: string;
    updated_at: string;
  }[];
};
