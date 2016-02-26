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
FROM dbo.Angebot a
	INNER JOIN dbo.Nachfrage n ON n.NachfrageId = a.NachfrageId
	INNER JOIN dbo.Anbieter aa ON aa.AnbieterId = a.AnbieterId
	INNER JOIN dbo.[Login] l ON l.LoginId = aa.LoginId
