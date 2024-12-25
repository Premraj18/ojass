import { headers } from 'next/headers';
import { Toaster } from 'react-hot-toast';
import Nav from '@/components/Nav';

export default function RootLayout({ children }) {
  const headersList = headers();
  const isAdminRoute = headersList.get('x-is-admin-route');

  return (
    <html lang="en">
      <body>
        {!isAdminRoute && <Nav />}
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
} 