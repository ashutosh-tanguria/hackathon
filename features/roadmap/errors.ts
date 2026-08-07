export class InvalidRoadmapError extends Error {
  constructor() {
    super("Invalid AI roadmap response.");
  }
}