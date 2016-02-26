CREATE VIEW [dbo].[ViewNachfrage]
	AS
SELECT
	n.NachfrageId
	, n.Anzahl
	, n.ErstelltAm
	, (SELECT TOP 1 vaan.AnzahlAngebote FROM dbo.ViewAnzahlAngeboteNachfrage vaan WHERE vaan.NachfrageId = n.NachfrageId) AS AnzahlAngebote
	, (SELECT TOP 1 vabpn.BesterPreis FROM dbo.ViewAngebotBesterPreisNachfrage vabpn WHERE vabpn.NachfrageId = n.NachfrageId) AS BesterPreis
	, CASE WHEN EXISTS (SELECT TOP 1 von.NachfrageId FROM dbo.ViewOffeneNachfrage von WHERE von.NachfrageId = n.NachfrageId)
			THEN CAST(1 AS BIT)
			ELSE CAST(0 AS BIT)
		END AS IstOffen
	, p.ProduktId
	, p.Name AS ProduktName
	, t.Name AS TeilName
	, f.FirmaId
	, f.LoginId
FROM dbo.Nachfrage n
	INNER JOIN dbo.Teil t ON t.TeilId = n.TeilId
	INNER JOIN dbo.Produkt p ON p.ProduktId = t.ProduktId
	INNER JOIN dbo.Firma f ON f.FirmaId = p.FirmaId