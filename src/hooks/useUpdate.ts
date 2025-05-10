import { useMutation } from "@tanstack/react-query";

export const useUpdate = <TRequest extends { id: string }, TResponse>(
  url: string
) => {
  return useMutation<TResponse, Error, TRequest>({
    mutationFn: async (data: TRequest) => {
      const newUrl = url.replace(":id", encodeURIComponent(data.id));

      const res = await fetch(newUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Network Response Error");

      return res.json();
    },
  });
};
