import React, { useState } from 'react'
import Shapes from '../Sharable/Shapes'
import Stickers from '../Sharable/Stickers'

function Elements() {
    const [activeTab, setActiveTab] = useState('shapes')

    return (
        <div className="space-y-4">
            {/* Tab Navigation */}
            <div className="flex border-b">
                <button
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                        activeTab === 'shapes'
                            ? 'border-b-2 border-primary text-primary'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('shapes')}
                >
                    Formas
                </button>
                <button
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                        activeTab === 'stickers'
                            ? 'border-b-2 border-primary text-primary'
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('stickers')}
                >
                    Stickers
                </button>
            </div>

            {/* Tab Content */}
            <div className="mt-4">
                {activeTab === 'shapes' && <Shapes />}
                {activeTab === 'stickers' && <Stickers />}
            </div>
        </div>
    )
}

export default Elements