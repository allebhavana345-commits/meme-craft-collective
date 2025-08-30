import { useState, useRef } from 'react';
import { Upload, Download, Type, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import Header from '@/components/Header';
import { toast } from 'sonner';

const CreateMeme = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [fontSize, setFontSize] = useState([40]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateMeme = () => {
    if (!selectedImage || !canvasRef.current) {
      toast.error("Please upload an image first!");
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // Set canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw image
      ctx.drawImage(img, 0, 0);

      // Set text style
      const size = fontSize[0];
      ctx.font = `bold ${size}px Impact, Arial, sans-serif`;
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = size / 20;
      ctx.textAlign = 'center';

      // Draw top text
      if (topText) {
        const words = topText.toUpperCase().split(' ');
        const lines = [];
        let currentLine = '';
        
        // Simple word wrapping
        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const metrics = ctx.measureText(testLine);
          if (metrics.width > canvas.width - 40 && currentLine) {
            lines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }
        if (currentLine) lines.push(currentLine);

        // Draw each line
        lines.forEach((line, index) => {
          const y = size + (index * size * 1.2) + 20;
          ctx.strokeText(line, canvas.width / 2, y);
          ctx.fillText(line, canvas.width / 2, y);
        });
      }

      // Draw bottom text
      if (bottomText) {
        const words = bottomText.toUpperCase().split(' ');
        const lines = [];
        let currentLine = '';
        
        // Simple word wrapping
        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const metrics = ctx.measureText(testLine);
          if (metrics.width > canvas.width - 40 && currentLine) {
            lines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }
        if (currentLine) lines.push(currentLine);

        // Draw each line from bottom up
        lines.reverse().forEach((line, index) => {
          const y = canvas.height - 20 - (index * size * 1.2);
          ctx.strokeText(line, canvas.width / 2, y);
          ctx.fillText(line, canvas.width / 2, y);
        });
      }

      toast.success("Meme generated! Click download to save.");
    };

    img.src = selectedImage;
  };

  const downloadMeme = () => {
    if (!canvasRef.current) return;
    
    const link = document.createElement('a');
    link.download = 'my-meme.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
    
    toast.success("Meme downloaded successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-primary mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold gradient-text">
              Meme Generator
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Create hilarious memes in seconds! Upload an image and add your text.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Controls Panel */}
          <div className="space-y-6">
            <Card className="card-glow bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <ImageIcon className="w-5 h-5 mr-2 text-primary" />
                  Upload Image
                </h3>
                
                <div 
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {selectedImage ? (
                    <div>
                      <img 
                        src={selectedImage} 
                        alt="Selected" 
                        className="max-w-full max-h-32 mx-auto mb-4 rounded"
                      />
                      <p className="text-sm text-muted-foreground">Click to change image</p>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-lg font-medium mb-2">Upload an image</p>
                      <p className="text-sm text-muted-foreground">
                        Drag and drop or click to select
                      </p>
                    </div>
                  )}
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </CardContent>
            </Card>

            <Card className="card-glow bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Type className="w-5 h-5 mr-2 text-primary" />
                  Add Text
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="topText">Top Text</Label>
                    <Input
                      id="topText"
                      placeholder="Enter top text..."
                      value={topText}
                      onChange={(e) => setTopText(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bottomText">Bottom Text</Label>
                    <Input
                      id="bottomText"
                      placeholder="Enter bottom text..."
                      value={bottomText}
                      onChange={(e) => setBottomText(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label>Font Size: {fontSize[0]}px</Label>
                    <Slider
                      value={fontSize}
                      onValueChange={setFontSize}
                      max={80}
                      min={20}
                      step={5}
                      className="mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-4">
              <Button 
                onClick={generateMeme}
                disabled={!selectedImage}
                className="flex-1 btn-gradient"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Meme
              </Button>
              
              <Button 
                onClick={downloadMeme}
                variant="outline"
                className="border-primary/50 hover:bg-primary/10"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>

          {/* Preview Panel */}
          <div>
            <Card className="card-glow bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Preview</h3>
                
                <div className="bg-muted rounded-lg p-4 min-h-[400px] flex items-center justify-center">
                  {selectedImage ? (
                    <div className="relative">
                      <canvas 
                        ref={canvasRef}
                        className="max-w-full max-h-[500px] rounded border border-border"
                        style={{ display: 'none' }}
                      />
                      <div className="relative inline-block">
                        <img 
                          src={selectedImage} 
                          alt="Preview" 
                          className="max-w-full max-h-[500px] rounded"
                        />
                        {topText && (
                          <div 
                            className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white font-bold text-center drop-shadow-lg"
                            style={{ 
                              fontSize: `${fontSize[0] * 0.5}px`,
                              textShadow: '2px 2px 0 black, -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black'
                            }}
                          >
                            {topText.toUpperCase()}
                          </div>
                        )}
                        {bottomText && (
                          <div 
                            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white font-bold text-center drop-shadow-lg"
                            style={{ 
                              fontSize: `${fontSize[0] * 0.5}px`,
                              textShadow: '2px 2px 0 black, -2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black'
                            }}
                          >
                            {bottomText.toUpperCase()}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <ImageIcon className="w-16 h-16 mx-auto mb-4" />
                      <p>Upload an image to see preview</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMeme;