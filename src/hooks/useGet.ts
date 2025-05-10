import { useQuery } from "@tanstack/react-query";

export const useGet = <TResponse>(url: string) => {
  return useQuery<TResponse, Error>({
    queryKey: [`GET:${url}`],
    queryFn: async () => {
      const res = await fetch(url);

      if (!res.ok) throw new Error("Network response was not ok");

      return res.json();
    },
  });
};
