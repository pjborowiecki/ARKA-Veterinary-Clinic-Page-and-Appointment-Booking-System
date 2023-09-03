import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

interface EnquiryNotificationForArkaProps {
  name: string
  surname: string
  email: string
  phone: string
  message?: string
}

export default function EnquiryNotificationForArka({
  name,
  surname,
  email,
  phone,
  message,
}: EnquiryNotificationForArkaProps) {
  const previewText = `${name} ${surname} przesyła zapytanie z formularza kontaktowego>`

  return (
    <Html lang="pl">
      <Head>
        <title>Zapytanie z formularza kontatowego</title>
        <Preview>{previewText}</Preview>
      </Head>
      <Tailwind>
        <Body>
          {/* TODO */}
          Nowe zapytanie z formularza kontaktowego przeslane do przychodni ARKA
        </Body>
      </Tailwind>
    </Html>
  )
}
