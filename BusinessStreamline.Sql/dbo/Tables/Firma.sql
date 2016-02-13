CREATE TABLE [dbo].[Firma] (
    [FirmaId] INT NOT NULL IDENTITY(1,1),
    [LoginId] INT NOT NULL,
    CONSTRAINT [PK_Firma] PRIMARY KEY CLUSTERED ([FirmaId] ASC),
    CONSTRAINT [FK_LoginFirma] FOREIGN KEY ([LoginId]) REFERENCES [dbo].[Login] ([LoginId])
);

