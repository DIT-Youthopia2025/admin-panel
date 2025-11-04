import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card h-fit">
        <CardHeader className="flex-col justify-between">
          <CardDescription>Registrations</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            126
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card h-fit">
        <CardHeader>
          <CardDescription>Events</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            24 events
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card h-fit">
        <CardHeader>
          <CardDescription>Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ₹5000000
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card h-fit">
        <CardHeader>
          <CardDescription>Access</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            14 People
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
