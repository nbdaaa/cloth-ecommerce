import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { auth } from "@/auth"

const prisma = new PrismaClient()

export async function PUT(request: Request) {
  try {
    const session = await auth()
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
    
    const userId = session.user.id
    const { name } = await request.json()
    
    // Update user in database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name },
    })
    
    return NextResponse.json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    })
  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    )
  }
} 