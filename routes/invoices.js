const express = require("express");
const ExpressError = require("../expressError");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const results = await db.query(`SELECT * FROM invoices`);
    return res.json({ invoices: results.rows });
  } catch (err) {
    return next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await db.query(`SELECT * FROM invoices WHERE id=$1`, [id]);
    if (results.rows.length === 0) {
      throw new ExpressError(`Cannot find invoice with the id of ${id}`, 404);
    }
    return res.json({ invoice: results.rows[0] });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { comp_code, amt } = req.body;
    await db.query(
      `INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING comp_code, amt`,
      [comp_code, amt]
    );
    const newInvoice = await db.query(
      `SELECT * FROM invoices ORDER BY id DESC LIMIT 1`
    );
    return res.status(201).json({ invoice: newInvoice.rows[0] });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amt } = req.body;

    const invoice = await db.query(`SELECT * FROM invoices WHERE id=$1`, [id]);
    if (invoice.rows.length === 0) {
      throw new ExpressError(`Cannot find invoice with the id of ${id}`);
    }
    const results = await db.query(
      `UPDATE invoices SET amt=$1 WHERE id=$2 RETURNING id, amt`,
      [amt, id]
    );

    const updatedInvoice = await db.query(
      `SELECT * FROM invoices WHERE id=$1`,
      [id]
    );

    return res.json({ invoice: updatedInvoice.rows[0] });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const requested = await db.query(`SELECT * FROM invoices WHERE id=$1`, [
      id,
    ]);

    if (requested.rows.length === 0)
      throw new ExpressError(`Cannot find invoice with the id of ${id}`, 404);

    await db.query(`DELETE FROM invoices WHERE id=$1`, [id]);

    return res.json({ message: `Deleted invoice ${id}` });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
