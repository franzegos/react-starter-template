import { useDemoPost } from "@/api/features/demo/use-demo";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getDemoPostStatus } from "@/lib/demo/demoPostStatus";
import { mapDemoPostToCard } from "@/lib/demo/mapDemoPostToCard";
import { useOnlineStatus } from "@/lib/hooks/use-online-status";

function DemoPostSkeleton() {
  return (
    <div
      className="flex flex-col gap-2"
      aria-busy="true"
      aria-label="Loading post"
    >
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
}

type DemoPostErrorProps = {
  message: string;
  offline: boolean;
  onRetry: () => void;
};

function DemoPostError({ message, offline, onRetry }: DemoPostErrorProps) {
  return (
    <Alert variant="destructive">
      <AlertTitle>
        {offline ? "You're offline" : "Couldn't load sample post"}
      </AlertTitle>
      <AlertDescription className="flex flex-col gap-3">
        <p>
          {offline
            ? "Connect to the internet and try again."
            : message || "Check your connection and try again."}
        </p>
        <Button type="button" size="sm" variant="outline" onClick={onRetry}>
          Retry
        </Button>
      </AlertDescription>
    </Alert>
  );
}

type DemoPostEmptyProps = {
  onRetry: () => void;
};

function DemoPostEmpty({ onRetry }: DemoPostEmptyProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-muted-foreground text-sm">
        No post data returned. Set <code className="text-xs">VITE_API_URL</code>{" "}
        to a JSON API (e.g. JSONPlaceholder) and retry.
      </p>
      <Button type="button" size="sm" variant="outline" onClick={onRetry}>
        Retry
      </Button>
    </div>
  );
}

type DemoPostReadyProps = {
  headline: string;
  excerpt: string;
  isRefreshing: boolean;
  showStaleWarning: boolean;
  refreshErrorMessage?: string;
};

function DemoPostReady({
  headline,
  excerpt,
  isRefreshing,
  showStaleWarning,
  refreshErrorMessage,
}: DemoPostReadyProps) {
  return (
    <div className="flex flex-col gap-3">
      {showStaleWarning && (
        <Alert variant="destructive">
          <AlertTitle>Couldn't refresh</AlertTitle>
          <AlertDescription>
            {refreshErrorMessage ??
              "Showing saved data. Check your connection and try again."}
          </AlertDescription>
        </Alert>
      )}
      {isRefreshing && (
        <p className="text-muted-foreground text-xs" aria-live="polite">
          Refreshing…
        </p>
      )}
      <div className="flex flex-col gap-2">
        <p className="text-sm leading-snug font-medium">{headline}</p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {excerpt}
        </p>
      </div>
    </div>
  );
}

export function DemoPostSection() {
  const query = useDemoPost();
  const status = getDemoPostStatus(query);
  const isOnline = useOnlineStatus();

  const handleRetry = () => {
    void query.refetch();
  };

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>Sample request</CardTitle>
        <CardAction>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-muted-foreground h-8"
            disabled={status === "loading" || query.isFetching}
            onClick={handleRetry}
          >
            {query.isFetching ? "Refreshing…" : "Refresh"}
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        {status === "loading" && <DemoPostSkeleton />}
        {status === "error" && (
          <DemoPostError
            message={query.error?.message ?? ""}
            offline={!isOnline}
            onRetry={handleRetry}
          />
        )}
        {status === "empty" && <DemoPostEmpty onRetry={handleRetry} />}
        {status === "ready" && query.data && (
          <DemoPostReady
            {...mapDemoPostToCard(query.data)}
            isRefreshing={query.isFetching && isOnline}
            showStaleWarning={query.isError}
            refreshErrorMessage={query.error?.message}
          />
        )}
      </CardContent>
    </Card>
  );
}
