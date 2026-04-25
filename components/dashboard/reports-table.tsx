"use client"

// 보고서 테이블 컴포넌트 - TanStack React Table을 활용한 보고서 목록
// 참조: recent-activity.tsx 패턴을 확장하여 DropdownMenu 액션 메뉴 추가
// "use client" 선언 이유: TanStack Table은 클라이언트 상호작용이 필요

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Download, FileText, MoreHorizontal, Share2, Trash2 } from "lucide-react"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// 보고서 타입 정의
interface Report {
  id: string                                              // 보고서 고유 ID
  name: string                                            // 보고서 이름
  type: "월간" | "주간" | "분기" | "연간" | "맞춤"       // 보고서 유형
  createdAt: string                                       // 생성 날짜
  status: "완료" | "생성중" | "실패"                      // 보고서 상태
  size: string                                            // 파일 크기
  format: "PDF" | "Excel" | "CSV"                        // 파일 형식
}

// 샘플 보고서 데이터
const data: Report[] = [
  {
    id: "1",
    name: "2024년 12월 월간 보고서",
    type: "월간",
    createdAt: "2024.12.15",
    status: "완료",
    size: "2.4 MB",
    format: "PDF",
  },
  {
    id: "2",
    name: "4분기 매출 분석",
    type: "분기",
    createdAt: "2024.12.10",
    status: "완료",
    size: "5.1 MB",
    format: "Excel",
  },
  {
    id: "3",
    name: "사용자 행동 분석 보고서",
    type: "맞춤",
    createdAt: "2024.12.08",
    status: "완료",
    size: "1.8 MB",
    format: "PDF",
  },
  {
    id: "4",
    name: "주간 성과 리포트 W50",
    type: "주간",
    createdAt: "2024.12.14",
    status: "생성중",
    size: "-",
    format: "PDF",
  },
  {
    id: "5",
    name: "2024년 연간 종합 보고서",
    type: "연간",
    createdAt: "2024.12.12",
    status: "실패",
    size: "-",
    format: "Excel",
  },
  {
    id: "6",
    name: "마케팅 채널 성과 분석",
    type: "맞춤",
    createdAt: "2024.12.05",
    status: "완료",
    size: "3.2 MB",
    format: "CSV",
  },
]

// 상태별 Badge 스타일 매핑
const statusVariant: Record<Report["status"], "default" | "secondary" | "destructive"> = {
  완료: "default",
  생성중: "secondary",
  실패: "destructive",
}

// 파일 형식별 색상 매핑
const formatColor: Record<Report["format"], string> = {
  PDF: "text-red-500",
  Excel: "text-green-500",
  CSV: "text-blue-500",
}

// TanStack Table 컬럼 정의
const columns: ColumnDef<Report>[] = [
  {
    accessorKey: "name",
    header: "보고서 이름",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <FileText className={`size-4 ${formatColor[row.original.format]}`} />
        <div>
          <p className="text-sm font-medium">{row.original.name}</p>
          <p className="text-xs text-muted-foreground">{row.original.format}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "유형",
    cell: ({ getValue }) => (
      <Badge variant="outline" className="text-xs">
        {getValue<string>()}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "생성일",
    cell: ({ getValue }) => (
      <span className="text-sm text-muted-foreground">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ getValue }) => {
      const status = getValue<Report["status"]>()
      return (
        <Badge variant={statusVariant[status]} className="text-xs">
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "size",
    header: "크기",
    cell: ({ getValue }) => (
      <span className="text-sm text-muted-foreground">{getValue<string>()}</span>
    ),
  },
  {
    id: "actions",
    header: "액션",
    cell: ({ row }) => {
      const isCompleted = row.original.status === "완료"
      return (
        // DropdownMenu를 활용한 액션 메뉴
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <MoreHorizontal className="size-4" />
              <span className="sr-only">메뉴 열기</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>액션</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* 완료된 보고서만 다운로드/공유 가능 */}
            <DropdownMenuItem disabled={!isCompleted}>
              <Download className="mr-2 size-4" />
              다운로드
            </DropdownMenuItem>
            <DropdownMenuItem disabled={!isCompleted}>
              <Share2 className="mr-2 size-4" />
              공유하기
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <Trash2 className="mr-2 size-4" />
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function ReportsTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>보고서 목록</CardTitle>
        <CardDescription>생성된 보고서를 확인하고 다운로드할 수 있습니다.</CardDescription>
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
