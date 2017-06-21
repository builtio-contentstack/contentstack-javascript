var request		= require('request'),
	path 		= require('path'),
	fs			= require('fs'),
	exec 		= require('child_process').exec,
	nodemailer 	= require('nodemailer'),
	config 		= require('./config.js'),
	reportFileName = "report.json";

//configure the smtp 
let smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
        user: 'aamod.pisat@raweng.com',
        pass: 'abcABC@123'
    }
};
let transporter = nodemailer.createTransport(smtpConfig)

var automation = function() {
	var self = this;
	console.log("-----automation started ------")
	self.init();
}

automation.prototype.init = function () {
	try {
		let self = this;
	
	// initalise the runscope config
		let options = {
			method: "POST",
			url: config.runscope.url,
			qs: {
				"url"			: config.url,
				"username"		: config.runscope.username,
				"password"		: config.runscope.password,
				"api_key"		: config.stack.api_key,
				"access_token"	: config.stack.access_token,
				"Content-Type"	: "application/json"
			}
		}
		console.log("Creating data in Built.io Contentstack...")
	
		//trigger runscope url for data creation in Built.io Contentstack
		request(options, function (err, res, body) {
			if(!err && body) {
				console.log("Data created in Built.io Contentstack...");
				setTimeout(function (){
					self.run();
				}, 150000);
			}
		});
	} catch(err) {
		console.error("Init error: ", err.message || err);
		process.exit(0);
	}
}

automation.prototype.run = function () {
	let self = this;
	let _path = path.join(process.cwd(), 'test');
	process.chdir(_path);

	// run command "node index.js" to run the test cases
	console.log("Running the test cases....");
	let executeCommand = "node index.js | tap-json > " + reportFileName;
	exec(executeCommand, function (err, stdout, stderr) {
		if(!err) {
			self.mailReport();
		} else {
			console.error("error: ", err.message || err)
		}
	});
}

automation.prototype.mailReport = function () {
	let reportPath = path.join(__dirname, '../', 'test', reportFileName);
	if ( fs.existsSync(reportPath) ) {
		let message = {
		    from: 'aamod.pisat@raweng.com',
		    to: 'aamod.pisat@raweng.com',
		    subject: 'Report of JS SDK test cases | ' + new Date(),
		    html: '<p>Hi Team, Please check below attachment of test cases report.</p>',
		    attachments : [
		    {
		    	path: reportPath
		    }
		    ]
		};

		transporter.sendMail(message, function (err, info) {
			if(!err) {
				console.log("Report mailed successfully !!!");
				console.log("-----automation finished ------")
			}
		});
		
		transporter.close();
	} else {
		console.error("Error: Sorry report don't exist");
	}
}

module.exports = automation;