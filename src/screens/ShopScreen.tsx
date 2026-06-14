import { useStore } from '@/store/useStore'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export const ShopScreen = () => {
  const shopItems = useStore((state) => state.shopItems)
  const purchaseItem = useStore((state) => state.purchaseItem)

  const categories = ['theme', 'sound', 'effect', 'avatar'] as const

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
      <h2 className="text-2xl font-bold mb-6">Shop</h2>

      {categories.map((category) => {
        const items = shopItems.filter((item) => item.category === category)
        if (items.length === 0) return null

        const categoryName = {
          theme: 'Themes',
          sound: 'Key Sounds',
          effect: 'Effects',
          avatar: 'Avatars',
        }[category]

        return (
          <div key={category} className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">{categoryName}</h3>
            <div className="space-y-3">
              {items.map((item) => (
                <Card key={item.id} variant="default">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <span className="text-3xl">{item.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{item.name}</h4>
                        <p className="text-xs text-gray-400">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {item.owned ? (
                        <Badge variant="success" size="sm">
                          Owned
                        </Badge>
                      ) : (
                        <>
                          <span className="text-sm font-bold text-secondary">
                            {item.price}
                          </span>
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => purchaseItem(item.id)}
                          >
                            Buy
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
