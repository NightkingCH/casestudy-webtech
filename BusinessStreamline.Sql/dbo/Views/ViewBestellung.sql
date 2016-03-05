CREATE VIEW [dbo].[ViewBestellung]
	AS
SELECT
	a.AngebotId
	, lf.LoginId As FirmaLoginId
	, lab.LoginId As AnbieterLoginId
	, a.PreisProTeil
	, t.Name AS TeilName
	, p.ProduktId
	, p.Name AS ProduktName
	, lab.Name AS AnbieterName
	, lf.Name AS FirmaName
	, b.ErstelltAm AS BestellDatum
	, n.NachfrageId
	, f.FirmaId
	, b.BestellungId
	, ab.AnbieterId
FROM dbo.Bestellung b
	INNER JOIN dbo.Angebot a ON a.AngebotId = b.AngebotId
	INNER JOIN dbo.Nachfrage n ON n.NachfrageId = b.NachfrageId
	INNER JOIN dbo.Anbieter ab ON ab.AnbieterId = a.AnbieterId
	INNER JOIN dbo.[Login] lab ON lab.LoginId = ab.LoginId
	INNER JOIN dbo.Teil t ON t.TeilId = n.TeilId
	INNER JOIN dbo.Produkt p ON p.ProduktId = t.ProduktId
	INNER JOIN dbo.Firma f ON f.FirmaId = p.FirmaId
	INNER JOIN dbo.[Login] lf ON lf.LoginId = f.LoginId
