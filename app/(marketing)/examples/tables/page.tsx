"use client"

import { useState, useMemo } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table"
import { ChevronUp, ChevronDown, ChevronsUpDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface User {
  id: number
  name: string
  email: string
  role: string
  status: "active" | "inactive" | "pending"
  joined: string
}

const SAMPLE_DATA: User[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: ["김민준", "이서연", "박준혁", "최지은", "정현우", "강다은", "윤성민", "임수아", "한지훈", "오유진"][i % 10],
  email: `user${i + 1}@example.com`,
  role: ["관리자", "편집자", "뷰어", "개발자"][i % 4],
  status: (["active", "inactive", "pending"] as const)[i % 3],
  joined: `2024-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
}))

const STATUS_MAP = {
  active: { label: "활성", className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400" },
  inactive: { label: "비활성", className: "" },
  pending: { label: "대기", className: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400" },
}

function ExampleSection({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-1 text-lg font-semibold">{title}</h2>
      {description && <p className="mb-4 text-sm text-muted-foreground">{description}</p>}
      <div className="rounded-xl border bg-muted/30 p-4">{children}</div>
    </section>
  )
}

function BasicTable() {
  const data = SAMPLE_DATA.slice(0, 5)
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead>이메일</TableHead>
          <TableHead>역할</TableHead>
          <TableHead>상태</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.name}</TableCell>
            <TableCell className="text-muted-foreground">{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
            <TableCell>
              <Badge variant="outline" className={STATUS_MAP[row.status].className}>
                {STATUS_MAP[row.status].label}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function AdvancedTable() {
  const [globalFilter, setGlobalFilter] = useState("")
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 hover:text-foreground"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            이름
            {column.getIsSorted() === "asc" ? (
              <ChevronUp className="size-3.5" />
            ) : column.getIsSorted() === "desc" ? (
              <ChevronDown className="size-3.5" />
            ) : (
              <ChevronsUpDown className="size-3.5 text-muted-foreground" />
            )}
          </button>
        ),
        cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 hover:text-foreground"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            이메일
            {column.getIsSorted() === "asc" ? (
              <ChevronUp className="size-3.5" />
            ) : column.getIsSorted() === "desc" ? (
              <ChevronDown className="size-3.5" />
            ) : (
              <ChevronsUpDown className="size-3.5 text-muted-foreground" />
            )}
          </button>
        ),
        cell: ({ row }) => <span className="text-muted-foreground">{row.getValue("email")}</span>,
      },
      {
        accessorKey: "role",
        header: "역할",
      },
      {
        accessorKey: "status",
        header: "상태",
        cell: ({ row }) => {
          const status = row.getValue<User["status"]>("status")
          return (
            <Badge variant="outline" className={STATUS_MAP[status].className}>
              {STATUS_MAP[status].label}
            </Badge>
          )
        },
      },
      {
        accessorKey: "joined",
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 hover:text-foreground"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            가입일
            {column.getIsSorted() === "asc" ? (
              <ChevronUp className="size-3.5" />
            ) : column.getIsSorted() === "desc" ? (
              <ChevronDown className="size-3.5" />
            ) : (
              <ChevronsUpDown className="size-3.5 text-muted-foreground" />
            )}
          </button>
        ),
      },
    ],
    []
  )

  const table = useReactTable({
    data: SAMPLE_DATA,
    columns,
    state: { globalFilter, sorting },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  })

  return (
    <div className="space-y-3">
      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="검색..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="pl-8"
        />
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                검색 결과가 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          총 {table.getFilteredRowModel().rows.length}개 중{" "}
          {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}–
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            이전
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function TablesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">테이블</h1>
        <p className="mt-1 text-muted-foreground">
          기본 테이블부터 TanStack Table을 활용한 고급 테이블까지 다양한 패턴입니다.
        </p>
      </div>

      <ExampleSection title="기본 테이블" description="shadcn/ui Table 컴포넌트를 사용한 단순 목록 표시입니다.">
        <BasicTable />
      </ExampleSection>

      <ExampleSection
        title="고급 테이블 (TanStack Table)"
        description="검색 필터, 컬럼 정렬, 페이지네이션이 포함된 테이블입니다."
      >
        <AdvancedTable />
      </ExampleSection>
    </div>
  )
}
