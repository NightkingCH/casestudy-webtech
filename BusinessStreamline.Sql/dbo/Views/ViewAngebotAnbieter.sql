CREATE VIEW [dbo].[ViewAngebotAnbieter]
	AS
SELECT
	a.AngebotId
	, aa.AnbieterId
	, a.ErstelltAm
	, a.PreisProTeil
	, a.[Status]
	, n.NachfrageId
	, p.Name AS ProduktName
	, t.Name AS TeilName
FROM dbo.Angebot a
	INNER JOIN dbo.Nachfrage n ON n.NachfrageId = a.NachfrageId
	INNER JOIN dbo.Anbieter aa ON aa.AnbieterId = a.AnbieterId
	INNER JOIN dbo.Teil t ON t.TeilId = n.TeilId
	INNER JOIN dbo.Produkt p ON p.ProduktId = t.ProduktId