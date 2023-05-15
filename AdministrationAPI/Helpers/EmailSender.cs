namespace AdministrationAPI.Helpers;

using System.Net;
using System.Net.Mail;
public class EmailSender
{
    private readonly IConfiguration _configuration;

    public EmailSender(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<bool> SendEmailAsync(string userEmail, string activationCode)
    {
        try
        {
            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress("siprojekat@outlook.com");
            mailMessage.To.Add(new MailAddress(userEmail));

            mailMessage.Subject = "Code Activation";
            mailMessage.IsBodyHtml = true;
            mailMessage.Body = activationCode;

            SmtpClient client = new SmtpClient();
            client.UseDefaultCredentials = false;

            // save credentials somewhere safe in future
            //client.AuthenticationMechanisms.Remove("NTLM");
            client.Credentials = new NetworkCredential("siprojekat@outlook.com", Environment.GetEnvironmentVariable("OUTLOOK_PASSWORD"));
            client.Host = "smtp.office365.com";
            client.Port = 587;
            client.EnableSsl = true;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            await client.SendMailAsync(mailMessage);
            return true;
        }
        catch
        {
            try
            {
                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress("lifeplannerdemo@gmail.com");
                mailMessage.To.Add(new MailAddress(userEmail));

                mailMessage.Subject = "Confirm your email";
                mailMessage.IsBodyHtml = true;
                mailMessage.Body = activationCode;

                SmtpClient client = new SmtpClient();
                client.UseDefaultCredentials = false;

                // save credentials somewhere safe in future
                client.Credentials = new NetworkCredential("lifeplannerdemo@gmail.com", Environment.GetEnvironmentVariable("GMAIL_CODE"));
                client.Host = "smtp.gmail.com";
                client.Port = 587;
                client.EnableSsl = true;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                await client.SendMailAsync(mailMessage);
                return true;
            }
            catch
            {
                return false;
            }
        }

    }

    public async Task<bool> SendConfirmationEmailAsync(string userEmail, string token)
    {
        try
        {
            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress("siprojekat@outlook.com");
            mailMessage.To.Add(new MailAddress(userEmail));

            mailMessage.Subject = "Email confirmation";
            mailMessage.IsBodyHtml = true;
            mailMessage.Body = "An account was made for you on our page. Please click the following link to confirm your email and set the password: " + token;

            SmtpClient client = new SmtpClient();
            client.UseDefaultCredentials = false;

            // save credentials somewhere safe in future
            //client.AuthenticationMechanisms.Remove("NTLM");
            client.Credentials = new System.Net.NetworkCredential("siprojekat@outlook.com", Environment.GetEnvironmentVariable("OUTLOOK_PASSWORD"));
            client.Host = "smtp.office365.com";
            client.Port = 587;
            client.EnableSsl = true;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            await client.SendMailAsync(mailMessage);
            return true;
        }
        catch
        {
            try
            {
                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress("lifeplannerdemo@gmail.com");
                mailMessage.To.Add(new MailAddress(userEmail));

                mailMessage.Subject = "Email confirmation";
                mailMessage.IsBodyHtml = true;
                mailMessage.Body = "An account was made for you on our page. Please click the following link to confirm your email and set the password: " + token;

                SmtpClient client = new SmtpClient();
                client.UseDefaultCredentials = false;

                // save credentials somewhere safe in future
                client.Credentials = new System.Net.NetworkCredential("lifeplannerdemo@gmail.com", Environment.GetEnvironmentVariable("GMAIL_CODE"));
                client.Host = "smtp.gmail.com";
                client.Port = 587;
                client.EnableSsl = true;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                await client.SendMailAsync(mailMessage);
                return true;
            }
            catch
            {
                return false;
            }
        }

    }



    public async Task<bool> SendPasswordResetEmailAsync(string userEmail, string token)
    {
        try
        {
            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress("siprojekat@outlook.com");
            mailMessage.To.Add(new MailAddress(userEmail));

            mailMessage.Subject = "Password reset";
            mailMessage.IsBodyHtml = true;
            mailMessage.Body = "Reset password request has been made. Please click the following link to reset your password: " + token;

            SmtpClient client = new SmtpClient();
            client.UseDefaultCredentials = false;

            // save credentials somewhere safe in future
            //client.AuthenticationMechanisms.Remove("NTLM");
            client.Credentials = new System.Net.NetworkCredential("siprojekat@outlook.com", Environment.GetEnvironmentVariable("OUTLOOK_PASSWORD"));
            client.Host = "smtp.office365.com";
            client.Port = 587;
            client.EnableSsl = true;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            await client.SendMailAsync(mailMessage);
            return true;
        }
        catch
        {
            try
            {
                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress("lifeplannerdemo@gmail.com");
                mailMessage.To.Add(new MailAddress(userEmail));

                mailMessage.Subject = "Password reset";
                mailMessage.IsBodyHtml = true;
                mailMessage.Body = "Reset password request has been made. Please click the following link to reset your password: " + token;

                SmtpClient client = new SmtpClient();
                client.UseDefaultCredentials = false;

                // save credentials somewhere safe in future
                client.Credentials = new System.Net.NetworkCredential("lifeplannerdemo@gmail.com", Environment.GetEnvironmentVariable("GMAIL_CODE"));
                client.Host = "smtp.gmail.com";
                client.Port = 587;
                client.EnableSsl = true;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                await client.SendMailAsync(mailMessage);
                return true;
            }
            catch
            {
                return false;
            }
        }

    }
}
