/**
 * Autores:Alan Klinger klingerkrieg@gmail.com
 * 		   Lucas Dantas lucashiagod@gmail.com
 * Plugin do node-red
 */

module.exports = function(RED) {
    function RateFileNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
		globalContext = node.context().global;
		globalContext.set("msgs",[]);
		
		var delay = config.delay || 2000;

        this.on('input', function(msg) {
			var newMsg = {payload: msg.payload};
			msgs = globalContext.get("msgs");
			msgs.push(newMsg);
			
        });

		clearInterval(int);
		var int = setInterval(function(){
			msgs = globalContext.get("msgs");
			if (msgs.length > 0){
				msg = msgs.shift();
				node.send(msg);
				globalContext.set("msgs", msgs);
			}
		}, delay);
    }
    RED.nodes.registerType("RateFile",RateFileNode);
}
