namespace AdministrationAPI.Helpers;

using Twilio;
using Twilio.Rest.Api.V2010.Account;

public class SMSSender
    {
        private readonly IConfiguration _config;
        public SMSSender(IConfiguration config)
        {
            _config = config;
        }
        public void SendSMS(string phoneNumber, string activationCode)
        {
            // IN PROD, SAVE THESE SECRETS IN SOME SECRET MANAGER OR .env FILE
            string accountSid = "AC3d1624658e0b068286de8622eecff9b3";
            string authToken = Environment.GetEnvironmentVariable("TWILIO_TOKEN");
            // string authToken = "955da57aa49192f0f431bdf0f12a151c";

            TwilioClient.Init(accountSid, authToken);

            var message = MessageResource.Create(
                body: activationCode,
                from: "SI-projekat",
                to: new Twilio.Types.PhoneNumber("+387" + phoneNumber.Remove(0, 1))
            );
            //06xxxxxxx -> +3876xxxxxxx
        }
    }