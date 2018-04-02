const express = require('express');
const app = express();

const mysql = require('mysql'),
  con = mysql.createConnection({
    host: 'localhost',
    user: 'custom',
    password: 'password',
    database: 'calendar_db'
  });
  
function buildQuery(field, min_value, max_value) {
  if(field === 'state' && min_value) {
    return ` ${field} = ${min_value}`;
  }
  if(min_value && max_value) {
    return ` ${field} BETWEEN ${min_value} AND ${max_value}`;
  } else if(!min_value && max_value) {
    return ` ${field} <= ${max_value}`;
  } else if(!max_value && min_value) {
    return ` ${field} >= ${min_value}`;
  } else {
    return "1 = 1"; // dummy condition if these don't hold
  }
}

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

function sanitize(arg) {
  return !isNaN(parseInt(arg, 10));
}


app.get('/providers', function (req, res, next) {
  
  function dbCallback(err, rows) {
   if (err) {
      res.writeHead(500);
      res.end('Internal server error');                
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(rows), 'utf-8');
    }
  }
  let validRequest = true;
   Object.keys(req.query).map(key => {
    if (!sanitize(req.query[key])) {
      res.writeHead(400);
      res.end("Bad request!");
      validRequest = false;
    }
  });

  let query;
  if (validRequest) {
    if(!isEmptyObject(req.query)) {
      let {
        max_discharges, 
        min_discharges, 
        max_avg_covered_charges,
        min_avg_covered_charges, 
        max_avg_medicare_payments,
        min_avg_medicare_payments,
        state,
        offset,
        count
      } = req.query;
      offset = offset || 0;
      count = count || 20; //default values in case params are not passed in  
      query = `SELECT provider_name, provider_street_address, provider_city, provider_state, provider_zipcode,
       hospital_referral_region_description, total_discharges, average_covered_charges, average_total_payments,
       average_medicare_payments from HealthcareProvider WHERE `;
      query += buildQuery('total_discharges', min_discharges, max_discharges);
      query += ' AND ' + buildQuery('average_covered_charges', min_avg_covered_charges, max_avg_covered_charges);
      query += ' AND ' + buildQuery('average_medicare_payments', min_avg_medicare_payments, max_avg_medicare_payments);
      query += ' AND ' + buildQuery('state', state);
      query += ` LIMIT ${offset}, ${count}`;
      con.query(query, dbCallback);
    } 
    else {
      con.query(`SELECT provider_name, provider_street_address, provider_city, provider_state, provider_zipcode,
       hospital_referral_region_description, total_discharges, average_covered_charges, average_total_payments,
       average_medicare_payments from HealthcareProvider LIMIT 0, 20`, dbCallback);
    }
  }
});  

const server = app.listen(9000, () => console.log('Healthcare provider app listening on port 9000!'));
module.exports = server;