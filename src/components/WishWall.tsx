import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';

interface Wish {
  id: number;
  text: string;
  author: string;
  timestamp: number;
}

const WishWall = () => {
  const [wish, setWish] = useState('');
  const [wishes, setWishes] = useState<Wish[]>([]);
  const wallet = useWallet();

  useEffect(() => {
    const savedWishes = localStorage.getItem('wishes');
    if (savedWishes) {
      setWishes(JSON.parse(savedWishes));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!wallet.publicKey) {
      toast.error("Please connect your wallet first!");
      return;
    }

    if (!wish.trim()) {
      toast.error("Please enter a wish!");
      return;
    }

    try {
      // TODO: Implement Solana program interaction
      // This will be replaced with actual Anchor program call
      toast.success("Wish submitted successfully! 🌟");
    } catch (error) {
      toast.error("Failed to submit wish");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#9b87f5] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `twinkle ${Math.random() * 3 + 2}s infinite`
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Wall of Wishes
          </h1>
          <p className="text-purple-200 text-lg md:text-xl mb-8">
            Record your wishes on the Solana blockchain
          </p>
          {wallet.connected ? (
            <Button variant="secondary" className="bg-green-500 hover:bg-green-600 text-white">
              {wallet.publicKey?.toBase58().slice(0, 6)}...
            </Button>
          ) : (
            <Button variant="secondary" className="bg-purple-500 hover:bg-purple-600 text-white">
              Connect Wallet
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-16">
          <div className="flex gap-4">
            <Input
              type="text"
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              placeholder="Enter your wish..."
              className="bg-white/10 text-white placeholder:text-purple-200 border-purple-300/20"
            />
            <Button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white">
              <Star className="mr-2 h-4 w-4" />
              Make Wish
            </Button>
          </div>
        </form>

        {/* Wishes section will be dynamically populated from blockchain */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Wishes will be fetched and rendered here */}
        </div>
      </div>
    </div>
  );
};

export default WishWall;
