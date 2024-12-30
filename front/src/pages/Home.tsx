import { useQuery } from "@tanstack/react-query";
import { fetchBusinesses } from "../services/businessService";

const Home = () => {
  const { data, isLoading, error } = useQuery(["businesses"], fetchBusinesses);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching businesses</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Businesses</h1>
      <ul>
        {data.map((business: any) => (
          <li key={business._id} className="border p-4 mb-2">
            {business.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
