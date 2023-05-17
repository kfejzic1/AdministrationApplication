namespace LoggerUtility
{
    public class Logger
    {
        public static void LogException(Exception exception, string identificationCode = "general", string connectionStringName = null)
        {
            //WriteLogEntryToDB(true, exception.Message, exception.GetType().FullName, exception.StackTrace, identificationCode, null, connectionStringName);
            LogToFile("Exception: " + exception.Message + "/nInner Exception: " + exception.InnerException?.Message);
        }
        public static void LogToFile(string message)
        {
            using (StreamWriter sw = File.AppendText(Environment.GetEnvironmentVariable("LOGGER_FILE_PATH")))
            {
                sw.WriteLine(DateTime.Now.ToString() + " --- " + message);
            }
        }
    }
}
