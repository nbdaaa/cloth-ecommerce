"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email address"),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function AccountPage() {
  const { data: session, update } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
    },
  })

  if (!session?.user) {
    // This should never happen because of the layout protection
    router.push("/login")
    return null
  }

  const { name, email, image } = session.user
  const initials = name 
    ? name.split(" ").map(n => n[0]).join("").toUpperCase()
    : email?.charAt(0).toUpperCase() || "U"

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true)
    
    try {
      // Call API to update user profile
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
        }),
      })
      
      if (!response.ok) {
        throw new Error("Failed to update profile")
      }
      
      // Update the session data
      await update({
        ...session,
        user: {
          ...session.user,
          name: data.name,
        },
      })
      
      toast.success("Profile updated successfully")
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Failed to update profile")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Profile</h1>
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your account's profile information and email address.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={image || ""} alt={name || ""} />
                <AvatarFallback className="text-xl">{initials}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{name || "User"}</h3>
                <p className="text-sm text-gray-500">{email}</p>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  {...form.register("name")}
                  defaultValue={name || ""}
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  defaultValue={email || ""}
                  disabled
                />
                <p className="text-xs text-gray-500">
                  Email cannot be changed. Contact support for assistance.
                </p>
              </div>
              
              <Button 
                type="submit" 
                className="mt-4" 
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your account password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              For security reasons, we recommend changing your password regularly.
            </p>
            <Button variant="outline" onClick={() => router.push("/account/change-password")}>
              Change Password
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Delete Account</CardTitle>
            <CardDescription>
              Permanently delete your account and all associated data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              This action is irreversible. All your data including order history and saved addresses will be permanently deleted.
            </p>
            <Button variant="destructive">
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
} 