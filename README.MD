This solution creates a REST API in the form given below and allows for various methods of querying the data. All query parameters are optional and max and min values are inclusive.

Example usage:
GET /providers?max_discharges=5&min_discharges=6&max_average_covered_charges=50000
&min_average_covered_charges=40000&min_average_medicare_payments=6000
&max_average_medicare_payments=10000&state=GA

Two additional parameters, `offset` and `count`, are included to display a fixed number of results per API request - these can also be used for pagination. Their default values are set to 0 and 20 respectively. Additional parameters for sorting are easy to add but have not been added in this iteration of the solution. We sanitize all input params and throw 400 when a bad request is made (when invalid values for queryparams are passed in). 

In case of no query parameters being passed, all the records are displayed with 20 records being displayed at a time.

All the provided records have been included in the database.

The following technologies have been used to implement the solution:
* Node.js - programming language
* Express.js - backend framework
* Mysql - data source
* Mocha and chai - testing framework and assertion library respectively

How to get started with the project
* git clone the repo
* cd to the folder where you have cloned the repo and run "npm install" 
* create a local mysql database with the name 'Healthcaredb', with table 'HealthcareProvider'
  with schema:
+--------------------------------------+---------------+------+-----+---------+----------------+
| Field                                | Type          | Null | Key | Default | Extra          |
+--------------------------------------+---------------+------+-----+---------+----------------+
| id                                   | int(11)       | NO   | PRI | NULL    | auto_increment |
| drg_definition                       | varchar(255)  | NO   |     | NULL    |                |
| provider_id                          | int(11)       | NO   |     | NULL    |                |
| provider_name                        | varchar(255)  | NO   |     | NULL    |                |
| provider_street_address              | varchar(100)  | NO   |     | NULL    |                |
| provider_city                        | varchar(20)   | NO   |     | NULL    |                |
| provider_state                       | varchar(20)   | NO   |     | NULL    |                |
| provider_zipcode                     | int(11)       | NO   |     | NULL    |                |
| hospital_referral_region_description | varchar(50)   | NO   |     | NULL    |                |
| total_discharges                     | int(11)       | NO   |     | NULL    |                |
| average_covered_charges              | decimal(13,4) | NO   |     | NULL    |                |
| average_total_payments               | decimal(13,4) | NO   |     | NULL    |                |
| average_medicare_payments            | decimal(13,4) | NO   |     | NULL    |                |
+--------------------------------------+---------------+------+-----+---------+----------------+
* load the data from the "quoted.csv" into the table
* cd to server and run the app by running "node app.js"
* you can now access the api at http://localhost:9000/providers?
* run tests by running "npm test" from the root of the directory


#Known issues
* we have not added support for create/update/delete
* we have not added support for logging errors/exceptions
* currently the api doesn't support sorting
* no indexes have been added to the db at this time
* application is assumed to be running in a somewhat secure environment - we only do basic sanity checks on inputs (we would ideally use custom middleware to do this in production so application code doesn't need to do this)
