declare module 'react' {
  import * as React from 'react';
  export = React;
  export as namespace React;
}

declare module '@emotion/styled' {
  import styled from '@emotion/styled';
  export = styled;
  export as namespace styled;
}

declare module 'next/router' {
  import { NextRouter } from 'next/router';
  export { NextRouter };
  export function useRouter(): NextRouter;
}

declare module 'next/link' {
  import { LinkProps } from 'next/link';
  import { ReactElement } from 'react';
  
  export interface Props extends LinkProps {
    children: ReactElement | string;
  }
  
  export default function Link(props: Props): ReactElement;
}

interface Product {
  id: number;
  name: string;
  price: number;
  dimensions?: string;
  description?: string;
  image: string;
  stock?: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface WishlistItem extends Product {}

interface UserData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

interface OrderData {
  items: CartItem[];
  totalAmount: number;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    zipCode: string;
    phone: string;
  };
  paymentMethod: 'card' | 'bank' | 'vbank';
} 