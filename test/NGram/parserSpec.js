(function(){

    describe('NGram corpusParser module', function(){

        var generator = require('../../NGram/corpusParser.js') 

        describe('byDocument method', function(){

            var instance
            beforeEach(function(){
                instance = generator()
            })

            describe('when given boolean', function(){

                var mockBoolean, result
                beforeEach(function(){
                    mockBoolean = true 
                    instance.byDocument(mockBoolean)
                    result = instance.byDocument()
                })

                it('should set byDocument to given boolean', function(){
                    expect(result).toBe(true)
                })

            })

        })

        describe('separator method', function(){

            var instance
            beforeEach(function(){
                instance = generator()
            })

            describe('when given string', function(){

                var mockString, result
                beforeEach(function(){
                    mockString = 'mockString'
                    instance.separator(mockString)
                    result = instance.separator()
                })

                it('should set separator to given string', function(){
                    expect(result).toBe(mockString)
                })

            })

        })

        describe('generate ngrams', function(){

            var instance, mockDocumentParser, mockNGramsReducer
            beforeEach(function(){

                mockDocumentParser = {
                    '$obsv': {},
                    'value': 'documentParser',
                    'separator': function(separator){
                        this.$obsv.separator = separator
                    }
                }

                mockNGramsReducer = {
                    'value': 'NGramsReducer'
                }
                
                instance = generator(mockDocumentParser, mockNGramsReducer)
            })

            describe('when set to parse corpus and return all n-grams', function(){

                beforeEach(function(){
                    instance.byDocument(false)
                })

                describe('when given corpus', function(){


                    var mockCorpus, mockSeparator, result
                    beforeEach(function(){

                        mockCorpus = {
                            '$obsv': {},
                            'map': function(mapper){
                                var self = this
                                this.$obsv.mapper = mapper
                                return {
                                    'value': 'mapResult',
                                    'reduce': function(reducer){
                                        self.$obsv.reducer = reducer
                                        return 'reduceResult'
                                    }
                                }
                            }
                        }

                        mockSeparator = 'mockSeparator'

                        instance.separator(mockSeparator)

                        result = instance(mockCorpus)

                    })

                    it('should set DocumentParser separator to set separator', function(){
                        expect(mockDocumentParser.$obsv.separator)
                            .toBe('mockSeparator')
                    })

                    it('should map given documentParser on each document', function(){

                        expect(mockCorpus.$obsv.mapper.value)
                            .toBe('documentParser')

                    })

                    it('should reduce corpus using NGramsReducer', function(){
                        expect(mockCorpus.$obsv.reducer.value)
                            .toBe('NGramsReducer')
                    })

                    it('should return result of reduce statement', function(){
                        expect(result).toBe('reduceResult')
                    })

                })

            })

            describe('when set to parse corpus and return n-grams by documents', function(){

                beforeEach(function(){
                    instance.byDocument(true)
                })

                describe('when given corpus', function(){


                    var mockCorpus, mockSeparator, result
                    beforeEach(function(){

                        mockCorpus = {
                            '$obsv': {},
                            'map': function(mapper){
                                var self = this
                                this.$obsv.mapper = mapper
                                return {
                                    'value': 'mapResult',
                                    'reduce': function(reducer){
                                        self.$obsv.reducer = reducer
                                        return 'reduceResult'
                                    }
                                }
                            }
                        }

                        mockSeparator = 'mockSeparator'

                        instance.separator(mockSeparator)

                        result = instance(mockCorpus)

                    })

                    it('should set DocumentParser separator to set separator', function(){
                        expect(mockDocumentParser.$obsv.separator)
                            .toBe('mockSeparator')
                    })

                    it('should map given documentParser on each document', function(){

                        expect(mockCorpus.$obsv.mapper.value)
                            .toBe('documentParser')

                    })

                    it('should return result of map statement', function(){
                        expect(result.value).toBe('mapResult')
                    })

                })

            })

        })

    })

})()
