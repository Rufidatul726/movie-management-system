import Report from "../models/report-model.js";
import Movie from "../models/movie-model.js";

export async function createReport(req, res) {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const report = new Report({
      movie: req.params.id,
      user: req.user,
      reason: req.body.reason,
    });

    await report.save();
    res.status(201).json({ message: "Report created successfully", report });
}

export async function updateReport(req, res) {
  const { status } = req.body;
  try {
    const report = await Report.findOne({ movie: req.params.id });
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin only action" });
    }
    report.status = status;
    report.status === "approved" ? report.reason = "" : report.reason; 
    await report.save();
    res.status(200).json({ message: "Report updated successfully", report });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function viewReport(req, res) {
    try {
      const reports = await Report.find({status: "pending"}).populate("movie").populate("reportedBy");
      if (req.user.role !== "admin") {
          return res.status(403).json({ message: "Admin only action" });
      }
        res.status(200).json(reports);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  