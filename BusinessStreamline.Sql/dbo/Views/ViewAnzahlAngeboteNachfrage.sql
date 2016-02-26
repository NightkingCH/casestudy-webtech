CREATE VIEW dbo.ViewAnzahlAngeboteNachfrage
	AS
SELECT
	n.NachfrageId
	, COUNT(a.AngebotId) AS AnzahlAngebote
FROM dbo.Nachfrage n
	LEFT JOIN dbo.Angebot a ON a.NachfrageId = n.NachfrageId
GROUP BY n.NachfrageId
