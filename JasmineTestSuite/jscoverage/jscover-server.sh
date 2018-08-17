#java -jar ../JSCover/target/dist/JSCover-all.jar -ws --document-root=../.. --report-dir=target/phantom-server --no-instrument=JasmineTestSuite 
#java -jar ../JSCover/target/dist/JSCover-all.jar -ws --report-dir=target/phantom-server-jasmine --no-branch --only-instrument-reg=/src/main/resources/jscoverage-branch.js
java -jar ../JSCover/target/dist/JSCover-all.jar -ws --report-dir=target/phantom-server-jasmine --document-root=../.. --no-instrument=JasmineTestSuite
