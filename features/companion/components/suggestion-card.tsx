import { Card, CardContent } from "@/components/ui/card";

interface SuggestionCardProps {
  title: string;
  onClick: () => void;
}

export function SuggestionCard({
  title,
  onClick,
}: SuggestionCardProps) {
  return (
    <Card
      className="cursor-pointer transition hover:shadow-md"
      onClick={onClick}
    >
      <CardContent className="p-4">
        {title}
      </CardContent>
    </Card>
  );
}