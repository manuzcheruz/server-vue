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
      if (!allFacts) {
        const { data } = await handler.getListFromAPI();
        allFacts = data.forEach(async (fact) => {
          await pool.query(
            'INSERT INTO cat_facts (id, userName, textDescription, updatedAt, animalType, createdAt) VALUES($1, $2, $3, $4, $5, $6) RETURNING * ',
            [fact.id, fact.user, fact.text, fact.updatedAt, fact.type, fact.createdAt]);
        })
      }
      console.log(allFacts);
      res.send({ allFacts });
    } catch (err) {
      res.send(err);
      next(err);
    }
  }
)

export default router;