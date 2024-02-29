export type SearchProductsBody = {
  priceRange?: [number | null, number | null];
  name?: string;
  category?: string;
};

export type SearchClientsBody = {
  name?: string;
  email?: string;
};

export type SearchProductsCriteria = {
  price?: {
    gte?: number;
    lte?: number;
  };
  name?: {
    contains: string;
  };
  category?: string;
};

export type SearchClientsCriteria = {
  name?: {
    contains: string;
  };
  email?: {
    contains: string;
  };
};
