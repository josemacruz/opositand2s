import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    await resend.emails.send({
      from: "Opositandos <onboarding@resend.dev>",
      to: email,
      subject: "Gracias por apuntarte 🥳",
      html: `
      <!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Gracias por unirte</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="margin:0; padding:0; background-color:#f7f7f7; font-family:Arial, sans-serif;">
    <table width="100%" cellspacing="0" cellpadding="0" style="background-color:#f7f7f7; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="100%" max-width="600" cellspacing="0" cellpadding="0" style="background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.05);">
            <tr>
              <td align="center" style="padding: 30px 20px 10px;">
                <img src="https://opositandos.es/logo_opositandos.png" alt="Opositandos" width="180" style="display:block; border-radius:8px;" />
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 20px 30px;">
                <h1 style="margin: 0; font-size: 24px; color: #333333;">¡Gracias por unirte a Opositandos!</h1>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 0 30px 20px;">
                <p style="margin: 0; font-size: 16px; color: #555555;">
                  Te avisaremos en cuanto la plataforma esté disponible.<br />
                  Estamos construyendo algo increíble para ti 🚀
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 20px 30px;">
                <a href="https://opositandos.es" target="_blank"
                  style="display:inline-block; background-color:#facc15; color:#111827; text-decoration:none; padding:12px 24px; border-radius:6px; font-weight:600; font-size:16px;">
                  Ver página principal
                </a>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 30px 20px; font-size: 12px; color: #999999;">
                &copy; 2025 Opositandos. Todos los derechos reservados.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false }, { status: 500 });
  }
}
