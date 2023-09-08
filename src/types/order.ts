export type OrderDataShort = {
  id: string;
  customer: string;
  createdAt: string;
  total: number;
  status: string;
  deliveryMethod: string;
};

export type OrderData = {
  id: string;
  status: string;
  deliveryMethod: string;
  customer: {
    name: string;
    phone: string;
    country: string;
    city: string;
    street: string;
    address: string;
    pvzCode: string | number;
  };
  products: [
    {
      price: string;
      offer_id: string;
      name: string;
      sku: number;
      quantity: number;
      dimensions: {
        height: string;
        length: string;
        weight: string;
        width: string;
      };
      currency_code: string;
    }
  ];
};
