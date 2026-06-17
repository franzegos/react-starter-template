import { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useDemoPost } from "@/api/queries/use-demo";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCounterStore } from "@/lib/stores/counterStore";
import { DemoErrorTrigger } from "./DemoErrorTrigger";
import { toast } from "sonner";

const themeOptions = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function HomePage() {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();

  const count = useCounterStore((s) => s.count);
  const increment = useCounterStore((s) => s.increment);
  const decrement = useCounterStore((s) => s.decrement);
  const reset = useCounterStore((s) => s.reset);

  const { data, isPending, isError, error, refetch, isFetching } =
    useDemoPost();

  return (
    <div className="min-h-screen px-4 py-10 sm:py-14">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
        <header className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">
              cursor-frontend-template
            </h1>
            <p className="text-muted-foreground text-sm">
              Personal webapp frontend template
            </p>
          </div>

          {mounted ? (
            <div
              className="bg-muted inline-flex shrink-0 rounded-md border p-0.5"
              role="group"
              aria-label="Theme"
            >
              {themeOptions.map(({ value, label, icon: Icon }) => (
                <Button
                  key={value}
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className={cn(
                    "size-8",
                    theme === value && "bg-background shadow-sm",
                  )}
                  onClick={() => setTheme(value)}
                  title={label}
                  aria-pressed={theme === value}
                >
                  <Icon className="size-4" aria-hidden />
                </Button>
              ))}
            </div>
          ) : (
            <div className="size-8 shrink-0" aria-hidden />
          )}
        </header>

        <div className="flex flex-col gap-4">
          <section className="bg-card rounded-lg border p-5">
            <div className="mb-4 flex items-baseline justify-between gap-2">
              <h2 className="text-sm font-medium">Counter</h2>
              <span className="text-2xl font-semibold tabular-nums">
                {count}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" size="sm" onClick={() => increment()}>
                +1
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => decrement()}
              >
                −1
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => reset()}
              >
                Reset
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="text-muted-foreground"
                onClick={() =>
                  toast.message("Count", {
                    description: String(useCounterStore.getState().count),
                  })
                }
              >
                Toast
              </Button>
            </div>
          </section>

          <section className="bg-card rounded-lg border p-5">
            <div className="mb-4 flex items-center justify-between gap-2">
              <h2 className="text-sm font-medium">Sample request</h2>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground h-8"
                disabled={isFetching}
                onClick={() => refetch()}
              >
                {isFetching ? "Refreshing…" : "Refresh"}
              </Button>
            </div>

            {isPending && (
              <p className="text-muted-foreground text-sm">Loading…</p>
            )}
            {isError && (
              <div className="space-y-3">
                <p className="text-destructive text-sm">{error.message}</p>
                <Button type="button" size="sm" onClick={() => refetch()}>
                  Retry
                </Button>
              </div>
            )}
            {data && (
              <div className="space-y-2">
                <p className="text-sm leading-snug font-medium">{data.title}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {data.body}
                </p>
              </div>
            )}
          </section>

          <section className="bg-card rounded-lg border p-5">
            <h2 className="mb-3 text-sm font-medium">Error boundary</h2>
            <ErrorBoundary layout="embedded">
              <DemoErrorTrigger />
            </ErrorBoundary>
          </section>
        </div>
      </div>
    </div>
  );
}
