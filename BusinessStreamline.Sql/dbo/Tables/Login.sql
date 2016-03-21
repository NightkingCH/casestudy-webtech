CREATE TABLE [dbo].[Login] (
    [LoginId]  INT          NOT NULL IDENTITY(1,1),
    [Name]     NVARCHAR (40) NOT NULL,
    [Password] NVARCHAR (40) NOT NULL,
    CONSTRAINT [PK_Login] PRIMARY KEY CLUSTERED ([LoginId] ASC)
);

