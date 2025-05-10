import { useMutation } from "@tanstack/react-query";

export const usePost = <TRequest, TResponse>(url: string) => {
  return useMutation<TResponse, Error, TRequest>({
    mutationFn: async (data: TRequest) => {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Network Response Error");

      return res.json();
    },
  });
};
