import { Users, DollarSign, ShoppingCart, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DashboardCard } from "@/types"

const cards: DashboardCard[] = [
  {
    title: "총 사용자",
    value: "12,345",
    change: "+12.5%",
    changeType: "increase",
    icon: Users,
  },
  {
    title: "월 매출",
    value: "₩48,230,000",
    change: "+8.2%",
    changeType: "increase",
    icon: DollarSign,
  },
  {
    title: "신규 주문",
    value: "1,024",
    change: "-3.1%",
    changeType: "decrease",
    icon: ShoppingCart,
  },
  {
    title: "전환율",
    value: "3.24%",
    change: "+1.8%",
    changeType: "increase",
    icon: TrendingUp,
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon
        const isIncrease = card.changeType === "increase"
        const TrendIcon = isIncrease ? TrendingUp : TrendingDown

        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <Icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <div className="mt-1 flex items-center gap-1">
                <Badge
                  variant={isIncrease ? "default" : "destructive"}
                  className="gap-0.5 px-1.5 py-0.5 text-xs"
                >
                  <TrendIcon className="size-3" />
                  {card.change}
                </Badge>
                <span className="text-xs text-muted-foreground">지난 달 대비</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
