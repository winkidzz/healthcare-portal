import { useRouter as usePagesRouter } from 'next/router';
import { useRouter as useAppRouter } from 'next/navigation';

export const useSharedRouter = () => {
  try {
    // Try to use App Router first
    return useAppRouter();
  } catch (e) {
    // Fall back to Pages Router if App Router is not available
    return usePagesRouter();
  }
}; 