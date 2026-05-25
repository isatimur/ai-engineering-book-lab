// Stable, fast non-cryptographic hash for paragraph identification.
// djb2 variant — collisions are tolerable for our use case (highlight key).
export function hashText(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h * 33) ^ s.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(36);
}
