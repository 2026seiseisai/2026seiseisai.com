'use client';

import { usePathname } from 'next/navigation';
import Header from './(header)/Header';
import Footer from './(footer)/Footer';
import BackToTop from './_components/BackToTop';

const BACK_TO_TOP_PATHS = new Set([
  '/archives',
  '/brochures',
  '/special',
  '/events',
  '/exhibitions',
  '/access',
  '/privacy-policy',
]);

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isExhibitionAwardVotePage = pathname === '/exhibition-award';
  const showBackToTop = BACK_TO_TOP_PATHS.has(pathname);

  return (
    <>
      {!isExhibitionAwardVotePage && <Header />}
      {children}
      {showBackToTop && <BackToTop key={pathname} />}
      {!isExhibitionAwardVotePage && <Footer />}
    </>
  );
}
