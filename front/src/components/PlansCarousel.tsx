import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../@/components/ui/card";
import { Button } from "../@/components/ui/button";

const plans = [
  { title: "Standard", description: "1 business (Default and free)" },
  { title: "Gold", description: "Up to 3 businesses with enhanced features" },
  { title: "Platinum", description: "Up to 10 businesses with all premium features" },
];

interface PlansCarouselProps {
  onPlanSelect: (plan: string) => void;
}

const PlansCarousel: React.FC<PlansCarouselProps> = ({ onPlanSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const showNextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % plans.length);
  };

  const showPreviousCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + plans.length) % plans.length);
  };

  return (
    <div className="relative bg-muted flex flex-col items-center justify-center h-[400px] w-full max-w-md mx-auto">
      <div className="w-full h-[300px] relative overflow-hidden">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-transform duration-300 ease-in-out ${
              index === currentIndex ? "translate-y-0" : "translate-y-full"
            }`}
            aria-hidden={index !== currentIndex}
          >
            <Card className="h-full flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-center text-lg font-bold">
                  {plan.title}
                </CardTitle>
                <CardDescription className="text-center text-sm text-muted-foreground">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center pb-6">
                <Button onClick={() => onPlanSelect(plan.title)}>
                  Select {plan.title}
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <div className="flex justify-between w-full mt-4">
        <Button onClick={showPreviousCard} variant="outline" className="w-24">
          Previous
        </Button>
        <Button onClick={showNextCard} variant="outline" className="w-24">
          Next
        </Button>
      </div>
    </div>
  );
};

export default PlansCarousel;
