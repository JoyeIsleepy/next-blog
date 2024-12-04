export default function Loading({ isLoading, error }) {
  if (error) {
    return <div>An error occurred!</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return null;
}
