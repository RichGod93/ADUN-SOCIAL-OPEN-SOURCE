import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    getLayout(
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    )

  );
}
