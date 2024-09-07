import { useState, useEffect } from 'react';

interface Page {
  id: string;
  title: string;
  imageUrl: string;
  state: any; 
}

export function usePageList() {
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // mock fetch
    const fetchPages = async () => {
      setIsLoading(true);
      const items = JSON.parse(localStorage.getItem("states") || "[{}]");
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockPages: Page[] = items.map((item: any) => ({
        id: item.id,
        title: item.title,
        imageUrl: item.imageUrl,
        state: item.state,
      }));

      setPages(mockPages);
      setIsLoading(false);
    };

    fetchPages();
  }, []);

  return { pages, isLoading };
}