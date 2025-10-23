import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useUserFavorites(userId: string) {
  // Make your own custom hook with useSWR
}
