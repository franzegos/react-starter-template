import { Outlet } from "react-router-dom";
import { OfflineBanner } from "@/components/OfflineBanner";

export default function RootLayout() {
  return (
    <div className="min-h-screen">
      <OfflineBanner />
      <Outlet />
    </div>
  );
}
