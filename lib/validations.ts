import { z } from "zod"

export const emailSchema = z
  .string()
  .min(1, "이메일을 입력해주세요")
  .email("올바른 이메일 형식이 아닙니다")

export const passwordSchema = z
  .string()
  .min(8, "비밀번호는 8자 이상이어야 합니다")
  .max(100, "비밀번호가 너무 깁니다")

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export const registerSchema = z
  .object({
    name: z.string().min(2, "이름은 2자 이상이어야 합니다").max(50),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  })

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "현재 비밀번호를 입력해주세요"),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, "비밀번호 확인을 입력해주세요"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "새 비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  })

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>

export const contactSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요").max(50, "이름이 너무 깁니다"),
  email: emailSchema,
  inquiryType: z.enum(["general", "technical", "billing", "partnership", "other"], {
    error: "문의 유형을 선택해주세요",
  }),
  subject: z.string().min(2, "제목을 입력해주세요").max(100, "제목이 너무 깁니다"),
  message: z
    .string()
    .min(10, "메시지는 10자 이상 입력해주세요")
    .max(1000, "메시지는 1000자 이내로 입력해주세요"),
})

export type ContactFormValues = z.infer<typeof contactSchema>
