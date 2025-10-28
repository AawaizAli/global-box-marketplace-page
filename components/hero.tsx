"use client"

import { useState, useEffect } from "react"
import { Play, Pause } from "lucide-react"

interface HeroProps {
  country: string
  isDarkMode: boolean
}

export default function Hero({ country, isDarkMode }: HeroProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleVideo = () => {
    if (videoRef) {
      if (isVideoPlaying) {
        videoRef.pause()
        setIsVideoPlaying(false)
      } else {
        videoRef.play()
        setIsVideoPlaying(true)
      }
    }
  }

  const getHeroContent = () => {
    return {
      title: `WELCOME TO GLOBALBOX ${country.toUpperCase()}`,
      subtitle: "Connecting Global Commerce",
      videoUrl: "/rainy-cloudy.mp4",
      backgroundGradient: isDarkMode
        ? "from-background/80 via-background/40 to-transparent"
        : "from-background/60 via-background/30 to-transparent",
    }
  }

  const content = getHeroContent()

  if (!mounted) return null

  return (
    <section className="relative w-full h-screen max-h-[600px] overflow-hidden bg-gradient-to-b from-muted to-background">
      <div className="absolute inset-0">
        {/* Background Video/Image */}
        <video
          ref={setVideoRef}
          src={content.videoUrl || "/placeholder.svg"}
          autoPlay
          muted
          loop
          playsInline
          onPlay={() => setIsVideoPlaying(true)}
          onPause={() => setIsVideoPlaying(false)}
          className="w-full h-full object-cover opacity-100 transition-opacity duration-500"
        />

        {/* Gradient Overlays */}
        <div className={`absolute inset-0 bg-gradient-to-t ${content.backgroundGradient}`}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40"></div>
        
        {/* Top and Bottom Fade Overlays */}
        {/* <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background to-transparent"></div> */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent"></div>

        {/* Animated Accent Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        {/* Main Title */}
        <div className="mb-6 space-y-4 max-w-4xl">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground animate-fade-in">
            {content.title}
          </h2>
          {/* <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div> */}
        </div>

        {/* Subtitle */}
        <p
          className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-12 max-w-2xl font-light tracking-wide animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          {content.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 flex-wrap justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <a
            href="#services"
            className="group px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            GLOBAL SERVICES
          </a>
          <a
            href="#promotions"
            className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-105"
          >
            GLOBAL PROMOTIONS
          </a>
        </div>

        {/* Video Control Badge */}
        <button
          onClick={toggleVideo}
          className="absolute bottom-8 right-8 flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-border rounded-full px-4 py-2 hover:bg-background/90 transition-colors cursor-pointer"
          aria-label={isVideoPlaying ? "Pause video" : "Play video"}
        >
          {isVideoPlaying ? <Pause className="w-4 h-4 text-primary" /> : <Play className="w-4 h-4 text-primary" />}
          <span className="text-xs font-medium text-muted-foreground">{isVideoPlaying ? "PLAYING" : "PAUSED"}</span>
        </button>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  )
}
