export type RandomUserProfile = {
  name: string;
  email: string;
  avatar: string;
};

export async function fetchRandomUser(): Promise<RandomUserProfile> {
  const r = await fetch("https://randomuser.me/api/?nat=us", { cache: "no-store" });
  const data = await r.json();
  const u = data.results[0];
  return {
    name: `${u.name.first} ${u.name.last}`,
    email: u.email,
    avatar: u.picture.thumbnail,
  };
}
