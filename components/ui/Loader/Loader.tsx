import Image from "next/image";

const Loader = () => {
  return (
    <div className="min-h-screen flex flex-col space-y-4 items-center justify-center">
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="w-24 animate-float">
          <Image
            src="/logo_dragon.svg"
            alt="Opositandos Logo"
            width={260}
            height={60}
            className="rounded-full"
          />
        </div>
        <div className="flex space-x-2 mt-5">
          {["dot-1", "dot-2", "dot-3", "dot-4", "dot-5"].map((id, i) => (
            <div
              key={id}
              className="w-3.5 h-3.5 rounded-full"
              style={{
                backgroundColor: "#fed835",
                animation: "bounceDot 1s infinite",
                animationDelay: `${i * 0.2}s`,
              }}
            ></div>
          ))}
        </div>

        <style>{`
              @keyframes float {
                0%,
                100% {
                  transform: translateY(0);
                }
                50% {
                  transform: translateY(-10px);
                }
              }
              @keyframes bounceDot {
                0%,
                100% {
                  transform: translateY(0);
                }
                50% {
                  transform: translateY(-8px);
                }
              }
              .animate-float {
                animation: float 2s ease-in-out infinite;
              }
            `}</style>
      </div>
    </div>
  );
};

export default Loader;
