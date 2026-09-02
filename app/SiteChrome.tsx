'use client';

import { usePathname } from 'next/navigation';
import Header from './(header)/Header';
import Footer from './(footer)/Footer';

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isExhibitionAwardVotePage = pathname === '/exhibition-award';

  return (
    <>
      {!isExhibitionAwardVotePage && <Header />}
      {children}
      {!isExhibitionAwardVotePage && <Footer />}
    </>
  );
}
