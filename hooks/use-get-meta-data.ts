import { useQuery } from "@tanstack/react-query";

export function useGetMetaData(url: string) {
  const query = useQuery({
    queryKey: ["useGetMetaData"],
    queryFn: async () => {
      const response = await fetch(`https://api.dub.co/metatags?url=${url}`);
      const data = await response.json();

      return data;
    },
  });

  return query;
}