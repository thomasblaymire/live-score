export function formatNameWithHyphens(name: string): string {
  // Trim whitespace, split by spaces, and filter out empty parts
  const nameParts = name.trim().split(/\s+/).filter(part => part.length > 0);
  
  // Join the parts with hyphens
  return nameParts.join('-');
}