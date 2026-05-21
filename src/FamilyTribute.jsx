import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { 
  Heart, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Smile, 
  Frown, 
  Lock, 
  Terminal, 
  ShieldAlert,
  PartyPopper,
  Volume2,
  VolumeX,
  ArrowRight,
  ArrowLeft,
  Camera,
  X,
  Maximize2
} from "lucide-react";
// ==========================================
// 📦 FAMILY APP DATA ARCHITECTURE
// ==========================================
const FAMILY_APP_DATA = {
  stage1: {
    text: "Hii 👋 mere pass kuch Intresting hai dekhoge 😍 ",
    btn: "Toh chalo aage ➡️",
  },
  intro: {
    text: "Hii 👋",
    duration: 2000,
  },
  questionStep: {
    question: "Mere paas kuch hai... dekhna hai? 👀",
    yesBtn: "Yes! 😍",
    noBtn: "No 🫥",
    cryingModal: {
      emoji: "😭🐻",
      text: "Plz yes kardo na... 🥺👉👈",
      subtext: "Aise no mat bolo yaar, bohot mehnat ki hai!",
      backBtn: "🔙 Go Back Aur YES Karo!"
    }
  },
  stage2: {
    btnReveal: "Reveal kare humare Celebrities ke Naam  🤫✨",
    mainImage: "/assets/Screenshot 2026-05-20 173527.png",
    modal: {
      title: "Mr. & Mrs. Sharma",
      names: "Mr. Kheemanand Sharma & Mrs. Sunita Sharma",
      tag: "G.O.A.T ke (Mtlb mere 😎) mummy papa ❤️",
      btnNext: "aage dekhne ke liye 500 rupay Gpay kr dena end mai bacche ki mehnat ke liye 😂🚀"
    }
  },
  stage3: {
    question: "7 Crore ka sawal Sach-Sach batana, asli Home minister kaun hai ghr ka? 🙄",
    option1: "Papa 😎",
    option2: "Mummy 👑",
    errorModal: {
      text: "Error 404: Safed jhooth! Hum sabko pata hai decision aakhri mein Mummy ka hi hota hai. Wapas jao! 😂",
      btn: "Wapas Jao 🔙"
    },
    successModal: {
      text: "7 Crore jeet gye 😂 (Papa ko mat batana 🤫 Vrna meri shamat hai aaj 🥺👉👈...)",
      btn: "Itna aaye ho to aage bhi dekh lo intersting cheeze 🚀"
    }
  },
  stage4: {
    question: "Mummy ka sabse common dialogue kaunsa hai? 🧐",
    options: [
      "Bas din bhar iske samne baithe rehna humhe dikhane ke liye ki padh rha hu 💻",
      "Papa ko aane de, tujhe to vo hi shi kar skte hai! mere haath se nikal gya tu 😤",
      "Tune mujhe itna pareshan kar rkha hai, jo kaam karta hai usme chillana padta hai 🙄",
      "Terse accha to tera chota bhai hai, kam se kam chillana to nahi padta us par 😒"
    ],
    successModal: {
      text: "Sahi Jawab! Yeh teeno (actually charo!) hi unke aur sb mummy ke common dialouge hain! 😂💖",
      btn: "Agla Surprise 🎁 \n     Disclamer : Shock lag skta hai. 😮 "
    }
  },

  stage5: {
    title: "Some mandatory promise check ✅📜",
    familyPhoto: "/assets/IMG_20251215_130101.jpg",
    contractText: [
      "   MAIN MOHIT SHARMA, AAJ IS CONTRACT KE DWARA EK PROMISE KARTA HOON:",
      "1. Ki main apni engineering ke har part ko bdiya se clear karunga aur padhai mein koi kami nahi chhodunga. 🚀",
      "2. Ki main apni mehnat aur lagan se aap dono ka naam roshan karunga aur ek aisi life banaunga jispe aapko garv ho. ✨",
      "3. Ki main waqt ke sath aur zimmedar banunga, aur aap dono ki har ek umeed par khara utrunga. 🛡️",
      "4. Mummy se ek choti si request: Please mujhe merse chote prani Mayank Sharma se compare na kare, main 'Limited Edition' piece hoon aur wo to mera junior hai! 😂",
      "5. Main promise karta hoon ki har semester mein atleast ek 'Friends Trip' zaroor jaunga... kyunki agar maine dimaag refresh nahi kiya, toh coding karte-karte kahin main hi 'system hang' na ho jaun! 🏔️😂",
      "Ek hi promise likha hai uppr aur mai choose krta hu 5 promise wuhuuu yay! 🎉 ",
      "Mjk-Mjk sare promise krra hu "
    ],
    btnText: "Mummy-Papa Sign Here (Accept) 🖋️"
  },
  stage6: {
    title: "Presenting You Your Happy Moments 📸 bas itni hi photos thi mere pass 🙏",
    photos: [
      { 
        id: 1, 
        src: "/assets/Screenshot 2026-05-20 173527.png", 
        title: "Mummy Papa", 
        caption: "Life Partners, My Heroes ❤️" 
      },
      { 
        id: 2, 
        src: "/assets/IMG20251021193341.jpg", 
        title: "Pooja Time", 
        caption: "Ghar ki Roshni, Sukoon aur Pyar ek frame mai ✨" 
      },
      { 
        id: 3, 
        src: "/assets/IMG-20260512-WA0002.jpg", 
        title: "Family Celebration", 
        caption: "The OG Vibe Creators (Family Edition) 😂" 
      },
      { 
        id: 4, 
        src: "/assets/IMG20251214112222.jpg", 
        title: "Mandir Visit", 
        caption: "Spiritual bond and peaceful moments 🙏" 
      },
      { 
        id: 5, 
        src: "/assets/IMG20260511194708.jpg", 
        title: "With Mummy", 
        caption: "Mumma's Boy Forever 👑" 
      },
      { 
        id: 6, 
        src: "/assets/IMG_20260510_005321.jpg", 
        title: "Divine Blessings 🔔", 
        caption: "live HD dharshan of Mandir and bhagwan ek sath ✨" 
      }
    ]
  },
  
  thankUPage: {
    title: "Forever Bonded! 🥂✨",
    subtitle: "My Ultimate Greatest Support System ❤️",
    cards: [
      { 
        emoji: "🛡️", 
        title: "Ultimate Shield", 
        desc: "Duniya ki kisi bhi problem se bachaane wale meri personal Z+ security." 
      },
      { 
        emoji: "🏦", 
        title: "24/7 ATM 🤑", 
        desc: "Mera personal bank, jahan se hamesha pyaar, support aur sabse zaroori—unlimited PAISA (pocket money) milta hai! Aur sabse badiya baat? Is ATM mein kabhi 'No Cash' ka board nahi lagta, bas kabhi-kabhi 'Padhai kaisi chal rhi hai?' ka security check aata hai! 💸😂" 
      },
      { 
        emoji: "🧭", 
        title: "Life Navigators", 
        desc: "Bina Google Maps ke bhi meri life ko humesha sahi raste par laane wale best guides." 
      }
    ],
    note: "Thank you for being the most amazing family ever! Aapki daant, pyaar, aur support ne hi mujhe yahan tak laya hai. No refunds, no exchanges — you're LOCKED with me forever! 🔐❤️"
  }
};
// ... (FAMILY_APP_DATA code khatam hone ke baad) ...

// Yahan paste karo yeh function:
   function TypewriterText({ text, onComplete }) {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    setDisplayedText(""); // Har baar fresh start karega
    let i = 0;
    
    const interval = setInterval(() => {
      // Prev state append karne ke bajaye directly slice use kar rahe hain (Loop prevention)
      setDisplayedText(text.slice(0, i + 1));
      i++;
      
      if (i >= text.length) {
        clearInterval(interval);
        if (onComplete) {
          onComplete(); // Sirf ek baar trigger hoga
        }
      }
    }, 15); // Typing speed
    
    return () => clearInterval(interval);
  }, [text]); // onComplete ko hataya taaki parent render par effect restart na ho
  
  return <div className="whitespace-pre-line">{displayedText}</div>;
}

// Ab yahan se tumhara App function start hoga
  // ... tumhara baki code ...

// Custom Typewriter Audio Synthesizer (Pure Web Audio API)
const playTypewriterSound = (isMuted) => {
  if (isMuted) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(600 + Math.random() * 400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.03);
    
    gain.gain.setValueAtTime(0.015, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  } catch (e) {
    // Suppressed
  }
};

export function FamilyTribute() {
  const [stage, setStage] = useState(1);
  // Line 264 ke aas-paas jahan baaki states hain
    const [isTypingDone, setIsTypingDone] = useState(false);
  
  // Modals & Sub-state Management
  const [showCryingModal, setShowCryingModal] = useState(false);
  const [showAngryModal, setShowAngryModal] = useState(false);
  const [showRevealModal, setShowRevealModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizModalType, setQuizModalType] = useState(null);
  const [showStage5Seal, setShowStage5Seal] = useState(false);
  const [revealChoice, setRevealChoice] = useState(null); // 'yes' | 'no'
  const [timelineIndex, setTimelineIndex] = useState(0);
  const [timelineDirection, setTimelineDirection] = useState(1); // 1 = right, -1 = left
  
  // Stage 5 Terminal Typing States
  const [showTerminal, setShowTerminal] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Stage 7 Lightbox States
  const [lightboxPhoto, setLightboxPhoto] = useState(null); // photo object or null
  const [heartBurst, setHeartBurst] = useState(0);
  const [imageErrors, setImageErrors] = useState({}); // id: boolean
  
  // Custom Background Floating Hearts/Sparkles
  const [floatingItems, setFloatingItems] = useState([]);
  
  // Polaroid fallback flag (True if main image fails to load)
  const [imageError, setImageError] = useState(false);
  
  const terminalEndRef = useRef(null);

  // Initialize background floating elements
  useEffect(() => {
    const symbols = ["🌸", "✨", "❤️", "💖"];
    
    // Quantity 18 se badha kar 45 kar di (Zyada density ke liye)
    const items = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100 + 100, // starts below screen
      scale: Math.random() * 0.8 + 0.5,
      
      // Delay kam kar diya taaki screen par jaldi pop hona shuru ho jaye (0 to 5 seconds)
      delay: Math.random() * 5, 
      
      // Duration kam kar di taaki speed FAST ho jaye (Pehle 8-20s tha, ab 5-11s hai)
      duration: Math.random() * 6 + 5, 
      
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
    }));
    
    setFloatingItems(items);
  }, []);

  // Stage 1 Auto transition
  // Handle Stage 5 Terminal Character Streaming
  useEffect(() => {
    if (showTerminal && stage === 5) {
      setIsTyping(true);
      setTypedText("");
      const letter = FAMILY_APP_DATA.bondHub.terminalLetter;
      let currentIndex = 0;
      
      const interval = setInterval(() => {
        if (currentIndex < letter.length) {
          setTypedText((prev) => prev + letter[currentIndex]);
          playTypewriterSound(isMuted);
          currentIndex++;
          
          if (terminalEndRef.current) {
            terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          clearInterval(interval);
          setIsTyping(false);
          triggerPremiumConfetti();
        }
      }, 35);

      return () => clearInterval(interval);
    }
  }, [showTerminal, stage]);

  const triggerPremiumConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ["#FF4D6D", "#FFE5EC", "#D90429", "#FF85A1"]
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ["#FF4D6D", "#FFE5EC", "#D90429", "#FF85A1"]
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const triggerRainbowBurst = () => {
    const colors = ["#ff0000", "#ffa500", "#ffff00", "#008000", "#0000ff", "#4b0082", "#ee82ee"];
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 18,
        angle: 60,
        spread: 70,
        startVelocity: 45,
        origin: { x: 0, y: 0.7 },
        colors
      });
      confetti({
        particleCount: 18,
        angle: 120,
        spread: 70,
        startVelocity: 45,
        origin: { x: 1, y: 0.7 },
        colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const triggerHeartConfetti = () => {
    const defaults = { spread: 360, ticks: 100, gravity: 0.8, decay: 0.94, startVelocity: 30, colors: ["#FF4D6D", "#D90429", "#FF85A1"] };
    confetti({ ...defaults, particleCount: 60, scalar: 1.3 });
    confetti({ ...defaults, particleCount: 40, scalar: 0.9 });
  };

  useEffect(() => {
    if (heartBurst > 0) {
      const timer = window.setTimeout(() => setHeartBurst(0), 1200);
      return () => window.clearTimeout(timer);
    }
  }, [heartBurst]);
  // Automatically trigger confetti on every stage change
  useEffect(() => {
    // Stage 1 (Intro) par automatic confetti nahi chalayenge, baki sab par chalega
    if (stage > 1) {
      // Har page change par mix premium aur heart confetti trigger hoga
      triggerHeartConfetti();
      
      // Alternate pages par bada burst dene ke liye
      if (stage === 2 || stage === 5 || stage === 7) {
        triggerRainbowBurst();
      } else {
        triggerPremiumConfetti();
      }
    }
  }, [stage]); // Yeh line ensure karti hai ki jab bhi stage badle, confetti chale

  // Stage 4 slider transition handlers
  const handleTimelineNext = () => {
    if (timelineIndex < FAMILY_APP_DATA.timeline.length - 1) {
      setTimelineDirection(1);
      setTimelineIndex((prev) => prev + 1);
    }
  };

  const handleTimelinePrev = () => {
    if (timelineIndex > 0) {
      setTimelineDirection(-1);
      setTimelineIndex((prev) => prev - 1);
    }
  };

  // Handling Image Errors in Stage 7
  const handleGalleryImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  // Timeline Slide Animation Variants
  const timelineSlideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 260, damping: 25 },
        opacity: { duration: 0.25 }
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 260, damping: 25 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <div 
      onClick={(e) => {
        // Jab user kahin bhi click karega, us jagah se canvas-confetti burst hoga
        confetti({
          particleCount: 12,
          spread: 30,
          origin: { 
            x: e.clientX / window.innerWidth, 
            y: e.clientY / window.innerHeight 
          },
          colors: ["#FF4D6D", "#D90429", "#FF85A1"],
          // Chote chote hearts ki tarah particles lene ke liye shapes property (optional)
          scalar: 1.1
        });
      }}
      className="relative min-h-screen w-full select-none overflow-hidden font-sans bg-[#FFE5EC]"
    >
      <style>{`
        .glass-panel {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.14);
          border-radius: 32px;
        }
        .floating-elements-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }
        .page-container {
          min-height: 100vh;
          padding: 3rem 1.25rem;
          position: relative;
          z-index: 1;
        }
        .paper-panel {
          background: linear-gradient(180deg, rgba(245,230,202,0.95) 0%, rgba(245,230,202,0.92) 40%, rgba(239,219,176,0.92) 100%);
          border: 2px solid rgba(163, 119, 66, 0.8);
          box-shadow: 0 35px 70px rgba(116, 70, 34, 0.12);
          border-radius: 32px;
          background-image: radial-gradient(circle at top left, rgba(255,255,255,0.35), transparent 25%),
            radial-gradient(circle at bottom right, rgba(255,255,255,0.15), transparent 15%);
        }
        .seal-stamp {
          border: 2px dashed rgba(163, 119, 66, 0.6);
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(4px);
        }
      `}</style>
      
      {/* 🌸 FLOATING PASTEL BACKGROUND ELEMENTS 🌸 */}
      <div className="floating-elements-container">
        {floatingItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ y: "110vh", x: `${item.x}vw`, scale: item.scale, opacity: 0.15 }}
            animate={{
              y: "-15vh",
              opacity: [0.15, 0.45, 0.45, 0],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: "linear",
            }}
            className="absolute text-xl md:text-2xl"
          >
            {item.symbol}
          </motion.div>
        ))}
      </div>

      {/* Main Single Page Container */}
      <div className="page-container max-w-4xl mx-auto flex flex-col justify-center items-center">
        
        <AnimatePresence mode="wait">
          
          {/* STAGE 1: INTRO */}
          {stage === 1 && (
            <motion.div
              key="stage1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -500, rotate: -5, transition: { duration: 0.6, ease: "easeIn" } }}
              className="text-center w-full max-w-xl px-4"
            >
              <div className="glass-panel rounded-3xl p-8 shadow-2xl border-2 border-pink-200">
                <motion.h1 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="font-heading text-3xl md:text-5xl font-black tracking-tight text-[#D90429] mb-8 leading-snug"
                >
                  {FAMILY_APP_DATA.stage1.text}
                </motion.h1>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setStage(2)}
                  className="w-full sm:w-auto px-10 py-4 bg-[#FF4D6D] hover:bg-[#D90429] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 mx-auto text-lg"
                >
                  <span>{FAMILY_APP_DATA.stage1.btn}</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STAGE 2: THE GRAND REVEAL */}
          {stage === 2 && (
            <motion.div
              key="stage2"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -50, transition: { duration: 0.4 } }}
              className="w-full max-w-lg text-center"
            >
              <div className="glass-panel rounded-3xl p-6 md:p-10 shadow-2xl relative">
                
                {/* Polaroid Photo Frame */}
                <motion.div 
                  initial={{ rotate: -2 }}
                  whileHover={{ rotate: 1, scale: 1.02 }}
                  className="bg-white p-3 pb-8 rounded-lg shadow-xl inline-block w-full max-w-sm mx-auto border border-pink-100/30 transform transition-transform duration-300 relative z-10"
                >
                  <div className="relative aspect-[4/5] bg-[#FFE5EC] overflow-hidden rounded shadow-inner flex items-center justify-center group">
                    <img 
                      src={FAMILY_APP_DATA.stage2.mainImage} 
                      alt="Mummy Papa" 
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://via.placeholder.com/150"; }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </motion.div>

                {/* Reveal Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowRevealModal(true)}
                  className="mt-8 w-full sm:w-auto px-8 py-4 bg-[#FF4D6D] hover:bg-[#D90429] text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-lg mx-auto"
                >
                  <Sparkles className="w-5 h-5 animate-pulse" />
                  <span>{FAMILY_APP_DATA.stage2.btnReveal}</span>
                </motion.button>
              </div>

              {/* 🌟 REVEAL MODAL OVERLAY 🌟 */}
              <AnimatePresence>
                {showRevealModal && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm"
                  >
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 280, damping: 22 } }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border-2 border-pink-300 relative overflow-hidden"
                    >
                      {/* Inner background glow */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#FFE5EC] to-transparent opacity-50 -z-10" />
                      
                      <h2 className="font-heading text-3xl font-black text-[#D90429] mb-3 leading-tight">
                        {FAMILY_APP_DATA.stage2.modal.title}
                      </h2>
                      
                      <h3 className="font-bold text-[#3d1b24] text-xl mb-1">
                        {FAMILY_APP_DATA.stage2.modal.names}
                      </h3>
                      
                      <p className="text-pink-500 text-xs font-bold mb-8 uppercase tracking-widest">
                        {FAMILY_APP_DATA.stage2.modal.tag}
                      </p>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setShowRevealModal(false);
                          setStage(3); // Moves to Stage 3 when ready
                        }}
                        className="w-full py-3.5 bg-gradient-to-r from-[#FF4D6D] to-[#D90429] text-white font-extrabold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <span>{FAMILY_APP_DATA.stage2.modal.btnNext}</span>
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* STAGE 3: GHAR KA ASLI BOSS QUIZ */}
          {stage === 3 && (
            <motion.div
              key="stage3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
              className="w-full max-w-xl text-center"
            >
              <div className="glass-panel rounded-3xl p-8 shadow-2xl relative">
                <h2 className="font-heading text-3xl md:text-4xl font-black text-[#3d1b24] mb-8 leading-tight">
                  {FAMILY_APP_DATA.stage3.question}
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      setQuizModalType("error");
                      setShowQuizModal(true);
                    }}
                    className="px-6 py-5 bg-white/80 border border-pink-100 text-[#3d1b24] font-semibold rounded-3xl shadow-lg hover:bg-white transition-all"
                  >
                    {FAMILY_APP_DATA.stage3.option1}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      setQuizModalType("success");
                      setShowQuizModal(true);
                    }}
                    className="px-6 py-5 bg-gradient-to-r from-[#FF4D6D] to-[#D90429] text-white font-semibold rounded-3xl shadow-lg hover:shadow-xl transition-all"
                  >
                    {FAMILY_APP_DATA.stage3.option2}
                  </motion.button>
                </div>
              </div>

              <AnimatePresence>
                {showQuizModal && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm"
                  >
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 280, damping: 22 } }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="glass-panel relative overflow-hidden rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-white/60 bg-white/40"
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#FFE5EC] to-transparent opacity-40 -z-10" />

                      <p className="text-lg md:text-xl font-bold text-[#3d1b24] mb-8 leading-relaxed">
                        {quizModalType === "error"
                          ? FAMILY_APP_DATA.stage3.errorModal.text
                          : FAMILY_APP_DATA.stage3.successModal.text}
                      </p>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => {
                          if (quizModalType === "success") {
                            setStage(4);
                          }
                          setShowQuizModal(false);
                          setQuizModalType(null);
                        }}
                        className="w-full px-6 py-4 bg-[#FF4D6D] hover:bg-[#D90429] text-white font-extrabold rounded-2xl shadow-lg transition-all"
                      >
                        {quizModalType === "error"
                          ? FAMILY_APP_DATA.stage3.errorModal.btn
                          : FAMILY_APP_DATA.stage3.successModal.btn}
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* STAGE 4: MUMMY'S SIGNATURE DIALOGUE QUIZ */}
          {stage === 4 && (
            <motion.div
              key="stage4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.35 } }}
              className="w-full max-w-2xl px-4"
            >
              <div className="glass-panel rounded-3xl p-8 shadow-2xl text-center">
                <h2 className="font-heading text-3xl md:text-4xl font-black text-[#3d1b24] mb-8 leading-tight">
                  {FAMILY_APP_DATA.stage4.question}
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  {FAMILY_APP_DATA.stage4.options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        setQuizModalType("success");
                        setShowQuizModal(true);
                      }}
                      className="rounded-3xl p-5 bg-white/80 border border-pink-100 text-left text-sm md:text-base text-[#3d1b24] font-semibold shadow-lg hover:bg-white transition-all"
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {showQuizModal && quizModalType === "success" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm"
                  >
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 280, damping: 22 } }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="glass-panel relative overflow-hidden rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-white/60 bg-white/40"
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#FFE5EC] to-transparent opacity-40 -z-10" />

                      <p className="text-lg md:text-xl font-bold text-[#3d1b24] mb-8 leading-relaxed">
                        {FAMILY_APP_DATA.stage4.successModal.text}
                      </p>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => {
                          setStage(5);
                          setShowQuizModal(false);
                          setQuizModalType(null);
                        }}
                        className="w-full px-6 py-4 bg-[#FF4D6D] hover:bg-[#D90429] text-white font-extrabold rounded-2xl shadow-lg transition-all"
                      >
                        {FAMILY_APP_DATA.stage4.successModal.btn}
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* STAGE 5: THE DIGITAL PROMISE */}
          {/* STAGE 5: THE DIGITAL PROMISE */}
          {stage === 5 && (
            <motion.div
              key="stage5"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
              className="w-full max-w-2xl px-4 text-center"
            >
              <div className="paper-panel rounded-[36px] p-8 md:p-10 shadow-2xl border-2 border-[#A17543]/80 relative overflow-hidden font-serif">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.2),transparent_20%)] pointer-events-none opacity-80"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#F2D2A0]/90 text-[#7A4C2F] font-semibold rounded-full border border-[#A17543]/40 text-sm shadow-sm mb-6">
                    📜 Official Family Promise
                  </span>

                  <h2 className="font-heading text-4xl md:text-5xl text-[#5F3E24] font-black mb-8 leading-tight">
                    {FAMILY_APP_DATA.stage5.title}
                  </h2>

                  {/* 1. Image Center - Fixed Size */}
                  <div className="w-full max-w-[300px] mb-8 rounded-3xl overflow-hidden border border-[#D6B083]/70 shadow-inner bg-[#F7E7C3]">
                    <img
                      src={FAMILY_APP_DATA.stage5.familyPhoto}
                      alt="Family Photo"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://via.placeholder.com/150"; }}
                      className="w-full h-auto object-cover"
                    />
                  </div>

                  {/* 2. Typewriter Style Text Area */}
                  <div className="w-full text-left bg-[#FBF1DF]/90 p-6 rounded-3xl border border-[#DCB786]/70">
                    <div className="space-y-4 text-sm md:text-base text-[#4E3620] leading-relaxed font-mono">
                      <TypewriterText 
                        text={FAMILY_APP_DATA.stage5.contractText.join("\n\n")} 
                        onComplete={() => setIsTypingDone(true)} 
                      />
                    </div>
                  </div>

                  {/* Button sirf tab dikhega jab typing khatam hogi */}
                  {isTypingDone && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { setShowStage5Seal(true); triggerRainbowBurst(); }}
                      className="mt-8 px-8 py-4 bg-[#A5692F] hover:bg-[#8C5A27] text-white font-extrabold rounded-3xl shadow-2xl text-lg"
                    >
                      {FAMILY_APP_DATA.stage5.btnText}
                    </motion.button>
                  )}
                </div>
              </div>

              {/* 🌟 YEH RAHA TUMHARA MISSING POPUP (SEAL MODAL) 🌟 */}
              <AnimatePresence>
                {showStage5Seal && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm"
                  >
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 24 } }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="bg-[#F8ECD5] relative overflow-hidden rounded-3xl p-8 max-w-sm w-full text-center border-4 border-[#A5692F] shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,230,202,0.7),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.15),transparent_15%)] pointer-events-none"></div>
                      <div className="relative z-10">
                        <div className="mx-auto mb-6 w-28 h-28 rounded-full bg-[#A5692F]/10 border-2 border-[#A5692F] flex items-center justify-center text-5xl shadow-inner">
                          🔐
                        </div>
                        <h3 className="font-heading text-3xl font-black text-[#5F3E24] mb-4">
                          Official Seal
                        </h3>
                        <p className="text-[#4E3620] leading-relaxed mb-6 text-sm md:text-base">
                          Contract Signed. The family promise has been officially accepted and sealed.
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            setShowStage5Seal(false);
                            setStage(6); // Yeh tumhe seedha Gallery par bhej dega
                          }}
                          className="w-full px-6 py-4 bg-[#A5692F] hover:bg-[#8C5A27] text-white font-black rounded-3xl shadow-lg transition-all"
                        >
                          Continue to Next Page
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {stage === 6 && (
            <motion.div
              key="stage6"
              initial={{ opacity: 0, scale: 0.95, y: 55 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -55, transition: { duration: 0.3 } }}
              className="w-full max-w-3xl px-4 text-center space-y-6"
            >
              {/* Heading */}
              <div>
                <motion.div 
                  animate={{ rotate: [0, 2, -2, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#FFC2D1] text-[#D90429] font-extrabold rounded-full text-xs tracking-wider shadow-sm"
                >
                  <Camera className="w-4 h-4 text-[#D90429]" />
                  <span>Premium Family Gallery</span>
                </motion.div>
                <h2 className="font-heading text-4xl md:text-5xl font-black text-[#3d1b24] mt-3">
                  {FAMILY_APP_DATA.stage6.title}
                </h2>
                <p className="text-xs md:text-sm text-[#3d1b24] opacity-75 mt-1 font-medium">
                  {FAMILY_APP_DATA.stage6.subtitle}
                </p>
              </div>

              {/* 📸 Interactive Polaroid Grid 📸 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4 max-w-4xl mx-auto justify-items-center">
                {FAMILY_APP_DATA.stage6.photos.map((photo) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: photo.id * 0.1, type: "spring", stiffness: 80 }}
                    whileHover={{ 
                      scale: 1.03, 
                      rotate: photo.id % 2 === 0 ? 1 : -1,
                      boxShadow: "0 20px 40px rgba(255, 77, 109, 0.12)"
                    }}
                    onClick={() => setLightboxPhoto(photo)}
                    className="bg-white p-4 pb-6 rounded-2xl shadow-lg border border-pink-100/30 cursor-zoom-in transform transition-all duration-300 flex flex-col relative group"
                  >
                    
                    {/* Tilt Indicator Icon */}
                    <div className="absolute top-6 right-6 z-20 bg-white/80 backdrop-blur-md p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Maximize2 className="w-3.5 h-3.5 text-[#FF4D6D]" />
                    </div>

                    {/* Image Box */}
                    <div className="relative aspect-[4/5] bg-[#FFE5EC] overflow-hidden rounded shadow-inner flex items-center justify-center">
                      {imageErrors[photo.id] ? (
                        <div className="w-full h-full flex flex-col justify-center items-center p-6 text-center bg-gradient-to-tr from-[#FFC2D1] to-[#FFE5EC]">
                          <Heart className="w-12 h-12 text-[#FF4D6D] fill-[#FF4D6D] mb-3 animate-pulse" />
                          <span className="font-heading text-lg font-bold text-[#FF4D6D]">
                            {photo.title}
                          </span>
                          <p className="text-[10px] text-[#3d1b24] opacity-60 mt-1">
                            Save image at:<br/>
                            <code className="bg-white/60 text-[#D90429] px-1 py-0.5 rounded text-[8px]">public{photo.src}</code>
                          </p>
                        </div>
                      ) : (
                        <img 
                          src={photo.src} 
                          alt={photo.title}
                          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://via.placeholder.com/150"; handleGalleryImageError(photo.id); }}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>

                    <div className="mt-4 text-left">
                      <h4 className="font-heading text-lg font-bold text-[#3d1b24] truncate">
                        {photo.title}
                      </h4>
                      <p className="text-xs text-[#3d1b24] opacity-65 truncate mt-0.5">
                        {photo.caption}
                      </p>
                    </div>

                  </motion.div>
                ))}
              </div>

              <div className="pt-10 pb-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-pink-200/50">
                <motion.button
                  whileHover={{ x: -3 }}
                  onClick={() => setStage(5)}
                  className="px-6 py-2.5 bg-white/70 border border-pink-200 hover:bg-[#FFE5EC]/30 text-[#3d1b24] font-semibold rounded-xl text-xs md:text-sm flex items-center gap-1.5 transition-all shadow-sm w-full sm:w-auto justify-center"
                >
                  <ArrowLeft className="w-4 h-4 text-pink-600" />
                  <span>Back to Promise</span>
                </motion.button>

                <div className="text-center">
                  <h3 className="font-heading text-xl md:text-2xl text-[#D90429] font-black tracking-wide animate-pulse">
                    Aapki Family Moments, ek premium frame mein.
                  </h3>
                </div>

                <motion.button
                  whileHover={{ x: 3 }}
                  onClick={() => setStage(7)}
                  className="px-6 py-2.5 bg-[#FF4D6D] text-white font-bold rounded-xl text-xs md:text-sm flex items-center gap-1.5 transition-all shadow-sm w-full sm:w-auto justify-center"
                >
                  <span>Finish 🎉</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>

            </motion.div>
          )}

          {/* STAGE 7: FINAL THANK YOU NOTE WITH FLASHCARDS */}
          {stage === 7 && (
            <motion.div
              key="stage7"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
              className="w-full max-w-4xl px-4 text-center space-y-8"
            >
              <div className="glass-panel rounded-3xl p-6 md:p-10 shadow-2xl border border-pink-200/60">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFF1F3] text-[#D90429] font-bold rounded-full text-xs uppercase tracking-[0.18em] shadow-sm mb-4">
                  <Sparkles className="w-4 h-4 text-[#FF85A1]" />
                  Final Thank You
                </span>

                <h2 className="font-heading text-4xl md:text-5xl font-black text-[#3d1b24] mb-2">
                  {FAMILY_APP_DATA.thankUPage.title}
                </h2>
                <p className="text-sm md:text-lg text-[#FF4D6D] font-bold mb-8">
                  {FAMILY_APP_DATA.thankUPage.subtitle}
                </p>

                {/* 🌟 THE FLASHCARDS SECTION 🌟 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
                  {FAMILY_APP_DATA.thankUPage.cards.map((card, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.2, type: "spring", stiffness: 100 }}
                      whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(255, 77, 109, 0.15)" }}
                      className="bg-white rounded-3xl p-6 shadow-lg border border-pink-100 flex flex-col gap-4 cursor-pointer"
                    >
                      <div className="text-4xl bg-pink-50 w-16 h-16 flex items-center justify-center rounded-2xl shadow-inner">
                        {card.emoji}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#D90429] text-xl mb-2">{card.title}</h4>
                        <p className="text-sm text-[#3d1b24] opacity-80 leading-relaxed">{card.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-white/60 p-6 rounded-2xl border border-pink-100 shadow-sm mb-8">
                  <p className="text-sm md:text-base text-[#3d1b24] leading-relaxed md:px-4 whitespace-pre-line font-medium">
                    {FAMILY_APP_DATA.thankUPage.note}
                  </p>
                </div>

                {/* BOTTOM BUTTONS */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setStage(6)}
                    className="w-full sm:w-auto px-6 py-3.5 bg-white border-2 border-pink-200 text-[#3d1b24] font-bold rounded-2xl shadow-sm hover:bg-[#FFF5F7] transition flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Gallery
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      triggerHeartConfetti();
                      setStage(1);
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 bg-[#FF4D6D] text-white font-bold rounded-2xl shadow-lg hover:bg-[#D90429] transition flex items-center justify-center gap-2"
                  >
                    <PartyPopper className="w-5 h-5" />
                    Replay Journey
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
{/* ... TUMHARA STAGE 7 KA CODE UPAR HAI ... */}
          
          </AnimatePresence> {/* Yeh main stages wale AnimatePresence ko close karta hai */}

      </div> {/* Yeh page-container wale div ko close karta hai */}

      {/* ==========================================
          🚨 GALLERY FULLSCREEN LIGHTBOX 🚨
          ========================================== */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md"
          >
            {/* Close trigger overlaying the background */}
            <div className="absolute inset-0 -z-10 cursor-zoom-out" onClick={() => setLightboxPhoto(null)} />

            {/* Top Bar info */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center text-white z-50 max-w-4xl mx-auto w-full">
              <div className="text-left font-mono">
                <span className="text-xs text-pink-400 uppercase tracking-widest font-bold">Image Zoom Mode</span>
                <h4 className="text-lg md:text-xl font-bold truncate text-pink-50">{lightboxPhoto.title}</h4>
              </div>
              
              <button 
                onClick={() => setLightboxPhoto(null)}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Central Polaroid Frame */}
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0, transition: { type: "spring", damping: 25 } }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-white p-4 pb-6 rounded-2xl max-w-md w-full shadow-2xl relative border border-white/10 mt-12 text-left"
            >
              <div className="aspect-[4/5] bg-pink-50 rounded overflow-hidden shadow-inner flex items-center justify-center">
                {imageErrors[lightboxPhoto.id] ? (
                  <div className="w-full h-full flex flex-col justify-center items-center p-6 text-center bg-gradient-to-tr from-[#FFC2D1] to-[#FFE5EC]">
                    <Heart className="w-16 h-16 text-[#FF4D6D] fill-[#FF4D6D] mb-3 animate-bounce" />
                    <span className="font-heading text-xl font-bold text-[#FF4D6D]">{lightboxPhoto.title}</span>
                  </div>
                ) : (
                  <img 
                    src={lightboxPhoto.src} 
                    alt={lightboxPhoto.title}
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://via.placeholder.com/150"; handleGalleryImageError(lightboxPhoto.id); }}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="mt-4 font-heading">
                <h3 className="text-xl font-black text-[#3d1b24]">{lightboxPhoto.title}</h3>
                <p className="text-xs md:text-sm text-zinc-600 mt-1 leading-relaxed">{lightboxPhoto.caption}</p>
              </div>
            </motion.div>
            
            {/* Confetti Trigger within Lightbox */}
            <button
              onClick={() => {
                setHeartBurst((prev) => prev + 1);
                triggerHeartConfetti();
              }}
              className="mt-6 px-6 py-2.5 bg-[#FF4D6D] hover:bg-[#D90429] text-white font-extrabold text-xs rounded-xl shadow-lg transition-all"
            >
              Trigger Hearts on Photo! 💖
            </button>
            {heartBurst > 0 && (
              <div className="pointer-events-none absolute inset-x-0 bottom-28 flex justify-center gap-2">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: -140, opacity: [0, 1, 0] }}
                    transition={{ duration: 1.2, delay: idx * 0.08 }}
                    className="text-2xl md:text-3xl"
                  >
                    ❤️
                  </motion.span>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default FamilyTribute;