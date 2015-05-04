(function(){

    module.exports = function(DocumentParser, NGramsReducer){

        var separator, byDocument

        var exports = function(corpus){
            //Corpus -> NGrams | {NGrams}

            var documentParser = DocumentParser

            documentParser
                .separator(separator) 

            if (byDocument){
                return corpus.map(documentParser)
            } else {
                return corpus.map(documentParser)
                    .reduce(NGramsReducer)
            }

        }

        exports.byDocument = function(){
            if (arguments.length > 0){
                byDocument = arguments[0]
                return exports
            }

            return byDocument 
        }

        exports.separator = function(){
            if (arguments.length > 0){
                separator = arguments[0]
                return exports
            }

            return separator
        }

        return exports

    }

})()
