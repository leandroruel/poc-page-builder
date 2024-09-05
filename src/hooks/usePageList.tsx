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
    const fetchPages = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockPages: Page[] = [
        {
          id: '1',
          title: 'Página Inicial',
          imageUrl: 'https://via.placeholder.com/250x145?text=Página+Inicial',
          state: {
            ROOT: {
              type: { resolvedName: "Canvas" },
              isCanvas: true,
              props: {},
              displayName: "Canvas",
              custom: { displayName: "App" },
              hidden: false,
              nodes: ["YMWiGHbp9M"],
              linkedNodes: {}
            },
            YMWiGHbp9M: {
              type: { resolvedName: "DataTable" },
              isCanvas: false,
              props: {
                data: [],
                columns: [],
                title: "Data Table",
                showPagination: true,
                pageSize: 10,
                dataSource: "static"
              },
              displayName: "DataTable",
              custom: {},
              parent: "ROOT",
              hidden: false,
              nodes: [],
              linkedNodes: {}
            }
          }
        },
        {
          id: '2',
          title: 'Sobre Nós',
          imageUrl: 'https://via.placeholder.com/250x145?text=Sobre+Nós',
          state: {
            ROOT: {
              type: { resolvedName: "Canvas" },
              isCanvas: true,
              props: {},
              displayName: "Canvas",
              custom: { displayName: "App" },
              hidden: false,
              nodes: ["TextNode1"],
              linkedNodes: {}
            },
            TextNode1: {
              type: { resolvedName: "Text" },
              isCanvas: false,
              props: { text: "Sobre Nossa Empresa" },
              displayName: "Text",
              custom: {},
              parent: "ROOT",
              hidden: false,
              nodes: [],
              linkedNodes: {}
            }
          }
        },
        // Adicione mais páginas mockadas conforme necessário
      ];

      setPages(mockPages);
      setIsLoading(false);
    };

    fetchPages();
  }, []);

  return { pages, isLoading };
}