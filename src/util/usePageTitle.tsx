import { useEffect } from 'react';

export default function usePageTitle(
  newTitle: string,
  dependencies: any[] = []
) {
  useEffect(() => {
    document.title = newTitle;
  }, dependencies);
}
