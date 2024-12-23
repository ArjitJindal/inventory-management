interface IProjectT {
  name: string;
  category: string;
  value: string;
  quantity: number;
  price: string;
  disabled?: boolean;
}

interface IStat {
  value: number;
  title: string;
  icon: React.ReactNode;
}

export type { IProjectT, IStat };
