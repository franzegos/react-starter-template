import { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useCounterStore } from "@/lib/stores/counterStore";
import { DemoErrorTrigger } from "./DemoErrorTrigger";
import { DemoPostSection } from "./DemoPostSection";

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

  return (
    <div className="min-h-screen px-4 py-10 sm:py-14">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
        <header className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">
              personal-ai-frontend-template
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
                  aria-label={label}
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
          <Card size="sm">
            <CardHeader>
              <CardTitle>Counter</CardTitle>
              <span className="text-2xl font-semibold tabular-nums">
                {count}
              </span>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>

          <DemoPostSection />

          <Card size="sm">
            <CardHeader>
              <CardTitle>Error boundary</CardTitle>
            </CardHeader>
            <CardContent>
              <ErrorBoundary layout="embedded">
                <DemoErrorTrigger />
              </ErrorBoundary>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
