CREATE VIEW dbo.ViewSucheNachfrage
	AS
SELECT 
	n.NachfrageId
	, n.Anzahl
	, n.ErstelltAm
	, t.TeilId
	, t.Name AS TeilName
	, tt.TypId
	, tt.Name AS TypName
	, p.ProduktId
	, p.Name AS ProduktName
FROM dbo.Nachfrage n
	INNER JOIN dbo.Teil t ON t.TeilId = n.TeilId
	INNER JOIN dbo.Typ tt ON tt.TypId = t.TypId
	INNER JOIN dbo.Produkt p ON p.ProduktId = t.ProduktId