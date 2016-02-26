CREATE VIEW [dbo].[ViewAngebotBesterPreisNachfrage]
	AS
SELECT
	src.NachfrageId
	, src.BesterPreis
	, a.AngebotId
FROM (
	SELECT
		n.NachfrageId
		, MIN(a.PreisProTeil) AS BesterPreis
	FROM dbo.Nachfrage n
		INNER JOIN dbo.Angebot a ON a.NachfrageId = n.NachfrageId
	GROUP BY n.NachfrageId
	) AS src
INNER JOIN dbo.Angebot a ON a.NachfrageId = src.NachfrageId
WHERE a.PreisProTeil = src.BesterPreis