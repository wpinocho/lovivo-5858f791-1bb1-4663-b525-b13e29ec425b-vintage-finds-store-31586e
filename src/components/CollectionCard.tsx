import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { type Collection } from '@/lib/supabase'

interface CollectionCardProps {
  collection: Collection
  onViewProducts: (collectionId: string) => void
}

export const CollectionCard = ({ collection, onViewProducts }: CollectionCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300 border-border">
      <CardContent className="p-0">
        <div className="aspect-[4/3] bg-muted overflow-hidden relative">
          {collection.image ? (
            <img 
              src={collection.image} 
              alt={collection.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
              No image
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg line-clamp-1">
              {collection.name}
            </h3>
            {collection.featured && (
              <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded font-medium">
                Featured
              </span>
            )}
          </div>
          
          {collection.description && (
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {collection.description}
            </p>
          )}
          
          <Button 
            className="w-full"
            onClick={() => onViewProducts(collection.id)}
          >
            Explore Collection
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}