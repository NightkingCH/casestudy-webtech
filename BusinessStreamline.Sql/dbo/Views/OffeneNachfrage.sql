CREATE VIEW dbo.OffeneNachfrage
	AS
SELECT 
	n.NachfrageId
	, n.TeilId
FROM dbo.Nachfrage n
	LEFT JOIN dbo.Bestellung b ON b.NachfrageId = n.NachfrageId
WHERE b.BestellungId IS NULL