cd src
javac **/*.java -d ../vm
cd ../
java -classpath vm client/Client $1