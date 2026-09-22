import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Leaf } from 'lucide-react';
import FarmerDashboard from './FarmerDashboard';
import BuyerDashboard from './BuyerDashboard';
import LandownerDashboard from './LandownerDashboard';

// ✅ FIXED PATH
import dashboardBg from "../assets/istockphoto.jpg";

export default function Dashboard() {
  const { user, profile, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <Leaf className="w-12 h-12 text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const renderDashboard = () => {
    switch (profile?.role) {
      case 'buyer':
        return <BuyerDashboard fullName={profile?.full_name} onSignOut={handleSignOut} />;
      case 'landowner':
        return <LandownerDashboard fullName={profile?.full_name} onSignOut={handleSignOut} />;
      case 'farmer':
      default:
        return <FarmerDashboard fullName={profile?.full_name} onSignOut={handleSignOut} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 🌾 HERO SECTION */}
      <section
        className="relative h-[60vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${dashboardBg})`,
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Hero content */}
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-green-600/90 text-sm font-medium">
            🌱 AI-Powered Agricultural Platform
          </span>

          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
            Empowering Farmers with <br />
            <span className="text-green-300">Smart Technology</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200">
            Smart irrigation, AI crop insights, disease detection,
            and direct market access.
          </p>
        </div>
      </section>

      {/* 📊 DASHBOARD CONTENT (GLASS EFFECT) */}
      <div className="relative z-10 -mt-24 px-6 pb-10">
        <div className="bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl p-6">
          {renderDashboard()}
        </div>
      </div>
    </div>
  );
}
