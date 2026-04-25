"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Activity {
  id: string
  user: { name: string; email: string; avatar?: string }
  action: string
  status: "완료" | "진행중" | "취소"
  date: string
}

const data: Activity[] = [
  {
    id: "1",
    user: { name: "김민준", email: "minjun@example.com" },
    action: "새 프로젝트 생성",
    status: "완료",
    date: "5분 전",
  },
  {
    id: "2",
    user: { name: "이서연", email: "seoyeon@example.com" },
    action: "보고서 업로드",
    status: "진행중",
    date: "23분 전",
  },
  {
    id: "3",
    user: { name: "박도윤", email: "doyun@example.com" },
    action: "사용자 권한 변경",
    status: "완료",
    date: "1시간 전",
  },
  {
    id: "4",
    user: { name: "최지아", email: "jia@example.com" },
    action: "결제 처리",
    status: "취소",
    date: "2시간 전",
  },
  {
    id: "5",
    user: { name: "정하은", email: "haeun@example.com" },
    action: "API 키 발급",
    status: "완료",
    date: "3시간 전",
  },
]

const statusVariant: Record<Activity["status"], "default" | "secondary" | "destructive"> = {
  완료: "default",
  진행중: "secondary",
  취소: "destructive",
}

const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: "user",
    header: "사용자",
    cell: ({ row }) => {
      const user = row.original.user
      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-xs">{user.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "action",
    header: "활동",
    cell: ({ getValue }) => (
      <span className="text-sm">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ getValue }) => {
      const status = getValue<Activity["status"]>()
      return (
        <Badge variant={statusVariant[status]} className="text-xs">
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "date",
    header: "시간",
    cell: ({ getValue }) => (
      <span className="text-sm text-muted-foreground">{getValue<string>()}</span>
    ),
  },
]

export function RecentActivity() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>최근 활동</CardTitle>
        <CardDescription>팀 멤버들의 최근 활동 내역</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="first:pl-6 last:pr-6">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="hover:bg-muted/50">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="first:pl-6 last:pr-6">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
