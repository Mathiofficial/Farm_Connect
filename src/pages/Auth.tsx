import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Leaf, Tractor, Store, ArrowLeft } from 'lucide-react';

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'farmer' | 'landowner' | 'buyer'>('farmer');

  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast({
        title: 'Sign in failed',
        description:
          error.message === 'Invalid login credentials'
            ? 'Invalid email or password. Please try again.'
            : error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Welcome back!',
        description: 'You have successfully signed in.',
      });
      navigate('/dashboard');
    }

    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (password.length < 6) {
      toast({
        title: 'Password too short',
        description: 'Password must be at least 6 characters.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    const { error } = await signUp(email, password, fullName, role);

    if (error) {
      toast({
        title: 'Sign up failed',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Account created!',
        description: 'Welcome to AgriSmart.',
      });
      navigate('/dashboard');
    }

    setIsLoading(false);
  };

  const roleOptions = [
    { value: 'farmer', label: 'Farmer', icon: Tractor, description: 'Grow crops and sell produce' },
    { value: 'landowner', label: 'Landowner', icon: Leaf, description: 'Rent out your agricultural land' },
    { value: 'buyer', label: 'Buyer', icon: Store, description: 'Purchase fresh produce directly' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* LEFT SIDE – AGRICULTURE BACKGROUND */}
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/2153462364/photo/golden-ears-of-wheat-on-the-background-of-a-ripening-field-agricultural-plant-close-up-the.jpg?s=612x612&w=0&k=20&c=YY7mgCSlyepy1HvjGzdol1R47f24A-QUwXdbF7AHZ70=')",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-primary-foreground">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center">
              <Leaf className="w-10 h-10 text-secondary-foreground" />
            </div>
            <span className="text-4xl font-serif font-bold">AgriSmart</span>
          </div>

          <h1 className="text-4xl font-serif font-bold text-center mb-6">
            Empowering Farmers with Technology
          </h1>

          <p className="text-xl text-center opacity-90 max-w-md">
            AI-powered crop recommendations, disease detection, and direct marketplace access.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-sm opacity-80">Active Farmers</div>
            </div>
            <div>
              <div className="text-3xl font-bold">5K+</div>
              <div className="text-sm opacity-80">Land Listings</div>
            </div>
            <div>
              <div className="text-3xl font-bold">95%</div>
              <div className="text-sm opacity-80">Prediction Accuracy</div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE – AUTH FORMS */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome back</CardTitle>
                  <CardDescription>Sign in to access your dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div>
                      <Label>Email</Label>
                      <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                      <Label>Password</Label>
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <Button className="w-full" disabled={isLoading}>
                      {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Create an account</CardTitle>
                  <CardDescription>Join AgriSmart today</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <Input placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <RadioGroup value={role} onValueChange={(v) => setRole(v as typeof role)}>
                      {roleOptions.map((r) => (
                        <div key={r.value} className="flex items-center gap-3">
                          <RadioGroupItem value={r.value} />
                          <r.icon className="w-5 h-5" />
                          <span>{r.label}</span>
                        </div>
                      ))}
                    </RadioGroup>

                    <Button className="w-full" disabled={isLoading}>
                      {isLoading ? 'Creating account...' : 'Create Account'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
