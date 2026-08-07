interface Props {
  title: string;
  description: string;
}

export function PageHeader({
  title,
  description,
}: Props) {
  return (
    <div className="space-y-1">
      <h1 className="text-3xl font-bold">
        {title}
      </h1>

      <p className="text-muted-foreground">
        {description}
      </p>
    </div>
  );
}