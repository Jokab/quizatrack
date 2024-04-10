export function mapCategory(categoryKey: string): string {
  switch (categoryKey) {
    case "music":
      return "Musik";
    case "science":
      return "Vetenskap";
    case "geography":
      return "Geografi";
    case "languages":
      return "Språk";
    case "movies":
      return "Film";
    case "sports":
      return "Sport";
    case "tech":
    case "technology":
      return "Teknik";
    case "food":
      return "Mat & dryck";
    case "history":
      return "Historia";
    case "literature":
      return "Litteratur";
    case "society":
      return "Samhälle";
    case "tv":
      return "TV";
    case "logic":
      return "Kluring";
    case "nature":
      return "Natur";
    case "business":
      return "Näringsliv";
    case "design":
      return "Design";
    case "celebs":
      return "Kändisar";
    case "cars":
      return "Bilar";
    case "medicine":
      return "Medicin";
    case "politics":
      return "Politik";
  }
  return "Okategoriserad";
}
