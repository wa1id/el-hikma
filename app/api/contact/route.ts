import { z } from 'zod'
import sgMail from '@sendgrid/mail'

// Initialize SendGrid with your API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

const schema = z.object({
  name: z.string().min(1, 'Naam is verplicht'),
  email: z.string().email('Ongeldig e-mailadres'),
  message: z.string().min(1, 'Bericht is verplicht'),
})

export async function POST(request: Request) {
  try {
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

    await sgMail.send({
      to: 'wyachou95@gmail.com',
      from: 'walid@wystudio.be',
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
