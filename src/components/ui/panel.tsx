import { cn } from "@/lib/utils";

/**
 * Shared "glass card" surface used across the dashboard (rounded-3xl,
 * border, card background) so every panel stays visually consistent
 * instead of each component repeating the same class string.
 */
export function Panel({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="panel"
      className={cn(
        "rounded-3xl border border-border bg-card p-6 sm:p-8",
        className
      )}
      {...props}
    />
  );
}
