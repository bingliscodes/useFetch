import useFetch from "../hooks/useFetch.js";

const NUM_SECONDS = 5;

export default function userListWithFetch() {
  const cacheKey = "userList";
  const {
    data: users,
    isLoading,
    error,
  } = useFetch(
    "https://jsonplaceholder.typicode.com/users",
    cacheKey,
    NUM_SECONDS
  );

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} ({user.email})
        </li>
      ))}
    </ul>
  );
}
