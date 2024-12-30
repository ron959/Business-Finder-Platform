import { useQuery } from "@tanstack/react-query";
import { fetchBusinesses } from "../services/businessService";

const Home = () => {
  const { data, isLoading, error } = useQuery(["businesses"], fetchBusinesses);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching businesses</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Businesses</h1>
      <ul className="space-y-4">
        {data.map((business: any) => (
          <li key={business._id} className="border p-4 rounded-md">
            <h2 className="text-xl font-semibold">{business.name}</h2>
            <p className="text-gray-600">{business.description}</p>
            <p className="text-sm text-gray-500">
              <strong>Category:</strong> {business.category}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Owner:</strong> {business.owner?.name || "Unknown"}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Created:</strong> {new Date(business.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Updated:</strong> {new Date(business.updatedAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
