#Make sure phantomjs is on your execution PATH
#phantomjs JSCover/src/test/javascript/lib/PhantomJS/run-jscover-qunit.js http://localhost:8080/test/index.html
phantomjs  --local-to-remote-url-access=yes ../JSCover/src/test/javascript/lib/PhantomJS/run-jscover-jasmine2.js http://localhost:8080/JasmineTestSuite/jasmine-lib/kony_jasmine_test_runner.html
