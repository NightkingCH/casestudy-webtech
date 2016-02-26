CREATE VIEW [dbo].[ViewAngebot]
	AS
SELECT
	a.AngebotId
	, a.ErstelltAm
	, a.PreisProTeil
	, a.[Status]
	, n.NachfrageId
	, l.Name
	, (a.PreisProTeil * n.Anzahl) AS PreisTotal
	, CASE WHEN EXISTS ( SELECT TOP 1 vabpn.AngebotId FROM dbo.ViewAngebotBesterPreisNachfrage vabpn WHERE vabpn.AngebotId = a.AngebotId)
		THEN CAST(1 AS BIT)
		ELSE CAST(0 AS BIT)
	END AS IstBestesAngebot
FROM dbo.Angebot a
	INNER JOIN dbo.Nachfrage n ON n.NachfrageId = a.NachfrageId
	INNER JOIN dbo.Anbieter aa ON aa.AnbieterId = a.AnbieterId
	INNER JOIN dbo.[Login] l ON l.LoginId = aa.LoginId