'use strict'

import { Router } from 'express';
import pool from '../database/db.js';
import handler from './handlers/catfactsHandler.js';

const router = Router();

router.get(
  '/fromSource',
  async (req, res, next) => {
    try {
      //try and retrieve data first from the db, if missing then fetch and save
      let allFacts = await pool.query('SELECT * FROM cat_facts');
      if (!allFacts.rows) {
        const { data } = await handler.getListFromAPI();
        // console.log(data);
        allFacts = data.forEach(async (fact) => {
          await pool.query(
            'INSERT INTO cat_facts (userName, textDescription, updatedAt, animalType, createdAt) VALUES($1, $2, $3, $4, $5) RETURNING * ',
            [fact.user, fact.text, fact.updatedAt, fact.type, fact.createdAt]);
        })
      }
      // console.log(allFacts.rows);
      res.send(allFacts.rows);
    } catch (err) {
      res.send(err);
      next(err);
    }
  }
)

router.put(
  '/facts/:id',
  async (req, res, next) => {
    const { id } = req.params;
    const { text } = req.body;
    const currentTime = new Date().toISOString();
    try {
      const updatedFact = await pool.query(
        'UPDATE cat_facts SET textDescription = $1, updatedAt = $2 WHERE id = $3',
        [text, currentTime, id]);
      if (updatedFact.rowCount) {
        res.json('fact was successfully updated!');
      } else res.status(404).json('fact with the given id does not exist!');
    } catch (err) {
      res.send(err);
      next(err);
    }
  }
)

router.delete(
  '/facts/:id',
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const deletedFact = await pool.query(
        'DELETE FROM cat_factS WHERE id = $1',
        [id]);
      if (deletedFact.rowCount) {
        res.json('fact was successfully deleted!');
      } else res.status(404).json('fact with the given id does not exist!');
    } catch (err) {
      res.send(err);
      next(err);
    }
  }
)

export default router;