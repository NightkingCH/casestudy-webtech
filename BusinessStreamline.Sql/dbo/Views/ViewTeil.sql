CREATE VIEW dbo.ViewTeil
	AS
SELECT
	t.TeilId
	, t.Name AS TeilName
	, t.Anzahl
	, tt.TypId
	, tt.Name AS TypName	
	, q.QualitaetId
	, q.Name AS TeilQualitaetName
	, p.ProduktId
	, p.Name AS ProduktName
	, CASE WHEN EXISTS (SELECT TOP 1 n.NachfrageId FROM dbo.ViewOffeneNachfrage n WHERE n.TeilId = t.TeilId)
		THEN CAST(1 AS BIT)
		ELSE CAST(0 AS BIT)
	END AS HatOffeneNachfrage
	, (SELECT TOP 1 n.NachfrageId FROM dbo.ViewOffeneNachfrage n WHERE n.TeilId = t.TeilId) AS OffeneNachfrageId
FROM dbo.Teil t
	INNER JOIN dbo.Produkt p ON p.ProduktId = t.ProduktId
	INNER JOIN dbo.Typ tt ON tt.TypId = t.TypId
	INNER JOIN dbo.Qualitaet q ON q.QualitaetId = t.QualitaetId
