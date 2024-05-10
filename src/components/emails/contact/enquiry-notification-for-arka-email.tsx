import { Body, Head, Html, Preview, Tailwind } from "@react-email/components"

interface EnquiryNotificationForArkaEmailProps {
  firstName: string
  lastName: string
  email: string
  phone: string
  message?: string
}

export function EnquiryNotificationForArkaEmail({
  firstName,
  lastName,
}: EnquiryNotificationForArkaEmailProps): JSX.Element {
  const previewText = `${firstName} ${lastName} przesyła zapytanie z formularza kontaktowego>`

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
