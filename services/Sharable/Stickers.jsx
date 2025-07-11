import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useCanvasHook } from '@/context/CanvasContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { FabricImage } from 'fabric'

function Stickers() {
    const { canvasEditor } = useCanvasHook()
    const [stickers, setStickers] = useState([])
    const [loading, setLoading] = useState(false)
    const [addingSticker, setAddingSticker] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    // Fallback stickers in case API fails
    const fallbackStickers = [
        {
            id: 'fallback-1',
            name: 'Emoji Smile',
            url: 'https://cdn-icons-png.flaticon.com/256/428/428094.png',
            preview: 'https://cdn-icons-png.flaticon.com/256/428/428094.png'
        },
        {
            id: 'fallback-2',
            name: 'Heart',
            url: 'https://cdn-icons-png.flaticon.com/256/2111/2111463.png',
            preview: 'https://cdn-icons-png.flaticon.com/256/2111/2111463.png'
        },
        {
            id: 'fallback-3',
            name: 'Star',
            url: 'https://cdn-icons-png.flaticon.com/256/5968/5968764.png',
            preview: 'https://cdn-icons-png.flaticon.com/256/5968/5968764.png'
        },
        {
            id: 'fallback-4',
            name: 'Thumbs Up',
            url: 'https://cdn-icons-png.flaticon.com/256/1384/1384060.png',
            preview: 'https://cdn-icons-png.flaticon.com/256/1384/1384060.png'
        },
        {
            id: 'fallback-5',
            name: 'Instagram',
            url: 'https://cdn-icons-png.flaticon.com/256/733/733585.png',
            preview: 'https://cdn-icons-png.flaticon.com/256/733/733585.png'
        },
        {
            id: 'fallback-6',
            name: 'Twitter',
            url: 'https://cdn-icons-png.flaticon.com/256/2111/2111646.png',
            preview: 'https://cdn-icons-png.flaticon.com/256/2111/2111646.png'
        }
    ]

    const fetchStickers = async (query = 'sticker', page = 1) => {
        setLoading(true)
        try {
            const response = await fetch(`/api/stickers?q=${encodeURIComponent(query)}&page=${page}`, {
                headers: {
                    'Accept': 'application/json'
                }
            })

            console.log('Stickers API response status:', response.status)

            // Always try to parse the response, even if status is not 200
            const data = await response.json()
            console.log('Stickers API response data:', data)
            
            if (data.data && data.data.length > 0) {
                const stickerData = data.data.map(item => ({
                    id: item.id,
                    name: item.title,
                    url: item.image?.source?.url || item.image?.preview?.url,
                    preview: item.image?.preview?.url
                })).filter(sticker => sticker.url) // Filter out items without URLs
                setStickers(stickerData)
            } else {
                console.log('No stickers found in API response, using fallback')
                setStickers(fallbackStickers)
            }
        } catch (error) {
            console.error('Error fetching stickers:', error)
            // Use fallback stickers if API fails
            setStickers(fallbackStickers)
            // You can also show a toast notification here if you have a toast system
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        // Start with fallback stickers while API loads
        setStickers(fallbackStickers)
        fetchStickers()
    }, [])

    const handleSearch = () => {
        setCurrentPage(1)
        fetchStickers(searchTerm, 1)
    }

    const handleStickerSelect = async (sticker) => {
        if (!canvasEditor || !sticker.url) return

        setAddingSticker(true)
        try {
            // Create a fabric.js image object
            const img = await FabricImage.fromURL(sticker.url)
            
            // Scale the image to a reasonable size
            const maxSize = 200
            const scale = Math.min(maxSize / img.width, maxSize / img.height)
            
            img.set({
                left: 100,
                top: 100,
                scaleX: scale,
                scaleY: scale,
                selectable: true,
                hasControls: true,
                hasBorders: true
            })

            img.set({
                crossOrigin: 'anonymous'
            })

            canvasEditor.add(img)
            canvasEditor.setActiveObject(img)
            canvasEditor.renderAll()
        } catch (error) {
            console.error('Error adding sticker to canvas:', error)
        } finally {
            setAddingSticker(false)
        }
    }

    const loadMoreStickers = () => {
        const nextPage = currentPage + 1
        setCurrentPage(nextPage)
        fetchStickers(searchTerm || 'sticker', nextPage)
    }

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <Input
                    placeholder="Buscar stickers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="flex-1"
                />
                <Button onClick={handleSearch} disabled={loading}>
                    {loading ? <Spinner className="w-4 h-4" /> : 'Buscar'}
                </Button>
            </div>

            {loading && stickers.length === 0 ? (
                <div className="flex justify-center items-center py-8">
                    <Spinner className="w-8 h-8" />
                </div>
            ) : stickers.length > 0 ? (
                <div className="grid grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                    {stickers.map((sticker, index) => (
                        <div
                            key={sticker.id || index}
                            className={`p-2 border rounded-xl transition-colors ${
                                addingSticker 
                                    ? 'cursor-not-allowed opacity-50' 
                                    : 'cursor-pointer hover:bg-gray-50'
                            }`}
                            onClick={() => !addingSticker && handleStickerSelect(sticker)}
                        >
                            <div className="relative aspect-square">
                                <Image
                                    src={sticker.preview || sticker.url}
                                    alt={sticker.name}
                                    fill
                                    className="object-contain rounded-lg"
                                    sizes="(max-width: 768px) 33vw, 200px"
                                    onError={(e) => {
                                        console.error('Error loading sticker image:', sticker.name)
                                        e.target.style.display = 'none'
                                    }}
                                />
                            </div>
                            <p className="text-xs text-center mt-2 text-gray-600 truncate">
                                {sticker.name}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 text-gray-500">
                    No se encontraron stickers
                </div>
            )}

            {stickers.length > 0 && (
                <Button 
                    onClick={loadMoreStickers} 
                    disabled={loading}
                    variant="outline"
                    className="w-full"
                >
                    {loading ? <Spinner className="w-4 h-4 mr-2" /> : null}
                    Cargar más stickers
                </Button>
            )}
        </div>
    )
}

export default Stickers 