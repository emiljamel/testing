import express from "express";

const router = express.Router();

router.use((err, req, res, next) => {
  res.status(500).render("error", {
    status: 500,
    message: "Internal Server Error"
  });
});

router.use((req, res, next) => {
  res.status(404).render("error", {
    status: 404,
    message: "Not Found"
  });
});

export default router;
