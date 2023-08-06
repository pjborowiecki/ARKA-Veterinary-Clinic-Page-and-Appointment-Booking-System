import { aboutSectionParagraphs } from "@/data/promo-text"

import { Shell } from "@/components/shells/shell"

export function AboutSection() {
  return (
    <Shell as="section" variant="landingFullWidth">
      {/* Section content */}
      <Shell
        as="div"
        variant="landingConstrained"
        className="mt-[48px] flex flex-col-reverse md:my-[32px] md:grid md:grid-cols-2"
      >
        {/* Left-hand side */}
        <div className="flex items-center justify-center">
          <img
            src="/images/about-image.png"
            className="my-[24px] h-full w-full scale-[0.8] object-contain md:my-[0px]"
            alt="A female veterinarian smiling with a dog"
          />
        </div>

        {/* Right-hand side */}
        <div className="flex flex-col items-center gap-[32px] md:gap-[24px]">
          {/* Section heading */}
          <h2 className="w-[90%] whitespace-nowrap bg-gradient-to-br from-greenGradientFrom to-greenGradientTo bg-clip-text text-center font-[BalooTamma] font-bold leading-[1.05] md:text-start ">
            <span className="text-[12vw] text-transparent md:text-[5.8vw] w-1400:text-[80px]">
              Pasja i wiedza,{" "}
            </span>
            <br />
            <span className="text-[11vw] text-transparent md:text-[3.1vw] w-1400:text-[43px]">
              przekazywane od pokoleń
            </span>
          </h2>

          {/* Section paragraphs */}
          <div className="flex w-[74%] flex-col gap-[32px] text-center md:w-[90%] md:gap-[24px] md:pr-[20%] md:text-start w-1400:pr-[28%]">
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
      </Shell>

      {/* Bottom wave pattern */}
      <div className="w-full">
        <img
          src="/images/svg/about-bottom-wave.svg"
          className="h-full w-full object-cover"
          alt="About section bottom wave pattern"
        />
      </div>
    </Shell>
  )
}
