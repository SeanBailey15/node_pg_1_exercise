const express = require("express");
const ExpressError = require("../expressError");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const results = await db.query(`SELECT * FROM companies`);
    return res.json({ companies: results.rows });
  } catch (err) {
    return next(err);
  }
});

router.get("/:code", async (req, res, next) => {
  try {
    const { code } = req.params;

    const results = await db.query(`SELECT * FROM companies WHERE code=$1`, [
      code,
    ]);

    if (results.rows.length === 0)
      throw new ExpressError(
        `Cannot find company with the code of ${code}`,
        404
      );

    const invoicesRes = await db.query(
      `SELECT * FROM invoices WHERE comp_code=$1`,
      [code]
    );

    const company = results.rows[0];
    const invoices = invoicesRes.rows;
    company.invoices = invoices.map((inv) => inv.id);

    return res.json({ company: company });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { code, name, description } = req.body;

    const results = await db.query(
      `INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description`,
      [code, name, description]
    );

    return res.status(201).json(results.rows);
  } catch (err) {
    next(err);
  }
});

router.put("/:code", async (req, res, next) => {
  try {
    const { code } = req.params;
    const { name, description } = req.body;

    const results = await db.query(
      `UPDATE companies SET name=$1, description=$2 WHERE code=$3 RETURNING code, name, description`,
      [name, description, code]
    );

    if (results.rows.length === 0) {
      throw new ExpressError(`Cannot find company with the code of ${code}`);
    }

    return res.json(results.rows);
  } catch (err) {
    next(err);
  }
});

router.delete("/:code", async (req, res, next) => {
  try {
    const { code } = req.params;

    const requested = await db.query(`SELECT * FROM companies WHERE code=$1`, [
      code,
    ]);

    if (requested.rows.length === 0)
      throw new ExpressError(
        `Cannot find company with the code of ${code}`,
        404
      );

    await db.query(`DELETE FROM companies WHERE code=$1`, [code]);

    return res.json({ message: `Deleted ${code}` });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
