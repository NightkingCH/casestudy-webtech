CREATE VIEW ViewNachfrageBestellung
AS
SELECT
	n.NachfrageId
	, b.BestellungId
FROM dbo.Nachfrage n
	INNER JOIN dbo.Bestellung b ON b.NachfrageId = n.NachfrageId