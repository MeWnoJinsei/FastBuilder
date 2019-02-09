class Read{
	static read(msg, opts){
		let out = {};
		let args = msg.split(" ") || [];
		opts = opts || {};
		out.main = {
			isCmd:isCmd(args) != false,
			toRoot:!!~args.indexOf('sudo') && !!~args.indexOf('su'),
			exitRoot:!!~args.indexOf('sudo') && !!~args.indexOf('exit'),
			isSudo:!!~args.indexOf('sudo') || opts.su,
			delays:parseInt(hasFlags(args, '-t', '--times') || 10)
		};
		out.header = {
			position:!!~args.indexOf('-p') ? [
				parseInt(args[args.indexOf('-p') + 1]),
				parseInt(args[args.indexOf('-p') + 2]),
				parseInt(args[args.indexOf('-p') + 3])
			] : this.returnPosition(args,opts),
			block:hasFlags(args, '-b', '--block') || opts.block,
			data:hasFlags(args, '-d', '--data') || opts.data,
			method:hasFlags(args, '-m', '--method') || opts.method,
			$block:hasFlags(args, '-b2', '--block2') || opts.$block,
			$data:hasFlags(args, '-d2', '--data2') || opts.$data,
			entity:hasFlags(args, '-e', '--entity') || opts.entity
		};
		out.collect = {
			get:!!~args.indexOf('get') ? args[args.indexOf('get') + 1] : false,
			locate:!!~args.indexOf('locate') ? args[args.indexOf('locate') + 1] : false,
			writeData:!!~args.indexOf('let') || !!~args.indexOf('var')
		};
		out.server = {
			close:!!~args.indexOf('closewebsocket'),
			screenfetch:!!~args.indexOf('screenfetch'),
			helpMessage:(!!~args.indexOf('help') && args.length == 1),
			listHelp:(!!~args.indexOf('help') && !!~args.indexOf('-l')) || (!!~args.indexOf('help') && !!~args.indexOf('--list')),
			showhelp:args[0] == 'help' ? args[1] :
				(args[1] == 'h') || (args[1] == 'help' || args[1] == '-h' || args[1] == '--help') ?
					args[0] : false
		};
		out.build = [];
		if(args.indexOf('|')){
			let $cmd = msg.split('|');
			for(let i in $cmd){
				out.build.push(this.returnBuild($cmd[i]));
			}
		}else{
			out.build.push(this.returnBuild([args]));
		}
		return out;
	}

	static returnPosition(args,opts){
		return [
			parseInt(hasFlags(args, '$x', '--x')) || opts.position[0],
			parseInt(hasFlags(args, '$y', '--y')) || opts.position[1],
			parseInt(hasFlags(args, '$z', '--z')) || opts.position[2],
		];
	}

	static returnBuild(args){
		return {
			type:isCmd(args),
			direction:hasFlags(args, '-f', '--facing') || 'y',
			shape:hasFlags(args, '-s', '--shape') || 'hollow',
			radius:parseInt(hasFlags(args, '-r', '--radius') || 0),
			accuracy:parseInt(hasFlags(args, '-a', '--accuracy') || 50),
			width:parseInt(hasFlags(args, '-w', '--width') || 0),
			length:parseInt(hasFlags(args, '-l', '--length') || 0),
			height:parseInt(hasFlags(args, '-h', '--height') || 1),
			entityMod:hasFlags(args, '-y', '--entityMod') || false,
			path:hasFlags(args, '-z', '--path') || false
		};
	}
}

function hasFlags(argv, input, alias){
	argv = typeof argv === 'string'? argv.split(' '): argv;
	if(!!~argv.indexOf(input)){
		return argv[argv.indexOf(input) + 1];
	}else if(!!~argv.indexOf(alias)){
		return argv[argv.indexOf(alias) + 1];
	}else {
		return false;
	}
}

function isCmd(args) {
	args = typeof args === 'string'? args.split(' '): args;
	let methods = require('./algorithms').returnMethods();
	for(let key = 0 ; key < args.length ; key++){
		if(methods.has(args[key])){
			return args[key];
		}
	}
	return false;
}

module.exports = Read;
