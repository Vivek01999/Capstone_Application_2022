// process arguments to obtain values for --userID username and --channelID channelname from process.argv as arguments

'use strict';

const config = require('./config.json');

function parseArgs(argv, useConfig) {

	let organisationMSP = null;
	let userIdentity = null;
	let networkChannel = null;
	let wallet = null;
	let smartContract = null;
	let caAuth = null;
	let adminIdentity = null;
	let adminSecret = null;
	let role = null;
	let affiliation = null;
	let reason = null;

	try {
		// console.log("About to enter parse args");
		//console.log(argv);
		if (argv != null && argv.length > 0) {
			// console.log("Entering parse args!!");
			for (var i = 0; i < argv.length; i++) {
				if (argv[i] != null) {
					if (argv[i] == '--organisationMSP') {
						if (argv.length > i) {
							organisationMSP = argv[i + 1];
						}
					} else if (argv[i] == '--userIdentity') {
						if (argv.length > i) {
							userIdentity = argv[i + 1];
						}
					} else if (argv[i] == '--networkChannel') {
						if (argv.length > i) {
							networkChannel = argv[i + 1];
						}
					} else if (argv[i] == '--wallet') {
						if (argv.length > i) {
							wallet = argv[i + 1];
						}
					} else if (argv[i] == '--smartContract') {
						if (argv.length > i) {
							smartContract = argv[i + 1];
						}
					} else if (argv[i] == '--caAuth') {
						if (argv.length > i) {
							caAuth = argv[i + 1];
						}
					} else if (argv[i] == '--adminIdentity') {
						if (argv.length > i) {
							adminIdentity = argv[i + 1];
						}
					} else if (argv[i] == '--adminSecret') {
						if (argv.length > i) {
							adminSecret = argv[i + 1];
						}
					} else if (argv[i] == '--role') {
						if (argv.length > i) {
							role = argv[i + 1];
						}
					} else if (argv[i] == '--affiliation') {
						if (argv.length > i) {
							affiliation = argv[i + 1];
						}
					}else if (argv[i] == '--reason') {
						if (argv.length > i) {
							reason = argv[i + 1];
						}
					}
				}
			}
		}
	} catch (error) {
		console.error(`Failed to parse argv: ${error}`);
	}
	if (organisationMSP == null && (useConfig == true || useConfig == 'true')) {
		organisationMSP = config.common.organisationMSP;
	}
	if (userIdentity == null && (useConfig == true || useConfig == 'true')) {
		userIdentity = config.registerUser.userIdentity;
	}
	if (networkChannel == null && (useConfig == true || useConfig == 'true')) {
		networkChannel = config.common.networkChannel;
	}
	if (wallet == null && (useConfig == true || useConfig == 'true')) {
		wallet = config.adminEnroll.wallet;
	}
	if (smartContract == null && (useConfig == true || useConfig == 'true')) {
		smartContract = config.common.smartContract;
	}
	if (caAuth == null && (useConfig == true || useConfig == 'true')) {
		caAuth = config.adminEnroll.caAuth;
	}
	if (adminIdentity == null && (useConfig == true || useConfig == 'true')) {
		adminIdentity = config.adminEnroll.adminIdentity;
	}
	if (adminSecret == null && (useConfig == true || useConfig == 'true')) {
		adminSecret = config.adminEnroll.adminSecret;
	}
	if (role == null && (useConfig == true || useConfig == 'true')) {
		role = config.registerUser.role;
	}
	if (affiliation == null && (useConfig == true || useConfig == 'true')) {
		affiliation = config.registerUser.affiliation;
	}
	if (reason == null && (useConfig == true || useConfig == 'true')) {
		reason = config.deleteUser.reason;
	}
	// console.log(organisationMSP)
	return {
		"userIdentity": userIdentity,
		"networkChannel": networkChannel,
		"organisationMSP": organisationMSP,
		"wallet": wallet,
		"smartContract": smartContract,
		"caAuth": caAuth,
		"adminIdentity": adminIdentity,
		"adminSecret": adminSecret,
		"role": role,
		"affiliation": affiliation,
		"reason": reason
	}
}


exports.parseArgs = parseArgs;