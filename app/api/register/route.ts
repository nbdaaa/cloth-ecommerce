import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

// Define schema for input validation
const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Validate input
    const result = userSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid input", errors: result.error.format() },
        { status: 400 }
      )
    }
    
    const { name, email, password } = body
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })
    
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      )
    }
    
    // Hash password
    const hashedPassword = await hash(password, 10)
    
    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER",
      },
    })
    
    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = user
    
    return NextResponse.json(
      { message: "User created successfully", user: userWithoutPassword },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    )
  }
} 