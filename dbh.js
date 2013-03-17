var mysql = require('mysql');
var MYSQL_USERNAME = 'root'
var MYSQL_PASSWORD = 'canucks'
var connection = mysql.createConnection({
	debug: true,
	host: "localhost",
	port: 3000,
	user: MYSQL_USERNAME,
	password: MYSQL_PASSWORD,
});

connection.connect();

connection.query('DROP DATABASE IF EXISTS dba', function(err) {
  if (err) { throw err; }
});

connection.query("CREATE DATABASE dba", function (err) {
	if (err) {throw err;}
});

connection.query("USE dba");

var q = ""+
"create table quid("+
"  id unsigned int not null auto_increment, "+
"  name varchar(100) not null default 'unknown', "+
"  formula varchar(200) not null default '???', "+
"  primary key(id)"+
");";

connection.query(q,function(err) {
	if (err) {throw err;}
});

function add_chem(data,callback)
{
	connection.query("INSERT INTO quid (name,formula) VALUES (?,?);", [data.name, data.formula], function(err,info) {
		if (err) {throw err;}
		callback(info.insertId);
		console.log(info.insertId);
	});
}

function get_chem(callback)
{
	connection.query("SELECT * FROM quid;", function(err,results,fields) {
		console.log(results);
		callback(results);
	});
}

exports.add_chem = add_chem;
exports.get_chem = get_chem;

//connection.end();
