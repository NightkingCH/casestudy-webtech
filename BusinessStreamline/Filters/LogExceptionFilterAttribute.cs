using System.Web.Http.Filters;
using NLog;
using System.Web;
using System.Data.Entity.Infrastructure;
using System.Threading;
using System.Linq;

namespace BusinessStreamline.Filters
{

    public class LogExceptionFilterAttribute : ExceptionFilterAttribute
    {
        public LogExceptionFilterAttribute()
        {
        }

        public override void OnException(HttpActionExecutedContext Context)
        {
            if (Context.Exception is DbUpdateConcurrencyException)
            {
                return;
            }

            LogEventInfo logEventInfo = new LogEventInfo(LogLevel.Fatal, this.GetType().ToString(), "Ein nicht behandelter Fehler ist aufgetreten!" + " Typ: " + Context.Exception.GetType().Name);
            logEventInfo.Exception = Context.Exception;

            LogManager.GetCurrentClassLogger().Log(logEventInfo);
        }
    }
}