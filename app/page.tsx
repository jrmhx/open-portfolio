import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Tailwind Test Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            🎨 Tailwind CSS Test
          </h1>
          <p className="text-gray-600 mt-2">Testing colors, spacing, and responsive design</p>
        </div>

        {/* Color Palette Test */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              Colors & Gradients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="h-20 bg-red-500 rounded-lg flex items-center justify-center text-white font-semibold">Red</div>
              <div className="h-20 bg-green-500 rounded-lg flex items-center justify-center text-white font-semibold">Green</div>
              <div className="h-20 bg-blue-500 rounded-lg flex items-center justify-center text-white font-semibold">Blue</div>
              <div className="h-20 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-lg flex items-center justify-center text-white font-semibold">Gradient</div>
            </div>
            
            {/* shadcn Buttons Test */}
            <div className="flex flex-wrap gap-3">
              <Button variant="default">Default</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </CardContent>
        </Card>

        {/* Responsive Test */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              Responsive Layout
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-yellow-100 border-2 border-yellow-300 rounded-lg">
                <div className="text-yellow-800 font-semibold">📱 Mobile: 1 column</div>
              </div>
              <div className="p-4 bg-green-100 border-2 border-green-300 rounded-lg">
                <div className="text-green-800 font-semibold">💻 Tablet: 2 columns</div>
              </div>
              <div className="p-4 bg-purple-100 border-2 border-purple-300 rounded-lg">
                <div className="text-purple-800 font-semibold">🖥️ Desktop: 3 columns</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Animation Test */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="w-3 h-3 bg-pink-500 rounded-full animate-pulse"></span>
              Animations & Effects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="w-16 h-16 bg-red-500 rounded-full animate-bounce"></div>
              <div className="w-16 h-16 bg-blue-500 rounded-full animate-ping"></div>
              <div className="w-16 h-16 bg-green-500 rounded-full animate-pulse"></div>
              <div className="w-16 h-16 bg-yellow-500 rounded-full animate-spin"></div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-100 hover:bg-gray-200 transition-colors duration-300 rounded-lg cursor-pointer">
              <p className="text-gray-700">Hover me! (Smooth transition)</p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
