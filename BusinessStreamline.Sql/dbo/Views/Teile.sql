CREATE VIEW dbo.Teile
	AS
SELECT
	t.TeilId
	, t.Name AS TeilName
	, t.Anzahl
	, tt.TypId
	, tt.Name AS TypName
	, p.ProduktId
	, p.Name AS ProduktName
	, CASE WHEN EXISTS (SELECT TOP 1 n.NachfrageId FROM dbo.OffeneNachfrage n WHERE n.TeilId = t.TeilId)
		THEN CAST(1 AS BIT)
		ELSE CAST(0 AS BIT)
	END AS HatOffeneNachfrage
FROM dbo.Teil t
	INNER JOIN dbo.Produkt p ON p.ProduktId = t.ProduktId
	INNER JOIN dbo.Typ tt ON tt.TypId = t.TypId
