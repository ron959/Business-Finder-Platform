import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchMyBusinesses, deleteBusiness } from "../services/businessService";
import { useAuth } from "../context/AuthContext";
import { Button } from "../@/components/ui/button";
import CreateBusinessCard from "../components/CreateBusinessCard"; // Updated import

export function MyBusiness() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  // Fetch businesses owned by the logged-in user
  const { data: businesses, isLoading, isError } = useQuery(
    ["myBusinesses"],
    () => fetchMyBusinesses(token),
    { enabled: !!token }
  );

  // Mutation to delete a business
  const deleteMutation = useMutation(
    (id: string) => deleteBusiness(id, token!), // Pass token here
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["myBusinesses"]); // Refresh business list
      },
    }
  );
  

  // Handle business deletion
  const handleDeleteBusiness = (_id: string) => {
    deleteMutation.mutate(_id);
  };

  if (isLoading) {
    return <p>Loading your businesses...</p>;
  }

  if (isError) {
    return <p>Failed to load businesses. Please try again later.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Businesses</h1>

      {/* Create Business Card */}
      <CreateBusinessCard />

      {/* List of Businesses */}
      <ul className="space-y-4">
        {[...(businesses || [])]?.reverse().map((business: any) => (
          <li key={business._id} className="border p-4 rounded-md">
            <h2 className="text-xl font-semibold">{business.name}</h2>
            <p>{business.description}</p>
            <p className="text-sm text-gray-500">Category: {business.category}</p>
            <div className="flex gap-2 mt-2">
              <Button
                variant="destructive"
                onClick={() => handleDeleteBusiness(business._id)}
                disabled={deleteMutation.isLoading}
              >
                {deleteMutation.isLoading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
