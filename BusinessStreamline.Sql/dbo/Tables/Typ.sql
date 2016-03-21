CREATE TABLE [dbo].[Typ] (
    [TypId] INT          NOT NULL IDENTITY(1,1),
    [Name]  NVARCHAR (40) NOT NULL,
	[Code] NVARCHAR(40) NOT NULL,
    CONSTRAINT [PK_Typ] PRIMARY KEY CLUSTERED ([TypId] ASC)
);

