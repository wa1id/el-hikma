import { z } from 'zod'
import sgMail from '@sendgrid/mail'
import { headers } from 'next/headers'

// Initialize SendGrid with your API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

const schema = z.object({
  name: z.string().min(1, 'Naam is verplicht'),
  email: z.string().email('Ongeldig e-mailadres'),
  message: z.string().min(1, 'Bericht is verplicht'),
})

export async function POST(request: Request) {
  try {
    const headersList = await headers()
    const domain = headersList.get('host') || ''

    const body = await request.json()
    const validatedFields = schema.safeParse(body)

    if (!validatedFields.success) {
      return Response.json(
        {
          success: false,
          errors: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { name, email, message } = validatedFields.data

    const getRecipientEmails = (domain: string): string[] => {
      if (process.env.NODE_ENV !== 'production') {
        return ['walid@wystudio.be']
      }

      if (domain.includes('elhikma')) {
        return ['elhikma2060@hotmail.com']
      }

      return ['ahmed.azzuz@gmail.com', 'hamza1fitness@gmail.com']
    }

    console.log(domain.includes('localhost'))
    console.log(domain)
    console.log(getRecipientEmails(domain))

    await sgMail.send({
      to:
        process.env.NODE_ENV === 'production'
          ? getRecipientEmails(domain)
          : 'walid@wystudio.be',
      from: 'walid@wystudio.be',
      bcc: 'info@wystudio.be',
      subject: 'Nieuw contactformulier bericht',
      text: `Naam: ${name}\nE-mail: ${email}\nBericht: ${message}`,
      html: `<strong>Naam:</strong> ${name}<br><strong>E-mail:</strong> ${email}<br><strong>Bericht:</strong> ${message}`,
      mailSettings: {
        sandboxMode: {
          enable: process.env.NODE_ENV !== 'production',
        },
      },
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('SendGrid error:', error)
    return Response.json(
      {
        success: false,
        errors: {
          form: [
            'Er is een fout opgetreden bij het verzenden van het bericht.',
          ],
        },
      },
      { status: 500 }
    )
  }
}
