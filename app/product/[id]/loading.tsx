import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export default function ProductLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb skeleton */}
      <div className="flex text-sm mb-6 gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Product Image Skeleton */}
        <div className="space-y-4">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="aspect-square w-full rounded-md" />
            ))}
          </div>
        </div>
        
        {/* Product Info Skeleton */}
        <div className="flex flex-col">
          <Skeleton className="h-10 w-2/3 mb-2" />
          
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-8 w-24" />
          </div>
          
          <Skeleton className="h-6 w-32 mb-4" />
          
          <div className="space-y-2 mb-6">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          
          <Separator className="my-6" />
          
          <div className="flex flex-col gap-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
          
          <Separator className="my-6" />
          
          <div className="space-y-2">
            <div className="flex">
              <Skeleton className="h-5 w-32 mr-4" />
              <Skeleton className="h-5 w-24" />
            </div>
            <div className="flex">
              <Skeleton className="h-5 w-32 mr-4" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Product details skeleton */}
      <div className="mt-12">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  )
} 