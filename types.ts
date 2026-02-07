
export interface NavItem {
  label: string;
  path: string;
}

export interface DocSection {
  title: string;
  items: {
    label: string;
    id: string;
  }[];
}
