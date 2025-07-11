import { NextResponse } from 'next/server'

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || 'sticker'
    const page = searchParams.get('page') || '1'
    
    const FREEPIK_API_KEY = process.env.FREEPIK_API_KEY || 'FPSX9ed009e4085704ad16575019cb3a167f'
    const FREEPIK_API_URL = 'https://api.freepik.com/v1/resources/search'
    
    console.log('Stickers API called with:', { query, page, hasApiKey: !!FREEPIK_API_KEY })
    
    // Check if we have a valid API key
    if (!FREEPIK_API_KEY || FREEPIK_API_KEY === 'FPSX9ed009e4085704ad16575019cb3a167f') {
        console.log('Using fallback stickers due to invalid/missing API key')
        return NextResponse.json({
            data: [
                {
                    id: 'fallback-1',
                    title: 'Smile Emoji',
                    image: {
                        source: { url: 'https://cdn-icons-png.flaticon.com/256/428/428094.png' },
                        preview: { url: 'https://cdn-icons-png.flaticon.com/256/428/428094.png' }
                    }
                },
                {
                    id: 'fallback-2',
                    title: 'Heart Icon',
                    image: {
                        source: { url: 'https://cdn-icons-png.flaticon.com/256/2111/2111463.png' },
                        preview: { url: 'https://cdn-icons-png.flaticon.com/256/2111/2111463.png' }
                    }
                },
                {
                    id: 'fallback-3',
                    title: 'Star Icon',
                    image: {
                        source: { url: 'https://cdn-icons-png.flaticon.com/256/5968/5968764.png' },
                        preview: { url: 'https://cdn-icons-png.flaticon.com/256/5968/5968764.png' }
                    }
                },
                {
                    id: 'fallback-4',
                    title: 'Thumbs Up',
                    image: {
                        source: { url: 'https://cdn-icons-png.flaticon.com/256/1384/1384060.png' },
                        preview: { url: 'https://cdn-icons-png.flaticon.com/256/1384/1384060.png' }
                    }
                },
                {
                    id: 'fallback-5',
                    title: 'Instagram',
                    image: {
                        source: { url: 'https://cdn-icons-png.flaticon.com/256/733/733585.png' },
                        preview: { url: 'https://cdn-icons-png.flaticon.com/256/733/733585.png' }
                    }
                },
                {
                    id: 'fallback-6',
                    title: 'Twitter',
                    image: {
                        source: { url: 'https://cdn-icons-png.flaticon.com/256/2111/2111646.png' },
                        preview: { url: 'https://cdn-icons-png.flaticon.com/256/2111/2111646.png' }
                    }
                }
            ]
        })
    }
    
    try {
        const apiUrl = `${FREEPIK_API_URL}?q=${encodeURIComponent(query)}&type=vector&page=${page}&limit=20`
        console.log('Calling Freepik API:', apiUrl)
        
        const response = await fetch(apiUrl, {
            headers: {
                'X-Freepik-API-Key': FREEPIK_API_KEY,
                'Accept': 'application/json'
            }
        })

        console.log('Freepik API response status:', response.status)

        if (!response.ok) {
            const errorText = await response.text()
            console.error(`Freepik API error: ${response.status} - ${errorText}`)
            
            // Return fallback data instead of error
            console.log('Returning fallback data due to API error')
            return NextResponse.json({
                data: [
                    {
                        id: 'fallback-1',
                        title: 'Smile Emoji',
                        image: {
                            source: { url: 'https://cdn-icons-png.flaticon.com/256/428/428094.png' },
                            preview: { url: 'https://cdn-icons-png.flaticon.com/256/428/428094.png' }
                        }
                    },
                    {
                        id: 'fallback-2',
                        title: 'Heart Icon',
                        image: {
                            source: { url: 'https://cdn-icons-png.flaticon.com/256/2111/2111463.png' },
                            preview: { url: 'https://cdn-icons-png.flaticon.com/256/2111/2111463.png' }
                        }
                    },
                    {
                        id: 'fallback-3',
                        title: 'Star Icon',
                        image: {
                            source: { url: 'https://cdn-icons-png.flaticon.com/256/5968/5968764.png' },
                            preview: { url: 'https://cdn-icons-png.flaticon.com/256/5968/5968764.png' }
                        }
                    }
                ]
            })
        }

        const data = await response.json()
        console.log('Freepik API response data:', { 
            hasData: !!data, 
            dataLength: data.data?.length || 0 
        })
        
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching stickers from Freepik API:', error)
        
        // Return a fallback response with sample data
        return NextResponse.json({
            data: [
                {
                    id: 'fallback-1',
                    title: 'Smile Emoji',
                    image: {
                        source: { url: 'https://cdn-icons-png.flaticon.com/256/428/428094.png' },
                        preview: { url: 'https://cdn-icons-png.flaticon.com/256/428/428094.png' }
                    }
                },
                {
                    id: 'fallback-2',
                    title: 'Heart Icon',
                    image: {
                        source: { url: 'https://cdn-icons-png.flaticon.com/256/2111/2111463.png' },
                        preview: { url: 'https://cdn-icons-png.flaticon.com/256/2111/2111463.png' }
                    }
                },
                {
                    id: 'fallback-3',
                    title: 'Star Icon',
                    image: {
                        source: { url: 'https://cdn-icons-png.flaticon.com/256/5968/5968764.png' },
                        preview: { url: 'https://cdn-icons-png.flaticon.com/256/5968/5968764.png' }
                    }
                }
            ]
        })
    }
} 