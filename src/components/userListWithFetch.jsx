import useFetch from "../hooks/useFetch.js";

const NUM_SECONDS = 15;

export default function userListWithFetch() {
  const cacheKey = "userList";
  const {
    data: users,
    isLoading,
    error,
    sendRequest,
  } = useFetch(
    "https://jsonplaceholder.typicode.com/users",
    cacheKey,
    NUM_SECONDS
  );

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error: {error}</p>;

  // TODO: Could add a button to send request and indicate whether a request was made
  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
      <button onClick={sendRequest}> Send Request</button>
    </>
  );
}
