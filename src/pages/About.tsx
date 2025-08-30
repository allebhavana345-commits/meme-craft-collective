import { Sparkles, Heart, Users, Zap, Share2, Laugh } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import { Link } from 'react-router-dom';

const About = () => {
  const features = [
    {
      icon: <Laugh className="w-8 h-8 text-primary" />,
      title: "Endless Entertainment",
      description: "Discover thousands of hilarious memes updated daily from our amazing community."
    },
    {
      icon: <Heart className="w-8 h-8 text-secondary" />,
      title: "Community-Driven",
      description: "Like, comment, and share your favorite memes. Connect with fellow meme enthusiasts."
    },
    {
      icon: <Zap className="w-8 h-8 text-accent" />,
      title: "Easy Creation",
      description: "Create your own viral memes with our simple yet powerful meme generator tool."
    },
    {
      icon: <Share2 className="w-8 h-8 text-primary" />,
      title: "Social Sharing",
      description: "Share your favorite memes across all social platforms with just one click."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
        <div className="container mx-auto text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-16 h-16 text-primary mr-4" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            About INKEM ANUKOLEDU
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Welcome to the ultimate destination for meme lovers! INKEM ANUKOLEDU is where humor meets community, 
            creating an endless stream of laughter and connection through the universal language of memes.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe that laughter is the best medicine, and memes are the perfect prescription. 
              Our mission is to create a vibrant, inclusive community where people from all walks of life 
              can come together to share, create, and enjoy the finest memes the internet has to offer.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="card-glow bg-card border-border">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">10K+</div>
                <p className="text-muted-foreground">Memes Shared</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">5K+</div>
                <p className="text-muted-foreground">Active Users</p>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">1M+</div>
                <p className="text-muted-foreground">Laughs Generated</p>
              </div>
            </div>
          </div>

          {/* Community Section */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Users className="w-12 h-12 text-primary mr-4" />
              <h2 className="text-3xl md:text-4xl font-bold">Join Our Community</h2>
            </div>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ready to dive into the world of memes? Join thousands of users who are already 
              sharing laughs and creating viral content. Your next favorite meme is just a click away!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button size="lg" className="btn-gradient">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Explore Memes
                </Button>
              </Link>
              <Link to="/create">
                <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10">
                  Create Your First Meme
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground mb-4">Follow us on social media for daily meme updates!</p>
          <div className="flex justify-center space-x-4">
            {['Twitter', 'Instagram', 'TikTok', 'Facebook'].map((platform) => (
              <Button key={platform} variant="ghost" size="sm">
                {platform}
              </Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;