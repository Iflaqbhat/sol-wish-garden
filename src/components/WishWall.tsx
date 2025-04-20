import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface Wish {
  id: number;
  text: string;
  author: string;
  timestamp: number;
}

const WishWall = () => {
  const [wish, setWish] = useState('');
  const [wishes, setWishes] = useState<Wish[]>([]);

  useEffect(() => {
    const savedWishes = localStorage.getItem('wishes');
    if (savedWishes) {
      setWishes(JSON.parse(savedWishes));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!wish.trim()) {
      toast.error("Please enter a wish!");
      return;
    }

    const newWish: Wish = {
      id: Date.now(),
      text: wish.trim(),
      author: "Anonymous User",
      timestamp: Date.now()
    };

    const updatedWishes = [...wishes, newWish];
    setWishes(updatedWishes);
    localStorage.setItem('wishes', JSON.stringify(updatedWishes));
    
    setWish('');
    toast.success("Your wish has been added to the wall! ✨");
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
            Make a wish and store it forever on the Solana blockchain
          </p>
          <Button
            variant="secondary"
            className="bg-purple-500 hover:bg-purple-600 text-white"
          >
            Connect Wallet
          </Button>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishes.map((wish) => (
            <Card
              key={wish.id}
              className="p-6 bg-purple-100/10 backdrop-blur-sm border-purple-300/20 hover:scale-105 transition-transform duration-300 group"
            >
              <p className="text-white mb-4">{wish.text}</p>
              <p className="text-purple-200 text-sm">by {wish.author}</p>
              <div className="absolute top-2 right-2">
                <Star className="h-4 w-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishWall;
