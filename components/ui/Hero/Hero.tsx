import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center px-5 pb-0 pt-32 md:pt-40"
    >
      <div className="absolute bottom-0 left-0 top-0 -z-10 w-full">
        <div className="absolute inset-0 h-full w-full bg-hero-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-[rgba(233,238,255,0.5)] to-[rgba(202,208,230,0.5)] backdrop-blur-[2px]"></div>

      <div className="text-center">
        <h1 className="mx-auto max-w-lg text-4xl font-bold text-foreground md:max-w-2xl md:text-6xl md:leading-tight">
          {"heroDetails.heading"}
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-foreground">
          {"heroDetails.subheading"}
        </p>
        <div className="mx-auto mt-6 flex w-fit flex-col items-center sm:flex-row sm:gap-4">
          <Link href={"/"}>
            <button
              type="button"
              className={clsx(
                "mt-3 flex h-14 w-full min-w-[205px] items-center justify-center rounded-full px-6 sm:w-fit",
                {
                  "bg-foreground text-white": true,
                  "bg-white text-foreground": false,
                }
              )}
            >
              <div>
                <div className="text-xs">Coming Soon</div>
                <div className="-mt-1 font-sans text-xl font-semibold">
                  opositandos
                </div>
              </div>
            </button>
          </Link>
        </div>
        <Image
          src={"/hero-mockup.webp"}
          width={384}
          height={340}
          quality={100}
          sizes="(max-width: 768px) 100vw, 384px"
          priority={true}
          unoptimized={true}
          alt="app mockup"
          className="mt relative z-10 mx-auto mt-[12.5rem] md:mt-[9rem]"
        />
      </div>
    </section>
  );
};

export default Hero;
