# �tape 1: Utiliser l'image officielle de .NET SDK pour la compilation
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

# D�finir le r�pertoire de travail
WORKDIR /app

# Copier les fichiers de projet et restaurer les d�pendances
COPY *.csproj ./
RUN dotnet restore

# Copier le reste des fichiers du projet
COPY . ./

# Construire l'application
RUN dotnet publish -c Release -o out

# �tape 2: Utiliser l'image de .NET Runtime pour l'ex�cution de l'application
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base

# D�finir le r�pertoire de travail
WORKDIR /app

# Copier l'application compil�e � partir de l'�tape build
COPY --from=build /app/out .

# Exposer le port sur lequel l'application �coutera
EXPOSE 80

# Lancer l'application
ENTRYPOINT ["dotnet", "EPVBackend.dll"]