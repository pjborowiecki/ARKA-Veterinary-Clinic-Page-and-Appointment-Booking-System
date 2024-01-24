import { Body } from "@react-email/body"
import { Head } from "@react-email/head"
import { Html } from "@react-email/html"
import { Preview } from "@react-email/preview"
import { Tailwind } from "@react-email/tailwind"

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
  email,
  phone,
  message,
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
