import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Toaster } from '@/components/ui/sonner';
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <Outlet />
      </MainLayout>
      <Toaster theme="dark" richColors closeButton />
    </QueryClientProvider>
  );
}
export default App;