import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../@/components/ui/select";
import { Button } from "../@/components/ui/button";
import { Input } from "../@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBusiness } from "../services/businessService";
import { useAuth } from "../context/AuthContext";

const businessCategories = [
  "Food & Beverage",
  "Retail",
  "Health & Wellness",
  "Education",
  "Technology",
  "Entertainment",
  "Real Estate",
  "Automotive",
  "Beauty & Fashion",
  "Finance & Insurance",
];

const CreateBusinessCard = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const queryClient = useQueryClient();
  const { token } = useAuth(); // Get token from AuthContext

  // Mutation to create a business
  const createMutation = useMutation(
    (newBusiness: { name: string; description: string; category: string }) =>
      createBusiness(newBusiness, token), // Pass token to createBusiness
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["myBusinesses"]); // Refresh the business list
      },
      onError: (error) => {
        console.error("Failed to create business:", error);
      },
    }
  );

  const handleCreateBusiness = () => {
    if (!name || !description || !category) {
      alert("Please fill in all fields.");
      return;
    }

    createMutation.mutate({
      name,
      description,
      category,
    });
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Create New Business</CardTitle>
        <CardDescription>Fill out the details below to create a new business.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Business Name</label>
            <Input
              type="text"
              placeholder="Enter business name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <Input
              type="text"
              placeholder="Enter business description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Category</label>
            <Select onValueChange={(value) => setCategory(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {businessCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleCreateBusiness}
          disabled={createMutation.isLoading}
        >
          {createMutation.isLoading ? "Creating..." : "Create Business"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateBusinessCard;
