import * as React from "react"
import { env } from "@/env.mjs"
import { Body } from "@react-email/body"
import { Button } from "@react-email/button"
import { Container } from "@react-email/container"
import { Head } from "@react-email/head"
import { Html } from "@react-email/html"
import { Preview } from "@react-email/preview"
import { Section } from "@react-email/section"
import { Tailwind } from "@react-email/tailwind"
import { Text } from "@react-email/text"

import { siteConfig } from "@/config/site"

interface EmailVerificationEmailProps {
  email: string
  emailVerificationToken: string
}

export function EmailVerificationEmail({
  email,
  emailVerificationToken,
}: Readonly<EmailVerificationEmailProps>): JSX.Element {
  const previewText = `Weryfikacja maila na stronie ${siteConfig.nameShort}`
  return (
    <Html lang="en">
      <Head>
        <title>{previewText}</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body>
          <Container>
            <Section>
              <Text className="text-xl">Heja,</Text>
              <Text className="text-base">
                Ktoś spróbował właśnie użyć adresu {email} w celu założenia
                konta administratora na stronie{" "}
                <span className="font-semibold tracking-wide">
                  {siteConfig.nameShort}
                </span>
                .
              </Text>
              <Text className="text-base">
                Jeżeli to byłeś Ty, kliknij w poniższy link aby potwierdzić swój
                adres email i dokończyć proces zakładanie konta.
              </Text>
              <Button
                href={`${env.NEXT_PUBLIC_APP_URL}/rejestracja/potwierdz-email?token=${emailVerificationToken}`}
              >
                Potwierdź adres email
              </Button>
            </Section>

            <Section>
              <Text className="text-xs">
                Jeżeli to nie Ty próbowałeś się zarejestrować, zignoruj tego
                maila.
              </Text>
              <Text className="text-base font-medium">Miłego dnia!</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
