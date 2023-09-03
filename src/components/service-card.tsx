import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"

interface ServiceCardProps {
  service: {
    title: string
    description?: string
    bulletPoints?: string[]
  }
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="rounded-xl border-none bg-transparent p-[16px] pr-[18%] shadow-none md:mb-0 md:pr-[12%] lg:pr-[2%] lg:hover:scale-[1.1] lg:hover:shadow-xl">
      <CardHeader className="flex flex-row gap-[16px]">
        <Icons.plaster className="hidden min-h-[32px] min-w-[32px] text-peachServicesText md:inline-flex" />
        <CardTitle className="text-[6.3vw] font-bold tracking-wider text-whiteGradientTo md:text-[2.2vw] lg:text-[1.6vw] w-1400:text-[22px]">
          {service.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-[12px] text-[4.8vw] leading-[150%] text-greenServicesText opacity-70 md:pl-[48px] md:text-[1.8vw] w-1400:text-[16px]">
        {service.bulletPoints ? (
          <ul className="flex list-outside list-[square] flex-col gap-[16px] pl-[16px] pr-[4%] md:gap-[8px] md:pr-0">
            {service.bulletPoints?.map((bulletPoint, index) => (
              <li key={index}>{bulletPoint}</li>
            ))}
          </ul>
        ) : (
          <p>{service.description}</p>
        )}
      </CardContent>
    </Card>
  )
}
