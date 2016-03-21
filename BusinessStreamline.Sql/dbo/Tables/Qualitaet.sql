CREATE TABLE [dbo].[Qualitaet]
(
	[QualitaetId] INT          NOT NULL IDENTITY(1,1),
    [Name]  NVARCHAR (40) NOT NULL,
	[Code]  NVARCHAR(40) NOT NULL,
    CONSTRAINT [PK_Qualitaet] PRIMARY KEY CLUSTERED ([QualitaetId] ASC)
)
