var mysql = require('mysql');
var MYSQL_USERNAME = 'root'
var MYSQL_PASSWORD = 'canucks'
var connection = mysql.createConnection({
	host: "localhost",
	port: 3000,
	user: MYSQL_USERNAME,
	password: MYSQL_PASSWORD,
});

connection.connect();

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
	client.query("insert into quid (name,formula) values (?,?)", [data.name,data.formula], function(err,info) {
		callback(info.insertId);
	});
}

function get_chem(callback)
{
	client.query("select * from quid", function(err,results,fields) {
		callback(results);
	});
}

exports.add_chem = add_chem;
exports.get_chem = get_chem;

connection.end();
