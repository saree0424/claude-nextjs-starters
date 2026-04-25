"use client"

// 사용자 관리 테이블 컴포넌트 - TanStack Table + Input 검색 필터
// 참조: recent-activity.tsx 패턴을 확장하여 검색 필터링과 역할 관리 기능 추가
// "use client" 선언 이유: Input 검색 상태 관리와 TanStack Table 클라이언트 필터링 필요

import { useState } from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { MoreHorizontal, Search, UserMinus, UserPen } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// 사용자 타입 정의
interface User {
  id: string                              // 사용자 고유 ID
  name: string                            // 이름
  email: string                           // 이메일
  role: "관리자" | "사용자" | "게스트"    // 역할
  status: "활성" | "비활성" | "정지"      // 계정 상태
  joinedAt: string                        // 가입일
  lastActive: string                      // 마지막 접속일
}

// 샘플 사용자 데이터
const data: User[] = [
  {
    id: "1",
    name: "김민준",
    email: "minjun@example.com",
    role: "관리자",
    status: "활성",
    joinedAt: "2024.01.15",
    lastActive: "5분 전",
  },
  {
    id: "2",
    name: "이서연",
    email: "seoyeon@example.com",
    role: "사용자",
    status: "활성",
    joinedAt: "2024.03.22",
    lastActive: "1시간 전",
  },
  {
    id: "3",
    name: "박도윤",
    email: "doyun@example.com",
    role: "사용자",
    status: "활성",
    joinedAt: "2024.05.10",
    lastActive: "3시간 전",
  },
  {
    id: "4",
    name: "최지아",
    email: "jia@example.com",
    role: "게스트",
    status: "비활성",
    joinedAt: "2024.07.08",
    lastActive: "3일 전",
  },
  {
    id: "5",
    name: "정하은",
    email: "haeun@example.com",
    role: "사용자",
    status: "정지",
    joinedAt: "2024.09.14",
    lastActive: "30일 전",
  },
  {
    id: "6",
    name: "한준서",
    email: "junseo@example.com",
    role: "사용자",
    status: "활성",
    joinedAt: "2024.11.20",
    lastActive: "어제",
  },
  {
    id: "7",
    name: "윤시우",
    email: "siwoo@example.com",
    role: "게스트",
    status: "활성",
    joinedAt: "2024.12.01",
    lastActive: "2일 전",
  },
]

// 역할별 Badge 스타일 매핑
const roleVariant: Record<User["role"], "default" | "secondary" | "outline"> = {
  관리자: "default",
  사용자: "secondary",
  게스트: "outline",
}

// 상태별 Badge 스타일 매핑
const statusVariant: Record<User["status"], "default" | "secondary" | "destructive"> = {
  활성: "default",
  비활성: "secondary",
  정지: "destructive",
}

// TanStack Table 컬럼 정의
const columns: ColumnDef<User>[] = [
  {
    // 사용자 정보 컬럼: Avatar + 이름 + 이메일
    accessorKey: "name",
    header: "사용자",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="size-8">
          <AvatarFallback className="text-xs">
            {row.original.name.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{row.original.name}</span>
          <span className="text-xs text-muted-foreground">{row.original.email}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "역할",
    cell: ({ getValue }) => {
      const role = getValue<User["role"]>()
      return (
        <Badge variant={roleVariant[role]} className="text-xs">
          {role}
        </Badge>
      )
    },
  },
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ getValue }) => {
      const status = getValue<User["status"]>()
      return (
        <Badge variant={statusVariant[status]} className="text-xs">
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "joinedAt",
    header: "가입일",
    cell: ({ getValue }) => (
      <span className="text-sm text-muted-foreground">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "lastActive",
    header: "마지막 접속",
    cell: ({ getValue }) => (
      <span className="text-sm text-muted-foreground">{getValue<string>()}</span>
    ),
  },
  {
    id: "actions",
    header: "액션",
    cell: () => (
      // DropdownMenu를 활용한 사용자 관리 메뉴
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <MoreHorizontal className="size-4" />
            <span className="sr-only">사용자 메뉴 열기</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>사용자 관리</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <UserPen className="mr-2 size-4" />
            역할 변경
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserPen className="mr-2 size-4" />
            정보 수정
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive focus:text-destructive">
            <UserMinus className="mr-2 size-4" />
            계정 정지
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

export function UsersTable() {
  // 검색 필터 상태 관리
  const [globalFilter, setGlobalFilter] = useState("")

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // 클라이언트 사이드 전역 검색 필터 활성화
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle>사용자 목록</CardTitle>
            <CardDescription>전체 사용자를 검색하고 관리합니다.</CardDescription>
          </div>
          {/* 검색 Input */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="이름 또는 이메일 검색..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
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
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/50">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="first:pl-6 last:pr-6">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              // 검색 결과 없음 표시
              <TableRow>
                <TableCell colSpan={columns.length} className="py-8 text-center text-muted-foreground">
                  검색 결과가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* 검색 결과 카운트 */}
        <div className="border-t px-6 py-3 text-xs text-muted-foreground">
          총 {table.getFilteredRowModel().rows.length}명의 사용자
          {globalFilter && ` (검색: "${globalFilter}")`}
        </div>
      </CardContent>
    </Card>
  )
}
