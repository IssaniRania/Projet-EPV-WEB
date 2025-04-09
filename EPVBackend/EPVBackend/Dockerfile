# Étape 1: Utiliser l'image officielle de .NET SDK pour la compilation
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de projet et restaurer les dépendances
COPY *.csproj ./
RUN dotnet restore

# Copier le reste des fichiers du projet
COPY . ./

# Construire l'application
RUN dotnet publish -c Release -o out

# Étape 2: Utiliser l'image de .NET Runtime pour l'exécution de l'application
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base

# Définir le répertoire de travail
WORKDIR /app

# Copier l'application compilée à partir de l'étape build
COPY --from=build /app/out .

# Exposer le port sur lequel l'application écoutera
EXPOSE 80

# Lancer l'application
ENTRYPOINT ["dotnet", "EPVBackend.dll"]