import { useQuery } from "@tanstack/react-query";

export function useGetMetaData(url: string) {
  const query = useQuery({
    queryKey: ["meta-data"],
    queryFn: async () => {
      const response = await fetch(`https://api.dub.co/metatags?url=${url}`);
      const data = await response.json();

      return data;
    },
  });

  return query;
}