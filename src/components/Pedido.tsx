import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Heart } from "lucide-react";
import bg from "@/assets/romantic-bg.jpg";
import casalAsset from "@/assets/meliodas-elizabeth.jpg";

const serif = { fontFamily: "'Playfair Display', Georgia, serif" } as const;

export function Pedido({ onAceito }: { onAceito: () => void }) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [aceito, setAceito] = useState(false);
  const [simScale, setSimScale] = useState(1);
  const [naoCliques, setNaoCliques] = useState(0);

  const fugir = () => {
    setSimScale((prev) => Math.min(prev + 1, 6));
    setNaoCliques((prev) => prev + 1);

    const maxX = Math.max(20, window.innerWidth - 140);
    const maxY = Math.max(20, window.innerHeight - 80);
    setPos({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    });
  };

  const aceitar = () => {
    setAceito(true);
    setTimeout(onAceito, 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 overflow-hidden bg-background text-foreground"
    >
      <img
        src={casalAsset}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />

      <div className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          {!aceito ? (
            <motion.div
              key="pergunta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <Heart fill="currentColor" className="mb-6 h-10 w-10 text-primary" />
              <h1
              className="mt-2 font-serif text-3xl leading-tight sm:text-5xl text-center"
              style={serif}
              >
              Amor,
              <br />
              aceita passar o resto 
              <br />
              da sua vida comigo?
              </h1>

              <p
               className="mt-6 text-center text-lg italic sm:text-xl"
                style={serif}
              >
                Prometo te amar da mesma forma que{" "}
                <span className="text-yellow-300 font-bold drop-shadow-[0_0_12px_#FFD700]">
                  Meliodas
                </span>
                {" "}amou{" "}
                <span className="text-pink-400 font-bold drop-shadow-[0_0_12px_#FF69B4]">
                  Elizabeth
                </span>
                . 
              </p>

              <div className="relative mt-12 flex w-full max-w-sm items-center justify-center gap-4">
                <button
                  onClick={aceitar}
                 style={{
                  position: simScale > 1 ? "fixed" : "relative",
                  top: simScale > 1 ? "50%" : undefined,
                  left: simScale > 1 ? "50%" : undefined,
                  transform: simScale > 1
                    ? `translate(-50%, -50%) scale(${simScale})`
                    : `scale(${simScale})`,
                  transformOrigin: "center",
                  transition: "all 0.3s ease",
                  zIndex: 80,
                }}
                  className="rounded-full bg-primary px-8 py-3 text-base font-semibold text-primary-foreground whitespace-nowrap"
                >
                  SIM ❤️
                </button>

                {naoCliques < 3 && (
                <motion.button
                  onMouseEnter={fugir}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    fugir();
                  }}
                  onClick={() => {}}
                  onFocus={fugir}
                  animate={
                    pos
                      ? { x: pos.x, y: pos.y, position: "fixed" as const, top: 0, left: 0 }
                      : {}
                  }
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="rounded-full border border-primary/40 bg-background/60 px-8 py-3 text-base font-semibold"
                  style={pos ? { position: "fixed", top: 0, left: 0, zIndex: 60 } : undefined}
                >
                  NÃO 😔
                </motion.button>
              )}
  
              </div>
            </motion.div>
            ) : (
            <motion.div
              key="aceito"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <Heart fill="currentColor" className="h-20 w-20 text-primary" />
              </motion.div>
              <p
                className="mt-6 font-serif text-3xl italic text-primary sm:text-5xl"
                style={serif}
              >
                hehehe eu te amoo
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}