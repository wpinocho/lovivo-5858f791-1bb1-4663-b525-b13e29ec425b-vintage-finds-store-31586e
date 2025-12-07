import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Sparkles, Heart, Recycle, Package } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { CollectionCard } from '@/components/CollectionCard';
import { FloatingCart } from '@/components/FloatingCart';
import { NewsletterSection } from '@/components/NewsletterSection';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';
import { useState } from 'react';

/**
 * EDITABLE UI - IndexUI
 * 
 * Interfaz completamente editable para la página principal.
 * El agente IA puede modificar colores, textos, layout, etc.
 */

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    selectedCollectionId,
    filteredProducts,
    handleViewCollectionProducts,
    handleShowAllProducts,
  } = logic;

  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');

  // Extract unique conditions and brands from products
  const conditions = ['all', 'Like New', 'Good Condition', 'Fair'];
  const brands = ['all', ...new Set(filteredProducts.flatMap(p => 
    (p.tags || []).filter(tag => ['Levi\'s', 'Tommy Hilfiger', 'Designer'].includes(tag))
  ))];

  // Filter products by condition and brand
  const displayProducts = filteredProducts.filter(product => {
    const matchesCondition = selectedCondition === 'all' || 
      (product.tags || []).includes(selectedCondition);
    const matchesBrand = selectedBrand === 'all' || 
      (product.tags || []).includes(selectedBrand);
    return matchesCondition && matchesBrand;
  });

  return (
    <EcommerceTemplate 
      showCart={true}
    >
      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Recycle className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Sustainable Fashion • Circular Economy</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Buy & Sell
            <br />
            <span className="text-secondary">Vintage Treasures</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Discover unique secondhand pieces with history. Shop sustainably, sell easily.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Finds
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 text-lg px-8"
            >
              Start Selling
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="bg-secondary/10 backdrop-blur-sm p-4 rounded-full mb-3">
                <Sparkles className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-1">Authenticated Quality</h3>
              <p className="text-sm opacity-80">Every piece verified & graded</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-secondary/10 backdrop-blur-sm p-4 rounded-full mb-3">
                <Heart className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-1">Curated Selection</h3>
              <p className="text-sm opacity-80">Handpicked vintage finds</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-secondary/10 backdrop-blur-sm p-4 rounded-full mb-3">
                <Package className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-1">Easy Returns</h3>
              <p className="text-sm opacity-80">14-day satisfaction guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      {!loadingCollections && collections.length > 0 && (
        <section id="collections" className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Curated Collections
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our handpicked vintage selections
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {collections.map((collection) => (
                <CollectionCard 
                  key={collection.id} 
                  collection={collection} 
                  onViewProducts={handleViewCollectionProducts} 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Section with Filters */}
      <section id="products" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                {selectedCollectionId 
                  ? `${collections.find(c => c.id === selectedCollectionId)?.name || 'Collection'}` 
                  : 'All Vintage Finds'
                }
              </h2>
              <p className="text-muted-foreground">
                {displayProducts.length} {displayProducts.length === 1 ? 'item' : 'items'} available
              </p>
            </div>
            {selectedCollectionId && (
              <Button 
                variant="outline" 
                onClick={handleShowAllProducts}
              >
                See All Items
              </Button>
            )}
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">Condition:</span>
              {conditions.map((condition) => (
                <Button
                  key={condition}
                  variant={selectedCondition === condition ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCondition(condition)}
                  className={selectedCondition === condition ? "" : ""}
                >
                  {condition === 'all' ? 'All' : condition}
                </Button>
              ))}
            </div>
            
            {brands.length > 1 && (
              <div className="flex items-center gap-2 border-l pl-3 ml-1">
                <span className="text-sm font-medium text-foreground">Brand:</span>
                {brands.map((brand) => (
                  <Button
                    key={brand}
                    variant={selectedBrand === brand ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedBrand(brand)}
                  >
                    {brand === 'all' ? 'All' : brand}
                  </Button>
                ))}
              </div>
            )}
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-muted rounded-lg h-80 animate-pulse"></div>
              ))}
            </div>
          ) : displayProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No items match your filters. Try adjusting your selection.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Care Guide Section */}
      <section className="py-16 bg-muted/50 border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Vintage Care Guide
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Keep your treasures looking their best for years to come
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-background p-6 rounded-lg border">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">👕</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Gentle Washing</h3>
              <p className="text-sm text-muted-foreground">
                Hand wash or use delicate cycle with cold water. Turn items inside out to preserve colors.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg border">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">☀️</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Air Dry</h3>
              <p className="text-sm text-muted-foreground">
                Avoid dryers. Lay flat or hang to air dry away from direct sunlight to prevent fading.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg border">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🧵</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Minor Repairs</h3>
              <p className="text-sm text-muted-foreground">
                Fix loose buttons and small tears quickly. A stitch in time saves vintage finds.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg border">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📦</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Proper Storage</h3>
              <p className="text-sm text-muted-foreground">
                Store in breathable garment bags. Use cedar blocks to prevent moths and odors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      <FloatingCart />
    </EcommerceTemplate>
  );
};