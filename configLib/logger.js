var logger= require('log'),
logger = new logger('info');
module.exports = {
	debug:function(param){
		//console.log(logger)
		logger.debug(param);
	},
	error:function(param){

		//console.log(logger)
		logger.error(param);
	},
	track:function(param){
		//console.log(logger);
		//logger.debug(param);
		//.warn()
	},
	info:function(param){
		//console.log(logger)
		logger.info(param);
	},
	fatal:function(param){
		//console.log(logger)
		logger.info(param);
	},
	log:function(logType,message){

	}
}