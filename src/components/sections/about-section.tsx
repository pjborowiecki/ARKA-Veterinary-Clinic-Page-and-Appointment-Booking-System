import { aboutSectionParagraphs } from "@/data/promo-text"

import { Shell } from "@/components/shells/shell"

export function AboutSection() {
  return (
    <section id="about" className="w-full max-w-[2560px]">
      {/* Section content */}
      <div className="mx-auto mt-12 flex w-full max-w-[1440px] flex-col-reverse overflow-hidden px-5 md:my-8 md:grid md:grid-cols-2 md:px-6 lg:px-7">
        {/* Left-hand side */}
        <div className="flex items-center justify-center">
          <img
            src="/images/about-image.png"
            className="my-6 h-full w-full scale-[0.8] object-contain md:my-0 md:scale-[0.85]"
            alt="A female veterinarian smiling with a dog"
          />
        </div>

        {/* Right-hand side */}
        <div className="flex flex-col items-center gap-8 md:gap-6">
          {/* Section heading */}
          <h2 className="w-[90%] bg-gradient-to-br from-greenGradientFrom to-greenGradientTo bg-clip-text text-center font-[BalooTamma] font-bold leading-[1.05] md:text-start ">
            <span className="text-[12vw] text-transparent md:text-[5.8vw] w-1400:text-[80px]">
              Pasja i wiedza,{" "}
            </span>
            <br />
            <span className="text-[11vw] text-transparent md:text-[3.1vw] w-1400:text-[43px]">
              przekazywane od pokoleń
            </span>
          </h2>

          {/* Section paragraphs */}
          <div className="flex w-[74%] flex-col gap-8 text-center md:ml-[20%] md:w-[90%] md:gap-6 md:pr-[23%] md:text-start lg:pr-[25%] xl:pr-[28%] w-1400:pr-[34%]">
            {aboutSectionParagraphs?.map((paragraph, index) => (
              <p
                key={index}
                className="text-[4.8vw] leading-[150%] text-lightSectionText md:text-[1.7vw] w-1400:text-[22px]"
              >
                {paragraph.content}
              </p>
            ))}
            <p className="font-[BalooTamma] text-[7.6vw] font-medium md:text-[4vw] w-1400:text-[56px]">
              <span className="bg-gradient-to-br from-greenGradientFrom to-greenGradientTo bg-clip-text text-transparent">
                Zapraszamy!
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom wave pattern */}
      <div className="w-full">
        <img
          src="/images/svg/about-bottom-wave.svg"
          className="h-full w-full object-cover"
          alt="About section bottom wave pattern"
        />
      </div>
    </section>
  )
}
