CREATE VIEW [dbo].[ViewAngebotBesterPreisNachfrage]
	AS
SELECT
	n.NachfrageId
	, MIN(a.PreisProTeil) AS BesterPreis
FROM dbo.Nachfrage n
	INNER JOIN dbo.Angebot a ON a.NachfrageId = n.NachfrageId
GROUP BY n.NachfrageId
