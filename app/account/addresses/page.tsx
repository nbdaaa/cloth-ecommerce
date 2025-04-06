"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { LuPlus, LuPencil, LuTrash, LuCheck } from "react-icons/lu"

type Address = {
  id: string
  name: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
  isDefault: boolean
}

// In a real app, this would come from an API
const dummyAddresses: Address[] = [
  {
    id: "addr-1",
    name: "Home",
    addressLine1: "123 Main Street",
    addressLine2: "Apt 4B",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "United States",
    phone: "(123) 456-7890",
    isDefault: true,
  },
  {
    id: "addr-2",
    name: "Work",
    addressLine1: "456 Corporate Ave",
    city: "New York",
    state: "NY",
    postalCode: "10002",
    country: "United States",
    phone: "(123) 456-7891",
    isDefault: false,
  },
]

export default function AddressesPage() {
  const router = useRouter()
  const [addresses, setAddresses] = useState<Address[]>(dummyAddresses)
  
  const setDefaultAddress = (id: string) => {
    const updatedAddresses = addresses.map(address => ({
      ...address,
      isDefault: address.id === id,
    }))
    
    setAddresses(updatedAddresses)
    toast.success("Default address updated")
  }
  
  const removeAddress = (id: string) => {
    const updatedAddresses = addresses.filter(address => address.id !== id)
    setAddresses(updatedAddresses)
    toast.success("Address removed successfully")
  }
  
  const formatAddress = (address: Address) => {
    const parts = [
      address.addressLine1,
      address.addressLine2,
      `${address.city}, ${address.state} ${address.postalCode}`,
      address.country,
    ].filter(Boolean)
    
    return parts.join(", ")
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Addresses</h1>
        <Button 
          onClick={() => router.push("/account/addresses/new")} 
          className="flex items-center gap-2"
        >
          <LuPlus className="h-4 w-4" /> Add New Address
        </Button>
      </div>
      
      {addresses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center text-center p-10">
            <h3 className="text-lg font-semibold mb-2">No addresses yet</h3>
            <p className="text-gray-500 mb-4">
              You haven't added any addresses yet. Add an address to make checkout faster.
            </p>
            <Button onClick={() => router.push("/account/addresses/new")}>
              Add Address
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <Card key={address.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <CardTitle className="text-lg">{address.name}</CardTitle>
                    {address.isDefault && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => router.push(`/account/addresses/${address.id}/edit`)}
                    >
                      <LuPencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeAddress(address.id)}
                    >
                      <LuTrash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm">
                  <p>{formatAddress(address)}</p>
                  <p>Phone: {address.phone}</p>
                </div>
                
                {!address.isDefault && (
                  <Button
                    variant="outline"
                    className="mt-4 text-xs h-8"
                    onClick={() => setDefaultAddress(address.id)}
                  >
                    <LuCheck className="h-3 w-3 mr-1" /> 
                    Set as Default
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  )
} 